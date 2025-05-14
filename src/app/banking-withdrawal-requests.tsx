'use client';

import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function BankingWithdrawalRequestsPage() {
  useEffect(() => {
    window.location.href = '/banking/withdrawal-requests';
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="h6">Redirecting to withdrawal requests...</Typography>
    </Box>
  );
} 