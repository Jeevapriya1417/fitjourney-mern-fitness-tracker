import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ 
      error: 'API key not found',
      hasKey: false
    });
  }

  // Test the Gemini API with a simple request
  try {
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
                  text: "Say hello in one word",
                },
              ],
            },
          ],
        }),
      }
    );

    const responseText = await response.text();
    
    return NextResponse.json({
      hasKey: true,
      keyPrefix: apiKey.substring(0, 10) + '...',
      geminiStatus: response.status,
      geminiResponse: responseText
    });
  } catch (error) {
    return NextResponse.json({
      hasKey: true,
      keyPrefix: apiKey.substring(0, 10) + '...',
      error: String(error)
    });
  }
}
