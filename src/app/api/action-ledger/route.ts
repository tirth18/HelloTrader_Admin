import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get search query and pagination params from URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // Build the query
    const where = search
      ? {
          message: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    // Fetch messages with pagination
    const messages = await prisma.actionLedger.findMany({
      where,
      orderBy: {
        createdAt: "desc",
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
