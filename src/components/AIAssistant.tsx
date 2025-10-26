"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI fitness assistant. I can help you with fitness questions, nutrition advice, workout recommendations, and more. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with fitness-related knowledge
    setTimeout(() => {
      const response = generateFitnessResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateFitnessResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('diet') || lowerQuery.includes('nutrition') || lowerQuery.includes('eat')) {
      return "For a balanced diet, focus on:\n• Lean proteins (chicken, fish, tofu)\n• Complex carbs (brown rice, oats, quinoa)\n• Healthy fats (avocado, nuts, olive oil)\n• Plenty of vegetables and fruits\n• Stay hydrated with 8-10 glasses of water daily\n\nWould you like specific meal suggestions?";
    }
    
    if (lowerQuery.includes('workout') || lowerQuery.includes('exercise') || lowerQuery.includes('training')) {
      return "A well-rounded workout routine should include:\n• Strength training (3-4x per week)\n• Cardio (150 min moderate or 75 min intense weekly)\n• Flexibility work (yoga, stretching)\n• Rest days for recovery\n\nWhat's your fitness goal? Weight loss, muscle gain, or general fitness?";
    }
    
    if (lowerQuery.includes('weight loss') || lowerQuery.includes('lose weight')) {
      return "For healthy weight loss:\n• Create a caloric deficit (300-500 calories below maintenance)\n• Combine cardio and strength training\n• Focus on whole foods\n• Get 7-9 hours of sleep\n• Stay consistent!\n\nAim for 0.5-1 kg per week for sustainable results.";
    }
    
    if (lowerQuery.includes('muscle') || lowerQuery.includes('gain')) {
      return "To build muscle:\n• Progressive overload in training\n• Eat in a slight caloric surplus\n• Consume 1.6-2.2g protein per kg body weight\n• Focus on compound exercises (squats, deadlifts, bench press)\n• Get adequate rest (7-9 hours sleep)\n\nPatience and consistency are key!";
    }
    
    if (lowerQuery.includes('bmi') || lowerQuery.includes('calculator')) {
      return "You can use our BMI Calculator in the Plans section! It will calculate your Body Mass Index and provide personalized diet and workout recommendations based on your results. Just navigate to the Plans page to get started.";
    }

    if (lowerQuery.includes('progress') || lowerQuery.includes('track')) {
      return "Tracking your progress is crucial! Visit the Progress Tracker page to:\n• Log daily weight and measurements\n• View your fitness journey over time\n• Set and track goals\n• Visualize your improvements with charts\n\nConsistent tracking keeps you motivated!";
    }
    
    return "I'm here to help with fitness, nutrition, and workout advice! You can ask me about:\n• Diet and meal planning\n• Workout routines\n• Weight loss strategies\n• Muscle building tips\n• Using our BMI calculator\n• Progress tracking\n\nWhat would you like to know?";
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#5F9EA0] hover:bg-[#4A8A8D] shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-2xl z-50 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-[#5F9EA0] text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">AI Fitness Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-[#4A8A8D]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-[#5F9EA0] text-white'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything about fitness..."
                className="flex-1 min-h-[40px] max-h-[100px] resize-none"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#5F9EA0] hover:bg-[#4A8A8D]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
