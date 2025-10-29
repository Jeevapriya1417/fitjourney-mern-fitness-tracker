import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dailyActivities } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(request.url);

    // Extract and validate pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Query activities for the user
    const activities = await db
      .select()
      .from(dailyActivities)
      .where(eq(dailyActivities.userId, userId))
      .orderBy(desc(dailyActivities.activityDate), desc(dailyActivities.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}