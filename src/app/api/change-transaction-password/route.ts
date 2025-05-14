import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash, compare } from "bcrypt";
import * as authUtils from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Define validation schema for the request body
const passwordChangeSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Get authorization header to verify user is authenticated
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const userData = authUtils.verifyToken(token);

    if (!userData || !userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body and validate
    const body = await req.json();
    const validationResult = passwordChangeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { oldPassword, newPassword } = validationResult.data;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: { transactionPassword: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify old password
    if (!user.transactionPassword) {
      return NextResponse.json(
        {
          error: "Transaction password not set. Please use reset flow instead",
        },
        { status: 400 }
      );
    }

    const isOldPasswordValid = await compare(
      oldPassword,
      user.transactionPassword
    );

    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: "Current transaction password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update user's transaction password
    await prisma.user.update({
      where: { id: userData.id },
      data: {
        transactionPassword: hashedPassword,
        transactionPasswordUpdatedAt: new Date(),
      },
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error changing transaction password:", error);
    return NextResponse.json(
      { error: "Failed to change transaction password" },
      { status: 500 }
    );
  }
}
