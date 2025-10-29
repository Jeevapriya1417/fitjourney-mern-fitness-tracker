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
import { User, Bell } from 'lucide-react';

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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile" className="transition-all duration-300 hover:scale-105">Profile</TabsTrigger>
                <TabsTrigger value="notifications" className="transition-all duration-300 hover:scale-105">Notifications</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#5F9EA0]/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
                        <User className="h-6 w-6 text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
                      </div>
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
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-3 rounded-md border-2 border-green-200 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
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
                          className="mt-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
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
                          className="mt-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
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
                          className="mt-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
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
                          className="mt-2 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      className="w-full bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] hover:scale-105 hover:shadow-xl text-white transition-all duration-300"
                    >
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card className="backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#5F9EA0]/30">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
                        <Bell className="h-6 w-6 text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
                      </div>
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
                      <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                        <div>
                          <h3 className="font-semibold text-black">Workout Reminders</h3>
                          <p className="text-sm text-gray-600">Get reminded to complete your daily workout</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#5F9EA0] peer-checked:to-[#4A8A8D] transition-all duration-300 hover:scale-105"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                        <div>
                          <h3 className="font-semibold text-black">Progress Updates</h3>
                          <p className="text-sm text-gray-600">Weekly summary of your progress</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#5F9EA0] peer-checked:to-[#4A8A8D] transition-all duration-300 hover:scale-105"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                        <div>
                          <h3 className="font-semibold text-black">Meal Planning</h3>
                          <p className="text-sm text-gray-600">Daily meal plan suggestions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#5F9EA0] peer-checked:to-[#4A8A8D] transition-all duration-300 hover:scale-105"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-[#5F9EA0]/50 cursor-pointer">
                        <div>
                          <h3 className="font-semibold text-black">Motivational Quotes</h3>
                          <p className="text-sm text-gray-600">Daily inspiration to keep you going</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#5F9EA0] peer-checked:to-[#4A8A8D] transition-all duration-300 hover:scale-105"></div>
                        </label>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] hover:scale-105 hover:shadow-xl text-white transition-all duration-300">
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