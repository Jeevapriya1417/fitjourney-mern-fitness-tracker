"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, Brain, Calculator, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 text-gray-900">
              Transform Your Body,
              <br />
              Transform Your Life
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Your complete fitness companion with personalized workout plans, nutrition guidance, 
              progress tracking, and AI-powered assistance.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-[#5F9EA0] hover:bg-[#4A7C7E] text-white px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button size="lg" variant="outline" className="border-2 border-[#5F9EA0] text-[#5F9EA0] hover:bg-[#5F9EA0] hover:text-white px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Explore Plans
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive fitness tracking tools designed to help you reach your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <Calculator className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">BMI Calculator</CardTitle>
                  <CardDescription className="text-white/90">
                    Get personalized insights based on your body metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Calculate your BMI and receive customized diet and workout plans tailored to your body type and fitness goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <Target className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Workout Plans</CardTitle>
                  <CardDescription className="text-white/90">
                    Personalized routines for every fitness level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Access specialized workout plans designed for weight loss, muscle gain, or general fitness improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <Activity className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Diet Plans</CardTitle>
                  <CardDescription className="text-white/90">
                    Nutrition guidance for optimal results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Choose from multiple diet plans including balanced, high protein, low carb, and plant-based options.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <TrendingUp className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Progress Tracking</CardTitle>
                  <CardDescription className="text-white/90">
                    Visualize your fitness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Track your daily metrics, view progress charts, and stay motivated with visual representations of your improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <Brain className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">AI Assistant</CardTitle>
                  <CardDescription className="text-white/90">
                    24/7 fitness guidance at your fingertips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Get instant answers to your fitness, nutrition, and workout questions from our intelligent AI assistant.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="bg-[#5F9EA0] border-[#5F9EA0] text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer">
                <CardHeader>
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30">
                    <Settings className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Profile Management</CardTitle>
                  <CardDescription className="text-white/90">
                    Customize your fitness experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Update your profile, track your goals, and manage your preferences all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-extrabold mb-6 text-gray-900">
                  Why Choose FITJOURNEY?
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  FITJOURNEY is more than just a fitness app—it's your personal health companion. 
                  We combine cutting-edge technology with proven fitness principles to help you 
                  achieve sustainable results.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">
                      Personalized plans based on your unique body metrics and goals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">
                      Science-backed workout and nutrition recommendations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">
                      AI-powered assistance available anytime, anywhere
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">
                      Easy-to-use progress tracking with visual charts
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                  alt="Fitness Training"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Only show when not authenticated */}
        {!isAuthenticated && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#5F9EA0]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-extrabold text-white mb-6">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users who are transforming their lives with FITJOURNEY
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#5F9EA0] hover:bg-gray-100 px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}