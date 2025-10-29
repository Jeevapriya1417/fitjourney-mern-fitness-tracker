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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="h-12 w-12 bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D] p-2 rounded-lg text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
              <h1 className="text-5xl font-bold text-black">Set Your Goals</h1>
            </div>
            <p className="text-xl text-gray-700">
              Define your fitness objectives and track your progress
            </p>
          </div>
        </section>

        {/* Goals Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#5F9EA0]/30">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
                    <Target className="h-6 w-6 text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
                  </div>
                  <div>
                    <CardTitle className="text-black text-2xl">Fitness Goals</CardTitle>
                    <CardDescription className="text-gray-600">
                      Set and track your fitness objectives
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {goalsSaved && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-4 rounded-md border-2 border-green-200 font-semibold transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                    ✓ Goals saved successfully! Redirecting to Goal Track...
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {/* Weight Goal Card */}
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-black mb-2">Weight Goal</h3>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Target weight in kg"
                        className="mb-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
                        value={goals.weightGoal}
                        onChange={(e) => setGoals({ ...goals, weightGoal: e.target.value })}
                      />
                      <p className="text-sm text-gray-600 mb-3">
                        Set your target weight to track progress
                      </p>
                      {currentWeight && weightGoalNum && (
                        <div className="mt-4 p-3 backdrop-blur-sm bg-white/80 rounded-md border border-gray-200 transition-all duration-300 hover:shadow-md">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">Current: {currentWeight} kg</span>
                            <span className="text-gray-700">Target: {weightGoalNum} kg</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] h-2.5 rounded-full transition-all duration-500 hover:shadow-lg" 
                              style={{ width: `${weightProgress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
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
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-black mb-2">Weekly Workout Target</h3>
                      <Input
                        type="number"
                        placeholder="Number of workouts per week"
                        className="mb-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
                        value={goals.weeklyWorkoutTarget}
                        onChange={(e) => setGoals({ ...goals, weeklyWorkoutTarget: e.target.value })}
                      />
                      <p className="text-sm text-gray-600">
                        How many times do you want to workout per week?
                      </p>
                      {goals.weeklyWorkoutTarget && (
                        <div className="mt-4 p-3 backdrop-blur-sm bg-white/80 rounded-md border border-gray-200 transition-all duration-300 hover:shadow-md">
                          <p className="text-sm font-medium text-gray-700">
                            Target: {goals.weeklyWorkoutTarget} workouts per week
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Track your workouts in the Progress page
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Daily Calorie Goal Card */}
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-black mb-2">Daily Calorie Goal</h3>
                      <Input
                        type="number"
                        placeholder="Target calories per day"
                        className="mb-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
                        value={goals.dailyCalorieGoal}
                        onChange={(e) => setGoals({ ...goals, dailyCalorieGoal: e.target.value })}
                      />
                      <p className="text-sm text-gray-600">
                        Set your daily caloric intake target
                      </p>
                      {goals.dailyCalorieGoal && (
                        <div className="mt-4 p-3 backdrop-blur-sm bg-white/80 rounded-md border border-gray-200 transition-all duration-300 hover:shadow-md">
                          <p className="text-sm font-medium text-gray-700">
                            Target: {goals.dailyCalorieGoal} calories per day
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Monitor your daily intake to reach your goals
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={handleSaveGoals}
                  className="w-full bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] hover:scale-105 hover:shadow-xl text-white font-semibold transition-all duration-300"
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
