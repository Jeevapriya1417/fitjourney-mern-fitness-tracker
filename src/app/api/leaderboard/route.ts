import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userStreaks } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const limitParam = searchParams.get('limit');
    const typeParam = searchParams.get('type');
    
    // Validate and set limit (default 10, max 50)
    const limit = limitParam 
      ? Math.min(parseInt(limitParam), 50) 
      : 10;
    
    // Validate limit is a valid number
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ 
        error: "Invalid limit parameter",
        code: "INVALID_LIMIT" 
      }, { status: 400 });
    }
    
    // Validate type parameter (default 'current', options: 'current' or 'longest')
    const type = typeParam === 'longest' ? 'longest' : 'current';
    
    // Build query based on type
    let query = db.select().from(userStreaks);
    
    if (type === 'current') {
      query = query.orderBy(desc(userStreaks.currentStreak));
    } else {
      query = query.orderBy(desc(userStreaks.longestStreak));
    }
    
    // Apply limit
    const results = await query.limit(limit);
    
    return NextResponse.json(results, { status: 200 });
    
  } catch (error) {
    console.error('GET leaderboard error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}