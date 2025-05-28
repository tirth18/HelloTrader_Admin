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
import { fetchScriptNames, fetchUserIds } from '@/utils/api';

interface Script {
  id: string;
  name: string;
  segment: string;
  lotSize: number;
  instrumentToken: string;
}

interface User {
  _id: string;
  name: string;
  user_id: string;
  [key: string]: any;
}

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
  const [scriptOptions, setScriptOptions] = useState<Script[]>([]);
  const [isLoadingScripts, setIsLoadingScripts] = useState(false);
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const handleScriptDropdownOpen = async () => {
    try {
      setIsLoadingScripts(true);
      const scripts = await fetchScriptNames();
      setScriptOptions(scripts);
    } catch (error) {
      console.error('Error loading scripts:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoadingScripts(false);
    }
  };

  const handleUserDropdownOpen = async () => {
    try {
      setIsLoadingUsers(true);
      const users = await fetchUserIds();
      setUserOptions(users);
    } catch (error) {
      console.error('Error loading users:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!scrip || !userId || !lotsUnits || !buyRate || !transactionPassword) {
        alert('Please fill all required fields');
        return;
      }

      // Get selected script and user data
      const selectedScript = scriptOptions.find(script => script.id === scrip);
      const selectedUser = userOptions.find(user => user._id === userId);

      if (!selectedScript || !selectedUser) {
        alert('Invalid script or user selection');
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token not found');
        return;
      }

      // Prepare request body
      const requestBody = {
        script: selectedScript.name,
        segment: selectedScript.segment.toLowerCase(),
        buy_rate: parseFloat(buyRate),
        lots: lotsUnits,
        status: "active",
        purchaseType: "buy",
        broker_id: selectedUser.broker_id,
        lot_size: selectedScript.lotSize,
        tradeType: "market",
        ipAddress: "127.0.0.1", // You might want to get actual IP
        symbol: selectedScript.name,
        instrumentToken: selectedScript.instrumentToken,
        user_id: selectedUser._id
      };

      // Call API
      const response = await fetch('http://13.233.225.7:8000/api/createTrade2', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to create trade');
      }

      const result = await response.json();
      console.log('Trade created successfully:', result);
      
      // Navigate back to trades list
      router.push('/trades');
    } catch (error) {
      console.error('Error creating trade:', error);
      alert('Failed to create trade. Please try again.');
    }
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
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 250,
                      overflow: 'hidden',
                      '& .MuiMenu-list': {
                        maxHeight: 250,
                        overflowY: 'auto',
                        padding: 0,
                        '&::-webkit-scrollbar': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: alpha('#f1f5f9', 0.1),
                          borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: alpha('#64748b', 0.6),
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: alpha('#64748b', 0.8),
                          },
                        },
                      },
                    },
                  },
                  MenuListProps: {
                    sx: {
                      maxHeight: 250,
                      overflowY: 'auto',
                      padding: 0,
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                renderValue={selected => {
                  if (!selected) {
                    return <Typography sx={{ color: mode === 'dark' ? alpha('#fff', 0.5) : '#777' }}>Select Scrip</Typography>;
                  }
                  const selectedScript = scriptOptions.find(script => script.id === selected);
                  return selectedScript ? selectedScript.name : selected;
                }}
                onOpen={handleScriptDropdownOpen}
                disabled={isLoadingScripts}
              >
                {isLoadingScripts ? (
                  <MenuItem disabled>Loading scripts...</MenuItem>
                ) : (
                  scriptOptions.map((script) => (
                    <MenuItem key={script.id} value={script.id}>
                      {script.name} ({script.segment})
                    </MenuItem>
                  ))
                )}
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
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      overflow: 'hidden',
                      '& .MuiMenu-list': {
                        maxHeight: 200,
                        overflowY: 'auto',
                        padding: 0,
                        '&::-webkit-scrollbar': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: alpha('#f1f5f9', 0.1),
                          borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: alpha('#64748b', 0.6),
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: alpha('#64748b', 0.8),
                          },
                        },
                      },
                    },
                  },
                  MenuListProps: {
                    sx: {
                      maxHeight: 200,
                      overflowY: 'auto',
                      padding: 0,
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                renderValue={selected => {
                  if (!selected) {
                    return <Typography sx={{ color: mode === 'dark' ? alpha('#fff', 0.5) : '#777' }}>Select User</Typography>;
                  }
                  const selectedUser = userOptions.find(user => user._id === selected);
                  return selectedUser ? `${selectedUser.user_id} : ${selectedUser.name}` : selected;
                }}
                onOpen={handleUserDropdownOpen}
                disabled={isLoadingUsers}
              >
                {isLoadingUsers ? (
                  <MenuItem disabled>Loading users...</MenuItem>
                ) : (
                  userOptions.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.user_id} : {user.name}
                    </MenuItem>
                  ))
                )}
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