import { Theme } from '@mui/material/styles';

export const createAnimations = (theme: Theme) => ({
  // Page transitions
  pageTransition: {
    enter: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    enterActive: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    exit: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    exitActive: {
      opacity: 0,
      transform: 'translateY(20px)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.easeIn,
      }),
    },
  },

  // Card hover animations
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeOut,
    }),
  },

  // Button hover animations
  buttonHover: {
    transform: 'scale(1.02)',
    transition: theme.transitions.create(['transform', 'background-color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut,
    }),
  },

  // Loading animations
  loadingPulse: {
    animation: 'pulse 1.5s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': {
        opacity: 0.6,
      },
      '50%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0.6,
      },
    },
  },

  // Error animations
  errorShake: {
    animation: 'shake 0.5s ease-in-out',
    '@keyframes shake': {
      '0%, 100%': {
        transform: 'translateX(0)',
      },
      '25%': {
        transform: 'translateX(-5px)',
      },
      '75%': {
        transform: 'translateX(5px)',
      },
    },
  },

  // Success animations
  successBounce: {
    animation: 'bounce 0.5s ease-in-out',
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
  },
}); 