"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalActivities: number;
  lastActivityDate: string | null;
}

interface StreakCardProps {
  userId: string;
  compact?: boolean;
}

export default function StreakCard({ userId, compact = false }: StreakCardProps) {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalActivities: 0,
    lastActivityDate: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStreakData();
  }, [userId]);

  const fetchStreakData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/streaks/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStreakData(data);
      }
    } catch (error) {
      console.error('Error fetching streak data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 animate-pulse">
        <CardContent className="py-8">
          <div className="h-20 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="relative">
          <Flame className="h-8 w-8 text-orange-600 transition-all duration-300 group-hover:scale-110" />
          {streakData.currentStreak > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {streakData.currentStreak}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Current Streak</p>
          <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Flame className="h-7 w-7 text-orange-600" />
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Your Streak
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/* Current Streak */}
          <div className="text-center p-4 bg-white rounded-lg border-2 border-orange-300 hover:border-orange-400 transition-all duration-300 hover:shadow-lg group cursor-pointer">
            <div className="relative inline-block mb-2">
              <Flame className="h-10 w-10 text-orange-600 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              {streakData.currentStreak > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {streakData.currentStreak}
                </div>
              )}
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {streakData.currentStreak}
            </p>
            <p className="text-xs text-gray-600 font-medium mt-1">Current Streak</p>
          </div>

          {/* Longest Streak */}
          <div className="text-center p-4 bg-white rounded-lg border-2 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg group cursor-pointer">
            <Trophy className="h-10 w-10 text-yellow-600 mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              {streakData.longestStreak}
            </p>
            <p className="text-xs text-gray-600 font-medium mt-1">Best Streak</p>
          </div>

          {/* Total Activities */}
          <div className="text-center p-4 bg-white rounded-lg border-2 border-green-300 hover:border-green-400 transition-all duration-300 hover:shadow-lg group cursor-pointer">
            <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {streakData.totalActivities}
            </p>
            <p className="text-xs text-gray-600 font-medium mt-1">Total Days</p>
          </div>
        </div>

        {/* Last Activity */}
        {streakData.lastActivityDate && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">
              Last activity: <span className="font-semibold text-gray-800">
                {new Date(streakData.lastActivityDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </p>
          </div>
        )}

        {/* Motivation Message */}
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border border-orange-300">
          <p className="text-sm font-medium text-center text-gray-700">
            {streakData.currentStreak === 0 
              ? "🎯 Start your streak today!" 
              : streakData.currentStreak < 3 
              ? "💪 Keep it going!" 
              : streakData.currentStreak < 7 
              ? "🔥 You're on fire!" 
              : streakData.currentStreak < 30 
              ? "⚡ Unstoppable momentum!" 
              : "🏆 Legendary dedication!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
