'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  alpha,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ClosedTradesPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  // Form state
  const [timeDiff, setTimeDiff] = useState('');
  const [scrip, setScrip] = useState('');
  const [username, setUsername] = useState('');
  
  // Mock data based on the image
  const mockRows = [
    {
      id: '3610326',
      scrip: 'GCM5',
      segment: 'COMEX',
      userId: '2606 9958955517',
      username: 'Sheetal Singh',
      buyRate: '3327.80000000',
      sellRate: '3328.00000000',
      lotsUnits: '0.1 / 10',
      profit: '160',
    },
    {
      id: '3610318',
      scrip: 'SILVERMIC25JUNFUT',
      segment: 'MCX',
      userId: '1753 Helo232',
      username: 'Dilip T S',
      buyRate: '96328.00000000',
      sellRate: '96365.00000000',
      lotsUnits: '1 / 1',
      profit: '37',
    },
    {
      id: '3610315',
      scrip: 'CRUDEOIL25MAYFUT',
      segment: 'MCX',
      userId: '329193 Helo1206',
      username: 'Manipal',
      buyRate: '5165.00000000',
      sellRate: '5128.00000000',
      lotsUnits: '0.2 / 20',
      profit: '-740',
    },
    {
      id: '3610314',
      scrip: 'VOLTAS25MAYFUT',
      segment: 'NSE',
      userId: '74539 Helo1161',
      username: 'Abhishek',
      buyRate: '1204.20000000',
      sellRate: '1241.00000000',
      lotsUnits: '5 / 1500',
      profit: '55200',
    },
    {
      id: '3610305',
      scrip: 'WIPRO25MAY247.5CE',
      segment: 'NSE',
      userId: '762 HELO110',
      username: 'Madam',
      buyRate: '4.40000000',
      sellRate: '4.40000000',
      lotsUnits: '15 / 45000',
      profit: '0',
    },
    {
      id: '3610297',
      scrip: 'VOLTAS25MAYFUT',
      segment: 'NSE',
      userId: '4325 8619622508',
      username: 'Lalit',
      buyRate: '1211.90000000',
      sellRate: '1234.70000000',
      lotsUnits: '0.167 / 50',
      profit: '1140',
    },
    {
      id: '3610295',
      scrip: 'TATACHEM25MAYFUT',
      segment: 'NSE',
      userId: '5046 9880733589',
      username: 'K S Panduranga',
      buyRate: '813.80000000',
      sellRate: '816.20000000',
      lotsUnits: '0.091 / 50',
      profit: '120',
    },
    {
      id: '3610294',
      scrip: 'TATACHEM25MAYFUT',
      segment: 'NSE',
      userId: '5046 9880733589',
      username: 'K S Panduranga',
      buyRate: '814.60000000',
      sellRate: '816.20000000',
      lotsUnits: '0.018 / 10',
      profit: '16',
    },
  ];
  
  const [rows, setRows] = useState(mockRows);
  
  const handleSearch = () => {
    console.log('Search clicked');
    // In a real application, we would filter the data based on the form values
  };
  
  const handleReset = () => {
    setTimeDiff('');
    setScrip('');
    setUsername('');
  };
  
  // Dark mode styles
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};
  
  // Table header styles
  const tableHeaderStyle = {
    fontWeight: 'bold',
    color: mode === 'dark' ? '#fff' : 'inherit',
  };
  
  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Closed Trades
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Time Diff. No. of seconds"
              value={timeDiff}
              onChange={(e) => setTimeDiff(e.target.value)}
              placeholder="No. of seconds"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Scrip"
              value={scrip}
              onChange={(e) => setScrip(e.target.value)}
              placeholder="e.g. GOLD"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ flex: 1 }}
            >
              SEARCH
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              sx={{ flex: 1 }}
            >
              RESET
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Showing 20 of 19510 items.
        </Typography>
        
        <TableContainer component={Paper} sx={{ 
          boxShadow: 'none',
          bgcolor: mode === 'dark' ? alpha('#0f172a', 0.4) : 'white',
          borderRadius: 1,
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '100px' }}></TableCell>
                <TableCell sx={{ ...tableHeaderStyle, width: '100px' }}>ID</TableCell>
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
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.scrip}</TableCell>
                    <TableCell>{row.segment}</TableCell>
                    <TableCell>{row.userId} : {row.username}</TableCell>
                    <TableCell>{row.buyRate}</TableCell>
                    <TableCell>{row.sellRate}</TableCell>
                    <TableCell>{row.lotsUnits}</TableCell>
                    <TableCell sx={{ 
                      color: parseFloat(row.profit) > 0 
                        ? 'success.main' 
                        : parseFloat(row.profit) < 0 
                          ? 'error.main' 
                          : 'text.primary'
                    }}>
                      {row.profit}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
} 