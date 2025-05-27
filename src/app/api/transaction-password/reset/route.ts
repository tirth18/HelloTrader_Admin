import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

// Define validation schema
const resetSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  resetToken: z.string().min(32, 'Invalid reset token'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const validationResult = resetSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.errors[0].message }, { status: 400 });
    }
    
    const { userId, resetToken, newPassword } = validationResult.data;
    
    // Find password reset record
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        userId,
        resetToken,
        expiresAt: { gt: new Date() }, // Not expired
        isUsed: false,
        type: 'TRANSACTION_PASSWORD',
      },
    });
    
    if (!resetRecord) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }
    
    // Hash new password
    const hashedPassword = await hash(newPassword, 10);
    
    // Update user's transaction password
    await prisma.user.update({
      where: { id: userId },
      data: {
        transactionPassword: hashedPassword,
        transactionPasswordUpdatedAt: new Date(),
      },
    });
    
    // Mark reset record as used
    await prisma.passwordReset.update({
      where: { id: resetRecord.id },
      data: { isUsed: true },
    });
    
    // Return success response
    return NextResponse.json({ message: 'Transaction password reset successfully' });
    
  } catch (error) {
    console.error('Error resetting transaction password:', error);
    return NextResponse.json({ error: 'Failed to reset transaction password' }, { status: 500 });
  }
} 