import { createTheme, alpha, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Augment the Theme interface
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      card: string;
      dropdown: string;
      dialog: string;
      button: string;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      card?: string;
      dropdown?: string;
      dialog?: string;
      button?: string;
    };
  }
}

// Custom breakpoints for better responsive design
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  up: (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => `@media (min-width: ${breakpoints.values[key]}px)`,
};

// Spacing configuration (8px grid system)
const spacing = 8;

// Custom shadows for light and dark modes
const createCustomShadows = (mode: PaletteMode) => ({
  card: mode === 'light'
    ? '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 16px -8px rgba(0, 0, 0, 0.08)'
    : '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 16px -8px rgba(0, 0, 0, 0.3)',
  dropdown: mode === 'light'
    ? '0px 4px 16px rgba(0, 0, 0, 0.08)'
    : '0px 4px 16px rgba(0, 0, 0, 0.3)',
  dialog: mode === 'light'
    ? '0px 8px 32px rgba(0, 0, 0, 0.08)'
    : '0px 8px 32px rgba(0, 0, 0, 0.3)',
  button: mode === 'light'
    ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
    : '0px 2px 4px rgba(0, 0, 0, 0.2)',
});

// Typography configuration
const typography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  h1: {
    fontWeight: 800,
    fontSize: '2.5rem', // 40px
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem', // 32px
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.5rem', // 24px
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    lineHeight: 1.5,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    letterSpacing: '-0.01em',
  },
  body1: {
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  body2: {
    fontSize: '0.875rem', // 14px
    lineHeight: 1.6,
    letterSpacing: '0',
  },
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },
  button: {
    fontWeight: 600,
    fontSize: '0.875rem', // 14px
    textTransform: 'none' as const,
    letterSpacing: '0',
  },
  monospace: {
    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '0.875rem',
    letterSpacing: '-0.025em',
  },
} as const;

// Create the base theme
const createBaseTheme = (mode: PaletteMode) => {
  const isLight = mode === 'light';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0891b2',
        light: '#06b6d4',
        dark: '#0369a1',
        contrastText: '#ffffff',
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        contrastText: '#ffffff',
      },
      info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        contrastText: '#ffffff',
      },
      background: {
        default: isLight ? '#f8fafc' : '#0f172a',
        paper: isLight ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: isLight ? '#1e293b' : '#f1f5f9',
        secondary: isLight ? '#64748b' : '#94a3b8',
        disabled: isLight ? '#94a3b8' : '#64748b',
      },
      divider: isLight 
        ? 'rgba(100, 116, 139, 0.12)'
        : 'rgba(148, 163, 184, 0.12)',
      action: {
        active: isLight ? '#64748b' : '#94a3b8',
        hover: isLight 
          ? 'rgba(100, 116, 139, 0.04)'
          : 'rgba(148, 163, 184, 0.04)',
        selected: isLight 
          ? 'rgba(100, 116, 139, 0.08)'
          : 'rgba(148, 163, 184, 0.08)',
        disabled: isLight 
          ? 'rgba(100, 116, 139, 0.26)'
          : 'rgba(148, 163, 184, 0.26)',
        disabledBackground: isLight 
          ? 'rgba(100, 116, 139, 0.12)'
          : 'rgba(148, 163, 184, 0.12)',
      },
    },
    breakpoints,
    spacing,
    shape: {
      borderRadius: 8,
    },
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
          'input[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
          img: {
            maxWidth: '100%',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            padding: 0, // Remove default padding
            backgroundImage: 'none',
            boxShadow: isLight
              ? '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 16px -8px rgba(0, 0, 0, 0.08)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 16px -8px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: 'h5',
          },
          subheaderTypographyProps: {
            variant: 'body2',
            color: 'text.secondary',
          },
        },
        styleOverrides: {
          root: {
            padding: spacing * 3,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: spacing * 3,
            '&:last-child': {
              paddingBottom: spacing * 3,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 600,
            padding: '12px 24px',
            minHeight: 48,
          },
          sizeSmall: {
            padding: '8px 16px',
            minHeight: 36,
          },
          sizeLarge: {
            padding: '16px 32px',
            minHeight: 56,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: isLight 
              ? alpha('#2563eb', 0.08)
              : alpha('#3b82f6', 0.08),
            '.MuiTableCell-root': {
              color: isLight ? '#1e293b' : '#f1f5f9',
              fontWeight: 600,
              lineHeight: 1.25,
              padding: spacing * 2,
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '.MuiTableCell-root': {
              borderBottom: `1px solid ${
                isLight 
                  ? 'rgba(100, 116, 139, 0.16)'
                  : 'rgba(148, 163, 184, 0.16)'
              }`,
              padding: spacing * 2,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '16px',
            fontSize: '0.875rem',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: isLight 
                ? alpha('#2563eb', 0.04)
                : alpha('#3b82f6', 0.04),
            },
            '&:hover': {
              backgroundColor: isLight 
                ? alpha('#2563eb', 0.08)
                : alpha('#3b82f6', 0.08),
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isLight ? '#ffffff' : '#1e293b',
            borderRight: `1px solid ${
              isLight 
                ? 'rgba(100, 116, 139, 0.16)'
                : 'rgba(148, 163, 184, 0.16)'
            }`,
            width: 280,
            [`@media (min-width: ${breakpoints.values.lg}px)`]: {
              width: 320,
            },
            '& .MuiList-root': {
              padding: '8px 0',
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: '2px 8px',
            padding: '8px 16px',
            minHeight: 48,
            position: 'relative',
            gap: '16px',
            '&.Mui-selected': {
              backgroundColor: isLight 
                ? alpha('#2563eb', 0.12)
                : alpha('#3b82f6', 0.12),
              '&:hover': {
                backgroundColor: isLight 
                  ? alpha('#2563eb', 0.16)
                  : alpha('#3b82f6', 0.16),
              },
            },
            '& .MuiListItemIcon-root': {
              minWidth: 'auto',
              marginRight: 2,
            },
            '& .MuiListItemText-root': {
              margin: 0,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 32,
            color: isLight ? '#64748b' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 1,
              color: isLight ? '#94a3b8' : '#64748b',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
    customShadows: createCustomShadows(mode),
  });
};

export const getTheme = (mode: PaletteMode) => createBaseTheme(mode); 