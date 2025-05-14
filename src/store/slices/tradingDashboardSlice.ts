import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  id: number;
  symbol: string;
  position_type: string;
  quantity: number;
  entry_price: number;
  current_price: number;
  profit_loss: number;
  margin_used: number;
  segment: string;
}

interface Metrics {
  total_profit_loss: number;
  active_trades: number;
  active_users: number;
  active_buy_orders: number;
  active_sell_orders: number;
  total_brokerage: number;
  timestamp: string;
}

interface Turnover {
  segment: string;
  buy_turnover: number;
  sell_turnover: number;
  total_turnover: number;
}

interface TradingDashboardState {
  positions: Position[];
  metrics: Metrics | null;
  turnover: Turnover[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: TradingDashboardState = {
  positions: [],
  metrics: null,
  turnover: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const tradingDashboardSlice = createSlice({
  name: 'tradingDashboard',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (
      state,
      action: PayloadAction<{
        positions: Position[];
        metrics: Metrics;
        turnover: Turnover[];
      }>
    ) => {
      state.positions = action.payload.positions;
      state.metrics = action.payload.metrics;
      state.turnover = action.payload.turnover;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchError } = tradingDashboardSlice.actions;

export default tradingDashboardSlice.reducer; 