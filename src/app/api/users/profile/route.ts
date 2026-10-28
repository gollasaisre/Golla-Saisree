import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });
    
    return NextResponse.json(profile || {});
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        headline: data.headline,
        bio: data.bio,
        location: data.location,
        targetRole: data.targetRole,
        education: data.education,
        interests: data.interests,
        careerGoals: data.careerGoals,
        strengths: data.strengths,
        preferredWorkType: data.preferredWorkType,
      },
      create: {
        userId: session.user.id,
        headline: data.headline,
        bio: data.bio,
        location: data.location,
        targetRole: data.targetRole,
        education: data.education,
        interests: data.interests,
        careerGoals: data.careerGoals,
        strengths: data.strengths,
        preferredWorkType: data.preferredWorkType,
      }
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
