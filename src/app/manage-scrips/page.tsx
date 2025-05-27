'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ManageScripPage() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [minStrikePrice, setMinStrikePrice] = useState('');
  const [maxStrikePrice, setMaxStrikePrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [scripts, setScripts] = useState([
    {
      id: '17517',
      scripId: 'ALUMINI25AUGFUT',
      expiry: '2025-08-29',
      marketType: 'MCX',
      lotSize: 1,
      strikePrice: 0,
      status: true
    },
    {
      id: '17516',
      scripId: 'ALUMINI25JULFUT',
      expiry: '2025-07-31',
      marketType: 'MCX',
      lotSize: 1,
      strikePrice: 0,
      status: true
    },
    {
      id: '17515',
      scripId: 'ALUMINI25JUNFUT',
      expiry: '2025-06-30',
      marketType: 'MCX',
      lotSize: 1,
      strikePrice: 0,
      status: true
    },
    {
      id: '17514',
      scripId: 'ALUMINI25MAYFUT',
      expiry: '2025-05-30',
      marketType: 'MCX',
      lotSize: 1,
      strikePrice: 0,
      status: false
    },
    {
      id: '17518',
      scripId: 'ALUMINI25SEPFUT',
      expiry: '2025-09-30',
      marketType: 'MCX',
      lotSize: 1,
      strikePrice: 0,
      status: true
    }
  ]);
  
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Handle row selection
  const handleRowSelect = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  // Handle search
  const handleSearch = () => {
    // In a real app, this would filter the data based on search criteria
    console.log('Searching with:', { searchQuery, minStrikePrice, maxStrikePrice, expiryDate });
  };

  // Set a specific row as selected (for the green highlighted row in the example)
  useEffect(() => {
    // This simulates the green highlighted row shown in the image
    setSelectedRows(['17514']);
  }, []);

  return (
    <Container maxWidth={false} sx={{ 
      p: 3,
      bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f5f5'
    }}>
      {/* Top buttons */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1, 
        mb: 2,
      }}>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#4CAF50',
            color: 'white',
            '&:hover': { bgcolor: '#388E3C' },
            fontWeight: 'bold',
          }}
        >
          MAP 5PAISA
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#4CAF50',
            color: 'white',
            '&:hover': { bgcolor: '#388E3C' },
            fontWeight: 'bold',
          }}
        >
          IMPORT 5PAISA SCRIPS
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#4CAF50',
            color: 'white',
            '&:hover': { bgcolor: '#388E3C' },
            fontWeight: 'bold',
          }}
        >
          ADD COMEX SCRIPS
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#4CAF50',
            color: 'white',
            '&:hover': { bgcolor: '#388E3C' },
            fontWeight: 'bold',
          }}
        >
          IMPORT COMEX SCRIPS
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#4CAF50',
            color: 'white',
            '&:hover': { bgcolor: '#388E3C' },
            fontWeight: 'bold',
          }}
        >
          IMPORT NEW SCRIPS
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#9C27B0',
            color: 'white',
            '&:hover': { bgcolor: '#7B1FA2' },
            fontWeight: 'bold',
          }}
        >
          SHOW MCX SCRIPS
        </Button>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1, 
        mb: 2,
      }}>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: alpha('#9e9e9e', 0.5),
            color: theme.palette.getContrastText(alpha('#9e9e9e', 0.5)),
            '&:hover': { bgcolor: alpha('#9e9e9e', 0.7) },
            fontWeight: 'bold',
          }}
        >
          SHOW NSE SCRIPS
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: alpha('#9e9e9e', 0.5),
            color: theme.palette.getContrastText(alpha('#9e9e9e', 0.5)),
            '&:hover': { bgcolor: alpha('#9e9e9e', 0.7) },
            fontWeight: 'bold',
          }}
        >
          SHOW OPTIONS SCRIPS
        </Button>
      </Box>
      
      {/* Search fields */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2, 
        mb: 3,
        alignItems: 'center',
      }}>
        <TextField 
          placeholder="Search Scrips e.g. BANKNIFTY" 
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 1,
            minWidth: '250px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.3),
              },
            }
          }}
        />
        <TextField 
          placeholder="Min. Strike Price" 
          variant="outlined"
          value={minStrikePrice}
          onChange={(e) => setMinStrikePrice(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.3),
              },
            }
          }}
        />
        <TextField 
          placeholder="Max. Strike Price" 
          variant="outlined"
          value={maxStrikePrice}
          onChange={(e) => setMaxStrikePrice(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.3),
              },
            }
          }}
        />
        <TextField 
          placeholder="Expiry Date" 
          variant="outlined"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(theme.palette.text.primary, 0.3),
              },
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          sx={{ 
            bgcolor: '#9C27B0',
            color: 'white',
            '&:hover': { bgcolor: '#7B1FA2' },
            fontWeight: 'bold',
          }}
        >
          SEARCH
        </Button>
      </Box>
      
      {/* Table */}
      <TableContainer component={Paper} sx={{ 
        mb: 3,
        boxShadow: 'none',
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#1e253a',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ 
                color: 'white',
                fontWeight: 'bold',
              }}>
                <Checkbox 
                  color="primary"
                  indeterminate={selectedRows.length > 0 && selectedRows.length < scripts.length}
                  checked={selectedRows.length === scripts.length}
                  onChange={() => {
                    if (selectedRows.length === scripts.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(scripts.map(script => script.id));
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID ⇧</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Scrip ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Expiry</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Market Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Lot Size</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Strike Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scripts.map((script) => (
              <TableRow 
                key={script.id}
                sx={{
                  bgcolor: selectedRows.includes(script.id) ? '#007500' : 'inherit',
                  '&:nth-of-type(odd)': {
                    bgcolor: selectedRows.includes(script.id) ? '#007500' : theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  },
                  '&:hover': {
                    bgcolor: selectedRows.includes(script.id) ? '#007500' : theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox 
                    color="primary"
                    checked={selectedRows.includes(script.id)}
                    onChange={() => handleRowSelect(script.id)}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{script.id}</TableCell>
                <TableCell sx={{ color: 'white' }}>{script.scripId}</TableCell>
                <TableCell sx={{ color: 'white' }}>{script.expiry}</TableCell>
                <TableCell sx={{ color: 'white' }}>{script.marketType}</TableCell>
                <TableCell sx={{ color: 'white' }}>{script.lotSize}</TableCell>
                <TableCell sx={{ color: 'white' }}>{script.strikePrice}</TableCell>
                <TableCell>
                  {script.status ? (
                    <CheckIcon sx={{ color: '#4CAF50' }} />
                  ) : (
                    <CloseIcon sx={{ color: '#f44336' }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
} 