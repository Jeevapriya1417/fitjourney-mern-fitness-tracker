import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { achievements, userAchievements, userStreaks, dailyActivities } from '@/db/schema';
import { eq, and, notInArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    // Validate userId is provided
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'userId is required',
          code: 'MISSING_USER_ID'
        },
        { status: 400 }
      );
    }

    // Query all achievements
    const allAchievements = await db.select().from(achievements);

    // Query user's already unlocked achievement IDs
    const unlockedRecords = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    const unlockedAchievementIds = unlockedRecords.map(record => record.achievementId);

    // Query user's streak data
    const streakData = await db
      .select()
      .from(userStreaks)
      .where(eq(userStreaks.userId, userId))
      .limit(1);

    const userStreak = streakData[0] || {
      currentStreak: 0,
      longestStreak: 0,
      totalActivities: 0
    };

    // Count user's activities by type
    const userActivities = await db
      .select()
      .from(dailyActivities)
      .where(eq(dailyActivities.userId, userId));

    const activityCounts = {
      progress_logged: userActivities.filter(a => a.activityType === 'progress_logged').length,
      workout_completed: userActivities.filter(a => a.activityType === 'workout_completed').length,
      goal_set: userActivities.filter(a => a.activityType === 'goal_set').length
    };

    // Track newly unlocked achievements
    const newlyUnlocked: any[] = [];
    const currentTimestamp = new Date().toISOString();

    // Check each achievement not yet unlocked
    for (const achievement of allAchievements) {
      // Skip if already unlocked
      if (unlockedAchievementIds.includes(achievement.id)) {
        continue;
      }

      let requirementMet = false;

      // Check requirement based on type
      switch (achievement.requirementType) {
        case 'streak_days':
          requirementMet = userStreak.currentStreak >= achievement.requirementValue;
          break;

        case 'activities_count':
          requirementMet = userStreak.totalActivities >= achievement.requirementValue;
          break;

        case 'progress_logged':
          requirementMet = activityCounts.progress_logged >= achievement.requirementValue;
          break;

        case 'workout_completed':
          requirementMet = activityCounts.workout_completed >= achievement.requirementValue;
          break;

        case 'goal_set':
          requirementMet = activityCounts.goal_set >= achievement.requirementValue;
          break;

        default:
          requirementMet = false;
      }

      // If requirement met, unlock the achievement
      if (requirementMet) {
        const unlockedAchievement = await db
          .insert(userAchievements)
          .values({
            userId,
            achievementId: achievement.id,
            unlockedAt: currentTimestamp,
            createdAt: currentTimestamp
          })
          .returning();

        newlyUnlocked.push({
          ...achievement,
          userAchievement: unlockedAchievement[0]
        });
      }
    }

    return NextResponse.json(
      {
        unlockedAchievements: newlyUnlocked,
        totalUnlocked: newlyUnlocked.length
      },
      { status: 200 }
    );

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