import { NextResponse } from 'next/server';

// Mock data generator
function generateMockData() {
  // Helper function to generate random number in range
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  
  // Helper function to choose random element from array
  const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  
  // Generate broker positions
  const positions = Array.from({ length: 10 }, (_, i) => {
    const symbol = randomChoice(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NFLX', 'NVDA']);
    const position_type = randomChoice(['long', 'short']);
    const quantity = randomInRange(10, 100);
    const entry_price = randomInRange(100, 500);
    const current_price = entry_price * (1 + randomInRange(-0.05, 0.05));
    const profit_loss = (current_price - entry_price) * quantity * (position_type === 'long' ? 1 : -1);
    const margin_used = entry_price * quantity * 0.2;
    const segment = randomChoice(['equity', 'commodity', 'forex', 'comex']);
    
    return {
      id: i + 1,
      symbol,
      position_type,
      quantity,
      entry_price,
      current_price,
      profit_loss,
      margin_used,
      segment
    };
  });
  
  // Generate metrics
  const metrics = {
    total_profit_loss: randomInRange(-50000, 100000),
    active_trades: Math.floor(randomInRange(50, 200)),
    active_users: Math.floor(randomInRange(100, 500)),
    active_buy_orders: Math.floor(randomInRange(30, 100)),
    active_sell_orders: Math.floor(randomInRange(30, 100)),
    total_brokerage: randomInRange(1000, 5000),
    timestamp: new Date().toISOString()
  };
  
  // Generate segment turnover
  const segments = ['equity', 'commodity', 'forex', 'comex'];
  const turnover = segments.map(segment => {
    const buy_turnover = randomInRange(100000, 1000000);
    const sell_turnover = randomInRange(100000, 1000000);
    const total_turnover = buy_turnover + sell_turnover;
    
    return {
      segment,
      buy_turnover,
      sell_turnover,
      total_turnover
    };
  });
  
  return {
    positions,
    metrics,
    turnover
  };
}

export async function GET() {
  try {
    const mockData = generateMockData();
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error generating mock data:', error);
    return NextResponse.json(
      { message: 'Failed to generate mock data' },
      { status: 500 }
    );
  }
} 