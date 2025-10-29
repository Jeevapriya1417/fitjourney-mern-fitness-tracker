import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userStreaks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const streakRecords = await db
      .select()
      .from(userStreaks)
      .where(eq(userStreaks.userId, userId))
      .limit(1);

    if (streakRecords.length === 0) {
      return NextResponse.json(
        {
          currentStreak: 0,
          longestStreak: 0,
          totalActivities: 0,
          lastActivityDate: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(streakRecords[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}