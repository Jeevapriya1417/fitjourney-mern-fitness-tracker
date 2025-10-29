"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import StreakCard from '@/components/StreakCard';
import AchievementBadge from '@/components/AchievementBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Flame, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirementType: string;
  requirementValue: number;
  points: number;
  createdAt: string;
}

interface UserAchievement {
  id: number;
  userId: string;
  achievementId: number;
  unlockedAt: string;
  achievement: Achievement;
}

export default function AchievementsPage() {
  const { user } = useAuth();
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchAchievements();
      fetchUserAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (response.ok) {
        const data = await response.json();
        setAllAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchUserAchievements = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/achievements/user/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setUserAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAchievementUnlocked = (achievementId: number) => {
    return userAchievements.some(ua => ua.achievementId === achievementId);
  };

  const getUnlockedDate = (achievementId: number) => {
    const ua = userAchievements.find(ua => ua.achievementId === achievementId);
    return ua?.unlockedAt;
  };

  const totalPoints = userAchievements.reduce((sum, ua) => sum + ua.achievement.points, 0);
  const unlockedCount = userAchievements.length;
  const totalCount = allAchievements.length;
  const completionPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filterAchievementsByCategory = (category: string) => {
    if (category === 'all') return allAchievements;
    return allAchievements.filter(a => a.category === category);
  };

  const categories = [
    { id: 'all', label: 'All', icon: Star },
    { id: 'streak', label: 'Streaks', icon: Flame },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'workout', label: 'Workouts', icon: Target },
    { id: 'goal', label: 'Goals', icon: Trophy }
  ];

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-[#5F9EA0] mx-auto mb-4 animate-bounce" />
            <p className="text-xl text-gray-600">Loading achievements...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-black">Achievements</h1>
                <p className="text-xl text-gray-700 mt-2">
                  Track your progress and unlock rewards
                </p>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-10 w-10 text-yellow-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {unlockedCount}/{totalCount}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Unlocked</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Star className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {totalPoints}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Total Points</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {completionPercentage}%
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Completion</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Flame className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Active
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Status</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Streak Card */}
        {user && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <StreakCard userId={user.id} />
            </div>
          </section>
        )}

        {/* Achievements Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{cat.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {categories.map(cat => (
                <TabsContent key={cat.id} value={cat.id}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filterAchievementsByCategory(cat.id).map(achievement => (
                      <AchievementBadge
                        key={achievement.id}
                        achievement={achievement}
                        unlocked={isAchievementUnlocked(achievement.id)}
                        unlockedAt={getUnlockedDate(achievement.id)}
                        size="medium"
                      />
                    ))}
                  </div>
                  
                  {filterAchievementsByCategory(cat.id).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No achievements in this category yet</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Motivational Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Keep Going! 🎯
            </h2>
            <p className="text-xl text-white/90 mb-6">
              You're doing amazing! Every workout, every logged entry, every goal brings you closer to greatness.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Card className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300">
                <CardContent className="p-4 text-white">
                  <p className="font-bold">Next Milestone</p>
                  <p className="text-sm">{totalCount - unlockedCount} achievements to go</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <AIAssistant />
    </ProtectedRoute>
  );
}
