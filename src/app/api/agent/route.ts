import { NextResponse } from 'next/server';
import { AutonomousAgent } from '@/lib/autonomousAgent';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { sessionId, message } = await request.json();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let response;
    if (!sessionId && !message) {
      // Start new session
      response = await AutonomousAgent.start(userId);
    } else if (sessionId && message) {
      // Continue existing session
      response = await AutonomousAgent.handleMessage(sessionId, message, userId);
    } else {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in agent API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
