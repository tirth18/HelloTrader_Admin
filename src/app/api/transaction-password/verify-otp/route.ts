import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Define validation schema
const verifySchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const validationResult = verifySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors[0].message }, { status: 400 });
    }
    
    const { userId, otp } = validationResult.data;
    
    // Find password reset record
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        userId,
        otp,
        expiresAt: { gt: new Date() }, // Not expired
        isUsed: false,
        type: 'TRANSACTION_PASSWORD',
      },
    });
    
    if (!resetRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }
    
    // Return reset token for final step
    return NextResponse.json({ 
      message: 'OTP verified successfully',
      resetToken: resetRecord.resetToken,
    });
    
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
} 