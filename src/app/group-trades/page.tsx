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
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function GroupTradesPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  // Form state
  const [id, setId] = useState('');
  const [scrip, setScrip] = useState('');
  const [segment, setSegment] = useState('All');
  const [userId, setUserId] = useState('');
  const [buyRate, setBuyRate] = useState('');
  const [sellRate, setSellRate] = useState('');
  const [lotsUnits, setLotsUnits] = useState('All');
  
  // Table data - no items initially
  const [rows, setRows] = useState([]);
  
  const handleSegmentChange = (event: SelectChangeEvent) => {
    setSegment(event.target.value);
  };
  
  const handleLotsUnitsChange = (event: SelectChangeEvent) => {
    setLotsUnits(event.target.value);
  };
  
  const handleSearch = () => {
    console.log('Search clicked');
    // Would implement search functionality here
  };
  
  const handleReset = () => {
    setId('');
    setScrip('');
    setSegment('All');
    setUserId('');
    setBuyRate('');
    setSellRate('');
    setLotsUnits('All');
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
        Group Trades
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Scrip"
              value={scrip}
              onChange={(e) => setScrip(e.target.value)}
              placeholder="Scrip"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="segment-label">Segment</InputLabel>
              <Select
                labelId="segment-label"
                id="segment"
                value={segment}
                onChange={handleSegmentChange}
                label="Segment"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="NSE">NSE</MenuItem>
                <MenuItem value="BSE">BSE</MenuItem>
                <MenuItem value="MCX">MCX</MenuItem>
                <MenuItem value="COMEX">COMEX</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Buy Rate"
              value={buyRate}
              onChange={(e) => setBuyRate(e.target.value)}
              placeholder="Buy Rate"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Sell Rate"
              value={sellRate}
              onChange={(e) => setSellRate(e.target.value)}
              placeholder="Sell Rate"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="lots-units-label">Lots / Units</InputLabel>
              <Select
                labelId="lots-units-label"
                id="lots-units"
                value={lotsUnits}
                onChange={handleLotsUnitsChange}
                label="Lots / Units"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>
            </FormControl>
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
          Showing 0 of items.
        </Typography>
        
        <TableContainer component={Paper} sx={{ 
          boxShadow: 'none',
          bgcolor: mode === 'dark' ? alpha('#0f172a', 0.4) : 'white',
          borderRadius: 1,
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                <TableCell sx={tableHeaderStyle}>ID</TableCell>
                <TableCell sx={tableHeaderStyle}>Scrip</TableCell>
                <TableCell sx={tableHeaderStyle}>Segment</TableCell>
                <TableCell sx={tableHeaderStyle}>User ID</TableCell>
                <TableCell sx={tableHeaderStyle}>Buy Rate</TableCell>
                <TableCell sx={tableHeaderStyle}>Sell Rate</TableCell>
                <TableCell sx={tableHeaderStyle}>Lots / Units</TableCell>
                <TableCell sx={tableHeaderStyle}>Bought at</TableCell>
                <TableCell sx={tableHeaderStyle}>Sold at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {/* Table row cells would go here */}
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