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
    const resume = await prisma.resume.findFirst({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' }
    });
    
    // Return the content JSON string, or a default structure
    const content = resume ? JSON.parse(resume.content) : {
      fullName: session.user.name || "",
      jobTitle: "",
      experience: []
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching resume:', error);
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
    
    // Upsert logic: find existing or create new
    const existing = await prisma.resume.findFirst({
      where: { userId: session.user.id }
    });

    if (existing) {
      const updated = await prisma.resume.update({
        where: { id: existing.id },
        data: { content: JSON.stringify(data) }
      });
      return NextResponse.json(JSON.parse(updated.content));
    } else {
      const created = await prisma.resume.create({
        data: {
          userId: session.user.id,
          content: JSON.stringify(data),
          template: "modern"
        }
      });
      return NextResponse.json(JSON.parse(created.content));
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
