'use client';

import React, { useEffect, useState } from 'react';
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
  Pagination,
  CircularProgress,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { ClosedTrade, ClosedTradesRequest, getClosedTrades } from '@/services/trades-service';

export default function ClosedTradesPage() {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const router = useRouter();
  
  // Form state
  const [timeDiff, setTimeDiff] = useState('');
  const [scrip, setScrip] = useState('');
  const [username, setUsername] = useState('');
  
  // API state
  const [trades, setTrades] = useState<ClosedTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Fetch trades data
  const fetchTrades = async (searchParams?: ClosedTradesRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: ClosedTradesRequest = {
        page,
        limit,
        ...searchParams,
      };
      
      const response = await getClosedTrades(params);
      
      setTrades(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch closed trades');
      console.error('Error fetching trades:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load data on component mount and when page changes
  useEffect(() => {
    fetchTrades();
  }, [page]);

  // Initial load effect
  useEffect(() => {
    console.log('Closed Trades page loaded');
    // Check if token exists on page load
    const checkToken = async () => {
      const { getAuthToken } = await import('../../utils/tokenUtils');
      const token = getAuthToken();
      if (!token) {
        setError('No authentication token found. Please login or set a test token.');
      }
    };
    checkToken();
  }, []);
  
  const handleSearch = () => {
    console.log('Search clicked');
    setPage(1); // Reset to first page when searching
    fetchTrades({
      timeDiff: timeDiff || undefined,
      scrip: scrip || undefined,
      username: username || undefined,
    });
  };
  
  const handleReset = () => {
    setTimeDiff('');
    setScrip('');
    setUsername('');
    setPage(1);
    fetchTrades(); // Fetch without filters
  };
  
  const handleRefresh = () => {
    fetchTrades({
      timeDiff: timeDiff || undefined,
      scrip: scrip || undefined,
      username: username || undefined,
    });
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleDebugToken = async () => {
    const { debugLocalStorage } = await import('../../utils/tokenUtils');
    debugLocalStorage();
  };

  const handleSetTestToken = async () => {
    const { setAuthToken } = await import('../../utils/tokenUtils');
    // Set the token from your curl command for testing
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2ODA5ZDcyOTI0YzQ5YTRiNzg1ZTI0NDc6VVhBTERBNnkiLCJpYXQiOjE3NDgyMzMzOTZ9.TQ1iXK65uyE9aoG-Y3ZCIbgak3tj21px47jDEGdEYJ0';
    setAuthToken(testToken);
    setError(null); // Clear any existing errors
    // Refresh the data after setting token
    handleRefresh();
  };

  const handleTestAPI = async () => {
    try {
      setError(null);
      console.log('Testing API directly...');
      
      // Import axios instance to test the API
      const axiosInstance = (await import('../../services/axiosInstance')).default;
      
      const response = await axiosInstance.get('/api/getAllTradeByStatus/closed?page=1&limit=10');
      console.log('Direct API test response:', response.data);
      
      setError(null);
      alert('API test successful! Check console for response data.');
    } catch (err: any) {
      console.error('Direct API test failed:', err);
      setError(`API test failed: ${err.message}`);
    }
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
  
  // Handle edit click
  const handleEditClick = (id: string) => {
    router.push(`/closed-trades/update?id=${id}`);
  };
  
  // Handle view click
  const handleViewClick = (id: string) => {
    router.push(`/closed-trades/view?id=${id}`);
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
                <TableCell sx={tableHeaderStyle}>Time Diff</TableCell>
                <TableCell sx={tableHeaderStyle}>Bought at</TableCell>
                <TableCell sx={tableHeaderStyle}>Sold at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : trades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center" sx={{ py: 4 }}>
                    No closed trades found
                  </TableCell>
                </TableRow>
              ) : (
                trades.map((trade) => (
                  <TableRow key={trade.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleViewClick(trade.id)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditClick(trade._id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{trade.id || trade._id || 'N/A'}</TableCell>
                    <TableCell>{trade.script || trade.symbol || trade.scrip || 'N/A'}</TableCell>
                    <TableCell>{trade.segment || 'N/A'}</TableCell>
                    <TableCell>{trade.user_id || trade.userId || 'N/A'} : {trade.name || 'N/A'}</TableCell>
                    <TableCell>{trade.buy_rate || trade.buyRate || 'N/A'}</TableCell>
                    <TableCell>{trade.sell_rate || trade.sellRate || 'N/A'}</TableCell>
                    <TableCell>{trade.lots || trade.units || 'N/A'}</TableCell>
                    <TableCell sx={{ 
                      color: parseFloat(String(trade.profit || trade.pnl || 0)) > 0 
                        ? 'success.main' 
                        : parseFloat(String(trade.profit || trade.pnl || 0)) < 0 
                          ? 'error.main' 
                          : 'text.primary'
                    }}>
                      {trade.profit || trade.pnl || '0'}
                    </TableCell>
                    <TableCell>{trade.timeDifferenceInSeconds || trade.timeDiff || 'N/A'}</TableCell>
                    <TableCell>{trade.Bought_at || trade.boughtAt || trade.createdAt || 'N/A'}</TableCell>
                    <TableCell>{trade.Sold_at || trade.soldAt || trade.updatedAt || 'N/A'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              disabled={loading}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
} 