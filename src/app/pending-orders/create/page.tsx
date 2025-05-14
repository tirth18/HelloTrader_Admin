'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useTheme,
  alpha,
  Grid,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function CreatePendingOrderPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    script: '',
    userId: '',
    lotsUnits: '',
    orderType: '',
    price: '',
    transactionPassword: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Mock data for dropdowns
  const scripts = [
    'NIFTY25MAY24000CE',
    'BANKNIFTY25MAY44000PE',
    'RELIANCE25MAYFUT',
    'TATASTEEL25MAYFUT',
  ];

  const users = [
    'HELOADMIN',
    'USER1',
    'USER2',
    'USER3',
  ];

  const orderTypes = [
    'Market',
    'Limit',
    'Stop Loss',
    'Stop Loss Market',
  ];

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically make an API call to create the order
  };

  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};

  // Common styles for form elements
  const formElementStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: mode === 'dark' ? alpha('#1e293b', 0.6) : alpha('#fff', 0.9),
    },
    '& .MuiInputLabel-root': {
      color: mode === 'dark' ? alpha('#fff', 0.7) : alpha('#000', 0.7),
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: mode === 'dark' ? '#111827' : '#e5e7eb' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          width: { xs: '95%', sm: '80%', md: '70%' },
          maxWidth: 1100,
          p: { xs: 2, sm: 4 },
          borderRadius: 6,
          bgcolor: mode === 'dark' ? '#1e2536' : '#fff',
          boxShadow: mode === 'dark' ? '0 8px 32px 0 #00000040' : undefined,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.success.main }}>
          Create Limit Order
        </Typography>
        <Grid container spacing={4}>
          {/* Order Details Section */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Script
            </Typography>
            <FormControl fullWidth sx={formElementStyles}>
              <InputLabel id="script-label">Select Script</InputLabel>
              <Select
                labelId="script-label"
                id="script"
                name="script"
                value={formData.script}
                onChange={handleChange}
                label="Select Script"
                size="medium"
              >
                {scripts.map((script) => (
                  <MenuItem key={script} value={script}>
                    {script}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              User ID
            </Typography>
            <FormControl fullWidth sx={formElementStyles}>
              <InputLabel id="userId-label">Select User</InputLabel>
              <Select
                labelId="userId-label"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                label="Select User"
                size="medium"
              >
                {users.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Lots / Units
            </Typography>
            <TextField
              fullWidth
              label="Lots / Units"
              name="lotsUnits"
              value={formData.lotsUnits}
              onChange={handleChange}
              type="number"
              size="medium"
              sx={formElementStyles}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Price
            </Typography>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              size="medium"
              sx={formElementStyles}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Order Type
            </Typography>
            <FormControl fullWidth sx={formElementStyles}>
              <InputLabel id="orderType-label">Select Order Type</InputLabel>
              <Select
                labelId="orderType-label"
                id="orderType"
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                label="Select Order Type"
                size="medium"
              >
                {orderTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Transaction Password
            </Typography>
            <TextField
              fullWidth
              label="Transaction Password"
              name="transactionPassword"
              value={formData.transactionPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              size="medium"
              sx={formElementStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            size="large"
            sx={{
              px: 6,
              py: 1.7,
              fontWeight: 600,
              fontSize: '1.1rem',
              bgcolor: theme.palette.success.main,
              '&:hover': {
                bgcolor: theme.palette.success.dark,
              },
              boxShadow: 2,
            }}
          >
            SAVE
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 