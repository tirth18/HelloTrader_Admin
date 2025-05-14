import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import tradingDashboardReducer from './slices/tradingDashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    tradingDashboard: tradingDashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 