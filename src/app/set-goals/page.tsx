"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface Goals {
  weightGoal: string;
  weeklyWorkoutTarget: string;
  dailyCalorieGoal: string;
}

export default function SetGoalsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goals>({
    weightGoal: '',
    weeklyWorkoutTarget: '',
    dailyCalorieGoal: ''
  });
  const [goalsSaved, setGoalsSaved] = useState(false);

  useEffect(() => {
    // Load saved goals from localStorage
    const savedGoals = localStorage.getItem('fitjourney_goals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setGoals(parsedGoals);
      } catch (error) {
        console.error('Error parsing saved goals:', error);
      }
    }
  }, []);

  const handleSaveGoals = () => {
    try {
      localStorage.setItem('fitjourney_goals', JSON.stringify(goals));
      setGoalsSaved(true);
      
      // Redirect to goal track after a short delay
      setTimeout(() => {
        router.push('/goal-track');
      }, 1000);
    } catch (error) {
      console.error('Error saving goals:', error);
      alert('Error saving goals. Please try again.');
    }
  };

  // Calculate progress towards goals
  const getCurrentWeight = () => {
    const progressData = localStorage.getItem('fitjourney_progress');
    if (progressData) {
      const entries = JSON.parse(progressData);
      if (entries.length > 0) {
        return entries[entries.length - 1].weight;
      }
    }
    return user?.weight || null;
  };

  const currentWeight = getCurrentWeight();
  const weightGoalNum = goals.weightGoal ? parseFloat(goals.weightGoal) : null;
  const weightDifference = currentWeight && weightGoalNum ? currentWeight - weightGoalNum : null;
  const weightProgress = currentWeight && weightGoalNum ? 
    Math.max(0, Math.min(100, 100 - Math.abs(weightDifference!) / Math.abs(weightGoalNum - (user?.weight || currentWeight)) * 100)) : null;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-200 to-gray-900">
        {/* Header */}
        <section className="bg-gradient-to-br from-white/40 via-gray-100/30 to-gray-300/20 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 border-b border-white/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="h-12 w-12 bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D] p-2 rounded-lg text-white shadow-lg shadow-[#5F9EA0]/50 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl hover:shadow-[#5F9EA0]/70" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Set Your Goals</h1>
            </div>
            <p className="text-xl text-gray-800 font-medium">
              Define your fitness objectives and track your progress
            </p>
          </div>
        </section>

        {/* Goals Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/20 border-2 border-white/30 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_70px_rgba(95,158,160,0.3)] hover:border-white/50 hover:bg-white/30">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D] shadow-lg shadow-[#5F9EA0]/40">
                    <Target className="h-6 w-6 text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl font-bold">Fitness Goals</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Set and track your fitness objectives
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {goalsSaved && (
                  <div className="backdrop-blur-lg bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-900 p-4 rounded-md border-2 border-green-400/50 font-semibold transition-all duration-300 animate-in fade-in slide-in-from-top-2 shadow-lg">
                    ✓ Goals saved successfully! Redirecting to Goal Track...
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {/* Weight Goal Card */}
                  <Card className="backdrop-blur-lg bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-[#5F9EA0]/60 hover:bg-white/40 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Weight Goal</h3>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Target weight in kg"
                        className="mb-2 backdrop-blur-sm bg-white/50 border-white/60 text-gray-900 placeholder:text-gray-600 transition-all duration-300 hover:border-[#5F9EA0] hover:bg-white/70 focus:ring-2 focus:ring-[#5F9EA0] focus:bg-white/80"
                        value={goals.weightGoal}
                        onChange={(e) => setGoals({ ...goals, weightGoal: e.target.value })}
                      />
                      <p className="text-sm text-gray-700 mb-3 font-medium">
                        Set your target weight to track progress
                      </p>
                      {currentWeight && weightGoalNum && (
                        <div className="mt-4 p-3 backdrop-blur-md bg-white/40 rounded-md border border-white/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/50">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-800 font-semibold">Current: {currentWeight} kg</span>
                            <span className="text-gray-800 font-semibold">Target: {weightGoalNum} kg</span>
                          </div>
                          <div className="w-full bg-gray-300/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden border border-white/30">
                            <div 
                              className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] h-2.5 rounded-full transition-all duration-500 shadow-lg shadow-[#5F9EA0]/50" 
                              style={{ width: `${weightProgress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-700 mt-2 font-medium">
                            {weightDifference! > 0 
                              ? `${Math.abs(weightDifference!).toFixed(1)} kg to lose` 
                              : weightDifference! < 0 
                                ? `${Math.abs(weightDifference!).toFixed(1)} kg to gain`
                                : 'Goal achieved! 🎉'}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Weekly Workout Target Card */}
                  <Card className="backdrop-blur-lg bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-[#5F9EA0]/60 hover:bg-white/40 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Weekly Workout Target</h3>
                      <Input
                        type="number"
                        placeholder="Number of workouts per week"
                        className="mb-2 backdrop-blur-sm bg-white/50 border-white/60 text-gray-900 placeholder:text-gray-600 transition-all duration-300 hover:border-[#5F9EA0] hover:bg-white/70 focus:ring-2 focus:ring-[#5F9EA0] focus:bg-white/80"
                        value={goals.weeklyWorkoutTarget}
                        onChange={(e) => setGoals({ ...goals, weeklyWorkoutTarget: e.target.value })}
                      />
                      <p className="text-sm text-gray-700 font-medium">
                        How many times do you want to workout per week?
                      </p>
                      {goals.weeklyWorkoutTarget && (
                        <div className="mt-4 p-3 backdrop-blur-md bg-white/40 rounded-md border border-white/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/50">
                          <p className="text-sm font-bold text-gray-800">
                            Target: {goals.weeklyWorkoutTarget} workouts per week
                          </p>
                          <p className="text-xs text-gray-600 mt-1 font-medium">
                            Track your workouts in the Progress page
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Daily Calorie Goal Card */}
                  <Card className="backdrop-blur-lg bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-[#5F9EA0]/60 hover:bg-white/40 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Daily Calorie Goal</h3>
                      <Input
                        type="number"
                        placeholder="Target calories per day"
                        className="mb-2 backdrop-blur-sm bg-white/50 border-white/60 text-gray-900 placeholder:text-gray-600 transition-all duration-300 hover:border-[#5F9EA0] hover:bg-white/70 focus:ring-2 focus:ring-[#5F9EA0] focus:bg-white/80"
                        value={goals.dailyCalorieGoal}
                        onChange={(e) => setGoals({ ...goals, dailyCalorieGoal: e.target.value })}
                      />
                      <p className="text-sm text-gray-700 font-medium">
                        Set your daily caloric intake target
                      </p>
                      {goals.dailyCalorieGoal && (
                        <div className="mt-4 p-3 backdrop-blur-md bg-white/40 rounded-md border border-white/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/50">
                          <p className="text-sm font-bold text-gray-800">
                            Target: {goals.dailyCalorieGoal} calories per day
                          </p>
                          <p className="text-xs text-gray-600 mt-1 font-medium">
                            Monitor your daily intake to reach your goals
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={handleSaveGoals}
                  className="w-full bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] hover:scale-105 hover:shadow-2xl hover:shadow-[#5F9EA0]/50 text-white font-bold transition-all duration-300 shadow-xl shadow-[#5F9EA0]/30"
                >
                  Save Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <AIAssistant />
    </ProtectedRoute>
  );
}