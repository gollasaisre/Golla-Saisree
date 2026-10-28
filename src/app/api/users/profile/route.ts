import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

// Calculate career readiness based on profile completeness, skills, and assessments
function computeReadiness(profile: any, skillsCount: number, resumesCount: number, assessmentsCount: number): number {
  let score = 20; // Base baseline

  if (profile?.headline && profile.headline.length > 5) score += 10;
  if (profile?.bio && profile.bio.length > 20) score += 15;
  if (profile?.location) score += 5;
  if (profile?.targetRole) score += 10;
  if (profile?.education) score += 10;
  if (skillsCount > 0) score += Math.min(skillsCount * 3, 15);
  if (resumesCount > 0) score += 10;
  if (assessmentsCount > 0) score += Math.min(assessmentsCount * 5, 15);

  return Math.min(Math.max(score, 25), 100);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    // Rich demo profile data with full activity stats for preview
    return NextResponse.json({
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      headline: "Full-Stack Software Engineer & AI Systems Developer",
      bio: "Computer Science graduate with deep passion for building high-performance web applications, intelligent agents, and scalable backend infrastructure. Experienced in TypeScript, React, Next.js, and cloud platforms.",
      location: "San Francisco, CA",
      targetRole: "Full Stack Engineer",
      education: "B.S. in Computer Science - University of California (2024)",
      interests: "Artificial Intelligence, Distributed Systems, Cloud Architecture, UX Engineering",
      careerGoals: "Architect mission-critical applications at a high-growth tech company, master microservice systems, and mentor junior developers.",
      strengths: "TypeScript, React, Next.js, Node.js, Python, PostgreSQL, System Design",
      preferredWorkType: "Hybrid",
      careerReadiness: 82,
      skills: [
        { name: "TypeScript", proficiency: "Advanced" },
        { name: "Next.js & React", proficiency: "Advanced" },
        { name: "Node.js & Express", proficiency: "Advanced" },
        { name: "PostgreSQL & Prisma", proficiency: "Intermediate" },
        { name: "Python", proficiency: "Intermediate" },
        { name: "Docker & AWS", proficiency: "Intermediate" },
        { name: "System Design", proficiency: "Beginner" },
      ],
      stats: {
        totalResumes: 1,
        totalAssessments: 3,
        avgAssessmentScore: 88,
        totalApplications: 5,
        interviewsScheduled: 2,
      },
      recentAssessments: [
        { title: "Full Stack Engineering Assessment", score: 92, date: "2 days ago" },
        { title: "Data Structures & Algorithms", score: 85, date: "1 week ago" },
        { title: "System Architecture Quiz", score: 87, date: "2 weeks ago" }
      ]
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
        userSkills: {
          include: { skill: true }
        },
        resumes: {
          select: { id: true, updatedAt: true }
        },
        assessmentResults: {
          select: {
            id: true,
            score: true,
            strengths: true,
            weaknesses: true,
            createdAt: true,
            assessment: { select: { title: true } }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        jobApplications: {
          select: { id: true, status: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const p = user.profile;
    const skills = user.userSkills.map(us => ({
      name: us.skill.name,
      proficiency: us.proficiency
    }));

    const totalResumes = user.resumes.length;
    const totalAssessments = user.assessmentResults.length;
    const avgScore = totalAssessments > 0
      ? Math.round(user.assessmentResults.reduce((acc, curr) => acc + curr.score, 0) / totalAssessments)
      : 80;

    const totalApplications = user.jobApplications.length;
    const interviewsScheduled = user.jobApplications.filter(app => 
      app.status.toLowerCase().includes('interview')
    ).length;

    const calculatedReadiness = computeReadiness(p, skills.length, totalResumes, totalAssessments);

    return NextResponse.json({
      name: user.name || "",
      email: user.email || "",
      headline: p?.headline || "Software Engineer",
      bio: p?.bio || "",
      location: p?.location || "",
      targetRole: p?.targetRole || "",
      education: p?.education || "",
      interests: p?.interests || "",
      careerGoals: p?.careerGoals || "",
      strengths: p?.strengths || "",
      preferredWorkType: p?.preferredWorkType || "Hybrid",
      careerReadiness: p?.careerReadiness || calculatedReadiness,
      skills: skills.length > 0 ? skills : [
        { name: "JavaScript", proficiency: "Intermediate" },
        { name: "React", proficiency: "Intermediate" },
        { name: "Problem Solving", proficiency: "Intermediate" }
      ],
      stats: {
        totalResumes,
        totalAssessments,
        avgAssessmentScore: avgScore,
        totalApplications,
        interviewsScheduled
      },
      recentAssessments: user.assessmentResults.map(ar => ({
        title: ar.assessment?.title || "Skill Assessment",
        score: ar.score,
        date: new Date(ar.createdAt).toLocaleDateString()
      }))
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
    // Unauthenticated / demo response
    const calculatedReadiness = computeReadiness(
      data,
      data.skills ? data.skills.length : 4,
      1,
      2
    );

    return NextResponse.json({
      ...data,
      careerReadiness: data.careerReadiness || calculatedReadiness,
      message: "Profile saved successfully (Demo mode)"
    });
  }

  try {
    // 1. Update User name
    if (data.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: data.name }
      });
    }

    // 2. Compute dynamic readiness score
    const userStats = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        resumes: { select: { id: true } },
        assessmentResults: { select: { id: true } },
        userSkills: { select: { id: true } }
      }
    });

    const calculatedReadiness = computeReadiness(
      data,
      Array.isArray(data.skills) ? data.skills.length : (userStats?.userSkills.length || 0),
      userStats?.resumes.length || 0,
      userStats?.assessmentResults.length || 0
    );

    // 3. Upsert Profile
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
        careerReadiness: data.careerReadiness || calculatedReadiness
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
        careerReadiness: data.careerReadiness || calculatedReadiness
      }
    });

    // 4. Update Skills if provided
    if (Array.isArray(data.skills)) {
      for (const item of data.skills) {
        if (!item.name || typeof item.name !== 'string') continue;
        const skillRecord = await prisma.skill.upsert({
          where: { name: item.name.trim() },
          update: {},
          create: { name: item.name.trim(), category: "General" }
        });

        await prisma.userSkill.upsert({
          where: {
            userId_skillId: {
              userId: session.user.id,
              skillId: skillRecord.id
            }
          },
          update: { proficiency: item.proficiency || "Intermediate" },
          create: {
            userId: session.user.id,
            skillId: skillRecord.id,
            proficiency: item.proficiency || "Intermediate"
          }
        });
      }
    }

    return NextResponse.json({
      ...data,
      ...profile,
      careerReadiness: profile.careerReadiness,
      name: data.name
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
