'use client';

import React, { useState } from 'react';
import {
  Box,
  useTheme,
  alpha,
  Typography,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import AccountsTable, { AccountData } from '@/components/accounts/AccountsTable';
import DateRangePicker from '@/components/accounts/DateRangePicker';

export default function AccountsPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  // State for date range selection
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  
  // Mock data for the table
  const accountsData: AccountData[] = [
    { 
      name: 'Rs. -0 is to receive from Samyak Jain', 
      broker: '62: jain01', 
      clientPL: 223609.43, 
      clientBrokerage: 439122.44, 
      clientNet: -215513.01,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. 0 is to receive from Utkarsh Ji', 
      broker: '64: jain02', 
      clientPL: -45870.35, 
      clientBrokerage: 819.82, 
      clientNet: -46690.17,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. 0 is to receive from Prashant Kumar', 
      broker: '65: jain03', 
      clientPL: 0, 
      clientBrokerage: 0, 
      clientNet: 0,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. 0 is to receive from Chinmay Bhai', 
      broker: '66: jain04', 
      clientPL: -43547, 
      clientBrokerage: 27866.87, 
      clientNet: -71413.87,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. -0 is to receive from Raj Nigam Jabalpur', 
      broker: '67: jain05', 
      clientPL: 12519.15, 
      clientBrokerage: 18491.57, 
      clientNet: -5972.42,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. -0 is to receive from Hitesh', 
      broker: '70: jain06', 
      clientPL: 298372.6, 
      clientBrokerage: 10843.52, 
      clientNet: 287529.08,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. 0 is to receive from Piyush sharma', 
      broker: '71: jain19', 
      clientPL: 0, 
      clientBrokerage: 0, 
      clientNet: 0,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    },
    { 
      name: 'Rs. 0 is to receive from Jitu bhai', 
      broker: '72: jain08', 
      clientPL: -449829.45, 
      clientBrokerage: 117934.72, 
      clientNet: -567764.17,
      plShare: 0,
      brokerageShare: 0,
      netShare: 0 
    }
  ];

  // Calculate totals
  const totals = {
    clientPL: accountsData.reduce((sum, item) => sum + item.clientPL, 0),
    clientBrokerage: accountsData.reduce((sum, item) => sum + item.clientBrokerage, 0),
    clientNet: accountsData.reduce((sum, item) => sum + item.clientNet, 0),
    plShare: 1136452.09,
    brokerageShare: 1161107.04,
    netShare: 24654.95
  };

  // Handler for calculate button
  const handleCalculate = () => {
    console.log('Calculate clicked', {
      fromDate,
      toDate,
    });
    // Implementation would go here
  };

  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: '#fff',
  } : {};

  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      {/* Title */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 600,
          color: mode === 'dark' ? '#fff' : theme.palette.text.primary
        }}
      >
        Accounts
      </Typography>

      {/* Header with Date Range Selection */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <DateRangePicker 
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onCalculate={handleCalculate}
          mode={mode}
        />
      </Box>

      {/* Accounts Table */}
      <AccountsTable 
        data={accountsData} 
        totals={totals} 
        mode={mode} 
      />
    </Box>
  );
} 