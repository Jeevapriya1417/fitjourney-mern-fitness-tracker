"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Check, Lock } from 'lucide-react';

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

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function AchievementBadge({ 
  achievement, 
  unlocked, 
  unlockedAt,
  size = 'medium' 
}: AchievementBadgeProps) {
  
  const sizeClasses = {
    small: 'w-24',
    medium: 'w-32',
    large: 'w-40'
  };

  const iconSizes = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl'
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'streak':
        return 'from-orange-400 to-red-500';
      case 'progress':
        return 'from-blue-400 to-indigo-500';
      case 'workout':
        return 'from-green-400 to-emerald-500';
      case 'goal':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Card 
      className={`${sizeClasses[size]} ${
        unlocked 
          ? 'bg-gradient-to-br from-white to-gray-50 border-2 border-[#5F9EA0] hover:shadow-xl hover:scale-105' 
          : 'bg-gray-100 border-2 border-gray-300 opacity-60'
      } transition-all duration-300 cursor-pointer group relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform -skew-y-12"></div>
      </div>

      <CardContent className="p-4 flex flex-col items-center text-center relative z-10">
        {/* Icon Container */}
        <div className={`relative mb-2 ${unlocked ? 'animate-bounce-slow' : ''}`}>
          <div className={`
            ${iconSizes[size]} 
            ${unlocked ? 'filter-none' : 'grayscale'}
            transition-all duration-300 group-hover:scale-110
          `}>
            {achievement.icon}
          </div>
          
          {/* Status Badge */}
          <div className={`
            absolute -top-1 -right-1 rounded-full p-1 
            ${unlocked ? 'bg-green-500' : 'bg-gray-400'}
            shadow-lg
          `}>
            {unlocked ? (
              <Check className="h-3 w-3 text-white" />
            ) : (
              <Lock className="h-3 w-3 text-white" />
            )}
          </div>
        </div>

        {/* Achievement Name */}
        <h3 className={`
          text-sm font-bold mb-1 
          ${unlocked ? 'text-gray-900' : 'text-gray-500'}
        `}>
          {achievement.name}
        </h3>

        {/* Achievement Description */}
        <p className={`
          text-xs mb-2 
          ${unlocked ? 'text-gray-600' : 'text-gray-400'}
        `}>
          {achievement.description}
        </p>

        {/* Points Badge */}
        <div className={`
          px-3 py-1 rounded-full text-xs font-bold
          ${unlocked 
            ? `bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white` 
            : 'bg-gray-300 text-gray-600'
          }
        `}>
          {achievement.points} pts
        </div>

        {/* Unlocked Date */}
        {unlocked && unlockedAt && (
          <p className="text-xs text-gray-500 mt-2">
            {new Date(unlockedAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        )}
      </CardContent>

      {/* Shimmer Effect for Unlocked */}
      {unlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
      )}
    </Card>
  );
}
