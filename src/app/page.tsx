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
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/40">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-white -z-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Transform Your Body,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Transform Your Life
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Your complete fitness companion with personalized workout plans, nutrition guidance, 
              progress tracking, and AI-powered assistance.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-7 text-lg font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-600/70 hover:scale-110 transition-all duration-300 ease-out border-0">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent px-10 py-7 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 ease-out backdrop-blur-sm bg-white/80">
                    Explore Plans
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Comprehensive fitness tracking tools designed to help you reach your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-blue-600/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">BMI Calculator</CardTitle>
                  <CardDescription className="text-purple-100 font-medium">
                    Get personalized insights based on your body metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-purple-50">
                    Calculate your BMI and receive customized diet and workout plans tailored to your body type and fitness goals.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-purple-600/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Target className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Workout Plans</CardTitle>
                  <CardDescription className="text-blue-100 font-medium">
                    Personalized routines for every fitness level
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-blue-50">
                    Access specialized workout plans designed for weight loss, muscle gain, or general fitness improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-600/90 via-blue-500/90 to-purple-500/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Activity className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Diet Plans</CardTitle>
                  <CardDescription className="text-purple-100 font-medium">
                    Nutrition guidance for optimal results
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-purple-50">
                    Choose from multiple diet plans including balanced, high protein, low carb, and plant-based options.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-600/90 via-purple-500/90 to-blue-500/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Progress Tracking</CardTitle>
                  <CardDescription className="text-blue-100 font-medium">
                    Visualize your fitness journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-blue-50">
                    Track your daily metrics, view progress charts, and stay motivated with visual representations of your improvement.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/90 via-blue-600/90 to-purple-600/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Brain className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">AI Assistant</CardTitle>
                  <CardDescription className="text-purple-100 font-medium">
                    24/7 fitness guidance at your fingertips
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-purple-50">
                    Get instant answers to your fitness, nutrition, and workout questions from our intelligent AI assistant.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-blue-500/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-3 cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Settings className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold">Profile Management</CardTitle>
                  <CardDescription className="text-blue-100 font-medium">
                    Customize your fitness experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-blue-50">
                    Update your profile, track your goals, and manage your preferences all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/20 to-purple-100/30 -z-10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Why Choose FITJOURNEY?
                </h2>
                <p className="text-lg text-gray-700 mb-6 font-medium leading-relaxed">
                  FITJOURNEY is more than just a fitness app—it's your personal health companion. 
                  We combine cutting-edge technology with proven fitness principles to help you 
                  achieve sustainable results.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group cursor-pointer">
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-1 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold transition-all duration-300">
                      Personalized plans based on your unique body metrics and goals
                    </span>
                  </li>
                  <li className="flex items-start group cursor-pointer">
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-3 mt-1 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold transition-all duration-300">
                      Science-backed workout and nutrition recommendations
                    </span>
                  </li>
                  <li className="flex items-start group cursor-pointer">
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-3 mt-1 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold transition-all duration-300">
                      AI-powered assistance available anytime, anywhere
                    </span>
                  </li>
                  <li className="flex items-start group cursor-pointer">
                    <div className="flex-shrink-0 h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-3 mt-1 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent group-hover:font-bold transition-all duration-300">
                      Easy-to-use progress tracking with visual charts
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                  alt="Fitness Training"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Only show when not authenticated */}
        {!isAuthenticated && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 -z-10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl font-extrabold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-purple-100 mb-8 font-medium animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Join thousands of users who are transforming their lives with FITJOURNEY
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-110 hover:shadow-2xl hover:shadow-white/30 px-10 py-7 text-lg font-bold transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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