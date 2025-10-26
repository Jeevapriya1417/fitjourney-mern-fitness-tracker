"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Target, Bell } from 'lucide-react';

interface Goals {
  weightGoal: string;
  weeklyWorkoutTarget: string;
  dailyCalorieGoal: string;
}

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age?.toString() || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || ''
  });
  const [saved, setSaved] = useState(false);
  const [goals, setGoals] = useState<Goals>({
    weightGoal: '',
    weeklyWorkoutTarget: '',
    dailyCalorieGoal: ''
  });
  const [goalsSaved, setGoalsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        age: user.age?.toString() || '',
        height: user.height?.toString() || '',
        weight: user.weight?.toString() || ''
      });
    }
  }, [user]);

  useEffect(() => {
    // Load saved goals from localStorage
    const savedGoals = localStorage.getItem('fitjourney_goals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        console.log('Loaded goals from localStorage:', parsedGoals);
        setGoals(parsedGoals);
      } catch (error) {
        console.error('Error parsing saved goals:', error);
      }
    }
  }, []);

  const handleSave = () => {
    updateProfile({
      name: profile.name,
      age: profile.age ? parseInt(profile.age) : undefined,
      height: profile.height ? parseFloat(profile.height) : undefined,
      weight: profile.weight ? parseFloat(profile.weight) : undefined
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveGoals = () => {
    try {
      console.log('Saving goals:', goals);
      localStorage.setItem('fitjourney_goals', JSON.stringify(goals));
      console.log('Goals saved successfully to localStorage');
      
      // Verify the save
      const savedData = localStorage.getItem('fitjourney_goals');
      console.log('Verified saved data:', savedData);
      
      setGoalsSaved(true);
      setTimeout(() => setGoalsSaved(false), 3000);
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
            <h1 className="text-5xl font-bold text-black mb-4">Settings</h1>
            <p className="text-xl text-gray-700">
              Manage your profile and preferences
            </p>
          </div>
        </section>

        {/* Settings Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <User className="h-6 w-6 text-[#5F9EA0]" />
                      <div>
                        <CardTitle className="text-black text-2xl">Profile Information</CardTitle>
                        <CardDescription className="text-gray-600">
                          Update your personal details
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {saved && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md">
                        Profile updated successfully!
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-black">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-black">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="mt-2 bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="age" className="text-black">Age (years)</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="25"
                          value={profile.age}
                          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-black">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="170"
                          value={profile.height}
                          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight" className="text-black">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          placeholder="70"
                          value={profile.weight}
                          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      className="w-full bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
                    >
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-[#5F9EA0]" />
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
                      <div className="bg-green-50 text-green-700 p-4 rounded-md border-2 border-green-200 font-semibold">
                        ✓ Goals saved successfully!
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                      <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-black mb-2">Weight Goal</h3>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Target weight in kg"
                            className="mb-2"
                            value={goals.weightGoal}
                            onChange={(e) => setGoals({ ...goals, weightGoal: e.target.value })}
                          />
                          <p className="text-sm text-gray-600 mb-3">
                            Set your target weight to track progress
                          </p>
                          {currentWeight && weightGoalNum && (
                            <div className="mt-4 p-3 bg-white rounded-md">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-700">Current: {currentWeight} kg</span>
                                <span className="text-gray-700">Target: {weightGoalNum} kg</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-[#5F9EA0] h-2.5 rounded-full transition-all duration-300" 
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

                      <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-black mb-2">Weekly Workout Target</h3>
                          <Input
                            type="number"
                            placeholder="Number of workouts per week"
                            className="mb-2"
                            value={goals.weeklyWorkoutTarget}
                            onChange={(e) => setGoals({ ...goals, weeklyWorkoutTarget: e.target.value })}
                          />
                          <p className="text-sm text-gray-600">
                            How many times do you want to workout per week?
                          </p>
                          {goals.weeklyWorkoutTarget && (
                            <div className="mt-4 p-3 bg-white rounded-md">
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

                      <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-black mb-2">Daily Calorie Goal</h3>
                          <Input
                            type="number"
                            placeholder="Target calories per day"
                            className="mb-2"
                            value={goals.dailyCalorieGoal}
                            onChange={(e) => setGoals({ ...goals, dailyCalorieGoal: e.target.value })}
                          />
                          <p className="text-sm text-gray-600">
                            Set your daily caloric intake target
                          </p>
                          {goals.dailyCalorieGoal && (
                            <div className="mt-4 p-3 bg-white rounded-md">
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
                      className="w-full bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white font-semibold"
                    >
                      Save Goals
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Bell className="h-6 w-6 text-[#5F9EA0]" />
                      <div>
                        <CardTitle className="text-black text-2xl">Notification Preferences</CardTitle>
                        <CardDescription className="text-gray-600">
                          Manage how you receive updates
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">Workout Reminders</h3>
                          <p className="text-sm text-gray-600">Get reminded to complete your daily workout</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5F9EA0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">Progress Updates</h3>
                          <p className="text-sm text-gray-600">Weekly summary of your progress</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5F9EA0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">Meal Planning</h3>
                          <p className="text-sm text-gray-600">Daily meal plan suggestions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5F9EA0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-black">Motivational Quotes</h3>
                          <p className="text-sm text-gray-600">Daily inspiration to keep you going</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5F9EA0]"></div>
                        </label>
                      </div>
                    </div>

                    <Button className="w-full bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      <AIAssistant />
    </ProtectedRoute>
  );
}