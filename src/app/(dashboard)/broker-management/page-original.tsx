"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  Stack,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  Payment as DepositIcon,
  MonetizationOn as WithdrawIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { Broker } from '../../../types';
import { 
  fetchBrokers, 
  updateBroker, 
  createBroker, 
  depositFunds, 
  withdrawFunds,
  generateReferenceCode
} from '../../../services/broker-service';

// Validation schemas
const brokerValidationSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9()-]+$/, 'Username can only contain alphanumeric characters, (), or -')
    .required('Username is required'),
  parent: yup.string().required('Parent is required'),
  brokerageShare: yup
    .number()
    .min(0, 'Brokerage Share must be at least 0')
    .max(100, 'Brokerage Share cannot exceed 100')
    .required('Brokerage Share is required'),
  profitShare: yup
    .number()
    .min(0, 'Profit Share must be at least 0')
    .max(100, 'Profit Share cannot exceed 100')
    .required('Profit Share is required'),
  creditLimit: yup
    .number()
    .min(0, 'Credit Limit must be at least 0')
    .required('Credit Limit is required'),
  type: yup
    .string()
    .oneOf(['Broker', 'Admin'], 'Type must be either Broker or Admin')
    .required('Type is required'),
  refCode: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Reference Code can only contain alphanumeric characters')
    .required('Reference Code is required'),
  accountStatus: yup
    .string()
    .oneOf(['Active', 'Inactive', 'Suspended', 'Pending'], 'Invalid account status')
    .required('Account Status is required'),
});

const fundOperationSchema = yup.object({
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  notes: yup.string(),
});

const BrokerManagementPage: React.FC = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
  const [filters, setFilters] = useState({ username: '', accountStatus: 'All' });
  const [dialogOpen, setDialogOpen] = useState<{ open: boolean, type: string, broker?: Broker | null }>({ open: false, type: '' });

  // Mock data for testing
  const mockBrokers: Broker[] = Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    username: `broker${i + 1}`,
    parent: i < 5 ? 'admin' : `broker${Math.floor(i / 5)}`,
    brokerageShare: parseFloat((Math.random() * 50).toFixed(2)),
    profitShare: parseFloat((Math.random() * 30).toFixed(2)),
    creditLimit: parseFloat((Math.random() * 50000).toFixed(2)),
    type: i % 10 === 0 ? 'Admin' : 'Broker',
    totalClients: Math.floor(Math.random() * 100),
    refCode: `REF${i + 1000}`,
    accountStatus: i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Inactive' : i % 4 === 2 ? 'Suspended' : 'Pending'
  }));

  const handleCloseDialog = () => {
    setDialogOpen({ open: false, type: '' });
    brokerFormik.resetForm();
    fundFormik.resetForm();
  };

  // API calls
  const { data: brokers = mockBrokers, isLoading: isLoadingBrokers, refetch } = useQuery({
    queryKey: ['brokers', filters],
    queryFn: async () => {
      try {
        // For development/demo, use mock data
        if (process.env.NODE_ENV === 'development') {
          return mockBrokers.filter(broker => {
            const usernameMatch = broker.username.toLowerCase().includes(filters.username.toLowerCase());
            const statusMatch = filters.accountStatus === 'All' || broker.accountStatus === filters.accountStatus;
            return usernameMatch && statusMatch;
          });
        }

        // For production, use the actual service
        return await fetchBrokers(filters);
      } catch (error) {
        console.error('Error fetching brokers:', error);
        enqueueSnackbar('Failed to fetch brokers', { variant: 'error' });
        return [];
      }
    }
  });

  // Form for broker operations
  const brokerFormik = useFormik({
    initialValues: {
      id: '',
      username: '',
      parent: '',
      brokerageShare: 0,
      profitShare: 0,
      creditLimit: 0,
      type: 'Broker',
      totalClients: 0,
      refCode: '',
      accountStatus: 'Active',
    },
    validationSchema: brokerValidationSchema,
    onSubmit: async (values) => {
      try {
        if (dialogOpen.type === 'update') {
          updateBrokerMutation.mutate(values as Broker);
        } else if (dialogOpen.type === 'copy') {
          // When copying, remove the ID as it will be generated by the server
          const { id, ...brokerData } = values;
          // Also generate a new unique username
          brokerData.username = `${brokerData.username}_copy`;
          createBrokerMutation.mutate(brokerData as Omit<Broker, 'id'>);
        } else if (dialogOpen.type === 'create') {
          // Remove the ID field as it will be generated by the server
          const { id, ...brokerData } = values;
          createBrokerMutation.mutate(brokerData as Omit<Broker, 'id'>);
        }
      } catch (error) {
        console.error('Error saving broker:', error);
      }
    },
  });

  // Form for fund operations
  const fundFormik = useFormik({
    initialValues: {
      amount: 0,
      notes: '',
    },
    validationSchema: fundOperationSchema,
    onSubmit: async (values) => {
      if (!dialogOpen.broker?.id) return;
      
      try {
        if (dialogOpen.type === 'deposit') {
          depositFundsMutation.mutate({
            id: dialogOpen.broker.id,
            amount: values.amount,
            notes: values.notes
          });
        } else if (dialogOpen.type === 'withdraw') {
          withdrawFundsMutation.mutate({
            id: dialogOpen.broker.id,
            amount: values.amount,
            notes: values.notes
          });
        }
      } catch (error) {
        console.error('Error processing fund operation:', error);
      }
    },
  });

  // Generate reference code mutation
  const generateRefCodeMutation = useMutation({
    mutationFn: generateReferenceCode,
    onSuccess: (refCode) => {
      brokerFormik.setFieldValue('refCode', refCode);
    },
    onError: () => {
      enqueueSnackbar('Failed to generate reference code', { variant: 'error' });
    }
  });

  // Update broker mutation
  const updateBrokerMutation = useMutation({
    mutationFn: (data: Broker) => updateBroker(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
      enqueueSnackbar('Broker updated successfully', { variant: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      enqueueSnackbar('Failed to update broker', { variant: 'error' });
    }
  });

  // Create broker mutation
  const createBrokerMutation = useMutation({
    mutationFn: (data: Omit<Broker, 'id'>) => createBroker(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
      enqueueSnackbar('Broker created successfully', { variant: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      enqueueSnackbar('Failed to create broker', { variant: 'error' });
    }
  });

  // Deposit funds mutation
  const depositFundsMutation = useMutation({
    mutationFn: (data: { id: string, amount: number, notes?: string }) => 
      depositFunds(data.id, data.amount, data.notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
      enqueueSnackbar(`Successfully deposited $${variables.amount.toFixed(2)}`, { variant: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      enqueueSnackbar('Failed to deposit funds', { variant: 'error' });
    }
  });

  // Withdraw funds mutation
  const withdrawFundsMutation = useMutation({
    mutationFn: (data: { id: string, amount: number, notes?: string }) => 
      withdrawFunds(data.id, data.amount, data.notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
      enqueueSnackbar(`Successfully withdrew $${variables.amount.toFixed(2)}`, { variant: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      enqueueSnackbar('Failed to withdraw funds', { variant: 'error' });
    }
  });

  const handleOpenDialog = (type: string, broker?: Broker) => {
    setDialogOpen({ open: true, type, broker: broker || null });
    
    if (type === 'update' || type === 'copy' || type === 'view') {
      brokerFormik.setValues(broker || {
        id: '',
        username: '',
        parent: '',
        brokerageShare: 0,
        profitShare: 0,
        creditLimit: 0,
        type: 'Broker',
        totalClients: 0,
        refCode: '',
        accountStatus: 'Active',
      } as Broker);
    } else if (type === 'create') {
      // Reset form for new broker
      brokerFormik.setValues({
        id: '',
        username: '',
        parent: '',
        brokerageShare: 0,
        profitShare: 0,
        creditLimit: 0,
        type: 'Broker',
        totalClients: 0,
        refCode: '',
        accountStatus: 'Active',
      } as Broker);
    } else {
      fundFormik.resetForm();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleResetFilters = () => {
    setFilters({ username: '', accountStatus: 'All' });
  };

  // Helper function to safely copy text to clipboard
  const handleSafeCopy = (text: string, notifyFn: any) => {
    try {
      navigator.clipboard.writeText(text);
      notifyFn('Copied to clipboard!', { variant: 'success' });
    } catch (err) {
      notifyFn('Failed to copy text', { variant: 'error' });
    }
  };

  const handleCopyRefCode = (refCode: string) => {
    handleSafeCopy(refCode, enqueueSnackbar);
  };

  const handleGenerateRefCode = () => {
    generateRefCodeMutation.mutate();
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: GridRenderCellParams<Broker>) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => handleOpenDialog('view', params.row)}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton size="small" onClick={() => handleOpenDialog('update', params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy">
            <IconButton size="small" onClick={() => handleOpenDialog('copy', params.row)}>
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deposit">
            <IconButton size="small" onClick={() => handleOpenDialog('deposit', params.row)}>
              <DepositIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Withdraw">
            <IconButton size="small" onClick={() => handleOpenDialog('withdraw', params.row)}>
              <WithdrawIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'parent', headerName: 'Parent', width: 120 },
    { 
      field: 'brokerageShare', 
      headerName: 'Brokerage Share', 
      width: 140,
      valueFormatter: (params) => `${params.value}%`,
    },
    { 
      field: 'profitShare', 
      headerName: 'Profit Share', 
      width: 120,
      valueFormatter: (params) => `${params.value}%`,
    },
    { 
      field: 'creditLimit', 
      headerName: 'Credit Limit', 
      width: 140,
      valueFormatter: (params) => params.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'totalClients', headerName: 'Total Clients', width: 120 },
    { 
      field: 'refCode', 
      headerName: 'Ref. Code', 
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Click to copy">
          <Chip 
            label={params.value} 
            onClick={() => handleCopyRefCode(params.value as string)}
            size="small"
            variant="outlined"
            sx={{ cursor: 'pointer' }}
          />
        </Tooltip>
      )
    },
    { 
      field: 'accountStatus', 
      headerName: 'Account Status', 
      width: 140,
      renderCell: (params) => {
        const status = params.value as string;
        let color = '';
        
        switch(status) {
          case 'Active':
            color = theme.palette.success.main;
            break;
          case 'Inactive':
            color = theme.palette.grey[500];
            break;
          case 'Suspended':
            color = theme.palette.error.main;
            break;
          case 'Pending':
            color = theme.palette.warning.main;
            break;
          default:
            color = theme.palette.grey[500];
        }
        
        return (
          <Chip 
            label={status} 
            size="small"
            sx={{ 
              backgroundColor: color,
              color: '#fff',
              fontWeight: 'medium'
            }}
          />
        );
      }
    }
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>Broker Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('create')}
          sx={{ 
            borderRadius: 2,
            padding: '8px 16px'
          }}
        >
          Create Broker
        </Button>
      </Box>
      
      {/* Search & Filter Panel */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSearchSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Username Search"
                value={filters.username}
                onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                placeholder="Search by username"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Account Status</InputLabel>
                <Select
                  value={filters.accountStatus}
                  onChange={(e) => setFilters({ ...filters, accountStatus: e.target.value })}
                  label="Account Status"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Suspended">Suspended</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {/* Brokers Data Table */}
      <Paper sx={{ height: 'calc(100vh - 260px)', width: '100%' }}>
        <DataGrid
          rows={brokers}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          disableRowSelectionOnClick
          loading={isLoadingBrokers}
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'}
          sx={{
            '& .odd-row': {
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.05) : alpha(theme.palette.common.black, 0.02),
            },
          }}
        />
      </Paper>
      
      {/* View/Edit/Copy Dialog */}
      {(dialogOpen.type === 'view' || dialogOpen.type === 'update' || dialogOpen.type === 'copy' || dialogOpen.type === 'create') && (
        <Dialog 
          open={dialogOpen.open} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {dialogOpen.type === 'view' 
              ? 'View Broker Details' 
              : dialogOpen.type === 'update' 
                ? 'Update Broker' 
                : dialogOpen.type === 'create'
                  ? 'Create New Broker'
                  : 'Copy Broker Profile'}
          </DialogTitle>
          <form onSubmit={brokerFormik.handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="username"
                    label="Username"
                    value={brokerFormik.values.username}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.username && Boolean(brokerFormik.errors.username)}
                    helperText={brokerFormik.touched.username && brokerFormik.errors.username}
                    disabled={dialogOpen.type === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="parent"
                    label="Parent"
                    value={brokerFormik.values.parent}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.parent && Boolean(brokerFormik.errors.parent)}
                    helperText={brokerFormik.touched.parent && brokerFormik.errors.parent}
                    disabled={dialogOpen.type === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="brokerageShare"
                    label="Brokerage Share (%)"
                    type="number"
                    value={brokerFormik.values.brokerageShare}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.brokerageShare && Boolean(brokerFormik.errors.brokerageShare)}
                    helperText={brokerFormik.touched.brokerageShare && brokerFormik.errors.brokerageShare}
                    disabled={dialogOpen.type === 'view'}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="profitShare"
                    label="Profit Share (%)"
                    type="number"
                    value={brokerFormik.values.profitShare}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.profitShare && Boolean(brokerFormik.errors.profitShare)}
                    helperText={brokerFormik.touched.profitShare && brokerFormik.errors.profitShare}
                    disabled={dialogOpen.type === 'view'}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="creditLimit"
                    label="Credit Limit"
                    type="number"
                    value={brokerFormik.values.creditLimit}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.creditLimit && Boolean(brokerFormik.errors.creditLimit)}
                    helperText={brokerFormik.touched.creditLimit && brokerFormik.errors.creditLimit}
                    disabled={dialogOpen.type === 'view'}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Account Type</InputLabel>
                    <Select
                      name="type"
                      value={brokerFormik.values.type}
                      onChange={brokerFormik.handleChange}
                      error={brokerFormik.touched.type && Boolean(brokerFormik.errors.type)}
                      label="Account Type"
                      disabled={dialogOpen.type === 'view'}
                    >
                      <MenuItem value="Broker">Broker</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="refCode"
                    label="Reference Code"
                    value={brokerFormik.values.refCode}
                    onChange={brokerFormik.handleChange}
                    error={brokerFormik.touched.refCode && Boolean(brokerFormik.errors.refCode)}
                    helperText={brokerFormik.touched.refCode && brokerFormik.errors.refCode}
                    disabled={dialogOpen.type === 'view'}
                    InputProps={{
                      endAdornment: dialogOpen.type !== 'view' ? (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={handleGenerateRefCode}
                            disabled={generateRefCodeMutation.isPending}
                          >
                            Generate
                          </Button>
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Account Status</InputLabel>
                    <Select
                      name="accountStatus"
                      value={brokerFormik.values.accountStatus}
                      onChange={brokerFormik.handleChange}
                      error={brokerFormik.touched.accountStatus && Boolean(brokerFormik.errors.accountStatus)}
                      label="Account Status"
                      disabled={dialogOpen.type === 'view'}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Suspended">Suspended</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="totalClients"
                    label="Total Clients"
                    type="number"
                    value={brokerFormik.values.totalClients}
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              {dialogOpen.type !== 'view' && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {dialogOpen.type === 'update' 
                    ? 'Update' 
                    : dialogOpen.type === 'create'
                      ? 'Create'
                      : 'Copy & Create'}
                </Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
      )}
      
      {/* Deposit/Withdraw Dialog */}
      {(dialogOpen.type === 'deposit' || dialogOpen.type === 'withdraw') && (
        <Dialog 
          open={dialogOpen.open} 
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {dialogOpen.type === 'deposit' 
              ? `Deposit Funds to ${dialogOpen.broker?.username}` 
              : `Withdraw Funds from ${dialogOpen.broker?.username}`}
          </DialogTitle>
          <form onSubmit={fundFormik.handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                margin="normal"
                name="amount"
                label="Amount"
                type="number"
                value={fundFormik.values.amount}
                onChange={fundFormik.handleChange}
                error={fundFormik.touched.amount && Boolean(fundFormik.errors.amount)}
                helperText={fundFormik.touched.amount && fundFormik.errors.amount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                name="notes"
                label="Notes"
                multiline
                rows={3}
                value={fundFormik.values.notes}
                onChange={fundFormik.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color={dialogOpen.type === 'deposit' ? 'primary' : 'secondary'}
              >
                {dialogOpen.type === 'deposit' ? 'Deposit' : 'Withdraw'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Box>
  );
};

export default BrokerManagementPage; 