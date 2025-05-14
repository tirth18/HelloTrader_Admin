'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Paper,
  Grid,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function DeleteHistoryPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // State for checkbox selections
  const [dataTypes, setDataTypes] = useState({
    orders: false,
    scripData: false,
    actionLedger: false,
    fundsTransactions: false,
    loginLogs: false,
    accessLogs: false,
    inactiveAppSessions: false,
    bruteForceData: false,
    inactiveMarketWatch: false,
    expiredScripts: false,
    inactiveBannedScripts: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataTypes({
      ...dataTypes,
      [event.target.name]: event.target.checked,
    });
  };

  // Handle delete button click
  const handleDelete = () => {
    console.log('Delete clicked', {
      selectedDate,
      dataTypes,
    });
    // Implementation would go here
  };

  // Handler for pause and resume delete
  const handlePauseDelete = () => {
    console.log('Pause delete clicked');
    // Implementation would go here
  };

  const handleResumeDelete = () => {
    console.log('Resume delete clicked');
    // Implementation would go here
  };

  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};

  // Background style for the content area
  const contentBgStyle = {
    bgcolor: mode === 'dark' ? alpha('#1e293b', 0.3) : alpha('#f1f5f9', 0.8),
    borderRadius: 2,
  };

  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      {/* Header Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.success.main,
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
        >
          Delete History
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ ...contentBgStyle, p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Remove Data till:
        </Typography>

        {/* Date Selection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Choose Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              sx={{ 
                width: { xs: '100%', sm: '50%', md: '30%' },
                '.MuiOutlinedInput-root': {
                  bgcolor: mode === 'dark' ? alpha('#334155', 0.6) : alpha('#ffffff', 0.9),
                }
              }}
            />
          </LocalizationProvider>
        </Box>

        {/* Data Type Selection */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Data Type:
          </Typography>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.orders}
                      onChange={handleCheckboxChange}
                      name="orders"
                    />
                  }
                  label="Orders"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.scripData}
                      onChange={handleCheckboxChange}
                      name="scripData"
                    />
                  }
                  label="Scrip Data"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.actionLedger}
                      onChange={handleCheckboxChange}
                      name="actionLedger"
                    />
                  }
                  label="Action Ledger"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.fundsTransactions}
                      onChange={handleCheckboxChange}
                      name="fundsTransactions"
                    />
                  }
                  label="Funds Transactions"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.loginLogs}
                      onChange={handleCheckboxChange}
                      name="loginLogs"
                    />
                  }
                  label="Login Logs"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.accessLogs}
                      onChange={handleCheckboxChange}
                      name="accessLogs"
                    />
                  }
                  label="Access Logs"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.inactiveAppSessions}
                      onChange={handleCheckboxChange}
                      name="inactiveAppSessions"
                    />
                  }
                  label="Inactive App Sessions"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.bruteForceData}
                      onChange={handleCheckboxChange}
                      name="bruteForceData"
                    />
                  }
                  label="Brute Force Data"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.inactiveMarketWatch}
                      onChange={handleCheckboxChange}
                      name="inactiveMarketWatch"
                    />
                  }
                  label="Inactive Market Watch"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.expiredScripts}
                      onChange={handleCheckboxChange}
                      name="expiredScripts"
                    />
                  }
                  label="Expired Scripts from Exchange"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={dataTypes.inactiveBannedScripts}
                      onChange={handleCheckboxChange}
                      name="inactiveBannedScripts"
                    />
                  }
                  label="Inactive Banned Scripts"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          size="large"
          onClick={handleDelete}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.success.main,
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
        >
          DELETE HISTORY
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handlePauseDelete}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.warning.main,
            '&:hover': {
              bgcolor: theme.palette.warning.dark,
            },
          }}
        >
          PAUSE DELETE
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleResumeDelete}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.info.main,
            '&:hover': {
              bgcolor: theme.palette.info.dark,
            },
          }}
        >
          RESUME DELETE
        </Button>
      </Stack>
    </Box>
  );
} 