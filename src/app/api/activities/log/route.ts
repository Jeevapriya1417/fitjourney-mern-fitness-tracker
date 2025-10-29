import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dailyActivities } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, activityType, activityDate, metadata } = body;

    // Validate required fields
    if (!userId || !activityType || !activityDate) {
      return NextResponse.json(
        { 
          error: 'userId, activityType, and activityDate are required',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      );
    }

    // Validate activityDate format (ISO date YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(activityDate)) {
      return NextResponse.json(
        { 
          error: 'activityDate must be in ISO date format (YYYY-MM-DD)',
          code: 'INVALID_DATE_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate activityType
    const validActivityTypes = ['progress_logged', 'workout_completed', 'goal_set'];
    if (!validActivityTypes.includes(activityType)) {
      return NextResponse.json(
        { 
          error: `activityType must be one of: ${validActivityTypes.join(', ')}`,
          code: 'INVALID_ACTIVITY_TYPE'
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: {
      userId: string;
      activityType: string;
      activityDate: string;
      metadata?: any;
      createdAt: string;
    } = {
      userId: userId.trim(),
      activityType: activityType.trim(),
      activityDate: activityDate.trim(),
      createdAt: new Date().toISOString(),
    };

    // Include metadata if provided
    if (metadata !== undefined && metadata !== null) {
      insertData.metadata = metadata;
    }

    // Insert new activity record
    const newActivity = await db.insert(dailyActivities)
      .values(insertData)
      .returning();

    return NextResponse.json(newActivity[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error.message 
      },
      { status: 500 }
    );
  }
}