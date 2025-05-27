import React from 'react';
import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  fullScreen = false,
  size = 40,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(4px)',
          zIndex: theme.zIndex.modal + 1,
        }),
        ...(!fullScreen && {
          minHeight: '200px',
        }),
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress
          size={size}
          sx={{
            color: theme.palette.primary.main,
            animation: 'rotate 2s linear infinite',
            '@keyframes rotate': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
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
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading; 