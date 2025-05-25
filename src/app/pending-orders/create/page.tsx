'use client';

// Add TypeScript declarations for global window properties
declare global {
  interface Window {
    scriptData: any[];
    userData: any[];
  }
}

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
  CircularProgress,
  Snackbar,
  Alert,
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

  // Script and User details state
  const [selectedScriptDetails, setSelectedScriptDetails] = useState<any>(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState<any>(null);
  
  // API call state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  
  // Scripts state
  const [scripts, setScripts] = useState<any[]>([]);
  const [loadingScripts, setLoadingScripts] = useState(false);
  const [scriptsError, setScriptsError] = useState('');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  // Users state
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [usersLoaded, setUsersLoaded] = useState(false);

  // Get auth token from localStorage or use fallback
  const getAuthToken = () => {
    const possibleTokenKeys = ['authToken', 'token', 'jwtToken', 'accessToken', 'auth'];
    let token = null;
    
    for (const key of possibleTokenKeys) {
      const storedToken = localStorage.getItem(key);
      if (storedToken) {
        token = storedToken;
        console.log(`Found token with key: ${key}`);
        break;
      }
    }
    
    // Fallback to the hardcoded token if none found in localStorage
    if (!token) {
      console.warn('No token found in localStorage, using fallback token');
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ODA5ZDcyOTI0YzQ5YTRiNzg1ZTI0NDc6Q2dCSEl0MDEiLCJpYXQiOjE3NDc4MDczMjh9.PjWJE4fYAzP67CYdhn2ZygJa_XUgB0uWAA2e-b2Ijr0';
    }
    
    return token;
  };

  // Function to fetch scripts when dropdown is clicked
  const fetchScripts = async () => {
    // Only fetch if not already fetched or loading
    if (scriptsLoaded || loadingScripts) return;
    
    setLoadingScripts(true);
    setScriptsError('');
    
    try {
      const token = getAuthToken();

      const response = await fetch('http://13.233.225.7:8000/api/getAllScriptName', {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch script names');
      }

      const data = await response.json();
      console.log('Scripts API response:', data);
      
      // Store the complete script objects to access segment, lotSize, etc.
      let scriptData = [];
      
      // Handle different possible response structures
      if (data && data.data && Array.isArray(data.data)) {
        scriptData = data.data;
        // If response has a data property containing array of objects with scriptname
        if (data.data.length > 0 && data.data[0].scriptname) {
          setScripts(data.data.map(item => item.scriptname));
        } else {
          setScripts(data.data);
        }
      } else if (data && Array.isArray(data)) {
        scriptData = data;
        // If response is directly an array of objects with scriptname
        if (data.length > 0 && data[0].scriptname) {
          setScripts(data.map(item => item.scriptname));
        } else {
          setScripts(data);
        }
      } else if (data && typeof data === 'object') {
        // If response is an object with scriptname property or other structure
        if (data.scriptname) {
          // Single object with scriptname
          scriptData = [data];
          setScripts([data.scriptname]);
        } else if (data.scripts && Array.isArray(data.scripts)) {
          // Object with scripts array
          scriptData = data.scripts;
          setScripts(data.scripts.map(item => 
            typeof item === 'object' && item.scriptname ? item.scriptname : item
          ));
        } else {
          // Look for any string values
          const scriptNames = Object.values(data).filter(value => typeof value === 'string');
          if (scriptNames.length > 0) {
            setScripts(scriptNames as string[]);
          } else {
            throw new Error('Could not extract script names from response');
          }
        }
      } else {
        throw new Error('Unexpected API response format');
      }
      
      // Save the complete script data for later use
      if (scriptData.length > 0) {
        window.scriptData = scriptData;
      }
      
      // Mark scripts as loaded
      setScriptsLoaded(true);
    } catch (err) {
      console.error('Error fetching scripts:', err);
      setScriptsError(err instanceof Error ? err.message : 'Failed to fetch script names');
      // Fallback to some sample scripts with their details
      const sampleScriptData = [
        {
          _id: "682c48230e7c4d72849de62b",
          segment: "NFO",
          lotSize: 100,
          scriptname: "ALKEM25MAY5300PE",
          instrument_token: 16795394
        }
      ];
      window.scriptData = sampleScriptData;
      setScripts(sampleScriptData.map(item => item.scriptname));
    } finally {
      setLoadingScripts(false);
    }
  };
  
  // Function to fetch users when dropdown is clicked
  const fetchUsers = async () => {
    // Only fetch if not already fetched or loading
    if (usersLoaded || loadingUsers) return;
    
    setLoadingUsers(true);
    setUsersError('');
    
    try {
      const token = getAuthToken();

      const response = await fetch('http://13.233.225.7:8000/api/getAllUserId', {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user IDs');
      }

      const data = await response.json();
      console.log('Users API response:', data);
      
      // Store the complete user objects
      let userData = [];
      
      // Handle different possible response structures
      if (data && data.data && Array.isArray(data.data)) {
        // If response has a data property containing array of objects
        userData = data.data;
        if (data.data.length > 0) {
          // Map the data to include both userId and name
          setUsers(data.data.map(item => {
            return {
              userId: item.userId || item.user_id || item.id || '',
              name: item.name || item.userName || item.user_name || ''
            };
          }));
        } else {
          setUsers([]);
        }
      } else if (data && Array.isArray(data)) {
        // If response is directly an array of objects
        userData = data;
        if (data.length > 0) {
          // Map the data to include both userId and name
          setUsers(data.map(item => {
            return {
              userId: item.userId || item.user_id || item.id || '',
              name: item.name || item.userName || item.user_name || ''
            };
          }));
        } else {
          setUsers([]);
        }
      } else if (data && typeof data === 'object') {
        // If response is an object structure
        const userArray = [];
        
        // Try to extract an array of users from various possible structures
        if (data.users && Array.isArray(data.users)) {
          userArray.push(...data.users);
        } else {
          // If not found, look for user properties at the top level
          const possibleUsers = [];
          for (const key in data) {
            if (typeof data[key] === 'object' && data[key] !== null) {
              possibleUsers.push(data[key]);
            }
          }
          if (possibleUsers.length > 0) {
            userArray.push(...possibleUsers);
          }
        }
        
        userData = userArray;
        
        if (userArray.length > 0) {
          setUsers(userArray.map(item => {
            return {
              userId: item.userId || item.user_id || item.id || '',
              name: item.name || item.userName || item.user_name || ''
            };
          }));
        } else {
          throw new Error('Could not extract user data from response');
        }
      } else {
        throw new Error('Unexpected API response format');
      }
      
      // Save the complete user data for later use
      if (userData.length > 0) {
        window.userData = userData;
      }
      
      // Mark users as loaded
      setUsersLoaded(true);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsersError(err instanceof Error ? err.message : 'Failed to fetch user IDs');
      // Fallback to some sample users with their details
      const sampleUserData = [
        {
          _id: "681f1a6ad185a0ea76ed4659",
          user_id: "user1234",
          name: "JOHN",
          broker_id: "60f9b4f2e7c2a7453bb0bb42",
          id: 2
        }
      ];
      window.userData = sampleUserData;
      setUsers(sampleUserData.map(item => {
        return {
          userId: item.user_id || item.id || '',
          name: item.name || ''
        };
      }));
    } finally {
      setLoadingUsers(false);
    }
  };

  const orderTypes = [
    'Buy',
    'Sell',
  ];

  // Handle form input changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If script is selected, find and store script details
    if (name === 'script' && window.scriptData) {
      const scriptDetail = window.scriptData.find((script: any) => 
        script.scriptname === value || script.script === value
      );
      if (scriptDetail) {
        console.log('Selected script details:', scriptDetail);
        setSelectedScriptDetails(scriptDetail);
      }
    }

    // If userId is selected, find and store user details
    if (name === 'userId' && window.userData) {
      const userDetail = window.userData.find((user: any) => 
        user.user_id === value || user.userId === value || user.id === value
      );
      if (userDetail) {
        console.log('Selected user details:', userDetail);
        setSelectedUserDetails(userDetail);
      }
    }
  };

  // Handle password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validate form data
      if (!formData.script) throw new Error('Please select a script');
      if (!formData.userId) throw new Error('Please select a user');
      if (!formData.lotsUnits) throw new Error('Please enter lots/units');
      if (!formData.price) throw new Error('Please enter price');
      if (!formData.orderType) throw new Error('Please select order type');
      if (!formData.transactionPassword) throw new Error('Please enter transaction password');
      
      // Prepare request data
      const scriptDetails = selectedScriptDetails || {};
      const userDetails = selectedUserDetails || {};
      
      // Get user's IP address (in a real app, this would be done server-side)
      const ipAddress = '152.56.134.109'; // Default fallback IP
      
      // Create the base request object
      const requestData: any = {
        script: scriptDetails.scriptname ? scriptDetails.scriptname.split(/\d+/)[0].trim() : formData.script.split(/\d+/)[0].trim(),
        segment: (scriptDetails.segment || 'nfo').toLowerCase(),
        lots: String(formData.lotsUnits), // Convert to string as the API expects
        status: 'pending',
        purchaseType: formData.orderType.toLowerCase(),
        broker_id: userDetails.broker_id || '681b4b5727613c122fd17c17',
        lot_size: scriptDetails.lotSize || 100,
        tradeType: 'order',
        ipAddress: ipAddress,
        symbol: scriptDetails.scriptname || formData.script,
        instrumentToken: scriptDetails.instrument_token || 0,
        user_id: userDetails.user_id || userDetails._id || formData.userId
      };
      
      // Add either buy_rate or sell_rate based on the orderType
      if (formData.orderType.toLowerCase() === 'buy') {
        requestData.buy_rate = parseFloat(formData.price);
      } else {
        requestData.sell_rate = parseFloat(formData.price);
      }
      
      console.log('Request data:', requestData);
      
      // Get auth token
      const token = getAuthToken();
      
      // Call API to create trade - ensure there's no space in the URL
      const response = await fetch('http://13.233.225.7:8000/api/createTrade2', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      // First check if we can parse the response
      let responseData;
      const responseText = await response.text();
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing response:', responseText);
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to create trade');
      }
      
      console.log('Trade created successfully:', responseData);
      setSubmitSuccess(true);
      
      // Redirect to pending orders list after 2 seconds
      setTimeout(() => {
        router.push('/pending-orders');
      }, 2000);
      
    } catch (err) {
      console.error('Error creating trade:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to create trade');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dropdown open to fetch scripts
  const handleScriptDropdownOpen = () => {
    fetchScripts();
  };
  
  // Handle dropdown open to fetch users
  const handleUserDropdownOpen = () => {
    fetchUsers();
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
        {(scriptsError || usersError || submitError) && (
          <Typography variant="body2" sx={{ color: 'error.main', mb: 2 }}>
            {scriptsError || usersError || submitError}
          </Typography>
        )}
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
                onOpen={handleScriptDropdownOpen}
                label="Select Script"
                size="medium"
                disabled={loadingScripts}
              >
                {loadingScripts ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Loading scripts...
                  </MenuItem>
                ) : scripts.length > 0 ? (
                  scripts.map((script, index) => (
                    <MenuItem key={index} value={script}>
                      {script}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    {scriptsError ? 'Error loading scripts' : 'Click to load scripts'}
                  </MenuItem>
                )}
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
                onOpen={handleUserDropdownOpen}
                label="Select User"
                size="medium"
                disabled={loadingUsers}
              >
                {loadingUsers ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Loading users...
                  </MenuItem>
                ) : users.length > 0 ? (
                  users.map((user, index) => (
                    <MenuItem key={index} value={user.userId}>
                      {user.userId} ({user.name})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    {usersError ? 'Error loading users' : 'Click to load users'}
                  </MenuItem>
                )}
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
            disabled={isSubmitting}
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
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'SAVE'}
          </Button>
        </Box>
      </Paper>
      
      {/* Success message */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={2000}
        onClose={() => setSubmitSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Order created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 