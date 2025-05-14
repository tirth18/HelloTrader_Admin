import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface TradeMetrics {
  quantity: number;
  price: number;
  fee: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    const trades = await prisma.trade.findMany({
      where: {
        created_at: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      select: {
        quantity: true,
        price: true,
        fee: true,
      },
    });

    const totalTrades = trades.length;
    const totalVolume = trades.reduce(
      (sum: number, trade: TradeMetrics) => sum + trade.quantity * trade.price,
      0
    );
    const totalFees = trades.reduce(
      (sum: number, trade: TradeMetrics) => sum + trade.fee,
      0
    );
    const avgTradeSize = totalTrades > 0 ? totalVolume / totalTrades : 0;

    return NextResponse.json({
      totalTrades,
      totalVolume,
      totalFees,
      avgTradeSize,
    });
  } catch (error) {
    console.error('Error fetching trade metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trade metrics' },
      { status: 500 }
    );
  }
} 