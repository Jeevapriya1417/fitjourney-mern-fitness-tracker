"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import StreakCard from '@/components/StreakCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Plus, Trash2, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface GoalTasks {
  weightGoal: Task[];
  weeklyWorkoutTarget: Task[];
  dailyCalorieGoal: Task[];
}

interface Goals {
  weightGoal: string;
  weeklyWorkoutTarget: string;
  dailyCalorieGoal: string;
}

interface BMIResult {
  bmi: number;
  category: string;
  recommendation: string;
}

export default function GoalTrackPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goals>({
    weightGoal: '',
    weeklyWorkoutTarget: '',
    dailyCalorieGoal: ''
  });
  
  const [goalTasks, setGoalTasks] = useState<GoalTasks>({
    weightGoal: [],
    weeklyWorkoutTarget: [],
    dailyCalorieGoal: []
  });

  const [newTasks, setNewTasks] = useState({
    weightGoal: '',
    weeklyWorkoutTarget: '',
    dailyCalorieGoal: ''
  });

  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  // Add streak update function for goal completion
  const updateStreakForGoal = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Log activity
      await fetch('/api/activities/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          activityType: 'goal_set',
          activityDate: today,
          metadata: { 
            goals: {
              weight: goals.weightGoal,
              workout: goals.weeklyWorkoutTarget,
              calorie: goals.dailyCalorieGoal
            }
          }
        })
      });
      
      // Check streak
      const streakResponse = await fetch('/api/streaks/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, activityDate: today })
      });
      
      if (streakResponse.ok) {
        const streakData = await streakResponse.json();
        
        // Check for achievements
        await fetch('/api/achievements/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        }).then(res => res.json()).then(data => {
          if (data.unlockedAchievements && data.unlockedAchievements.length > 0) {
            data.unlockedAchievements.forEach((achievement: any) => {
              toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`, {
                description: `+${achievement.points} points`
              });
            });
          }
        });
        
        if (streakData.currentStreak > 1) {
          toast.success(`🔥 ${streakData.currentStreak} day streak!`);
        }
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  // Load goals, tasks, and BMI results from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('fitjourney_goals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    }

    const savedTasks = localStorage.getItem('fitjourney_goal_tasks');
    if (savedTasks) {
      try {
        setGoalTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }

    const savedBMI = localStorage.getItem('fitjourney_bmi_result');
    if (savedBMI) {
      try {
        setBmiResult(JSON.parse(savedBMI));
      } catch (error) {
        console.error('Error loading BMI result:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitjourney_goal_tasks', JSON.stringify(goalTasks));
  }, [goalTasks]);

  const generatePlanTasks = () => {
    if (!bmiResult) return;

    const newGoalTasks: GoalTasks = {
      weightGoal: [],
      weeklyWorkoutTarget: [],
      dailyCalorieGoal: []
    };

    // Generate weight goal tasks based on BMI category
    if (goals.weightGoal) {
      const weightTasks: string[] = [];
      
      if (bmiResult.category === 'Underweight') {
        weightTasks.push(
          'Eat 5-6 small meals throughout the day',
          'Include protein-rich foods in every meal (eggs, meat, fish)',
          'Add healthy calorie-dense snacks (nuts, avocado, protein shakes)',
          'Track daily calorie intake to ensure surplus',
          'Weigh yourself weekly to monitor progress'
        );
      } else if (bmiResult.category === 'Normal Weight') {
        weightTasks.push(
          'Maintain balanced portions at each meal',
          'Include 40% carbs, 30% protein, 30% healthy fats',
          'Drink 2-3 liters of water daily',
          'Monitor weight weekly to maintain target',
          'Adjust portions based on activity level'
        );
      } else if (bmiResult.category === 'Overweight' || bmiResult.category === 'Obese') {
        weightTasks.push(
          'Track daily calorie intake and maintain deficit',
          'Focus on portion control at each meal',
          'Replace processed foods with whole foods',
          'Drink water before meals to reduce appetite',
          'Weigh yourself weekly to track progress',
          'Eat more vegetables and lean proteins'
        );
      }

      newGoalTasks.weightGoal = weightTasks.map((text, i) => ({
        id: `weight_${Date.now()}_${i}`,
        text,
        completed: false,
        createdAt: Date.now()
      }));
    }

    // Generate workout tasks based on BMI category and weekly target
    if (goals.weeklyWorkoutTarget) {
      const workoutTasks: string[] = [];
      const targetWorkouts = parseInt(goals.weeklyWorkoutTarget);

      if (bmiResult.category === 'Underweight') {
        workoutTasks.push(
          'Monday: Chest & Triceps - Bench Press, Push-ups, Tricep Dips',
          'Tuesday: Back & Biceps - Pull-ups, Rows, Deadlifts, Bicep Curls',
          'Thursday: Legs & Shoulders - Squats, Lunges, Shoulder Press',
          'Friday: Full Body - Compound movements and Core work',
          'Rest and recover on alternate days',
          `Complete ${targetWorkouts} strength training sessions this week`
        );
      } else if (bmiResult.category === 'Normal Weight') {
        workoutTasks.push(
          'Monday: Upper Body Strength - Push-ups, Pull-ups, Dumbbell Press',
          'Tuesday: Cardio & Core - 30 min running, Planks, Leg Raises',
          'Wednesday: Lower Body - Squats, Lunges, Calf Raises',
          'Friday: Full Body Circuit - Mix of cardio and strength',
          `Complete ${targetWorkouts} balanced workouts this week`,
          'Include flexibility training on rest days'
        );
      } else if (bmiResult.category === 'Overweight') {
        workoutTasks.push(
          'Monday: Cardio & Core - 30 min jogging, Planks, Crunches',
          'Tuesday: Full Body Strength - Bodyweight exercises',
          'Wednesday: HIIT Training - 20 min intervals, Burpees, Jump squats',
          'Thursday: Cardio - 40 min brisk walking or cycling',
          'Friday: Strength & Cardio Circuit - 15 min cardio finisher',
          `Complete ${targetWorkouts} fat-burning workouts this week`
        );
      } else if (bmiResult.category === 'Obese') {
        workoutTasks.push(
          'Monday: Low-Impact Cardio - 30 min walking or water aerobics',
          'Tuesday: Light Strength - Chair exercises, Wall push-ups',
          'Wednesday: Cardio - 25 min swimming or stationary bike',
          'Thursday: Flexibility & Core - Gentle stretching, Seated core work',
          'Friday: Cardio & Balance - 30 min walking, Balance exercises',
          `Complete ${targetWorkouts} low-impact workouts this week`
        );
      }

      newGoalTasks.weeklyWorkoutTarget = workoutTasks.map((text, i) => ({
        id: `workout_${Date.now()}_${i}`,
        text,
        completed: false,
        createdAt: Date.now()
      }));
    }

    // Generate calorie goal tasks based on BMI category
    if (goals.dailyCalorieGoal) {
      const calorieTasks: string[] = [];
      const targetCalories = parseInt(goals.dailyCalorieGoal);

      if (bmiResult.category === 'Underweight') {
        calorieTasks.push(
          `Reach ${targetCalories} calories daily with nutrient-dense foods`,
          'Include 50% carbs (rice, pasta, oats)',
          'Get 30% protein (meat, eggs, protein shakes)',
          'Add 20% healthy fats (nuts, nut butter, oils)',
          'Eat every 2-3 hours throughout the day',
          'Use a calorie tracking app to monitor intake'
        );
      } else if (bmiResult.category === 'Normal Weight') {
        calorieTasks.push(
          `Maintain ${targetCalories} calories daily`,
          'Balance meals with 40% carbs, 30% protein, 30% fats',
          'Choose whole grains, lean proteins, healthy fats',
          'Eat 5-6 small meals throughout the day',
          'Stay hydrated with 2-3 liters of water',
          'Track calories to maintain energy balance'
        );
      } else if (bmiResult.category === 'Overweight' || bmiResult.category === 'Obese') {
        calorieTasks.push(
          `Stay within ${targetCalories} calorie budget daily`,
          'Focus on high-protein, low-carb meals',
          'Fill half your plate with vegetables',
          'Choose lean proteins (chicken, fish, tofu)',
          'Avoid sugary drinks and processed foods',
          'Use calorie tracking app for accurate monitoring',
          'Prepare meals in advance to avoid temptation'
        );
      }

      newGoalTasks.dailyCalorieGoal = calorieTasks.map((text, i) => ({
        id: `calorie_${Date.now()}_${i}`,
        text,
        completed: false,
        createdAt: Date.now()
      }));
    }

    setGoalTasks(newGoalTasks);
  };

  const addTask = (goalType: keyof GoalTasks) => {
    const taskText = newTasks[goalType].trim();
    if (!taskText) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      createdAt: Date.now()
    };

    setGoalTasks(prev => ({
      ...prev,
      [goalType]: [...prev[goalType], newTask]
    }));

    setNewTasks(prev => ({
      ...prev,
      [goalType]: ''
    }));
  };

  const toggleTask = (goalType: keyof GoalTasks, taskId: string) => {
    setGoalTasks(prev => ({
      ...prev,
      [goalType]: prev[goalType].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
    
    // Update streak when task is completed
    if (user) {
      const task = goalTasks[goalType].find(t => t.id === taskId);
      if (task && !task.completed) {
        updateStreakForGoal();
      }
    }
  };

  const deleteTask = (goalType: keyof GoalTasks, taskId: string) => {
    setGoalTasks(prev => ({
      ...prev,
      [goalType]: prev[goalType].filter(task => task.id !== taskId)
    }));
  };

  const getCompletionPercentage = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const goalSections = [
    {
      key: 'weightGoal' as keyof GoalTasks,
      title: 'Weight Goal',
      value: goals.weightGoal,
      unit: 'kg',
      description: 'Tasks to help you reach your target weight',
      color: 'bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D]',
      lightColor: 'bg-gradient-to-br from-[#5F9EA0]/10 to-[#4A8A8D]/10'
    },
    {
      key: 'weeklyWorkoutTarget' as keyof GoalTasks,
      title: 'Weekly Workout Target',
      value: goals.weeklyWorkoutTarget,
      unit: 'workouts/week',
      description: 'Tasks to complete your workout targets',
      color: 'bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D]',
      lightColor: 'bg-gradient-to-br from-[#5F9EA0]/10 to-[#4A8A8D]/10'
    },
    {
      key: 'dailyCalorieGoal' as keyof GoalTasks,
      title: 'Daily Calorie Goal',
      value: goals.dailyCalorieGoal,
      unit: 'calories/day',
      description: 'Tasks to manage your daily calorie intake',
      color: 'bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D]',
      lightColor: 'bg-gradient-to-br from-[#5F9EA0]/10 to-[#4A8A8D]/10'
    }
  ];

  const hasAnyGoals = goals.weightGoal || goals.weeklyWorkoutTarget || goals.dailyCalorieGoal;
  const hasAnyTasks = goalTasks.weightGoal.length > 0 || goalTasks.weeklyWorkoutTarget.length > 0 || goalTasks.dailyCalorieGoal.length > 0;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#5F9EA0] to-[#4A8A8D]">
                    <Target className="h-8 w-8 text-white transition-all duration-300 hover:scale-110 hover:rotate-12" />
                  </div>
                  <h1 className="text-5xl font-bold text-black">Goal Tracking</h1>
                </div>
                <p className="text-xl text-gray-700">
                  Track your progress with actionable tasks for each goal
                </p>
                {bmiResult && (
                  <p className="text-sm text-gray-600 mt-2">
                    Based on your BMI: <span className="font-semibold">{bmiResult.bmi}</span> ({bmiResult.category})
                  </p>
                )}
              </div>
              {hasAnyGoals && bmiResult && (
                <Button
                  onClick={generatePlanTasks}
                  className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] text-white hover:shadow-lg transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Plan Tasks
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Streak Card Section */}
        {user && hasAnyGoals && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <StreakCard userId={user.id} />
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {!hasAnyGoals ? (
              <Card className="text-center py-12 backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <CardContent>
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-black mb-2">No Goals Set</h2>
                  <p className="text-gray-600 mb-6">
                    Start by setting your fitness goals in the Set Goals page
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/set-goals'}
                    className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] text-white hover:shadow-lg transition-all duration-300"
                  >
                    Go to Set Goals
                  </Button>
                </CardContent>
              </Card>
            ) : !bmiResult ? (
              <Card className="text-center py-12 mb-8 backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <CardContent>
                  <Sparkles className="h-16 w-16 text-[#5F9EA0] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-black mb-2">Calculate Your BMI First</h2>
                  <p className="text-gray-600 mb-6">
                    To get personalized task recommendations, calculate your BMI in the Plans page
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/plans'}
                    className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] text-white hover:shadow-lg transition-all duration-300"
                  >
                    Go to Plans
                  </Button>
                </CardContent>
              </Card>
            ) : !hasAnyTasks ? (
              <Card className="text-center py-12 mb-8 backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <CardContent>
                  <Sparkles className="h-16 w-16 text-[#5F9EA0] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-black mb-2">Generate Your Action Plan</h2>
                  <p className="text-gray-600 mb-6">
                    Click the button below to create personalized tasks based on your BMI ({bmiResult.bmi}) and goals
                  </p>
                  <Button 
                    onClick={generatePlanTasks}
                    className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Plan Tasks
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {hasAnyTasks && (
              <div className="space-y-8">
                {goalSections.map((section) => {
                  if (!section.value) return null;
                  
                  const tasks = goalTasks[section.key];
                  if (tasks.length === 0) return null;
                  
                  const completionPercentage = getCompletionPercentage(tasks);
                  const completedCount = tasks.filter(t => t.completed).length;

                  return (
                    <Card key={section.key} className="backdrop-blur-sm bg-white/90 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#5F9EA0]/30">
                      <CardHeader className={`${section.lightColor} backdrop-blur-sm`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-black text-2xl mb-1">
                              {section.title}
                            </CardTitle>
                            <CardDescription className="text-gray-700 font-medium">
                              Target: {section.value} {section.unit}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] bg-clip-text text-transparent">
                              {completionPercentage}%
                            </div>
                            <div className="text-sm text-gray-600">
                              {completedCount} of {tasks.length} tasks
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
                          <div 
                            className={`${section.color} h-3 rounded-full transition-all duration-500 hover:shadow-lg`}
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600 mb-4">{section.description}</p>

                        {/* Add New Task */}
                        <div className="flex gap-2 mb-6">
                          <Input
                            placeholder="Add a custom task..."
                            value={newTasks[section.key]}
                            onChange={(e) => setNewTasks(prev => ({
                              ...prev,
                              [section.key]: e.target.value
                            }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTask(section.key);
                              }
                            }}
                            className="flex-1 transition-all duration-300 hover:border-[#5F9EA0] focus:ring-2 focus:ring-[#5F9EA0]"
                          />
                          <Button
                            onClick={() => addTask(section.key)}
                            className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] hover:from-[#4A8A8D] hover:to-[#3D7A7D] text-white hover:shadow-lg transition-all duration-300"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>

                        {/* Task List */}
                        <div className="space-y-2">
                          {tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                                task.completed
                                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-md'
                                  : 'backdrop-blur-sm bg-white/80 border-gray-200 hover:border-[#5F9EA0] hover:shadow-md'
                              }`}
                            >
                              <button
                                onClick={() => toggleTask(section.key, task.id)}
                                className="flex-shrink-0 transition-transform hover:scale-110"
                              >
                                {task.completed ? (
                                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                                ) : (
                                  <Circle className="h-6 w-6 text-gray-400" />
                                )}
                              </button>
                              
                              <span
                                className={`flex-1 ${
                                  task.completed
                                    ? 'line-through text-gray-500'
                                    : 'text-black font-medium'
                                }`}
                              >
                                {task.text}
                              </span>

                              <button
                                onClick={() => deleteTask(section.key, task.id)}
                                className="flex-shrink-0 text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
      <AIAssistant />
    </ProtectedRoute>
  );
}