'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  alpha,
  Alert,
  Snackbar,
  Fade,
} from '@mui/material';
import { KeyRounded } from '@mui/icons-material';

const ChangeTransactionPasswordPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      // TODO: Implement API call to change transaction password
      const response = await fetch('/api/auth/change-transaction-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change transaction password');
      }

      setSuccess('Transaction password changed successfully');
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change transaction password');
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box 
        sx={{ 
          flex: 1,
          p: '24px 24px 24px 0',
          pl: { xs: 2, sm: 3 },
          maxWidth: '100%',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0A1929' : '#F5F7FA',
          backgroundImage: (theme) => theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 50% 0%, rgba(33, 150, 243, 0.03) 0%, rgba(33, 150, 243, 0) 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0) 50%)',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 3,
          maxWidth: '600px',
          mx: 'auto',
          width: '100%',
        }}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: (theme) => theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                  : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                letterSpacing: '-0.5px',
                mb: 1.5,
                display: 'inline-block',
                position: 'relative',
              }}
            >
              Change Transaction Password
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: (theme) => alpha(theme.palette.text.secondary, 0.95),
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              Update your transaction password to keep your account secure
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.8)
                : theme.palette.background.paper,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px 0 rgba(0,0,0,0.4)'
                : '0 4px 20px 0 rgba(0,0,0,0.05)',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.background.paper, 0.6)
                        : alpha(theme.palette.background.paper, 0.8),
                    }
                  }}
                />

                <TextField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.background.paper, 0.6)
                        : alpha(theme.palette.background.paper, 0.8),
                    }
                  }}
                />

                <TextField
                  label="Repeat New Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.background.paper, 0.6)
                        : alpha(theme.palette.background.paper, 0.8),
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    background: (theme) => theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                      : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                      background: (theme) => theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)'
                        : 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                    }
                  }}
                >
                  Update Password
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError('')} 
            severity="error" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSuccess('')} 
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default ChangeTransactionPasswordPage; 