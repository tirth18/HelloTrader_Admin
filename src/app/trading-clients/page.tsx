'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Chip,
  Stack,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getAllUsers } from '../../utils/api';

const accountStatusOptions = ['All', 'Active', 'Inactive'];

export default function TradingClientsPage() {
  const theme = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [accountStatus, setAccountStatus] = useState('All');
  const [tradingClients, setTradingClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        console.log("Raw user data:", data); // Log raw data for debugging
        setTradingClients(data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load trading clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Map API response to display data and apply filters
  const mappedAndFilteredClients = tradingClients.map(client => {
    console.log("Processing client:", client); // Log each client object
    
    // Calculate derived values or use defaults
    const grossPL = 0; // Replace with actual calculation if available
    const netPL = 0; // Replace with actual calculation if available
    
    return {
      id: client.id || client._id,
      fullName: `${client.name || ''} ${client.last_name || ''}`.trim(),
      username: client.username || client.user_id,
      ledgerBalance: client.funds ? (client.funds / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '0',
      creditLimit: (client.creditLimit || 0).toLocaleString('en-IN'),
      maxTradesAllowed: client.maxTradesAllowed || 0,
      // Display whatever is in the email and phone fields without validation
      email: client.email || '',
      phone: client.phone || '',
      grossPL,
      brokerage: client.EQBrokragePerCrore || 0,
      netPL,
      admin: client.broker_id || 'N/A',
      demo: false,
      status: client.accountStatus === true ? 'Active' : 'Inactive',
      isActive: client.accountStatus === true || client.is_active === true,
      // Add more fields from API for display if needed
      mcxTrading: client.mcxTrading === true ? 'Enabled' : 'Disabled',
      eqTrading: client.EQTrading === true ? 'Enabled' : 'Disabled',
      exposureMargin: client.intradayExposureMarginEQ || 0
    };
  }).filter(client =>
    (username === '' || client.username?.toLowerCase().includes(username.toLowerCase())) &&
    (accountStatus === 'All' || client.status === accountStatus)
  );

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Trading Client
        </Typography>
        {/* Filter/Search Bar */}
        <Paper elevation={0} sx={{ mb: 3, p: { xs: 2, sm: 3 }, borderRadius: 2, bgcolor: theme.palette.background.paper, boxShadow: 'none', border: `1px solid ${alpha(theme.palette.divider, 0.08)}` }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <TextField
                select
                label="Account Status"
                value={accountStatus}
                onChange={e => setAccountStatus(e.target.value)}
                size="small"
                fullWidth
              >
                {accountStatusOptions.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2} md={4} lg={3} sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="success" sx={{ minWidth: 120, fontWeight: 600 }}>SEARCH</Button>
              <Button variant="outlined" color="inherit" sx={{ minWidth: 120, fontWeight: 600 }}>RESET</Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="success" sx={{ fontWeight: 600 }} onClick={() => router.push('/trading-clients/create')}>
            CREATE TRADING CLIENTS
          </Button>
          <Button variant="contained" color="secondary" sx={{ fontWeight: 600 }}>SHOW ACTIVE USERS</Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Table */
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Box sx={{ px: 2, pt: 2, pb: 1, fontWeight: 500, color: 'text.secondary', fontSize: '0.95rem' }}>
              Showing {mappedAndFilteredClients.length} of {tradingClients.length} items.
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Ledger Balance</TableCell>
                    <TableCell align="right">Credit Limit</TableCell>
                    <TableCell align="right">Max Trades</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Account Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mappedAndFilteredClients.map((client, idx) => (
                    <TableRow key={client.id} hover>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Tooltip title="View">
                            <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Settings">
                            <IconButton size="small"><SettingsIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell>{client.id}</TableCell>
                      <TableCell>{client.fullName}</TableCell>
                      <TableCell>{client.username}</TableCell>
                      <TableCell align="right">₹{client.ledgerBalance}</TableCell>
                      <TableCell align="right">₹{client.creditLimit}</TableCell>
                      <TableCell align="right">{client.maxTradesAllowed}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <Chip 
                          label={client.status} 
                          size="small"
                          color={client.isActive ? 'success' : 'error'}
                          sx={{ 
                            fontWeight: 600,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </DashboardLayout>
  );
} 