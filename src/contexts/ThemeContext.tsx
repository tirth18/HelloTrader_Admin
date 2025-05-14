'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { createAppTheme } from '../theme';

interface ThemeContextProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Try to get the theme mode from localStorage or default to 'light'
  const [mode, setMode] = useState<PaletteMode>('light');

  // Load the saved theme preference from localStorage (only on client-side)
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as PaletteMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // If no preference, check for system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  // Create the theme based on the current mode
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  // Toggle between light and dark modes
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode, toggleColorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 