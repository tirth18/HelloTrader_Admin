'use client';

import React, { useState } from 'react';
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

const accountStatusOptions = ['All', 'Active', 'Inactive'];

// 7 static entries for demonstration
const tradingClients = [
  {
    id: 650,
    fullName: 'DEMO ID',
    username: 'DEMO1124',
    ledgerBalance: 48564.95,
    grossPL: -567.3,
    brokerage: 868.76,
    netPL: -1436.06,
    admin: 'jain01',
    demo: false,
    status: 'Active',
  },
  {
    id: 651,
    fullName: 'Kamlesh Ji',
    username: 'HELO01',
    ledgerBalance: 23.5,
    grossPL: 0,
    brokerage: 0,
    netPL: 0,
    admin: 'jain30',
    demo: false,
    status: 'Active',
  },
  {
    id: 652,
    fullName: 'Ravi Kumar',
    username: 'RAVI123',
    ledgerBalance: 12000,
    grossPL: 500,
    brokerage: 100,
    netPL: 400,
    admin: 'admin1',
    demo: true,
    status: 'Inactive',
  },
  {
    id: 653,
    fullName: 'Priya Singh',
    username: 'PRIYA01',
    ledgerBalance: 15000,
    grossPL: 1200,
    brokerage: 200,
    netPL: 1000,
    admin: 'admin2',
    demo: false,
    status: 'Active',
  },
  {
    id: 654,
    fullName: 'Amit Patel',
    username: 'AMITP',
    ledgerBalance: 8000,
    grossPL: -300,
    brokerage: 50,
    netPL: -350,
    admin: 'jain01',
    demo: false,
    status: 'Active',
  },
  {
    id: 655,
    fullName: 'Sunita Rao',
    username: 'SUNITA',
    ledgerBalance: 5000,
    grossPL: 0,
    brokerage: 0,
    netPL: 0,
    admin: 'admin3',
    demo: true,
    status: 'Inactive',
  },
  {
    id: 656,
    fullName: 'Vikas Sharma',
    username: 'VIKAS',
    ledgerBalance: 25000,
    grossPL: 2000,
    brokerage: 300,
    netPL: 1700,
    admin: 'jain30',
    demo: false,
    status: 'Active',
  },
];

export default function TradingClientsPage() {
  const theme = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [accountStatus, setAccountStatus] = useState('All');

  // Filtered data (for demo, just filter by username and status)
  const filteredClients = tradingClients.filter(client =>
    (username === '' || client.username.toLowerCase().includes(username.toLowerCase())) &&
    (accountStatus === 'All' || client.status === accountStatus)
  );

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Trading Clients
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

        {/* Table */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Box sx={{ px: 2, pt: 2, pb: 1, fontWeight: 500, color: 'text.secondary', fontSize: '0.95rem' }}>
            Showing {filteredClients.length} of {tradingClients.length} items.
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
                  <TableCell align="right">Gross P/L</TableCell>
                  <TableCell align="right">Brokerage</TableCell>
                  <TableCell align="right">Net P/L</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Demo Account?</TableCell>
                  <TableCell>Account Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClients.map((client, idx) => (
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
                        <Tooltip title={client.grossPL >= 0 ? 'Profit' : 'Loss'}>
                          <IconButton size="small">
                            {client.grossPL >= 0 ? (
                              <ArrowUpwardIcon sx={{ color: theme.palette.success.main }} fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon sx={{ color: theme.palette.error.main }} fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>
                        <CurrencyRupeeIcon sx={{ fontSize: 16, color: theme.palette.text.secondary, ml: 0.5 }} />
                      </Stack>
                    </TableCell>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.fullName}</TableCell>
                    <TableCell>{client.username}</TableCell>
                    <TableCell align="right">{client.ledgerBalance}</TableCell>
                    <TableCell align="right" sx={{ color: client.grossPL >= 0 ? theme.palette.success.main : theme.palette.error.main }}>{client.grossPL}</TableCell>
                    <TableCell align="right">{client.brokerage}</TableCell>
                    <TableCell align="right" sx={{ color: client.netPL >= 0 ? theme.palette.success.main : theme.palette.error.main }}>{client.netPL}</TableCell>
                    <TableCell>{client.admin}</TableCell>
                    <TableCell>{client.demo ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={client.status}
                        size="small"
                        color={client.status === 'Active' ? 'success' : 'default'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </DashboardLayout>
  );
} 