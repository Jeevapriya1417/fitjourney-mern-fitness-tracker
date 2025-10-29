"use client";

import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Target, TrendingUp, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-black mb-6">About FITJOURNEY</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Empowering individuals to achieve their fitness goals through personalized guidance, 
              smart tracking, and AI-powered support.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="Fitness Journey"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-black mb-6 transition-all duration-300 hover:text-[#5F9EA0] hover:translate-x-2">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:translate-x-1">
                  At FITJOURNEY, we believe that everyone deserves access to personalized fitness guidance. 
                  Our mission is to democratize health and wellness by providing intelligent, data-driven 
                  tools that adapt to your unique needs and goals.
                </p>
                <p className="text-lg text-gray-700 transition-all duration-300 hover:text-gray-900 hover:translate-x-1">
                  Whether you're just starting your fitness journey or you're a seasoned athlete, 
                  FITJOURNEY provides the insights, motivation, and support you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-black text-center mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-[#5F9EA0] border-none text-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Target className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:rotate-12" />
                  <CardTitle className="text-white text-xl">Personalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Every body is unique. We provide customized plans tailored to your specific needs and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Users className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:rotate-12" />
                  <CardTitle className="text-white text-xl">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    We believe in the power of support. Join a community of individuals on similar journeys.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:rotate-12" />
                  <CardTitle className="text-white text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    We're committed to providing the highest quality fitness guidance backed by science.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                <CardHeader>
                  <Dumbbell className="h-12 w-12 mb-4 transition-transform duration-300 group-hover:rotate-12" />
                  <CardTitle className="text-white text-xl">Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Fitness is more than physical. We support your overall health and well-being.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-black mb-6 transition-all duration-300 hover:text-[#5F9EA0] hover:translate-x-2">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:translate-x-1">
                  FITJOURNEY was born from a simple observation: traditional fitness programs often 
                  fail because they use a one-size-fits-all approach. We knew there had to be a better way.
                </p>
                <p className="text-lg text-gray-700 mb-4 transition-all duration-300 hover:text-gray-900 hover:translate-x-1">
                  By combining the latest in artificial intelligence with proven fitness science, 
                  we created a platform that truly understands and adapts to each individual user.
                </p>
                <p className="text-lg text-gray-700 transition-all duration-300 hover:text-gray-900 hover:translate-x-1">
                  Today, thousands of users trust FITJOURNEY to guide them on their path to better health. 
                  We're proud to be part of their transformation stories.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
                  alt="Team Fitness"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#5F9EA0]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-5xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-125 group-hover:text-yellow-300">10K+</div>
                <p className="text-xl text-gray-100 transition-all duration-300 group-hover:text-white group-hover:font-semibold">Active Users</p>
              </div>
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-5xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-125 group-hover:text-yellow-300">50K+</div>
                <p className="text-xl text-gray-100 transition-all duration-300 group-hover:text-white group-hover:font-semibold">Workouts Completed</p>
              </div>
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-5xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-125 group-hover:text-yellow-300">95%</div>
                <p className="text-xl text-gray-100 transition-all duration-300 group-hover:text-white group-hover:font-semibold">Success Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}