import prisma from './prisma';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type CareerRec = {
  title: string;
  matchScore: number;
  matchReason: string;
  missingSkills: string[];
  nextSteps: string[];
};

export type ChatResponse = {
  message: string;
  suggestedActions?: string[];
};

export class AIService {
  static async getCareerRecommendations(
    userProfile: Record<string, unknown>
  ): Promise<CareerRec[]> {
    const dbRecs = await prisma.careerRecommendation.findMany({
      where: { userId: userProfile.id as string },
      include: { career: true },
    });
    if (dbRecs.length > 0) {
      return dbRecs.map((rec) => ({
        title: rec.career.title,
        matchScore: rec.matchScore,
        matchReason: rec.matchReason,
        missingSkills: JSON.parse(rec.missingSkills as string),
        nextSteps: JSON.parse(rec.nextSteps as string),
      }));
    }

    try {
      const prompt = `Based on the following user profile, recommend 3 suitable career paths.
Profile: ${JSON.stringify(userProfile)}
Respond in valid JSON format as an array of objects matching this structure:
{ "title": "string", "matchScore": "number (0-100)", "matchReason": "string", "missingSkills": ["string"], "nextSteps": ["string"] }
Output ONLY JSON.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "[]";
      // Clean up markdown code blocks if any
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(jsonStr) as CareerRec[];
      return parsed;
    } catch (e) {
      console.error("Failed to generate career recommendations", e);
      // Fallback data
      return [
        {
          title: "Software Engineer",
          matchScore: 92,
          matchReason: "Strong background aligns perfectly with this role.",
          missingSkills: ["System Design"],
          nextSteps: ["Complete an advanced System Design course"],
        }
      ];
    }
  }

  static async chat(
    message: string,
    context: Record<string, unknown>
  ): Promise<ChatResponse> {
    try {
      const historyStr = JSON.stringify(context.history || []);
      const prompt = `You are an AI Career Pilot helping a user with their career.
Previous conversation history: ${historyStr}

User message: ${message}

Provide a helpful, friendly response. Also suggest 1-2 actionable next steps for the user as an array of strings.
Format your response as a JSON object: { "message": "your response", "suggestedActions": ["Action 1", "Action 2"] }
Output ONLY JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "{}";
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(jsonStr) as ChatResponse;
    } catch (e) {
      console.error("Failed to generate chat response", e);
      return {
        message: "I'm having trouble connecting to my AI brain right now. Can you try again?",
        suggestedActions: ["Retry"],
      };
    }
  }
}
