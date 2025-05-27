'use client';

import { useState, useEffect } from 'react';

export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
}

export interface Metrics {
  totalPnL: number;
  totalTurnover: number;
  activeUsers: number;
  totalTrades: number;
  totalBrokerage: number;
}

export interface TurnoverData {
  [key: string]: number;
}

export interface TradingData {
  positions: Position[];
  metrics: Metrics;
  turnover: TurnoverData;
}

const useMockTradingData = () => {
  const [data, setData] = useState<TradingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For now, return mock data directly instead of fetching
      // In a real app, you'd fetch from an API endpoint
      const mockData: TradingData = {
        positions: [
          {
            symbol: 'RELIANCE',
            quantity: 100,
            avgPrice: 2450,
            currentPrice: 2510,
            pnl: 6000
          },
          {
            symbol: 'HDFCBANK',
            quantity: 200,
            avgPrice: 1620,
            currentPrice: 1595,
            pnl: -5000
          },
          {
            symbol: 'TCS',
            quantity: 50,
            avgPrice: 3200,
            currentPrice: 3350,
            pnl: 7500
          },
          {
            symbol: 'INFY',
            quantity: 150,
            avgPrice: 1450,
            currentPrice: 1480,
            pnl: 4500
          }
        ],
        metrics: {
          totalPnL: 350000,
          totalTurnover: 24500000,
          activeUsers: 342,
          totalTrades: 1256,
          totalBrokerage: 125000
        },
        turnover: {
          'Equity': 12500000,
          'Futures': 8000000,
          'Options': 3500000,
          'Currency': 500000
        }
      };
      
      setData(mockData);
    } catch (err: any) {
      console.error('Error with trading data:', err);
      setError(err.message || 'Failed to load trading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Poll for new data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, error };
};

export default useMockTradingData; 