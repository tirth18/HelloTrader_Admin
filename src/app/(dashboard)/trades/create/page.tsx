'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  alpha,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const CreateTradePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode } = useThemeContext();
  
  // Form state
  const [scrip, setScrip] = useState('');
  const [userId, setUserId] = useState('');
  const [lotsUnits, setLotsUnits] = useState('');
  const [buyRate, setBuyRate] = useState('');
  const [sellRate, setSellRate] = useState('HELOADMIN');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sample data for dropdowns
  const scripOptions = ['NIFTY', 'BANKNIFTY', 'RELIANCE', 'TCS', 'Mega'];
  const userOptions = ['User 1', 'User 2', 'User 3', 'User 4'];

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving trade:', {
      scrip,
      userId,
      lotsUnits,
      buyRate,
      sellRate,
      transactionPassword
    });
    
    // Navigate back to trades list
    router.push('/trades');
  };

  const darkModeStyles = mode === 'dark' ? {
    backgroundColor: alpha('#1e293b', 0.9),
    color: '#fff',
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: alpha('#1e293b', 0.6),
        '& fieldset': {
          borderColor: alpha('#64748b', 0.2),
        },
        '&:hover fieldset': {
          borderColor: alpha('#64748b', 0.4),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiInputLabel-root': {
        color: alpha('#cbd5e1', 0.7),
      },
      '& .MuiOutlinedInput-input': {
        color: '#fff',
      },
    },
    '& .MuiFormControl-root': {
      '& .MuiInputLabel-root': {
        color: alpha('#cbd5e1', 0.7),
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: alpha('#1e293b', 0.6),
        '& fieldset': {
          borderColor: alpha('#64748b', 0.2),
        },
        '&:hover fieldset': {
          borderColor: alpha('#64748b', 0.4),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiSelect-select': {
        color: '#fff',
      },
    },
  } : {};

  return (
    <Box sx={{ 
      p: 3, 
      minHeight: '100vh',
      ...darkModeStyles
    }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#4caf50',
          '&:hover': {
            bgcolor: '#45a049',
          },
          mb: 5,
          px: 4,
          py: 1.5,
          fontWeight: 500,
          fontSize: '1rem',
        }}
      >
        Create Trades
      </Button>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              Scrip
            </Typography>
            <FormControl fullWidth>
              <Select
                value={scrip}
                onChange={(e: SelectChangeEvent<string>) => setScrip(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Scrip' }}
                sx={{
                  bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                  '& .MuiSelect-select': {
                    py: 1.5,
                  }
                }}
                renderValue={selected => {
                  if (!selected) {
                    return <Typography sx={{ color: mode === 'dark' ? alpha('#fff', 0.5) : '#777' }}>Select Scrip</Typography>;
                  }
                  return selected;
                }}
              >
                {scripOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              Lots / Units
            </Typography>
            <TextField
              fullWidth
              value={lotsUnits}
              onChange={(e) => setLotsUnits(e.target.value)}
              placeholder=""
              variant="outlined"
              sx={{
                bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                '& .MuiOutlinedInput-root': {
                  py: 0.5,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              Sell Rate
            </Typography>
            <TextField
              fullWidth
              value={sellRate}
              onChange={(e) => setSellRate(e.target.value)}
              placeholder=""
              variant="outlined"
              sx={{
                bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                '& .MuiOutlinedInput-root': {
                  py: 0.5,
                }
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              User ID
            </Typography>
            <FormControl fullWidth>
              <Select
                value={userId}
                onChange={(e: SelectChangeEvent<string>) => setUserId(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Select User' }}
                sx={{
                  bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                  '& .MuiSelect-select': {
                    py: 1.5,
                  }
                }}
                renderValue={selected => {
                  if (!selected) {
                    return <Typography sx={{ color: mode === 'dark' ? alpha('#fff', 0.5) : '#777' }}>Select User</Typography>;
                  }
                  return selected;
                }}
              >
                {userOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              Buy Rate
            </Typography>
            <TextField
              fullWidth
              value={buyRate}
              onChange={(e) => setBuyRate(e.target.value)}
              placeholder=""
              variant="outlined"
              sx={{
                bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                '& .MuiOutlinedInput-root': {
                  py: 0.5,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ 
                mb: 1, 
                color: mode === 'dark' ? alpha('#fff', 0.8) : undefined,
                fontWeight: 500
              }}
            >
              Transaction Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
              variant="outlined"
              placeholder=""
              sx={{
                bgcolor: mode === 'dark' ? 'transparent' : alpha('#f5f5f5', 0.8),
                '& .MuiOutlinedInput-root': {
                  py: 0.5,
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: mode === 'dark' ? alpha('#fff', 0.6) : undefined }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#45a049',
            },
            px: 4,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTradePage; 