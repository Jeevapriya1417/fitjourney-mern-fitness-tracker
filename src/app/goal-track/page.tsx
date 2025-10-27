"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

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

export default function GoalTrackPage() {
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

  // Load goals and tasks from localStorage
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
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitjourney_goal_tasks', JSON.stringify(goalTasks));
  }, [goalTasks]);

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
      color: 'bg-[#5F9EA0]',
      lightColor: 'bg-[#5F9EA0]/10'
    },
    {
      key: 'weeklyWorkoutTarget' as keyof GoalTasks,
      title: 'Weekly Workout Target',
      value: goals.weeklyWorkoutTarget,
      unit: 'workouts/week',
      description: 'Tasks to complete your workout targets',
      color: 'bg-[#5F9EA0]',
      lightColor: 'bg-[#5F9EA0]/10'
    },
    {
      key: 'dailyCalorieGoal' as keyof GoalTasks,
      title: 'Daily Calorie Goal',
      value: goals.dailyCalorieGoal,
      unit: 'calories/day',
      description: 'Tasks to manage your daily calorie intake',
      color: 'bg-[#5F9EA0]',
      lightColor: 'bg-[#5F9EA0]/10'
    }
  ];

  const hasAnyGoals = goals.weightGoal || goals.weeklyWorkoutTarget || goals.dailyCalorieGoal;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="h-12 w-12 text-[#5F9EA0]" />
              <h1 className="text-5xl font-bold text-black">Goal Tracking</h1>
            </div>
            <p className="text-xl text-gray-700">
              Track your progress with actionable tasks for each goal
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {!hasAnyGoals ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-black mb-2">No Goals Set</h2>
                  <p className="text-gray-600 mb-6">
                    Start by setting your fitness goals in the Settings page
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/settings'}
                    className="bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
                  >
                    Go to Settings
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {goalSections.map((section) => {
                  if (!section.value) return null;
                  
                  const tasks = goalTasks[section.key];
                  const completionPercentage = getCompletionPercentage(tasks);
                  const completedCount = tasks.filter(t => t.completed).length;

                  return (
                    <Card key={section.key} className="border-2 border-gray-200">
                      <CardHeader className={`${section.lightColor}`}>
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
                            <div className="text-3xl font-bold text-[#5F9EA0]">
                              {completionPercentage}%
                            </div>
                            <div className="text-sm text-gray-600">
                              {completedCount} of {tasks.length} tasks
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                          <div 
                            className={`${section.color} h-3 rounded-full transition-all duration-300`}
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600 mb-4">{section.description}</p>

                        {/* Add New Task */}
                        <div className="flex gap-2 mb-6">
                          <Input
                            placeholder="Add a new task..."
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
                            className="flex-1"
                          />
                          <Button
                            onClick={() => addTask(section.key)}
                            className="bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>

                        {/* Task List */}
                        <div className="space-y-2">
                          {tasks.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              No tasks yet. Add your first task above!
                            </div>
                          ) : (
                            tasks.map((task) => (
                              <div
                                key={task.id}
                                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                  task.completed
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-white border-gray-200 hover:border-[#5F9EA0]'
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
                                  className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            ))
                          )}
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
