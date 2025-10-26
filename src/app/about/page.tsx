"use client";

import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Award, Heart } from 'lucide-react';

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
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="Fitness Journey"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  At FITJOURNEY, we believe that everyone deserves access to personalized fitness guidance. 
                  Our mission is to democratize health and wellness by providing intelligent, data-driven 
                  tools that adapt to your unique needs and goals.
                </p>
                <p className="text-lg text-gray-700">
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
              <Card className="bg-[#5F9EA0] border-none text-white">
                <CardHeader>
                  <Target className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-xl">Personalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    Every body is unique. We provide customized plans tailored to your specific needs and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white">
                <CardHeader>
                  <Users className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-xl">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    We believe in the power of support. Join a community of individuals on similar journeys.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white">
                <CardHeader>
                  <Award className="h-12 w-12 mb-4" />
                  <CardTitle className="text-white text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100">
                    We're committed to providing the highest quality fitness guidance backed by science.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#5F9EA0] border-none text-white">
                <CardHeader>
                  <Heart className="h-12 w-12 mb-4" />
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
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4">
                  FITJOURNEY was born from a simple observation: traditional fitness programs often 
                  fail because they use a one-size-fits-all approach. We knew there had to be a better way.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  By combining the latest in artificial intelligence with proven fitness science, 
                  we created a platform that truly understands and adapts to each individual user.
                </p>
                <p className="text-lg text-gray-700">
                  Today, thousands of users trust FITJOURNEY to guide them on their path to better health. 
                  We're proud to be part of their transformation stories.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
                  alt="Team Fitness"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#5F9EA0]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-white mb-2">10K+</div>
                <p className="text-xl text-gray-100">Active Users</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">50K+</div>
                <p className="text-xl text-gray-100">Workouts Completed</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2">95%</div>
                <p className="text-xl text-gray-100">Success Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AIAssistant />
    </>
  );
}
