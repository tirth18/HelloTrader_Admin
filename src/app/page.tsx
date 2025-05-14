'use client';

import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Home() {
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    // Redirect based on authentication status
    if (token) {
      window.location.href = '/dashboard/overview';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
} 