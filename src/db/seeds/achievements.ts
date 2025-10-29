import { db } from '@/db';
import { achievements } from '@/db/schema';

async function main() {
    const sampleAchievements = [
        {
            name: 'First Step',
            description: 'Log your first activity',
            icon: '🎯',
            category: 'progress',
            requirementType: 'activities_count',
            requirementValue: 1,
            points: 10,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Consistency King',
            description: 'Maintain a 3-day streak',
            icon: '👑',
            category: 'streak',
            requirementType: 'streak_days',
            requirementValue: 3,
            points: 25,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Week Warrior',
            description: 'Maintain a 7-day streak',
            icon: '⚔️',
            category: 'streak',
            requirementType: 'streak_days',
            requirementValue: 7,
            points: 50,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Unstoppable',
            description: 'Maintain a 30-day streak',
            icon: '🔥',
            category: 'streak',
            requirementType: 'streak_days',
            requirementValue: 30,
            points: 200,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Progress Tracker',
            description: 'Log 5 progress entries',
            icon: '📊',
            category: 'progress',
            requirementType: 'progress_logged',
            requirementValue: 5,
            points: 30,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Goal Setter',
            description: 'Set your fitness goals',
            icon: '🎯',
            category: 'goal',
            requirementType: 'goal_set',
            requirementValue: 1,
            points: 15,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Dedicated',
            description: 'Complete 10 workout sessions',
            icon: '💪',
            category: 'workout',
            requirementType: 'workout_completed',
            requirementValue: 10,
            points: 75,
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Fitness Legend',
            description: 'Maintain a 100-day streak',
            icon: '🏆',
            category: 'streak',
            requirementType: 'streak_days',
            requirementValue: 100,
            points: 500,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(achievements).values(sampleAchievements);
    
    console.log('✅ Achievements seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});