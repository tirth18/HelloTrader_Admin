'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Grid,
  InputAdornment,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function DeleteTradesPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  // Form state
  const [username, setUsername] = useState('');
  
  // Mock data based on the reference image
  const mockRows = [
    {
      id: '3607921',
      scrip: 'NIFTY2551523850PE',
      segment: 'NSE',
      userId: '38618 Helo1156',
      userDetail: 'R10',
      buyRate: '231.10000000',
      sellRate: '',
      lotsUnits: '0 lots',
      profit: '0',
    },
    {
      id: '3606111',
      scrip: 'HGN5',
      segment: 'COMEX',
      userId: '2041 HELO558',
      userDetail: 'Suresh',
      buyRate: '4.60700000',
      sellRate: '4.59850000',
      lotsUnits: '0.1 lots',
      profit: '-1700',
    },
    {
      id: '3603748',
      scrip: 'GOLD25JUNFUT',
      segment: 'MCX',
      userId: '2155 HELO670',
      userDetail: 'Kanubhai mecwan',
      buyRate: '97218.00000000',
      sellRate: '96820.00000000',
      lotsUnits: '0.1 lots',
      profit: '-3980',
    },
    {
      id: '3603747',
      scrip: 'TITAN25MAYFUT',
      segment: 'NSE',
      userId: '2155 HELO670',
      userDetail: 'Kanubhai mecwan',
      buyRate: '3368.90000000',
      sellRate: '3350.00000000',
      lotsUnits: '0.143 lots',
      profit: '-472.5',
    },
    {
      id: '3603746',
      scrip: 'MCX25MAYFUT',
      segment: 'NSE',
      userId: '2155 HELO670',
      userDetail: 'Kanubhai mecwan',
      buyRate: '5981.00000000',
      sellRate: '5978.50000000',
      lotsUnits: '0.25 lots',
      profit: '-62.5',
    },
    {
      id: '3601850',
      scrip: 'CRUDEOIL25MAYFUT',
      segment: 'MCX',
      userId: '2219 HELO725',
      userDetail: 'Neeraj',
      buyRate: '5075.00000000',
      sellRate: '5050.00000000',
      lotsUnits: '2 lots',
      profit: '-5000',
    },
    {
      id: '3601729',
      scrip: 'IDFCFIRSTB25MAYFUT',
      segment: 'NSE',
      userId: '3006 9993783456',
      userDetail: 'Sandeep',
      buyRate: '66.22000000',
      sellRate: '66.51000000',
      lotsUnits: '1 lots',
      profit: '2175',
    },
    {
      id: '3601038',
      scrip: 'PNB25MAYFUT',
      segment: 'NSE',
      userId: '3006 9993783456',
      userDetail: 'Sandeep',
      buyRate: '91.49000000',
      sellRate: '91.91000000',
      lotsUnits: '0.972 lots',
      profit: '3266.34',
    },
  ];
  
  const [rows, setRows] = useState(mockRows);
  const [displayedRows, setDisplayedRows] = useState(20);
  const [totalRows, setTotalRows] = useState(306);
  
  const handleSearch = () => {
    console.log('Search clicked');
    // In a real application, we would filter the data based on the username
    if (username) {
      const filtered = mockRows.filter(row => 
        row.userDetail.toLowerCase().includes(username.toLowerCase())
      );
      setRows(filtered);
    } else {
      setRows(mockRows);
    }
  };
  
  const handleReset = () => {
    setUsername('');
    setRows(mockRows);
  };
  
  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};
  
  // Table header styles
  const tableHeaderStyle = {
    fontWeight: 'bold',
    color: mode === 'dark' ? '#fff' : '#000',
  };
  
  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Delete Trades
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
              sx={{ 
                py: 1.5,
                bgcolor: theme.palette.success.main,
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                },
              }}
            >
              SEARCH
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              fullWidth
              sx={{ 
                py: 1.5,
              }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Showing {displayedRows} of {totalRows} items.
        </Typography>
      </Box>
      
      <TableContainer component={Paper} sx={{ 
        boxShadow: 'none',
        bgcolor: mode === 'dark' ? alpha('#0f172a', 0.4) : 'white',
        borderRadius: 1,
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60px' }}></TableCell>
              <TableCell sx={{ ...tableHeaderStyle, width: '100px' }}>ID ⇧</TableCell>
              <TableCell sx={tableHeaderStyle}>Scrip</TableCell>
              <TableCell sx={tableHeaderStyle}>Segment</TableCell>
              <TableCell sx={tableHeaderStyle}>User ID</TableCell>
              <TableCell sx={tableHeaderStyle}>Buy Rate</TableCell>
              <TableCell sx={tableHeaderStyle}>Sell Rate</TableCell>
              <TableCell sx={tableHeaderStyle}>Lots / Units</TableCell>
              <TableCell sx={tableHeaderStyle}>Profit/Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.error.main }}
                      onClick={() => console.log(`Delete trade ${row.id}`)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.scrip}</TableCell>
                  <TableCell>{row.segment}</TableCell>
                  <TableCell>{`${row.userId} : ${row.userDetail}`}</TableCell>
                  <TableCell>{row.buyRate}</TableCell>
                  <TableCell>{row.sellRate}</TableCell>
                  <TableCell>{row.lotsUnits}</TableCell>
                  <TableCell 
                    sx={{ 
                      color: parseFloat(row.profit) > 0 
                        ? theme.palette.success.main 
                        : parseFloat(row.profit) < 0 
                          ? theme.palette.error.main 
                          : 'inherit' 
                    }}
                  >
                    {row.profit}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 