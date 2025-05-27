'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  Chip,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useRouter } from 'next/navigation';

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
  
export default function PendingOrdersPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const router = useRouter();

  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [rows, setRows] = useState(mockData);
  const [displayedRows] = useState(5);
  const [totalRows] = useState(209);
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    const sortedData = [...rows].sort((a, b) => {
      const valueA = a[column as keyof typeof a];
      const valueB = b[column as keyof typeof b];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        const numA = Number(valueA);
        const numB = Number(valueB);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
    });
    setRows(sortedData);
  };
  
  const handleCreateOrder = () => {
    router.push('/pending-orders/create');
  };
  
  const darkModeStyles = mode === 'dark' ? {
    bgcolor: alpha('#0f172a', 0.95),
    color: 'white',
  } : {};
  
  const tableHeaderStyle = {
    fontWeight: 'bold',
    color: mode === 'dark' ? '#fff' : '#000',
    cursor: 'pointer',
    fontSize: '1rem',
    letterSpacing: 0.2,
    background: mode === 'dark' ? alpha('#1e293b', 0.7) : '#f4f6fb',
    borderBottom: mode === 'dark' ? '1px solid #222b3c' : '1px solid #e0e7ef',
  };
  
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };
  
  return (
    <Box sx={{ p: { xs: 1, md: 4 }, ...darkModeStyles, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: mode === 'dark' ? '#fff' : '#1e293b' }}>
          Pending Orders
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateOrder}
          sx={{ 
            px: 3,
            py: 1.2,
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 2,
            boxShadow: 'none',
            textTransform: 'none',
          }}
        >
          Create Pending Order
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mb: 2, color: mode === 'dark' ? '#b0b8c1' : '#4b5563' }}>
        Showing {displayedRows} of {totalRows} items.
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, ...darkModeStyles }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyle}>#</TableCell>
              <TableCell sx={tableHeaderStyle} onClick={() => handleSort('id')}>
                ID {renderSortIcon('id')}
              </TableCell>
              <TableCell sx={tableHeaderStyle} onClick={() => handleSort('time')}>
                Time {renderSortIcon('time')}
              </TableCell>
              <TableCell sx={tableHeaderStyle}>Commodity</TableCell>
              <TableCell sx={tableHeaderStyle}>User ID</TableCell>
              <TableCell sx={tableHeaderStyle}>Trade</TableCell>
              <TableCell sx={tableHeaderStyle}>Rate</TableCell>
              <TableCell sx={tableHeaderStyle}>Lots</TableCell>
              <TableCell sx={tableHeaderStyle}>Condition</TableCell>
              <TableCell sx={tableHeaderStyle}>Status</TableCell>
              <TableCell sx={tableHeaderStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:hover': { bgcolor: mode === 'dark' ? alpha('#fff', 0.03) : alpha('#000', 0.03) } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => router.push(`/pending-orders/view/${row.id}`)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.id}</Typography>
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
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ fontSize: '0.8rem', py: 0.5, borderRadius: 2, fontWeight: 600 }}
                  >
                    Complete
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