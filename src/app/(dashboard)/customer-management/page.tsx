'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  alpha,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  AccountBalanceWallet as WalletIcon,
  VerifiedUser as VerifiedIcon,
  TrendingUp as TrendingUpIcon,
  FilterList as FilterIcon,
  DoNotDisturb as DoNotDisturbIcon,
  PauseCircleOutline as PauseCircleOutlineIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Block as BlockIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getCustomers, deleteCustomer, CustomerData } from '../../../services/customerService';
import { useSnackbar } from 'notistack';

// More flexible interface to handle API response variations
interface ApiCustomer {
  id?: number;
  personal_details?: {
    name?: string;
    username?: string;
    mobile?: string;
    initial_funds?: number;
    city?: string;
  };
  personalDetails?: {
    name?: string;
    username?: string;
    mobile?: string;
    initial_funds?: number;
    city?: string;
  };
  name?: string;
  username?: string;
  mobile?: string;
  phone?: string;
  city?: string;
  initial_funds?: number;
  config?: {
    account_status?: string;
    demo_account?: boolean;
  };
  status?: string;
  accountStatus?: string;
  demo_account?: boolean;
  other?: {
    broker?: string;
  };
  broker?: string;
}

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: 'primary' | 'success' | 'info' | 'warning' | 'secondary' | 'error';
  trend: string;
}

const CustomerManagementPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [customers, setCustomers] = useState<ApiCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountStatus, setAccountStatus] = useState('all');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      console.log('API Response:', data);
      
      // If using search or filter, you would apply them here
      let filteredCustomers = data;
      
      if (searchQuery) {
        filteredCustomers = filteredCustomers.filter((customer: ApiCustomer) => {
          const name = customer.personal_details?.name || customer.name || customer.personalDetails?.name || '';
          const username = customer.personal_details?.username || customer.username || customer.personalDetails?.username || '';
          return name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 username.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }
      
      if (accountStatus !== 'all') {
        filteredCustomers = filteredCustomers.filter((customer: ApiCustomer) => {
          const status = customer.config?.account_status || customer.status || customer.accountStatus || '';
          return status === accountStatus;
        });
      }
      
      setCustomers(filteredCustomers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers. Please try again later.');
      enqueueSnackbar('Failed to fetch customers', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchQuery, accountStatus]);

  const handleAddCustomer = () => {
    router.push('/customer-management/create');
  };

  const handleViewCustomer = (id: number) => {
    router.push(`/customer-management/${id}`);
  };

  const handleEditCustomer = (id: number) => {
    router.push(`/customer-management/${id}/edit`);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setCustomerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleDeleteCustomer = async () => {
    if (customerToDelete === null) return;
    
    try {
      await deleteCustomer(customerToDelete);
      setCustomers(customers.filter(customer => customer.id !== customerToDelete));
      enqueueSnackbar('Customer deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Failed to delete customer', { variant: 'error' });
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setAccountStatus('all');
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setAccountStatus(event.target.value);
  };
  
  const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'default' => {
    switch (status && status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'suspended':
        return 'warning';
      case 'pending':
        return 'info';
      case 'review':
        return 'primary';
      case 'blocked':
        return 'secondary';
      case 'n/a':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status && status.toLowerCase()) {
      case 'active':
        return <VerifiedIcon fontSize="small" />;
      case 'inactive':
        return <DoNotDisturbIcon fontSize="small" />;
      case 'suspended':
        return <PauseCircleOutlineIcon fontSize="small" />;
      case 'pending':
        return <HourglassEmptyIcon fontSize="small" />;
      case 'review':
        return <ViewIcon fontSize="small" />;
      case 'blocked':
        return <BlockIcon fontSize="small" />;
      default:
        return <HelpOutlineIcon fontSize="small" />;
    }
  };

  // Calculate statistics for the cards
  const totalCustomers = customers.length;
  
  const activeCustomers = customers.filter(customer => {
    const status = customer.config?.account_status || customer.status || customer.accountStatus || '';
    return status === 'Active';
  }).length;
  
  const demoAccounts = customers.filter(customer => {
    return customer.config?.demo_account || customer.demo_account;
  }).length;
  
  const totalFunds = customers.reduce((acc, customer) => {
    const funds = customer.personal_details?.initial_funds || 
                 customer.initial_funds || 
                 customer.personalDetails?.initial_funds || 0;
    return acc + funds;
  }, 0);

  // Stat cards data
  const stats: StatCard[] = [
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: <PersonIcon />,
      color: 'primary',
      trend: '+8% from last month'
    },
    {
      title: 'Active Customers',
      value: activeCustomers,
      icon: <VerifiedIcon />,
      color: 'success',
      trend: '+5% from last month'
    },
    {
      title: 'Demo Accounts',
      value: demoAccounts,
      icon: <TrendingUpIcon />,
      color: 'info',
      trend: '+12% from last month'
    },
    {
      title: 'Total Funds',
      value: totalFunds.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      icon: <WalletIcon />,
      color: 'warning',
      trend: '+10% from last month'
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
              Customer Management
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 500
              }}
            >
              Manage all customer accounts and their trading configurations
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAddCustomer}
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
              Add Customer
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
          <form onSubmit={(e) => { e.preventDefault(); fetchCustomers(); }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by name or username"
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
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Review">Review</MenuItem>
                    <MenuItem value="Blocked">Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
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

        {/* Customers Table */}
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%',
            overflow: 'hidden',
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Broker</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Box py={3}>
                          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                            No customers found
                          </Typography>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<AddIcon />}
                            onClick={handleAddCustomer}
                          >
                            Add Customer
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => {
                      // Handle different possible structures
                      const name = customer.personal_details?.name || 
                                  customer.name || 
                                  customer.personalDetails?.name ||
                                  'N/A';
                      
                      const username = customer.personal_details?.username || 
                                      customer.username || 
                                      customer.personalDetails?.username ||
                                      'N/A';
                      
                      const mobile = customer.personal_details?.mobile || 
                                    customer.mobile || 
                                    customer.personalDetails?.mobile ||
                                    customer.phone ||
                                    'N/A';
                      
                      const status = customer.config?.account_status || 
                                    customer.status ||
                                    customer.accountStatus ||
                                    'N/A';
                      
                      const broker = customer.other?.broker || 
                                    customer.broker ||
                                    'N/A';

                      return (
                        <TableRow key={customer.id} 
                          sx={{ 
                            '&:hover': { 
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              #{customer.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
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
                                {name.charAt(0).toUpperCase()}
                              </Avatar>
                              <Typography variant="body2">{name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{username}</TableCell>
                          <TableCell>{mobile}</TableCell>
                          <TableCell>
                            <Chip 
                              label={status}
                              size="small"
                              color={getStatusColor(status)}
                              icon={getStatusIcon(status)}
                              sx={{ 
                                fontWeight: 600,
                                borderRadius: 1,
                                '& .MuiChip-label': { px: 1 },
                                '& .MuiChip-icon': { ml: 0.5 }
                              }}
                            />
                          </TableCell>
                          <TableCell>{broker}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small"
                                  onClick={() => customer.id && handleViewCustomer(customer.id)}
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
                              <Tooltip title="Edit Customer">
                                <IconButton 
                                  size="small"
                                  onClick={() => customer.id && handleEditCustomer(customer.id)}
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
                              <Tooltip title="Delete Customer">
                                <IconButton 
                                  size="small"
                                  onClick={() => customer.id && handleOpenDeleteDialog(customer.id)}
                                  sx={{ 
                                    color: 'error.main',
                                    '&:hover': { 
                                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                                      transform: 'translateY(-2px)',
                                      transition: 'transform 0.2s'
                                    }
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 1 }}>
            <Button 
              onClick={handleCloseDeleteDialog} 
              variant="outlined"
              sx={{ borderRadius: 1.5 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteCustomer} 
              color="error" 
              variant="contained"
              sx={{ borderRadius: 1.5 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CustomerManagementPage; 