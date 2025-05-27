import { NextResponse } from 'next/server';

export async function GET() {
  // Mock trading metrics data
  const tradingMetrics = {
    total_trading_volume: 2345678.90,
    active_users: 325,
    open_positions: 157,
    daily_trades: 1230,
    profit_loss: 65432.10,
    top_traded_instruments: [
      { symbol: "BTC/USD", volume: 345678.90 },
      { symbol: "ETH/USD", volume: 123456.78 },
      { symbol: "AAPL", volume: 87654.32 },
    ],
    chart_data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Trading Volume (USD)',
          data: [1200000, 1900000, 1700000, 2100000, 2500000, 2300000, 2800000],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  };

  return NextResponse.json(tradingMetrics);
} 