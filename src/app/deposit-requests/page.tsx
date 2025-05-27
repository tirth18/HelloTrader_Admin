'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function DepositRequestsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct path
    router.replace('/banking/deposit-requests');
  }, [router]);

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
      <Typography variant="h6">Redirecting to deposit requests...</Typography>
    </Box>
  );
} 