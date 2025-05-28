'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  alpha,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Grid,
  InputLabel,
  SelectChangeEvent,
  Fade,
  Divider,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { API_BASE_URL } from '@/config';

const MarketSettingsPage = () => {
  const theme = useTheme();
  
  // State for form values
  const [nseTimings, setNseTimings] = useState({
    startHour: '09',
    startMinute: '16',
    endHour: '15',
    endMinute: '30',
  });

  const [mcxTimings, setMcxTimings] = useState({
    startHour: '09',
    startMinute: '01',
    endHour: '23',
    endMinute: '30',
  });

  const [dataAge, setDataAge] = useState('180');

  // Generate hours and minutes for dropdowns
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleNseChange = (field: string) => (event: SelectChangeEvent) => {
    setNseTimings(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleMcxChange = (field: string) => (event: SelectChangeEvent) => {
    setMcxTimings(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);

      if (!token) {
        throw new Error('No authentication token found');
      }

      const requestBody = {
        nse_startTime: `${nseTimings.startHour}:${nseTimings.startMinute}`,
        mcx_startTime: `${mcxTimings.startHour}:${mcxTimings.startMinute}`,
        option_startTime: "09:30",
        comex_startTime: "17:00",
        nse_endTime: `${nseTimings.endHour}:${nseTimings.endMinute}`,
        mcx_endTime: `${mcxTimings.endHour}:${mcxTimings.endMinute}`,
        option_endTime: "15:30",
        comex_endTime: "02:00"
      };

      // Make sure to trim the token and properly format it
      const cleanToken = token.trim();
      
      const response = await fetch(`${API_BASE_URL}/api/createSetting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        
        if (response.status === 401) {
          // If unauthorized, you might want to redirect to login or refresh the token
          console.error('Authentication failed. Token might be invalid or expired.');
          // Optionally redirect to login
          // window.location.href = '/login';
          throw new Error('Authentication failed. Please login again.');
        }
        
        throw new Error(`Failed to update settings: ${response.status} ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Settings updated successfully:', data);
      // You might want to show a success message to the user
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      // Show error message to the user
      alert(error instanceof Error ? error.message : 'Failed to update settings');
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
          backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : '#F5F7FA',
          backgroundImage: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 50% 0%, rgba(33, 150, 243, 0.03) 0%, rgba(33, 150, 243, 0) 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0) 50%)',
        }}
      >
        <Box sx={{ 
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
        }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                  : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                letterSpacing: '-0.5px',
                mb: 1.5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <SettingsIcon sx={{ fontSize: 'inherit' }} />
              Market Settings
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: alpha(theme.palette.text.secondary, 0.95),
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              Configure market timings and data settings
            </Typography>
          </Box>

          {/* Main Content */}
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
              <Grid container spacing={4}>
                {/* NSE Timings */}
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#333',
                      fontWeight: 600,
                    }}
                  >
                    NSE Timings (24 hours format)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Hour</InputLabel>
                      <Select
                        value={nseTimings.startHour}
                        onChange={handleNseChange('startHour')}
                        label="Hour"
                      >
                        {hours.map(hour => (
                          <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography>:</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Minute</InputLabel>
                      <Select
                        value={nseTimings.startMinute}
                        onChange={handleNseChange('startMinute')}
                        label="Minute"
                      >
                        {minutes.map(minute => (
                          <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography sx={{ mx: 1 }}>to</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Hour</InputLabel>
                      <Select
                        value={nseTimings.endHour}
                        onChange={handleNseChange('endHour')}
                        label="Hour"
                      >
                        {hours.map(hour => (
                          <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography>:</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Minute</InputLabel>
                      <Select
                        value={nseTimings.endMinute}
                        onChange={handleNseChange('endMinute')}
                        label="Minute"
                      >
                        {minutes.map(minute => (
                          <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                {/* MCX Timings */}
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#333',
                      fontWeight: 600,
                    }}
                  >
                    MCX Timings (24 hours format)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Hour</InputLabel>
                      <Select
                        value={mcxTimings.startHour}
                        onChange={handleMcxChange('startHour')}
                        label="Hour"
                      >
                        {hours.map(hour => (
                          <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography>:</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Minute</InputLabel>
                      <Select
                        value={mcxTimings.startMinute}
                        onChange={handleMcxChange('startMinute')}
                        label="Minute"
                      >
                        {minutes.map(minute => (
                          <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography sx={{ mx: 1 }}>to</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Hour</InputLabel>
                      <Select
                        value={mcxTimings.endHour}
                        onChange={handleMcxChange('endHour')}
                        label="Hour"
                      >
                        {hours.map(hour => (
                          <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography>:</Typography>
                    <FormControl sx={{ minWidth: 100 }}>
                      <InputLabel>Minute</InputLabel>
                      <Select
                        value={mcxTimings.endMinute}
                        onChange={handleMcxChange('endMinute')}
                        label="Minute"
                      >
                        {minutes.map(minute => (
                          <MenuItem key={minute} value={minute}>{minute}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                {/* Data Age Setting */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 3 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#333',
                      fontWeight: 600,
                    }}
                  >
                    Acceptable Data Age for fresh trades (No. of Seconds)
                  </Typography>
                  <TextField
                    value={dataAge}
                    onChange={(e) => setDataAge(e.target.value)}
                    type="number"
                    fullWidth
                    sx={{ 
                      maxWidth: 400,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' 
                          ? alpha(theme.palette.background.paper, 0.6)
                          : alpha(theme.palette.background.paper, 0.8),
                      }
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: 'none',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                        : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)'
                          : 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                      }
                    }}
                  >
                    Update Settings
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
};

export default MarketSettingsPage; 