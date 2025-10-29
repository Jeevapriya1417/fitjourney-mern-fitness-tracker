import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userStreaks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, activityDate } = body;

    // Validate required fields
    if (!userId || !activityDate) {
      return NextResponse.json(
        { 
          error: 'userId and activityDate are required',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      );
    }

    // Validate activityDate format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(activityDate)) {
      return NextResponse.json(
        { 
          error: 'activityDate must be in YYYY-MM-DD format',
          code: 'INVALID_DATE_FORMAT'
        },
        { status: 400 }
      );
    }

    // Query existing streak record
    const existingRecords = await db
      .select()
      .from(userStreaks)
      .where(eq(userStreaks.userId, userId))
      .limit(1);

    const now = new Date().toISOString();

    // If no record exists, create new one
    if (existingRecords.length === 0) {
      const newStreak = await db
        .insert(userStreaks)
        .values({
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: activityDate,
          totalActivities: 1,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return NextResponse.json(newStreak[0], { status: 201 });
    }

    // Record exists - calculate streak
    const existingStreak = existingRecords[0];
    const lastDate = new Date(existingStreak.lastActivityDate + 'T00:00:00Z');
    const currentDate = new Date(activityDate + 'T00:00:00Z');

    // Calculate day difference
    const dayDifference = Math.floor(
      (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Same day - no update needed
    if (dayDifference === 0) {
      return NextResponse.json(existingStreak, { status: 200 });
    }

    let newCurrentStreak: number;
    let newLongestStreak: number;

    if (dayDifference === 1) {
      // Consecutive day - increment streak
      newCurrentStreak = existingStreak.currentStreak + 1;
      newLongestStreak = Math.max(newCurrentStreak, existingStreak.longestStreak);
    } else {
      // Gap in days - reset streak
      newCurrentStreak = 1;
      newLongestStreak = existingStreak.longestStreak;
    }

    // Update the record
    const updatedStreak = await db
      .update(userStreaks)
      .set({
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: activityDate,
        totalActivities: existingStreak.totalActivities + 1,
        updatedAt: now,
      })
      .where(eq(userStreaks.userId, userId))
      .returning();

    return NextResponse.json(updatedStreak[0], { status: 200 });

  } catch (error) {
    console.error('POST /api/streaks/check error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}