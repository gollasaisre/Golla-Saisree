import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';
import { AIService } from '@/lib/ai';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const recommendations = await prisma.careerRecommendation.findMany({
      where: { userId: session.user.id },
      include: { career: true },
      orderBy: { matchScore: 'desc' }
    });
    
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found. Please complete your profile first.' }, { status: 400 });
    }

    const aiRecs = await AIService.getCareerRecommendations({
      ...profile,
    });

    // Save recommendations to database
    // We assume the career titles might need to be created if they don't exist
    const savedRecs = [];
    for (const rec of aiRecs) {
      const career = await prisma.career.upsert({
        where: { title: rec.title },
        update: {},
        create: { title: rec.title, description: rec.matchReason }
      });

      const dbRec = await prisma.careerRecommendation.create({
        data: {
          userId: session.user.id,
          careerId: career.id,
          matchScore: rec.matchScore,
          matchReason: rec.matchReason,
          missingSkills: JSON.stringify(rec.missingSkills),
          nextSteps: JSON.stringify(rec.nextSteps)
        },
        include: { career: true }
      });
      savedRecs.push(dbRec);
    }

    return NextResponse.json(savedRecs);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
