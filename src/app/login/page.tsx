'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username or phone number is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const { login, error: authError } = useAuth();
  
  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Already authenticated, redirecting to dashboard');
      router.push('/dashboard/overview');
    }
  }, [router]);
  
  // Update local error state when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the auth context login function
      const success = await login(username, password);
      
      if (success) {
        setLoginSuccess(true);
        
        // Verify token was stored
        const token = localStorage.getItem('token');
        console.log('Login successful, token stored:', token ? 'Yes' : 'No');
        
        // Use setTimeout to ensure localStorage is updated before redirect
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          console.log('Token before redirect:', localStorage.getItem('token'));
          router.push('/dashboard/overview');
        }, 1000);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleLogin(values.username, values.password);
    },
  });
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in to HelloTrader Admin
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {loginSuccess && (
            <Alert severity="success" sx={{ mt: 2, width: '100%', mb: 2 }}>
              Login successful! Redirecting to dashboard...
            </Alert>
          )}
          
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username or Phone Number"
              name="username"  
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              disabled={loading || loginSuccess}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading || loginSuccess}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || loginSuccess}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}