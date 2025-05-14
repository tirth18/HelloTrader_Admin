import { Store } from '@reduxjs/toolkit';
import { RootState } from './slices';

export interface AppStore extends Store<RootState> {}

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
  timestamp: string;
}

export interface RootState {
  auth: AuthState;
  ui: UIState;
}

declare const store: AppStore;
export default store; 