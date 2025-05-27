import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { generateToken, verifyCredentials } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    // Check authentication - using a simpler approach since authOptions is not available
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get search query and pagination params from URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // Build the query
    const where: Prisma.ActionLedgerWhereInput = search
      ? {
          message: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    // Fetch messages with pagination
    const messages = await prisma.actionLedger.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
      skip: page * pageSize,
      take: pageSize,
    });

    // Get total count
    const total = await prisma.actionLedger.count({ where });

    return NextResponse.json({
      messages,
      total,
    });
  } catch (error) {
    console.error("Error in action-ledger API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
