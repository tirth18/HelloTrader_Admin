"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Stack,
  Chip,
  useTheme,
  alpha,
  Card,
  CardContent,
  Avatar,
  Container,
  Divider,
  useMediaQuery,
  SelectChangeEvent,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  Payment as DepositIcon,
  MonetizationOn as WithdrawIcon,
  Add as AddIcon,
  Person as PersonIcon,
  AccountBalance as BalanceIcon,
  Group as GroupIcon,
  Percent as PercentIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import BrokerForm from './components/BrokerForm';
import ViewBrokerProfile from './components/ViewBrokerProfile';

interface BrokerData {
  id: string;
  username: string;
  parent: string;
  brokerageShare: number;
  profitShare: number;
  creditLimit: number;
  type: string;
  totalClients: number;
  refCode: string;
  accountStatus: string;
  balance: number;
}

// Define API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://192.168.1.6:8003';

interface BrokerListItem {
  id: number;
  username: string;
  parent_id: number | null;
  parent_username?: string;
  brokerage_share: number;
  profit_loss_share: number;
  trading_clients_limit: number;
  broker_type: string;
  clients_count: number;
  reference_code: string;
  account_status: string;
  is_active: boolean;
}

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: 'primary' | 'success' | 'info' | 'warning' | 'secondary' | 'error';
  trend: string;
}

export default function BrokerManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAddBrokerOpen, setIsAddBrokerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountStatus, setAccountStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brokers, setBrokers] = useState<BrokerListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<BrokerListItem | null>(null);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const auth = useAuth();

  const fetchBrokers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await auth.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/v1/brokers/`, {
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Accept': 'application/json'
        },
        params: {
          search: searchQuery || undefined,
          status: accountStatus !== 'all' ? accountStatus : undefined
        }
      });

      setBrokers(response.data);
    } catch (error: any) {
      console.error('Error fetching brokers:', error);
      setError(error.response?.data?.detail || 'Failed to fetch brokers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, [searchQuery, accountStatus]);

  const handleAddBroker = async (broker: any) => {
    setIsSubmitting(true);
    try {
      await fetchBrokers();
      setIsAddBrokerOpen(false);
    } catch (error: any) {
      console.error('Error refreshing brokers:', error);
      setError(error.response?.data?.detail || 'Failed to refresh broker list');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewProfile = (broker: BrokerListItem) => {
    setSelectedBroker(broker);
    setViewProfileOpen(true);
  };

  const handleReset = () => {
    setSearchQuery('');
    setAccountStatus('all');
  };

  const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Suspended':
        return 'warning';
      case 'Pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams<BrokerData>) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <IconButton 
              size="small"
              sx={{ 
                color: 'primary.main',
                '&:hover': { 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Broker">
            <IconButton 
              size="small"
              sx={{ 
                color: 'secondary.main',
                '&:hover': { 
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Profile">
            <IconButton 
              size="small"
              sx={{ 
                color: 'info.main',
                '&:hover': { 
                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deposit Funds">
            <IconButton 
              size="small"
              sx={{ 
                color: 'success.main',
                '&:hover': { 
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <DepositIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Withdraw Funds">
            <IconButton 
              size="small"
              sx={{ 
                color: 'warning.main',
                '&:hover': { 
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <WithdrawIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          #{params.value}
        </Typography>
      )
    },
    { 
      field: 'username', 
      headerName: 'Username', 
      width: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: `${theme.palette.primary.main}15`,
              color: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            {params.value.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {params.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {params.row.type}
            </Typography>
          </Box>
        </Stack>
      )
    },
    { 
      field: 'parent', 
      headerName: 'Parent', 
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'brokerageShare', 
      headerName: 'Brokerage Share', 
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: `${theme.palette.primary.main}15`,
              p: 0.5,
              borderRadius: 1
            }}
          >
            <PercentIcon fontSize="small" sx={{ color: 'primary.main' }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value}%
          </Typography>
        </Stack>
      )
    },
    { 
      field: 'profitShare', 
      headerName: 'Profit Share', 
      width: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: `${theme.palette.secondary.main}15`,
              p: 0.5,
              borderRadius: 1
            }}
          >
            <TrendingUpIcon fontSize="small" sx={{ color: 'secondary.main' }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value}%
          </Typography>
        </Stack>
      )
    },
    { 
      field: 'creditLimit', 
      headerName: 'Credit Limit', 
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: `${theme.palette.info.main}15`,
              p: 0.5,
              borderRadius: 1
            }}
          >
            <BalanceIcon fontSize="small" sx={{ color: 'info.main' }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Typography>
        </Stack>
      )
    },
    { 
      field: 'totalClients', 
      headerName: 'Clients', 
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: `${theme.palette.success.main}15`,
              p: 0.5,
              borderRadius: 1
            }}
          >
            <GroupIcon fontSize="small" sx={{ color: 'success.main' }} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.value}
          </Typography>
        </Stack>
      )
    },
    { 
      field: 'accountStatus', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => {
        const color = getStatusColor(params.value);
        return (
          <Chip 
            label={params.value}
            size="small"
            color={color}
            sx={{ 
              fontWeight: 600,
              borderRadius: 1,
              '& .MuiChip-label': { px: 2 }
            }}
          />
        );
      }
    }
  ];

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setAccountStatus(event.target.value);
  };

  const stats: StatCard[] = [
    {
      title: 'Total Brokers',
      value: brokers.length,
      icon: <PersonIcon />,
      color: 'primary',
      trend: '+12% from last month'
    },
    {
      title: 'Total Clients',
      value: brokers.reduce((acc, broker) => acc + broker.clients_count, 0),
      icon: <GroupIcon />,
      color: 'success',
      trend: '+5% from last month'
    },
    {
      title: 'Total Credit Limit',
      value: brokers.reduce((acc, broker) => acc + broker.trading_clients_limit, 0)
        .toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      icon: <BalanceIcon />,
      color: 'info',
      trend: '+8% from last month'
    },
    {
      title: 'Avg. Brokerage Share',
      value: ((brokers.reduce((acc, broker) => acc + broker.brokerage_share, 0) / brokers.length) || 0).toFixed(2) + '%',
      icon: <PercentIcon />,
      color: 'warning',
      trend: '+3% from last month'
    }
  ];

  return (
    <Box 
      component="main"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, md: 3 },
          overflow: 'auto',
          maxWidth: '100%'
        }}
      >
        {/* Header Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            gap: 2,
            width: '100%',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 0.5,
                color: theme.palette.primary.main,
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Broker Management
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 500
              }}
            >
              Manage and monitor all broker accounts and their activities in one place
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setIsAddBrokerOpen(true)}
              sx={{ 
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '8px',
                height: '40px',
                px: 2,
                whiteSpace: 'nowrap',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`
                },
                transition: 'all 0.2s ease'
              }}
            >
              Create Broker
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3, width: '100%' }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  bgcolor: `${theme.palette[stat.color].main}14`,
                  border: `1px solid ${theme.palette[stat.color].main}1f`,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${theme.palette[stat.color].main}14`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${theme.palette[stat.color].main}1f`
                  }
                } as const}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          bgcolor: `${theme.palette[stat.color].main}1f`,
                          color: theme.palette[stat.color].main
                        } as const}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: `${stat.color}.main`, mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: `${stat.color}.main`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontWeight: 600
                      }}
                    >
                      <TrendingUpIcon fontSize="small" />
                      {stat.trend}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      
        {/* Search & Filter Panel */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 2.5,
            mb: 3,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
            <FilterIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Search & Filters
            </Typography>
          </Stack>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      bgcolor: alpha(theme.palette.background.paper, 0.8),
                      '& fieldset': {
                        borderColor: alpha(theme.palette.divider, 0.2),
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={accountStatus}
                    onChange={handleStatusChange}
                    displayEmpty
                    sx={{
                      height: '40px',
                      bgcolor: alpha(theme.palette.background.paper, 0.8),
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.divider, 0.2),
                      }
                    }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    height: '40px',
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleReset}
                  sx={{
                    height: '40px',
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      
        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
      
        {/* Brokers Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Clients</TableCell>
                <TableCell>Brokerage Share</TableCell>
                <TableCell>Profit Share</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : brokers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No brokers found
                  </TableCell>
                </TableRow>
              ) : (
                brokers.map((broker) => (
                  <TableRow key={broker.id}>
                    <TableCell>{broker.username}</TableCell>
                    <TableCell>{broker.broker_type}</TableCell>
                    <TableCell>
                      <Chip
                        label={broker.account_status}
                        color={
                          broker.account_status === 'Active'
                            ? 'success'
                            : broker.account_status === 'Inactive'
                            ? 'error'
                            : 'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{broker.clients_count}</TableCell>
                    <TableCell>{broker.brokerage_share}%</TableCell>
                    <TableCell>{broker.profit_loss_share}%</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Profile">
                          <IconButton
                            size="small"
                            onClick={() => handleViewProfile(broker)}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy">
                          <IconButton size="small">
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Broker Dialog */}
      <BrokerForm
        open={isAddBrokerOpen}
        onClose={() => setIsAddBrokerOpen(false)}
        onSubmit={handleAddBroker}
        isSubmitting={isSubmitting}
      />

      {/* View Profile Dialog */}
      <ViewBrokerProfile
        open={viewProfileOpen}
        onClose={() => setViewProfileOpen(false)}
        broker={selectedBroker}
      />
    </Box>
  );
} 