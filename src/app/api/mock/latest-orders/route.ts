import { NextResponse } from 'next/server';

export async function GET() {
  // Get current time
  const now = new Date();
  
  // Mock latest orders data
  const latestOrders = [
    { 
      id: 1, 
      symbol: "BTC/USD", 
      side: "buy", 
      type: "market", 
      amount: 1.23, 
      price: 45678.90, 
      status: "filled", 
      timestamp: new Date(now.getTime() - 5 * 60000).toISOString() 
    },
    { 
      id: 2, 
      symbol: "ETH/USD", 
      side: "sell", 
      type: "limit", 
      amount: 5.67, 
      price: 2345.67, 
      status: "open", 
      timestamp: new Date(now.getTime() - 15 * 60000).toISOString() 
    },
    { 
      id: 3, 
      symbol: "AAPL", 
      side: "buy", 
      type: "limit", 
      amount: 10, 
      price: 175.50, 
      status: "partially_filled", 
      timestamp: new Date(now.getTime() - 25 * 60000).toISOString() 
    },
    { 
      id: 4, 
      symbol: "EUR/USD", 
      side: "sell", 
      type: "market", 
      amount: 10000, 
      price: 1.0789, 
      status: "filled", 
      timestamp: new Date(now.getTime() - 45 * 60000).toISOString() 
    },
    { 
      id: 5, 
      symbol: "BTC/USD", 
      side: "sell", 
      type: "stop", 
      amount: 0.5, 
      price: 42000, 
      status: "open", 
      timestamp: new Date(now.getTime() - 60 * 60000).toISOString() 
    },
  ];

  return NextResponse.json(latestOrders);
} 