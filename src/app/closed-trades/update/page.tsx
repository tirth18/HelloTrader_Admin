'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  alpha,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UpdateTradesPage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mode } = useThemeContext();
  
  // Get trade ID from URL if available
  const tradeId = searchParams.get('id');
  
  // Form state
  const [scrip, setScrip] = useState('');
  const [userId, setUserId] = useState('');
  const [lotsUnits, setLotsUnits] = useState('');
  const [buyRate, setBuyRate] = useState('');
  const [sellRate, setSellRate] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for dropdowns
  const scripOptions = ['GCM5', 'SILVERMIC25JUNFUT', 'CRUDEOIL25MAYFUT', 'NIFTY', 'BANKNIFTY', 'Mega'];
  const userOptions = [
    '867 : HELO210 (Nakoda Ji )',
    '2606 : HELO242 (Sheetal Singh)',
    '1753 : HELO232 (Dilip T S)',
    '762 : HELO110 (Madam)'
  ];

  // Fetch trade data when component mounts
  useEffect(() => {
    if (tradeId) {
      // In a real application, we would fetch the data from an API
      // For now, let's mock the data based on the image provided
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock data for the trade with ID tradeId
        setScrip('GCM5');
        setUserId('867 : HELO210 (Nakoda Ji )');
        setLotsUnits('0.500000');
        setBuyRate('3192.90000000');
        setSellRate('3205.30000000');
        setIsLoading(false);
      }, 500);
    }
  }, [tradeId]);

  const handleScripChange = (event: SelectChangeEvent) => {
    setScrip(event.target.value);
  };

  const handleUserIdChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
  };

  const handleSave = () => {
    // Validate fields
    if (!transactionPassword) {
      alert('Please enter transaction password');
      return;
    }
    
    // Save logic would go here
    console.log('Updating trade:', {
      tradeId,
      scrip,
      userId,
      lotsUnits,
      buyRate,
      sellRate,
      transactionPassword
    });
    
    // Navigate back to closed trades list
    router.push('/closed-trades');
  };

  const handleCancel = () => {
    router.push('/closed-trades');
  };

  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};

  const miniNote = <Box sx={{ 
    fontSize: '0.85rem', 
    color: 'text.secondary',
    mt: 0.5
  }}>
    (Mini Works on Silver and Gold only)
  </Box>;

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', ...darkModeStyles }}>
        <Typography>Loading trade data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', ...darkModeStyles }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 900,
          mx: 'auto',
          bgcolor: mode === 'dark' ? alpha('#1e293b', 0.5) : 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 600 }}>
          Update Trades
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="scrip-label">Scrip</InputLabel>
              <Select
                labelId="scrip-label"
                id="scrip"
                value={scrip}
                onChange={handleScripChange}
                label="Scrip"
              >
                {scripOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {scrip === 'Mega' && miniNote}
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="userId-label">User ID</InputLabel>
              <Select
                labelId="userId-label"
                id="userId"
                value={userId}
                onChange={handleUserIdChange}
                label="User ID"
              >
                {userOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Lots / Units"
              value={lotsUnits}
              onChange={(e) => setLotsUnits(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Buy Rate"
              value={buyRate}
              onChange={(e) => setBuyRate(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sell Rate"
              value={sellRate}
              onChange={(e) => setSellRate(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Transaction Password"
              type={showPassword ? 'text' : 'password'}
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  bgcolor: '#4caf50',
                  '&:hover': {
                    bgcolor: '#45a049',
                  },
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                }}
              >
                SAVE
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                }}
              >
                CANCEL
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 