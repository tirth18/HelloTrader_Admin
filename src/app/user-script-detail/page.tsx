'use client';

import React, { useState } from 'react';
import { Box, Typography, useTheme, Grid, Paper, Divider, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Menu, MenuItem, Popover, InputBase } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

interface TradeDetail {
  id: string;
  name: string;
  lots: number;
  avgBuyRate: number;
  avgSellRate: number;
  profitLoss: number;
  brokerage: number;
  netPL: number;
}

// Sample trade history data
const fundActivities = [
  { id: 'ID-001', date: '2023-05-10 09:38:25', amount: 10000, type: 'Deposit' },
  { id: 'ID-002', date: '2023-05-11 14:24:18', amount: 5000, type: 'Withdrawal' },
  { id: 'ID-003', date: '2023-05-12 11:09:45', amount: 2500, type: 'Deposit' },
  { id: 'ID-004', date: '2023-05-14 16:27:09', amount: 3000, type: 'Deposit' },
  { id: 'ID-005', date: '2023-05-15 08:09:17', amount: 7500, type: 'Opening Balance Opening Balance' },
];

// Sample closed trades data
const closedTrades = [
  { id: 'TR001', script: 'NIFTY5JUN23FUT', buyRate: 18240, sellRate: 18275, lots: 1, buyTimestamp: '2023-05-10 09:45:20', sellTimestamp: '2023-05-10 10:12:35', profitLoss: 1750, brokerage: 35.50, netPL: 1714.50 },
  { id: 'TR002', script: 'TATASTEEL23JUNFUT', buyRate: 105.25, sellRate: 107.50, lots: 2, buyTimestamp: '2023-05-11 11:30:15', sellTimestamp: '2023-05-11 15:45:22', profitLoss: 4500, brokerage: 90.00, netPL: 4410.00 },
  { id: 'TR003', script: 'RELIANCE23JUNFUT', buyRate: 2450.75, sellRate: 2435.20, lots: 1, buyTimestamp: '2023-05-12 09:15:00', sellTimestamp: '2023-05-12 12:30:45', profitLoss: -1555, brokerage: 48.80, netPL: -1603.80 }
];

export default function UserScriptDetailPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const searchParams = useSearchParams();
  
  // State for the actions dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // State for date pickers
  const [fromDate1, setFromDate1] = useState<Date | null>(null);
  const [toDate1, setToDate1] = useState<Date | null>(null);
  const [fromDate2, setFromDate2] = useState<Date | null>(null);
  const [toDate2, setToDate2] = useState<Date | null>(null);
  const [fromDate3, setFromDate3] = useState<Date | null>(null);
  const [toDate3, setToDate3] = useState<Date | null>(null);
  
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Get parameters from URL
  const scriptName = searchParams.get('script') || 'Unknown Script';
  const userId = searchParams.get('userId') || '0';
  const userName = searchParams.get('userName') || 'Unknown User';
  
  // For a real application, this data would be fetched based on scriptName and userId
  const userTradeDetail = {
    id: userId,
    name: userName,
    lots: 0.769,
    avgBuyRate: 254.75,
    avgSellRate: 262.05,
    profitLoss: 14600.00,
    brokerage: 258.40,
    netPL: 14341.60,
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        width: '100%',
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#0B1437' : '#F8FAFC',
        px: { xs: 2, md: 4 },
        py: 3
      }}>
        {/* Date Filter and Export Section */}
        <Box sx={{ 
          mb: 4, 
          width: '100%',
        }}>
          <Grid container spacing={2}>
            {/* Row 1 - Export Trades */}
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={fromDate1}
                onChange={(newValue) => setFromDate1(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "From Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={toDate1}
                onChange={(newValue) => setToDate1(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "To Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                sx={{
                  bgcolor: '#4BBECB',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '30px',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#3CABB6',
                    boxShadow: 'none',
                  }
                }}
              >
                EXPORT TRADES
              </Button>
            </Grid>
            
            {/* Row 2 - Download Trades PDF */}
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={fromDate2}
                onChange={(newValue) => setFromDate2(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "From Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={toDate2}
                onChange={(newValue) => setToDate2(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "To Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                sx={{
                  bgcolor: '#4BBECB',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '30px',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#3CABB6',
                    boxShadow: 'none',
                  }
                }}
              >
                DOWNLOAD TRADES PDF
              </Button>
            </Grid>
            
            {/* Row 3 - Export Funds */}
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={fromDate3}
                onChange={(newValue) => setFromDate3(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "From Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label=""
                value={toDate3}
                onChange={(newValue) => setToDate3(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "To Date",
                    sx: {
                      bgcolor: 'white',
                      borderRadius: '30px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '12px 20px',
                        color: '#000',
                        '&::placeholder': {
                          color: '#666',
                          opacity: 1,
                          fontWeight: 500
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                sx={{
                  bgcolor: '#4BBECB',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '30px',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#3CABB6',
                    boxShadow: 'none',
                  }
                }}
              >
                EXPORT FUNDS
              </Button>
            </Grid>
            
            {/* Row 4 - Actions and View Details */}
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                onClick={handleActionsClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  bgcolor: '#9C27B0',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '30px',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  justifyContent: 'space-between',
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#7B1FA2',
                    boxShadow: 'none',
                  }
                }}
              >
                ACTIONS
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: '220px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                  }
                }}
              >
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Update</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Reset Account</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Refresh Brokerage</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Duplicate</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Change Password</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>Delete Account</MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={12} md={9}>
              <Button
                fullWidth
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '30px',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#388E3C',
                    boxShadow: 'none',
                  }
                }}
              >
                VIEW DETAILS
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Script Title with underline styling */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: isDarkMode ? '#FFFFFF' : '#1E2022',
            fontWeight: 700,
            position: 'relative',
            paddingBottom: '8px',
            marginBottom: '16px',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '60px',
              height: '4px',
              background: '#3699FF',
              borderRadius: '2px',
            }
          }}
        >
          CME: {decodeURIComponent(scriptName)}
        </Typography>
        
        {/* User ID Label with blue styling */}
        <Typography 
          sx={{
            color: '#3699FF',
            fontSize: '1rem',
            fontWeight: 500,
            mb: 4
          }}
        >
          User ID: {userId} - {userName}
        </Typography>
        
        {/* Stats Cards - 3 in first row */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Lots
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1E2022',
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.lots.toFixed(3)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Avg Buy Rate
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1E2022',
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.avgBuyRate.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Avg Sell Rate
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1E2022',
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.avgSellRate.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Stats Cards - 3 in second row */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Profit / Loss
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: userTradeDetail.profitLoss >= 0 ? '#50CD89' : '#F1416C', // Green for profit, red for loss
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.profitLoss.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Brokerage
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: isDarkMode ? '#FFFFFF' : '#1E2022',
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.brokerage.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              p: 3,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  mb: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Net P/L
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: userTradeDetail.netPL >= 0 ? '#50CD89' : '#F1416C', // Green for profit, red for loss
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {userTradeDetail.netPL.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Fund - Withdrawal & Deposits Section */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            Fund - Withdrawal & Deposits
          </Typography>
          
          <Typography variant="caption" sx={{ color: isDarkMode ? '#8C98B4' : '#6E7A8A', mb: 2, display: 'block' }}>
            Showing 5 of 8 items
          </Typography>
          
          <TableContainer component={Paper} sx={{ 
            bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
            border: isDarkMode ? 'none' : '1px solid #EEF0F6'
          }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { 
                  bgcolor: isDarkMode ? '#1a2748' : '#F7F9FC', 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A', 
                  fontWeight: 600, 
                  fontSize: '0.8rem', 
                  py: 1.5 
                } }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundActivities.map((row) => (
                  <TableRow key={row.id} sx={{ '& td': { 
                    color: isDarkMode ? '#fff' : '#1E2022', 
                    borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #EEF0F6' 
                  } }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.amount.toFixed(2)}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        {/* Active Trades Section */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            Active Trades
          </Typography>
          
          <Typography 
            sx={{ 
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              py: 3,
              fontSize: '0.9rem',
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}
          >
            No records found
          </Typography>
        </Box>
        
        {/* Closed Trades Section */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            Closed Trades
          </Typography>
          
          <Typography variant="caption" sx={{ color: isDarkMode ? '#8C98B4' : '#6E7A8A', mb: 2, display: 'block' }}>
            Showing 3 of 3 items
          </Typography>
          
          <TableContainer component={Paper} sx={{ 
            bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
            borderRadius: 2,
            overflow: 'hidden',
            overflowX: 'auto',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
            border: isDarkMode ? 'none' : '1px solid #EEF0F6'
          }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { 
                  bgcolor: isDarkMode ? '#1a2748' : '#F7F9FC', 
                  color: isDarkMode ? '#8C98B4' : '#6E7A8A',
                  fontWeight: 600, 
                  fontSize: '0.75rem', 
                  py: 1.5 
                } }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Script</TableCell>
                  <TableCell>Buy Rate</TableCell>
                  <TableCell>Sell Rate</TableCell>
                  <TableCell>Lots</TableCell>
                  <TableCell>Buy Timestamp</TableCell>
                  <TableCell>Sell Timestamp</TableCell>
                  <TableCell>Profit / Loss</TableCell>
                  <TableCell>Brokerage</TableCell>
                  <TableCell>Net P/L</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {closedTrades.map((row) => (
                  <TableRow key={row.id} sx={{ '& td': { 
                    color: isDarkMode ? '#fff' : '#1E2022', 
                    borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #EEF0F6',
                    fontSize: '0.8rem' 
                  } }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell sx={{ color: '#3699FF' }}>{row.script}</TableCell>
                    <TableCell>{row.buyRate.toFixed(2)}</TableCell>
                    <TableCell>{row.sellRate.toFixed(2)}</TableCell>
                    <TableCell>{row.lots}</TableCell>
                    <TableCell>{row.buyTimestamp}</TableCell>
                    <TableCell>{row.sellTimestamp}</TableCell>
                    <TableCell sx={{ color: row.profitLoss >= 0 ? '#50CD89' : '#F1416C' }}>
                      {row.profitLoss.toFixed(2)}
                    </TableCell>
                    <TableCell>{row.brokerage.toFixed(2)}</TableCell>
                    <TableCell sx={{ color: row.netPL >= 0 ? '#50CD89' : '#F1416C' }}>
                      {row.netPL.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        {/* MCX Pending Orders */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            MCX Pending Orders
          </Typography>
          
          <Typography 
            sx={{ 
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              py: 3,
              fontSize: '0.9rem',
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}
          >
            No records found
          </Typography>
        </Box>
        
        {/* Equity Pending Orders */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            Equity Pending Orders
          </Typography>
          
          <Typography 
            sx={{ 
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              py: 3,
              fontSize: '0.9rem',
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}
          >
            No records found
          </Typography>
        </Box>
        
        {/* COMEX Pending Orders */}
        <Box sx={{ mb: 5 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: isDarkMode ? '#FFFFFF' : '#1E2022',
              fontWeight: 600,
              position: 'relative',
              paddingBottom: '8px',
              marginBottom: '16px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '50px',
                height: '3px',
                background: '#3699FF',
                borderRadius: '2px',
              }
            }}
          >
            COMEX Pending Orders
          </Typography>
          
          <Typography 
            sx={{ 
              color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              textAlign: 'center',
              py: 3,
              fontSize: '0.9rem',
              bgcolor: isDarkMode ? '#131F3E' : '#FFFFFF',
              borderRadius: 2,
              boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
              border: isDarkMode ? 'none' : '1px solid #EEF0F6'
            }}
          >
            No records found
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
} 