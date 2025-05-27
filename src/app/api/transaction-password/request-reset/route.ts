import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

// Define validation schema
const requestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors[0].message }, { status: 400 });
    }
    
    const { email } = validationResult.data;
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });
    
    if (!user) {
      // Don't leak information about whether the email exists
      return NextResponse.json({ message: 'If your email is registered, you will receive a reset code.' });
    }
    
    // Generate OTP (6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    
    // Store OTP and reset token in database (expires in 15 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);
    
    await prisma.passwordReset.upsert({
      where: { userId: user.id },
      update: {
        otp,
        resetToken,
        expiresAt,
        isUsed: false,
      },
      create: {
        userId: user.id,
        otp,
        resetToken,
        expiresAt,
        isUsed: false,
        type: 'TRANSACTION_PASSWORD',
      },
    });
    
    // Send email with OTP
    await sendEmail({
      to: user.email,
      subject: 'Reset your Hello Trader transaction password',
      text: `Your verification code is: ${otp}. This code will expire in 15 minutes.`,
      html: `
        <div>
          <h2>Reset Your Transaction Password</h2>
          <p>You requested to reset your transaction password.</p>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
        </div>
      `,
    });
    
    // Return success response with userId for next steps
    return NextResponse.json({ 
      message: 'If your email is registered, you will receive a reset code.',
      userId: user.id,
    });
    
  } catch (error) {
    console.error('Error requesting transaction password reset:', error);
    return NextResponse.json({ error: 'Failed to process reset request' }, { status: 500 });
  }
} 