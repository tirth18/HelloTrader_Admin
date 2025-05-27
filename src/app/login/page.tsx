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
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  Divider,
  Link
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  AccountCircle as AccountCircleIcon,
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LoginOutlined as LoginOutlinedIcon
} from '@mui/icons-material';

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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, error: authError } = useAuth();
  const theme = useTheme();
  
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Custom colors
  const gradientBg = 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)';
  const buttonGradient = 'linear-gradient(to right, #ff5f6d 0%, #ffc371 100%)';
  const titleGradient = 'linear-gradient(to right, #ff5f6d 0%, #ffc371 100%)';
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradientBg,
        backgroundSize: 'cover',
        padding: { xs: 2, sm: 3 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={12}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              padding: { xs: 3, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                background: titleGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textAlign: 'center',
                letterSpacing: '0.5px'
              }}
            >
              HelloTrader
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 4,
                textAlign: 'center',
                maxWidth: '80%'
              }}
            >
              Welcome back! Please log in to access the admin dashboard.
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2
                }}
              >
                {error}
              </Alert>
            )}
            
            {loginSuccess && (
              <Alert 
                severity="success" 
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2
                }}
              >
                Login successful! Redirecting to dashboard...
              </Alert>
            )}
            
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ width: '100%' }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 0 2px rgba(255, 95, 109, 0.25)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 2px rgba(255, 95, 109, 0.35)'
                    }
                  }
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                disabled={loading || loginSuccess}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 0 2px rgba(255, 95, 109, 0.25)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 2px rgba(255, 95, 109, 0.35)'
                    }
                  }
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || loginSuccess}
                startIcon={loading ? undefined : <LoginOutlinedIcon />}
                sx={{ 
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2.5,
                  mb: 3,
                  background: buttonGradient,
                  boxShadow: '0 4px 15px rgba(255, 95, 109, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(255, 95, 109, 0.6)',
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    transform: 'translateY(0)'
                  },
                  '&.Mui-disabled': {
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.12)' 
                      : 'rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 1, 
                  '& a': {
                    color: '#ff5f6d',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#ff8c94'
                    }
                  }
                }}
              >
                <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(0, 0, 0, 0.03)', 
              py: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} HelloTrader. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}