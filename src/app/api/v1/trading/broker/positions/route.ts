import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real implementation, this would call the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/trading/broker/positions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch positions');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
} 