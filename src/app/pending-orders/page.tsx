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
  Chip,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useRouter } from 'next/navigation';

export default function PendingOrdersPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const router = useRouter();
  
  // State for tracking which column to sort by and the sort direction
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Mock data based on the reference image
  const mockData = [
    {
      id: '3610475',
      time: '2025-05-09 12:30:48',
      commodity: 'DIXON25MAYFUT',
      userId: '2219 : HELO725',
      trade: 'Sell',
      rate: '15201.00000000',
      lots: 2,
      condition: 'Below',
      status: 'Pending',
    },
    {
      id: '3610473',
      time: '2025-05-09 12:30:41',
      commodity: 'CRUDEOIL25MAYFUT',
      userId: '810 : HELO120',
      trade: 'Sell',
      rate: '5164.00000000',
      lots: 10,
      condition: 'Below',
      status: 'Pending',
    },
    {
      id: '3610471',
      time: '2025-05-09 12:30:33',
      commodity: 'NATURALGAS25MAYFUT',
      userId: '2113 : HELO628',
      trade: 'Sell',
      rate: '311.8000000',
      lots: 1,
      condition: 'Below',
      status: 'Pending',
    },
    {
      id: '3610470',
      time: '2025-05-09 12:30:33',
      commodity: 'NIFTY25515240000CE',
      userId: '56387 : 900069878',
      trade: 'Sell',
      rate: '235.0000000',
      lots: 1,
      condition: 'Below',
      status: 'Pending',
    },
    {
      id: '3610466',
      time: '2025-05-09 12:30:23',
      commodity: 'IIFL25MAYFUT',
      userId: '3738 : Helo945',
      trade: 'Sell',
      rate: '378.0000000',
      lots: 1,
      condition: 'Above',
      status: 'Pending',
    },
  ];
  
  const [rows, setRows] = useState(mockData);
  const [displayedRows, setDisplayedRows] = useState(50);
  const [totalRows, setTotalRows] = useState(209);
  
  // Handle sorting when a column header is clicked
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
    
    // Sort the data
    const sortedData = [...rows].sort((a, b) => {
      // Convert string values to appropriate types for comparison
      const valueA = a[column as keyof typeof a];
      const valueB = b[column as keyof typeof b];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        // For number comparison
        const numA = Number(valueA);
        const numB = Number(valueB);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
    });
    
    setRows(sortedData);
  };
  
  // Function to handle order completion
  const handleComplete = (id: string) => {
    console.log(`Completing order with ID: ${id}`);
    // In a real application, you would call an API to complete the order
  };
  
  // Function to handle navigation to create page
  const handleCreateOrder = () => {
    router.push('/pending-orders/create');
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
    cursor: 'pointer',
  };
  
  // Sort icon to display next to column header
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };
  
  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Pending Orders
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateOrder}
          sx={{ 
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#388e3c',
            },
            px: 3,
            py: 1,
          }}
        >
          CREATE PENDING ORDERS
        </Button>
      </Box>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Showing {displayedRows} of {totalRows} items.
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4, ...darkModeStyles }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...tableHeaderStyle }}>
                #
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }} onClick={() => handleSort('id')}>
                ID {renderSortIcon('id')}
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }} onClick={() => handleSort('time')}>
                TIME {renderSortIcon('time')}
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Commodity
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                User ID
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Trade
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Rate
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Lots
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Condition
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                Status
              </TableCell>
              <TableCell sx={{ ...tableHeaderStyle }}>
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { bgcolor: mode === 'dark' ? alpha('#fff', 0.05) : alpha('#000', 0.05) } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    {row.id}
                  </Box>
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.commodity}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.trade}</TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>{row.lots}</TableCell>
                <TableCell>{row.condition}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === 'Pending' ? 'primary' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleComplete(row.id)}
                    sx={{ 
                      fontSize: '0.7rem',
                      py: 0.5,
                    }}
                  >
                    COMPLETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 