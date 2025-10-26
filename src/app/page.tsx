"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, Brain, Calculator, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6">
              Transform Your Body,<br />
              <span className="text-[#5F9EA0]">Transform Your Life</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Your complete fitness companion with personalized workout plans, nutrition guidance, 
              progress tracking, and AI-powered assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white px-8 py-6 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/plans">
                <Button size="lg" variant="outline" className="border-[#5F9EA0] text-[#5F9EA0] hover:bg-[#5F9EA0] hover:text-white px-8 py-6 text-lg">
                  Explore Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">Everything You Need to Succeed</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive fitness tracking tools designed to help you reach your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Calculator className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">BMI Calculator</CardTitle>
                  <CardDescription className="text-gray-100">
                    Get personalized insights based on your body metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Calculate your BMI and receive customized diet and workout plans tailored to your body type and fitness goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Target className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">Workout Plans</CardTitle>
                  <CardDescription className="text-gray-100">
                    Personalized routines for every fitness level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Access specialized workout plans designed for weight loss, muscle gain, or general fitness improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Activity className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">Diet Plans</CardTitle>
                  <CardDescription className="text-gray-100">
                    Nutrition guidance for optimal results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Choose from multiple diet plans including balanced, high protein, low carb, and plant-based options.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">Progress Tracking</CardTitle>
                  <CardDescription className="text-gray-100">
                    Visualize your fitness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Track your daily metrics, view progress charts, and stay motivated with visual representations of your improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Brain className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">AI Assistant</CardTitle>
                  <CardDescription className="text-gray-100">
                    24/7 fitness guidance at your fingertips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Get instant answers to your fitness, nutrition, and workout questions from our intelligent AI assistant.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="bg-[#5F9EA0] border-none text-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Settings className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-2xl">Profile Management</CardTitle>
                  <CardDescription className="text-gray-100">
                    Customize your fitness experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Update your profile, track your goals, and manage your preferences all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Why Choose FITJOURNEY?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  FITJOURNEY is more than just a fitness app—it's your personal health companion. 
                  We combine cutting-edge technology with proven fitness principles to help you 
                  achieve sustainable results.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Personalized plans based on your unique body metrics and goals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Science-backed workout and nutrition recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">AI-powered assistance available anytime, anywhere</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#5F9EA0] flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Easy-to-use progress tracking with visual charts</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                  alt="Fitness Training"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#5F9EA0]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join thousands of users who are transforming their lives with FITJOURNEY
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#5F9EA0] hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <AIAssistant />
    </>
  );
}