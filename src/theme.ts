import { createTheme, Theme, alpha } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Create theme with light/dark mode support
export const createAppTheme = (mode: PaletteMode): Theme => {
  const isLight = mode === 'light';

  // Common colors across both themes
  const primaryMain = '#2563eb';
  const secondaryMain = '#0891b2';
  const successMain = '#16a34a';
  const errorMain = '#dc2626';
  const warningMain = '#ea580c';
  const infoMain = '#0284c7';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: isLight ? alpha(primaryMain, 0.8) : alpha(primaryMain, 0.6),
        dark: isLight ? '#1e40af' : '#3b82f6',
        contrastText: '#ffffff'
      },
      secondary: {
        main: secondaryMain,
        light: isLight ? alpha(secondaryMain, 0.8) : alpha(secondaryMain, 0.6),
        dark: isLight ? '#0369a1' : '#22d3ee',
        contrastText: '#ffffff'
      },
      success: {
        main: successMain,
        light: isLight ? alpha(successMain, 0.8) : alpha(successMain, 0.6),
        dark: isLight ? '#15803d' : '#4ade80',
        contrastText: '#ffffff'
      },
      error: {
        main: errorMain,
        light: isLight ? alpha(errorMain, 0.8) : alpha(errorMain, 0.6),
        dark: isLight ? '#b91c1c' : '#f87171',
        contrastText: '#ffffff'
      },
      warning: {
        main: warningMain,
        light: isLight ? alpha(warningMain, 0.8) : alpha(warningMain, 0.6),
        dark: isLight ? '#c2410c' : '#fb923c',
        contrastText: '#ffffff'
      },
      info: {
        main: infoMain,
        light: isLight ? alpha(infoMain, 0.8) : alpha(infoMain, 0.6),
        dark: isLight ? '#075985' : '#38bdf8',
        contrastText: '#ffffff'
      },
      background: {
        default: isLight ? '#f8fafc' : '#0f172a',
        paper: isLight ? '#ffffff' : '#1e293b'
      },
      text: {
        primary: isLight ? '#1e293b' : '#f1f5f9',
        secondary: isLight ? '#64748b' : '#94a3b8',
        disabled: isLight ? '#94a3b8' : '#64748b'
      },
      divider: isLight ? 'rgba(100, 116, 139, 0.12)' : 'rgba(148, 163, 184, 0.12)',
      action: {
        active: isLight ? '#64748b' : '#94a3b8',
        hover: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
        selected: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(59, 130, 246, 0.16)',
        disabled: isLight ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.26)',
        disabledBackground: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: isLight ? '#CBD5E1 transparent' : '#475569 transparent',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isLight ? '#CBD5E1' : '#475569',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: isLight ? '#94A3B8' : '#64748B',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            boxShadow: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            '&:hover': {
              boxShadow: isLight ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : '0px 2px 4px rgba(0, 0, 0, 0.3)',
            },
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${primaryMain}, ${isLight ? '#1e40af' : '#3b82f6'})`,
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${secondaryMain}, ${isLight ? '#0369a1' : '#22d3ee'})`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isLight 
              ? '0px 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0px 2px 8px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              boxShadow: isLight 
                ? '0px 4px 12px rgba(0, 0, 0, 0.08)' 
                : '0px 4px 12px rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
          elevation1: {
            boxShadow: isLight 
              ? '0px 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0px 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 280,
            borderRight: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
            boxShadow: isLight 
              ? '0px 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0px 2px 8px rgba(0, 0, 0, 0.15)',
            background: isLight 
              ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' 
              : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
            backdropFilter: 'blur(8px)',
            background: isLight 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(15, 23, 42, 0.8)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            margin: '4px 0',
            padding: '10px 16px',
            '&.Mui-selected': {
              backgroundColor: isLight 
                ? alpha(primaryMain, 0.08)
                : alpha(primaryMain, 0.16),
              '&:hover': {
                backgroundColor: isLight 
                  ? alpha(primaryMain, 0.12)
                  : alpha(primaryMain, 0.24),
              },
              '& .MuiListItemIcon-root': {
                color: primaryMain,
              },
              '& .MuiListItemText-primary': {
                color: isLight ? '#1e293b' : '#f1f5f9',
                fontWeight: 600,
              },
            },
            '&:hover': {
              backgroundColor: isLight 
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.04)',
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: 'separate',
            borderSpacing: '0 4px',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '16px',
            borderBottom: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
          },
          head: {
            fontWeight: 600,
            color: isLight ? '#1e293b' : '#f1f5f9',
            background: isLight ? '#f8fafc' : '#1e293b',
          },
          body: {
            background: isLight ? '#ffffff' : '#0f172a',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: 8,
          },
          switchBase: {
            padding: 1,
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: primaryMain,
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            border: 'none',
            opacity: 1,
            backgroundColor: isLight ? '#e9e9ea' : '#39393D',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            height: 8,
            backgroundColor: isLight 
              ? alpha(primaryMain, 0.08)
              : alpha(primaryMain, 0.16),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            backgroundColor: isLight
              ? 'rgba(15, 23, 42, 0.9)'
              : 'rgba(241, 245, 249, 0.9)',
            color: isLight ? '#f1f5f9' : '#0f172a',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            padding: '8px 12px',
            fontSize: '0.75rem',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '24px',
            paddingRight: '24px',
            '@media (min-width: 600px)': {
              paddingLeft: '32px',
              paddingRight: '32px',
            },
          },
        },
      },
    },
  });
};

// Export a default light theme
const theme = createAppTheme('light');
export default theme; 