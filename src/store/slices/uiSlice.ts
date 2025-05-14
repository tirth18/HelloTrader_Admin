import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

interface UIState {
  sidebarOpen: boolean;
  mode: 'light' | 'dark';
  notifications: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    read: boolean;
  }[];
}

// Try to get the theme mode from localStorage or default to 'light'
let initialTheme: PaletteMode = 'light';
if (typeof window !== 'undefined') {
  const savedMode = localStorage.getItem('theme-mode') as PaletteMode | null;
  if (savedMode === 'light' || savedMode === 'dark') {
    initialTheme = savedMode;
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark';
    }
  }
}

const initialState: UIState = {
  sidebarOpen: true,
  mode: initialTheme === 'light' ? 'light' : 'dark',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', action.payload === 'light' ? 'light' : 'dark');
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-mode', state.mode === 'light' ? 'light' : 'dark');
      }
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = uiSlice.actions;
export default uiSlice.reducer; 