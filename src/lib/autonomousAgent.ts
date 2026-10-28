import prisma from './prisma';
import { AIService, ChatResponse } from './ai';

export interface AgentResponse extends ChatResponse {
  sessionId: string;
}

export class AutonomousAgent {
  static async start(userId?: string): Promise<AgentResponse> {
    const initialState = {
      history: [
        { role: 'agent', content: 'Hello! I am your AI Career Pilot. How can I help you today? You can start by telling me about your background, or ask for a career assessment, roadmap, or job recommendations.' }
      ]
    };
    
    const session = await prisma.agentSession.create({
      data: {
        userId: userId || null,
        state: JSON.stringify(initialState)
      }
    });

    return {
      sessionId: session.id,
      message: initialState.history[0].content,
      suggestedActions: ['Take Career Assessment', 'Find Career Matches', 'Build Roadmap', 'Search Jobs']
    };
  }

  static async handleMessage(sessionId: string, message: string, _userId?: string): Promise<AgentResponse> {
    void _userId;
    const session = await prisma.agentSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      throw new Error('Session not found');
    }

    const state = JSON.parse(session.state);
    
    // Add user message to history
    state.history.push({ role: 'user', content: message });
    
    // Process message via AIService
    // For now we use the chat method which acts as a fallback
    const aiResponse = await AIService.chat(message, { history: state.history });
    
    // Add agent response to history
    state.history.push({ role: 'agent', content: aiResponse.message });

    // Update session
    await prisma.agentSession.update({
      where: { id: sessionId },
      data: { state: JSON.stringify(state) }
    });

    return {
      sessionId,
      message: aiResponse.message,
      suggestedActions: aiResponse.suggestedActions
    };
  }
}
