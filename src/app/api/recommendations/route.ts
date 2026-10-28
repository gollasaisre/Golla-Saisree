import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AIService } from '@/lib/ai';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // We can allow unauthorized access for demo purposes or require it
    // For now, let's pass a mock user profile if session is missing, or the real user id if present
    const userProfile = session?.user ? { id: session.user.id } : { id: 'demo' };
    
    const recommendations = await AIService.getCareerRecommendations(userProfile);
    
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error fetching career recommendations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
