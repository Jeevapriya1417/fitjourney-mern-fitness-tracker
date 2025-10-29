import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Add new gamification tables

export const userStreaks = sqliteTable('user_streaks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  lastActivityDate: text('last_activity_date'),
  totalActivities: integer('total_activities').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const achievements = sqliteTable('achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  requirementType: text('requirement_type').notNull(),
  requirementValue: integer('requirement_value').notNull(),
  points: integer('points').notNull(),
  createdAt: text('created_at').notNull(),
});

export const userAchievements = sqliteTable('user_achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  achievementId: integer('achievement_id').notNull().references(() => achievements.id),
  unlockedAt: text('unlocked_at').notNull(),
  createdAt: text('created_at').notNull(),
});

export const dailyActivities = sqliteTable('daily_activities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  activityType: text('activity_type').notNull(),
  activityDate: text('activity_date').notNull(),
  metadata: text('metadata', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});