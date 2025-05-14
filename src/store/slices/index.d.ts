import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UIState } from '../index';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessPayload {
  user: AuthState['user'];
  token: string;
}

export interface AddNotificationPayload {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read?: boolean;
}

export interface ToggleSidebarPayload {
  open: boolean;
}

export interface SetThemePayload {
  theme: 'light' | 'dark';
}

export interface RootState {
  auth: AuthState;
  ui: UIState;
}

export interface AuthSlice {
  name: 'auth';
  initialState: AuthState;
  reducers: {
    loginStart: (state: AuthState) => void;
    loginSuccess: (state: AuthState, action: PayloadAction<LoginSuccessPayload>) => void;
    loginFailure: (state: AuthState, action: PayloadAction<string>) => void;
    logout: (state: AuthState) => void;
  };
}

export interface UISlice {
  name: 'ui';
  initialState: UIState;
  reducers: {
    toggleSidebar: (state: UIState, action: PayloadAction<ToggleSidebarPayload>) => void;
    setTheme: (state: UIState, action: PayloadAction<SetThemePayload>) => void;
    addNotification: (state: UIState, action: PayloadAction<AddNotificationPayload>) => void;
    markNotificationAsRead: (state: UIState, action: PayloadAction<string>) => void;
  };
} 