import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    // Provide a rich default mock profile for demo / unauthenticated preview
    return NextResponse.json({
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      headline: "Aspiring Full-Stack Software Engineer & AI Enthusiast",
      bio: "Computer Science graduate passionate about building scalable web applications and intelligent systems. Constantly learning modern frameworks and looking for impactful software engineering roles.",
      location: "San Francisco, CA",
      targetRole: "Full Stack Engineer",
      education: "B.S. in Computer Science - Tech University (2024)",
      interests: "Artificial Intelligence, Cloud Computing, Distributed Systems, Web Performance",
      careerGoals: "Join a high-growth tech team, contribute to open source, and architect robust cloud applications.",
      strengths: "TypeScript, React, Next.js, Python, PostgreSQL, System Design",
      preferredWorkType: "Hybrid",
      careerReadiness: 78
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const p = user.profile;

    return NextResponse.json({
      name: user.name || "",
      email: user.email || "",
      headline: p?.headline || "",
      bio: p?.bio || "",
      location: p?.location || "",
      targetRole: p?.targetRole || "",
      education: p?.education || "",
      interests: p?.interests || "",
      careerGoals: p?.careerGoals || "",
      strengths: p?.strengths || "",
      preferredWorkType: p?.preferredWorkType || "Hybrid",
      careerReadiness: p?.careerReadiness || 65
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();

  if (!session?.user?.id) {
    // Return the updated data for demo/mock persistence in local dev
    return NextResponse.json({
      ...data,
      message: "Profile updated (Demo mode)"
    });
  }

  try {
    if (data.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: data.name }
      });
    }

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
        careerReadiness: typeof data.careerReadiness === 'number' ? data.careerReadiness : undefined
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
        careerReadiness: typeof data.careerReadiness === 'number' ? data.careerReadiness : 65
      }
    });

    return NextResponse.json({
      ...data,
      ...profile,
      name: data.name
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
