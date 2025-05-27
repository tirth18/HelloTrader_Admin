'use client';

import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_SCALE = 0.75; // 75% zoom

const createScaledSpacing = (factor = 1) => (value: number) => {
  return `${(value * factor * THEME_SCALE) / 10}rem`;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { mode } = useSelector((state: RootState) => state.ui);
  const [modeState, setModeState] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      mode: modeState,
      toggleColorMode: () => {
        setModeState((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [modeState]
  );

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      palette: {
        mode: modeState,
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#3f51b5',
          light: '#7986cb',
          dark: '#303f9f',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        warning: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          A100: '#f5f5f5',
          A200: '#eeeeee',
          A400: '#bdbdbd',
          A700: '#616161',
        },
        background: {
          default: modeState === 'dark' ? '#0A1929' : '#eef2f6',
          paper: modeState === 'dark' ? '#0A1929' : '#ffffff',
        },
        text: {
          primary: modeState === 'dark' ? '#ffffff' : '#1a2027',
          secondary: modeState === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        },
        divider: modeState === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        action: {
          active: modeState === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.54)',
          hover: modeState === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          selected: modeState === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
          disabled: modeState === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
          disabledBackground: modeState === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        },
      },
      shape: {
        borderRadius: 8,
      },
      shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.08),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
        '0px 3px 1px -2px rgba(0,0,0,0.08),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
        '0px 3px 3px -2px rgba(0,0,0,0.08),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
        '0px 2px 4px -1px rgba(0,0,0,0.08),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
        '0px 3px 5px -1px rgba(0,0,0,0.08),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
        '0px 3px 5px -1px rgba(0,0,0,0.08),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
        '0px 4px 5px -2px rgba(0,0,0,0.08),0px 7px 10px 1px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
        '0px 5px 5px -3px rgba(0,0,0,0.08),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
        '0px 5px 6px -3px rgba(0,0,0,0.08),0px 9px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.06)',
        '0px 6px 6px -3px rgba(0,0,0,0.08),0px 10px 14px 1px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
        '0px 6px 7px -4px rgba(0,0,0,0.08),0px 11px 15px 1px rgba(0,0,0,0.07),0px 4px 20px 3px rgba(0,0,0,0.06)',
        '0px 7px 8px -4px rgba(0,0,0,0.08),0px 12px 17px 2px rgba(0,0,0,0.07),0px 5px 22px 4px rgba(0,0,0,0.06)',
        '0px 7px 8px -4px rgba(0,0,0,0.08),0px 13px 19px 2px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
        '0px 7px 9px -4px rgba(0,0,0,0.08),0px 14px 21px 2px rgba(0,0,0,0.07),0px 5px 26px 4px rgba(0,0,0,0.06)',
        '0px 8px 9px -5px rgba(0,0,0,0.08),0px 15px 22px 2px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
        '0px 8px 10px -5px rgba(0,0,0,0.08),0px 16px 24px 2px rgba(0,0,0,0.07),0px 6px 30px 5px rgba(0,0,0,0.06)',
        '0px 8px 11px -5px rgba(0,0,0,0.08),0px 17px 26px 2px rgba(0,0,0,0.07),0px 6px 32px 5px rgba(0,0,0,0.06)',
        '0px 9px 11px -5px rgba(0,0,0,0.08),0px 18px 28px 2px rgba(0,0,0,0.07),0px 7px 34px 6px rgba(0,0,0,0.06)',
        '0px 9px 12px -6px rgba(0,0,0,0.08),0px 19px 29px 2px rgba(0,0,0,0.07),0px 7px 36px 6px rgba(0,0,0,0.06)',
        '0px 10px 13px -6px rgba(0,0,0,0.08),0px 20px 31px 3px rgba(0,0,0,0.07),0px 8px 38px 7px rgba(0,0,0,0.06)',
        '0px 10px 13px -6px rgba(0,0,0,0.08),0px 21px 33px 3px rgba(0,0,0,0.07),0px 8px 40px 7px rgba(0,0,0,0.06)',
        '0px 10px 14px -6px rgba(0,0,0,0.08),0px 22px 35px 3px rgba(0,0,0,0.07),0px 8px 42px 7px rgba(0,0,0,0.06)',
        '0px 11px 14px -7px rgba(0,0,0,0.08),0px 23px 36px 3px rgba(0,0,0,0.07),0px 9px 44px 8px rgba(0,0,0,0.06)',
        '0px 11px 15px -7px rgba(0,0,0,0.08),0px 24px 38px 3px rgba(0,0,0,0.07),0px 9px 46px 8px rgba(0,0,0,0.06)',
      ],
      spacing: createScaledSpacing(),
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14 * THEME_SCALE,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: { 
          fontSize: 40 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h2: { 
          fontSize: 32 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.3,
        },
        h3: { 
          fontSize: 28 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h4: { 
          fontSize: 24 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.4,
        },
        h5: { 
          fontSize: 20 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.5,
        },
        h6: { 
          fontSize: 16 * THEME_SCALE,
          fontWeight: 600,
          lineHeight: 1.5,
        },
        subtitle1: { 
          fontSize: 16 * THEME_SCALE,
          fontWeight: 500,
          lineHeight: 1.5,
        },
        subtitle2: { 
          fontSize: 14 * THEME_SCALE,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        body1: { 
          fontSize: 16 * THEME_SCALE,
          lineHeight: 1.5,
        },
        body2: { 
          fontSize: 14 * THEME_SCALE,
          lineHeight: 1.57,
        },
        button: { 
          fontSize: 14 * THEME_SCALE,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        caption: { 
          fontSize: 12 * THEME_SCALE,
          lineHeight: 1.66,
        },
        overline: { 
          fontSize: 12 * THEME_SCALE,
          fontWeight: 500,
          lineHeight: 1.66,
          textTransform: 'uppercase',
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            html: {
              fontSize: `${THEME_SCALE * 100}%`,
            },
            body: {
              backgroundColor: modeState === 'dark' ? '#0A1929' : '#eef2f6',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              ...(modeState === 'light' && {
                backgroundColor: '#ffffff',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                '&.MuiCard-root': {
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
                },
              }),
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              border: `1px solid ${modeState === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'}`,
              ...(modeState === 'light' && {
                backgroundColor: '#ffffff',
              }),
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 500,
            },
            filled: {
              ...(modeState === 'light' && {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              }),
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 8,
            },
            contained: {
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              },
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              fontSize: 14 * THEME_SCALE,
              padding: `${8 * THEME_SCALE}px ${16 * THEME_SCALE}px`,
              borderBottom: '1px solid',
              borderColor: modeState === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
            },
            head: {
              fontWeight: 600,
              backgroundColor: modeState === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.02)',
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:last-child td': {
                borderBottom: 0,
              },
              '&:hover': {
                backgroundColor: modeState === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.02)',
              },
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              backgroundColor: modeState === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              ...(modeState === 'light' && {
                boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.02)',
              }),
            },
          },
        },
      },
    });

    return responsiveFontSizes(baseTheme);
  }, [modeState]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 