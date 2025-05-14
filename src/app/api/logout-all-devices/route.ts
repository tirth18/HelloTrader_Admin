import { NextResponse } from 'next/server';

// In a real application, this would call your backend API to invalidate all sessions
export async function POST() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Logged out from all devices'
    });
  } catch (error) {
    console.error('Error logging out from all devices:', error);
    return NextResponse.json(
      { error: 'Failed to logout from all devices' },
      { status: 500 }
    );
  }
} 