import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Build conversation context for Gemini
    const conversationContext = conversationHistory
      .map((msg: { role: string; content: string }) => {
        return `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
      })
      .join('\n\n');

    const systemPrompt = `You are a professional fitness and nutrition AI assistant for FITJOURNEY, a fitness tracking application. Your role is to provide expert advice on:
- Fitness workouts and exercise routines
- Nutrition and diet planning
- Weight loss and muscle gain strategies
- BMI and body composition guidance
- Healthy lifestyle habits
- Motivation and goal setting

Keep responses concise, practical, and focused on fitness/health topics. Be encouraging and supportive. If asked about topics outside fitness/health, politely redirect to fitness-related topics.

Previous conversation:
${conversationContext}

User's new message: ${message}

Provide a helpful, concise response (2-4 sentences max unless detailed explanation is needed):`;

    // Call Gemini API with v1 instead of v1beta
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to help with your fitness journey! Ask me anything about workouts, nutrition, or healthy habits.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}