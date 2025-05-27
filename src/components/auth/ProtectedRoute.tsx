'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography, Button } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, error } = useAuth();
  const router = useRouter();
  const [localAuth, setLocalAuth] = useState<boolean | null>(null);
  const [checkingLocalAuth, setCheckingLocalAuth] = useState(true);

  // First, check localStorage directly
  useEffect(() => {
    const checkLocalToken = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log('Direct token check in ProtectedRoute:', token ? 'Token exists' : 'No token');
        
        if (token) {
          // If token exists in localStorage, consider authenticated
          setLocalAuth(true);
          setCheckingLocalAuth(false);
        } else {
          setLocalAuth(false);
          setCheckingLocalAuth(false);
          // Use router.push instead of window.location to prevent full page reload
          console.log('No token found, redirecting to login page');
          router.push('/login');
        }
      }
    };
    
    checkLocalToken();
  }, [router]);

  // Then use the context-based check as backup
  useEffect(() => {
    // Only check auth context if local check is complete and fails
    if (!checkingLocalAuth && localAuth === false && !isLoading && !isAuthenticated) {
      console.log('Auth context check after local check failed');
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, checkingLocalAuth, localAuth, router]);

  const handleRetryLogin = () => {
    router.push('/login');
  };

  // Show loading state
  if (checkingLocalAuth || isLoading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h5" sx={{ mt: 4 }}>
          Loading...
        </Typography>
        {error && (
          <>
            <Typography color="error" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRetryLogin}
            >
              Return to Login
            </Button>
          </>
        )}
      </Box>
    );
  }

  // Only render children if authenticated through either method
  return (localAuth || isAuthenticated) ? <>{children}</> : null;
} 