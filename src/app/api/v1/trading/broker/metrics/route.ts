import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real implementation, this would call the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/trading/broker/metrics`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
} 