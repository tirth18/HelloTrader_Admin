'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function BankDetailsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to /banking
    router.replace('/banking');
  }, [router]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <CircularProgress />
    </Box>
  );
} 