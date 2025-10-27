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

    // Build fitness-focused system instruction
    const systemInstruction = `You are a professional fitness and nutrition AI assistant for FITJOURNEY. Provide expert advice on fitness, workouts, nutrition, diet planning, weight management, and healthy lifestyle habits. Keep responses concise and encouraging.`;

    // Build conversation history in Gemini format
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nUser question: ${message}` }]
      }
    ];

    // Use correct model name: gemini-2.5-flash with higher token limit for thinking
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000, // Increased to account for thinking tokens
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', response.status, JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: `Gemini API error: ${response.status}`, details: data },
        { status: response.status }
      );
    }
    
    // Extract the response text - handle case where thinking consumed all tokens
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to help with your fitness journey! Ask me anything about workouts, nutrition, or healthy habits.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}