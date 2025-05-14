import { NextResponse } from 'next/server';

export async function GET() {
  // Mock risk exposure data
  const riskExposure = {
    total_exposure: 1234567.89,
    max_exposure: 2000000,
    exposure_ratio: 0.62,
    by_instrument: [
      { symbol: "BTC/USD", exposure: 345678.90 },
      { symbol: "ETH/USD", exposure: 123456.78 },
      { symbol: "AAPL", exposure: 87654.32 },
    ],
    by_market: [
      { name: "Crypto", exposure: 469135.68 },
      { name: "Equities", exposure: 287654.32 },
      { name: "Forex", exposure: 123456.78 },
    ]
  };

  return NextResponse.json(riskExposure);
} 