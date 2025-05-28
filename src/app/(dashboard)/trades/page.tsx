'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  Button,
  useTheme,
  alpha,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TableSortLabel,
  Checkbox,
  SelectChangeEvent,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

interface Trade {
  id: string;
  scrip: string;
  segment: string;
  userId: string;
  buyRate: number;
  sellRate: number;
  lotsUnits: string;
  selected?: boolean;
}

const TradesPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [totalItems, setTotalItems] = useState(20288);
  const [orderBy, setOrderBy] = useState<keyof Trade>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  
  // Form state
  const [id, setId] = useState('');
  const [scrip, setScrip] = useState('');
  const [segment, setSegment] = useState('All');
  const [userId, setUserId] = useState('');
  const [buyRate, setBuyRate] = useState('');
  const [sellRate, setSellRate] = useState('');
  const [lotsUnits, setLotsUnits] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Mock data for initial development
  useEffect(() => {
    const mockTrades: Trade[] = [
      {
        id: '3609902',
        scrip: 'NIFTY25MAYFUT',
        segment: 'NSE',
        userId: '2029 : Nike 3 VJ',
        buyRate: 24078.1,
        sellRate: 0,
        lotsUnits: '6.667 / 500',
      },
      {
        id: '3609901',
        scrip: 'NMDC25MAYFUT',
        segment: 'NSE',
        userId: '3419 : Jayasree D',
        buyRate: 63.22,
        sellRate: 64.32,
        lotsUnits: '1 / 13500',
      },
      {
        id: '3609899',
        scrip: 'CME: Gold (GCM5)',
        segment: 'COMEX',
        userId: '4579 : Gita Rai',
        buyRate: 3324.5,
        sellRate: 3322,
        lotsUnits: '0.1 / 10',
      },
    ];
    setTrades(mockTrades);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Trade) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = trades.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching with filters:', {
      id, scrip, segment, userId, buyRate, sellRate, lotsUnits, fromDate, toDate
    });
  };

  const handleReset = () => {
    setId('');
    setScrip('');
    setSegment('All');
    setUserId('');
    setBuyRate('');
    setSellRate('');
    setLotsUnits('');
    setFromDate('');
    setToDate('');
  };

  const handleSegmentChange = (event: SelectChangeEvent) => {
    setSegment(event.target.value);
  };

  const handleExportTrades = () => {
    // Check if both dates are selected
    if (!fromDate || !toDate) {
      alert('Please select a From and To date before exporting trades.');
      
      // Focus the missing date field
      if (!fromDate) {
        const fromDateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
        if (fromDateInput) fromDateInput.focus();
      } else if (!toDate) {
        const toDateInputs = document.querySelectorAll('input[type="date"]');
        const toDateInput = toDateInputs[1] as HTMLInputElement;
        if (toDateInput) toDateInput.focus();
      }
      
      return;
    }

    // Validate date range
    if (new Date(fromDate) > new Date(toDate)) {
      alert('From Date cannot be later than To Date.');
      return;
    }

    // Proceed with export
    console.log('Exporting trades from', fromDate, 'to', toDate);
    // Add your export logic here
  };

  const darkModeStyles = mode === 'dark' ? {
    backgroundColor: alpha('#1e293b', 0.9),
    color: '#fff',
    '& .MuiTableCell-head': {
      backgroundColor: alpha('#0f172a', 0.8),
      color: '#fff',
    },
    '& .MuiTableCell-body': {
      borderColor: alpha('#334155', 0.1),
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: alpha('#334155', 0.2),
    },
    '& .MuiChip-root': {
      backgroundColor: alpha('#334155', 0.3),
    },
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: alpha('#1e293b', 0.6),
        '& fieldset': {
          borderColor: alpha('#64748b', 0.2),
        },
        '&:hover fieldset': {
          borderColor: alpha('#64748b', 0.4),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiInputLabel-root': {
        color: alpha('#cbd5e1', 0.7),
      },
      '& .MuiOutlinedInput-input': {
        color: '#fff',
      },
    },
    '& .MuiFormControl-root': {
      '& .MuiInputLabel-root': {
        color: alpha('#cbd5e1', 0.7),
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: alpha('#1e293b', 0.6),
        '& fieldset': {
          borderColor: alpha('#64748b', 0.2),
        },
        '&:hover fieldset': {
          borderColor: alpha('#64748b', 0.4),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiSelect-select': {
        color: '#fff',
      },
    },
  } : {};

  return (
    <Box sx={{ p: 3, ...darkModeStyles }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: mode === 'dark' ? '#fff' : '#0f172a' }}>
        Trades
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => router.push('/trades/create')}
          sx={{
            bgcolor: '#4caf50',
            '&:hover': {
              bgcolor: '#45a049',
            },
            width: '200px',
            height: '48px',
            fontWeight: 600,
          }}
        >
          CREATE TRADES
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="From Date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '200px' }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="To Date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '200px' }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleExportTrades}
          sx={{
            bgcolor: '#26a69a',
            '&:hover': {
              bgcolor: '#00897b',
            },
            width: '200px',
            height: '48px',
            fontWeight: 600,
          }}
        >
          EXPORT TRADES
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Scrip"
            value={scrip}
            onChange={(e) => setScrip(e.target.value)}
            placeholder="Scrip"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
              <MenuItem value="COMEX">COMEX</MenuItem>
              <MenuItem value="MCX">MCX</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Buy Rate"
            value={buyRate}
            onChange={(e) => setBuyRate(e.target.value)}
            placeholder="Buy Rate"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Sell Rate"
            value={sellRate}
            onChange={(e) => setSellRate(e.target.value)}
            placeholder="Sell Rate"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Lots / Units"
            value={lotsUnits}
            onChange={(e) => setLotsUnits(e.target.value)}
            placeholder="Lots / Units"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch}
            sx={{ 
              flex: 1,
              bgcolor: '#4caf50',
              '&:hover': {
                bgcolor: '#45a049',
              },
            }}
          >
            SEARCH
          </Button>
          <Button 
            variant="contained" 
            onClick={handleReset}
            sx={{ 
              flex: 1,
              bgcolor: '#9e9e9e',
              '&:hover': {
                bgcolor: '#757575',
              },
            }}
          >
            RESET
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: mode === 'dark' ? '#cbd5e1' : '#64748b' }}>
          Showing 20 of {totalItems} items.
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
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < trades.length}
                  checked={trades.length > 0 && selected.length === trades.length}
                  onChange={handleSelectAllClick}
                  sx={{ 
                    color: mode === 'dark' ? '#cbd5e1' : undefined,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Actions</TableCell>
              <TableCell 
                sortDirection={orderBy === 'id' ? order : false}
                sx={{ color: mode === 'dark' ? '#fff' : undefined }}
              >
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                  sx={{ 
                    color: mode === 'dark' ? '#fff !important' : undefined,
                    '&.MuiTableSortLabel-active': {
                      color: mode === 'dark' ? '#fff !important' : undefined,
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: mode === 'dark' ? '#fff !important' : undefined,
                    },
                  }}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Scrip</TableCell>
              <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Segment</TableCell>
              <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>User ID</TableCell>
              <TableCell align="right" sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Buy Rate</TableCell>
              <TableCell align="right" sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Sell Rate</TableCell>
              <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>Lots / Units</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade) => {
              const isItemSelected = isSelected(trade.id);
              
              return (
                <TableRow 
                  key={trade.id}
                  selected={isItemSelected}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: mode === 'dark' 
                        ? alpha(theme.palette.primary.main, 0.1) 
                        : alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        backgroundColor: mode === 'dark' 
                          ? alpha(theme.palette.primary.main, 0.15) 
                          : alpha(theme.palette.primary.main, 0.12),
                      },
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={() => handleClick(trade.id)}
                      sx={{ 
                        color: mode === 'dark' ? alpha('#cbd5e1', 0.7) : undefined,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" sx={{ color: mode === 'dark' ? '#64b5f6' : '#2196f3' }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: mode === 'dark' ? '#4caf50' : '#43a047' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: mode === 'dark' ? '#e57373' : '#ef5350' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>{trade.id}</TableCell>
                  <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>{trade.scrip}</TableCell>
                  <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>{trade.segment}</TableCell>
                  <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>{trade.userId}</TableCell>
                  <TableCell align="right" sx={{ color: mode === 'dark' ? '#fff' : undefined }}>
                    {trade.buyRate}
                  </TableCell>
                  <TableCell align="right" sx={{ color: mode === 'dark' ? '#fff' : undefined }}>
                    {trade.sellRate}
                  </TableCell>
                  <TableCell sx={{ color: mode === 'dark' ? '#fff' : undefined }}>{trade.lotsUnits}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: mode === 'dark' ? '#fff' : undefined,
          '& .MuiTablePagination-selectIcon': {
            color: mode === 'dark' ? '#cbd5e1' : undefined,
          },
          '& .MuiTablePagination-select': {
            color: mode === 'dark' ? '#fff' : undefined,
          },
          '& .MuiTablePagination-selectLabel': {
            color: mode === 'dark' ? '#cbd5e1' : undefined,
          },
          '& .MuiTablePagination-displayedRows': {
            color: mode === 'dark' ? '#cbd5e1' : undefined,
          },
          '& .MuiIconButton-root': {
            color: mode === 'dark' ? '#cbd5e1' : undefined,
          },
        }}
      />
    </Box>
  );
};

export default TradesPage; 