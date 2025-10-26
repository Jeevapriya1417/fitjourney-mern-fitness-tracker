"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Apple, Dumbbell, Salad, Fish, Leaf, Beef } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  recommendation: string;
}

export default function PlansPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      let category = '';
      let recommendation = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        recommendation = 'Focus on calorie-dense foods and strength training to build muscle mass.';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        recommendation = 'Maintain your current weight with balanced diet and regular exercise.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        recommendation = 'Focus on portion control, increase cardio, and strength training.';
      } else {
        category = 'Obese';
        recommendation = 'Consult a healthcare provider. Focus on gradual weight loss through diet and exercise.';
      }

      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, recommendation });
    }
  };

  // All available diet plans
  const allDietPlans = [
    {
      icon: <Apple className="h-8 w-8" />,
      title: "Balanced Diet",
      description: "Well-rounded nutrition for overall health",
      details: [
        "40% Carbohydrates - Whole grains, fruits, vegetables",
        "30% Protein - Lean meats, fish, eggs, legumes",
        "30% Healthy Fats - Nuts, avocado, olive oil",
        "5-6 small meals throughout the day",
        "2-3 liters of water daily"
      ],
      categories: ['Normal Weight']
    },
    {
      icon: <Beef className="h-8 w-8" />,
      title: "High Protein",
      description: "Build muscle and increase metabolism",
      details: [
        "45% Protein - Chicken, fish, lean beef, eggs",
        "30% Carbohydrates - Brown rice, quinoa, oats",
        "25% Healthy Fats - Nuts, seeds, fish oil",
        "Focus on post-workout protein intake",
        "1.6-2.2g protein per kg body weight"
      ],
      categories: ['Underweight']
    },
    {
      icon: <Salad className="h-8 w-8" />,
      title: "Low Carb",
      description: "Effective for weight loss and energy",
      details: [
        "50% Healthy Fats - Avocado, nuts, olive oil",
        "40% Protein - Eggs, fish, poultry, tofu",
        "10% Carbohydrates - Leafy greens, vegetables",
        "Focus on complex carbs only",
        "Great for insulin sensitivity"
      ],
      categories: ['Overweight', 'Obese']
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Plant-Based",
      description: "Vegan-friendly nutrition plan",
      details: [
        "45% Carbohydrates - Whole grains, legumes",
        "30% Protein - Tofu, tempeh, beans, lentils",
        "25% Healthy Fats - Nuts, seeds, avocado",
        "Rich in fiber and antioxidants",
        "B12 supplementation recommended"
      ],
      categories: ['Normal Weight', 'Overweight']
    },
    {
      icon: <Fish className="h-8 w-8" />,
      title: "Mediterranean Diet",
      description: "Heart-healthy and sustainable eating",
      details: [
        "40% Carbohydrates - Whole grains, fruits, vegetables",
        "30% Healthy Fats - Olive oil, nuts, fatty fish",
        "30% Protein - Fish, poultry, legumes",
        "Rich in omega-3 fatty acids",
        "Moderate portions with lots of vegetables"
      ],
      categories: ['Overweight', 'Obese']
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Mass Gainer Diet",
      description: "High-calorie diet for weight gain",
      details: [
        "50% Carbohydrates - Rice, pasta, potatoes, oats",
        "30% Protein - Meat, eggs, protein shakes",
        "20% Healthy Fats - Nuts, nut butter, oils",
        "Eat every 2-3 hours throughout the day",
        "Calorie surplus of 300-500 per day"
      ],
      categories: ['Underweight']
    }
  ];

  // Get recommended diet plans based on BMI category
  const getRecommendedDietPlans = () => {
    if (!result) return allDietPlans.slice(0, 4);
    return allDietPlans.filter(plan => plan.categories.includes(result.category));
  };

  // Get workout plan based on BMI category
  const getWorkoutPlan = () => {
    if (!result) return null;

    const workoutPlans: Record<string, any> = {
      'Underweight': {
        title: "Muscle Building Workout Plan",
        description: "Focus on strength training to build muscle mass",
        schedule: [
          { day: "Monday", focus: "Chest & Triceps", exercises: "Bench Press, Push-ups, Tricep Dips, Cable Flyes" },
          { day: "Tuesday", focus: "Back & Biceps", exercises: "Pull-ups, Rows, Deadlifts, Bicep Curls" },
          { day: "Wednesday", focus: "Rest or Light Cardio", exercises: "Walking, Stretching, Yoga" },
          { day: "Thursday", focus: "Legs & Shoulders", exercises: "Squats, Lunges, Shoulder Press, Lateral Raises" },
          { day: "Friday", focus: "Full Body", exercises: "Compound movements, Core work" },
          { day: "Weekend", focus: "Rest & Recovery", exercises: "Active recovery, stretching" }
        ]
      },
      'Normal Weight': {
        title: "Maintenance Workout Plan",
        description: "Balanced routine to maintain fitness and health",
        schedule: [
          { day: "Monday", focus: "Upper Body Strength", exercises: "Push-ups, Pull-ups, Dumbbell Press, Rows" },
          { day: "Tuesday", focus: "Cardio & Core", exercises: "30 min running, Planks, Leg Raises" },
          { day: "Wednesday", focus: "Lower Body", exercises: "Squats, Lunges, Calf Raises, Leg Press" },
          { day: "Thursday", focus: "Active Recovery", exercises: "Yoga, Swimming, Light stretching" },
          { day: "Friday", focus: "Full Body Circuit", exercises: "Mix of cardio and strength exercises" },
          { day: "Weekend", focus: "Flexibility & Rest", exercises: "Stretching, Light walking, Rest" }
        ]
      },
      'Overweight': {
        title: "Fat Loss Workout Plan",
        description: "Cardio-focused routine with strength training",
        schedule: [
          { day: "Monday", focus: "Cardio & Core", exercises: "30 min jogging, Planks, Crunches, Bicycle Kicks" },
          { day: "Tuesday", focus: "Full Body Strength", exercises: "Bodyweight exercises, Resistance bands" },
          { day: "Wednesday", focus: "HIIT Training", exercises: "20 min intervals, Burpees, Jump squats, Mountain Climbers" },
          { day: "Thursday", focus: "Cardio", exercises: "40 min brisk walking or cycling" },
          { day: "Friday", focus: "Strength & Cardio", exercises: "Circuit training, 15 min cardio finisher" },
          { day: "Weekend", focus: "Active Recovery", exercises: "Swimming, Hiking, Yoga" }
        ]
      },
      'Obese': {
        title: "Weight Loss Workout Plan",
        description: "Low-impact cardio with gradual strength building",
        schedule: [
          { day: "Monday", focus: "Low-Impact Cardio", exercises: "30 min walking, Water aerobics, Cycling" },
          { day: "Tuesday", focus: "Light Strength", exercises: "Chair exercises, Wall push-ups, Resistance bands" },
          { day: "Wednesday", focus: "Cardio", exercises: "25 min swimming or stationary bike" },
          { day: "Thursday", focus: "Flexibility & Core", exercises: "Gentle stretching, Seated core exercises" },
          { day: "Friday", focus: "Cardio & Balance", exercises: "30 min walking, Balance exercises" },
          { day: "Weekend", focus: "Active Rest", exercises: "Light walking, Gentle stretching, Rest" }
        ]
      }
    };

    return workoutPlans[result.category] || null;
  };

  const dietPlans = getRecommendedDietPlans();
  const workoutPlan = getWorkoutPlan();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-black mb-4">Your Personalized Plans</h1>
            <p className="text-xl text-gray-700">
              Calculate your BMI and get customized diet and workout recommendations
            </p>
          </div>
        </section>

        {/* BMI Calculator */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#5F9EA0]">
              <CardHeader className="bg-[#5F9EA0] text-white">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-white text-2xl">BMI Calculator</CardTitle>
                    <CardDescription className="text-gray-100">
                      Enter your details to calculate your Body Mass Index
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <Label htmlFor="height" className="text-black">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-black">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-black">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button
                  onClick={calculateBMI}
                  className="w-full bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
                  disabled={!height || !weight || !age}
                >
                  Calculate BMI
                </Button>

                {result && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold text-[#5F9EA0] mb-2">{result.bmi}</div>
                      <div className="text-2xl font-semibold text-black mb-2">{result.category}</div>
                      <p className="text-gray-700">{result.recommendation}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Diet Plans */}
        {result && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-black text-center mb-4">
                Recommended Diet Plans
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Based on your BMI of {result.bmi} ({result.category})
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dietPlans.map((plan, index) => (
                  <Card key={index} className="bg-[#5F9EA0] border-none text-white">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        {plan.icon}
                        <CardTitle className="text-white text-2xl">{plan.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-100">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-white mr-2">•</span>
                            <span className="text-gray-100">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Workout Plans */}
        {workoutPlan && (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-black text-center mb-4">
                {workoutPlan.title}
              </h2>
              <p className="text-center text-gray-600 mb-12">{workoutPlan.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workoutPlan.schedule.map((day, index) => (
                  <Card key={index} className="border-2 border-[#5F9EA0]">
                    <CardHeader>
                      <CardTitle className="text-[#5F9EA0] text-xl">{day.day}</CardTitle>
                      <CardDescription className="text-black font-semibold">
                        {day.focus}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{day.exercises}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {!result && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 text-lg">
              Calculate your BMI above to see personalized diet and workout plans
            </p>
          </section>
        )}
      </div>
      <AIAssistant />
    </>
  );
}