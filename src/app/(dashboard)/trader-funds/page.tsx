'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  Chip,
  CircularProgress,
  Tooltip,
  InputAdornment,
  useTheme
} from '@mui/material';
import { 
  alpha,
  styled
} from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  Search as SearchIcon, 
  Refresh as ResetIcon, 
  FileDownload as DownloadIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  TraderFundTransaction, 
  TraderFundResponse, 
  CreateFundTransactionRequest
} from '@/types/trader-funds';
import {
  fetchTraderFunds,
  exportTraderFunds,
  createFundTransaction
} from '@/services/trader-funds';
import Link from 'next/link';

// Snackbar notification UI update
const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    padding: '8px 16px',
  },
  '& .MuiAlert-message': {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  '& .MuiAlert-icon': {
    fontSize: '1.5rem'
  }
}));

// Main component
const TradersFundPage = () => {
  // State for filters
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [fundForm, setFundForm] = useState<CreateFundTransactionRequest>({
    userId: '',
    amount: 0,
    txnType: 'Added',
    notes: '',
    txnMode: 'Online',
  });

  const theme = useTheme();

  // Format date for API requests
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Query for fetching trader funds data
  const { data, isLoading, refetch } = useQuery<TraderFundResponse>({
    queryKey: ['traderFunds', userId, fromDate, toDate, amount],
    queryFn: () => fetchTraderFunds({
      userId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      amount: amount ? parseFloat(amount) : undefined
    }),
      enabled: true, // Enable by default to show data when the page loads
    placeholderData: (previousData) => previousData, // v5 replacement for keepPreviousData
  });

  // Add type definitions for MutationResult to match ReactQuery v5
  type TraderFundExportResponse = {
    success: boolean;
    url?: string; 
  };

  // Update mutation syntax for React Query v5
  const exportMutation = useMutation({
    mutationFn: () => exportTraderFunds({
      userId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      amount: amount ? parseFloat(amount) : undefined
    }),
  });

  // Mutation for creating a new fund transaction
  const createFundMutation = useMutation({
    mutationFn: (formData: CreateFundTransactionRequest) => createFundTransaction(formData),
      onSuccess: (data) => {
        setSnackbar({
          open: true,
          message: 'Fund transaction created successfully',
          severity: 'success',
        });
        setCreateDialogOpen(false);
        
        // Reset the form
        setFundForm({
          userId: '',
          amount: 0,
          txnType: 'Added',
          notes: '',
          txnMode: 'Online',
        });

        // Automatically search for all transactions to show the newly created one
        setFromDate(null);
        setToDate(null);
        setUserId('');
        setAmount('');
        refetch();
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: 'Failed to create fund transaction',
          severity: 'error',
        });
      }
  });

  // Validate date range
  const validateDateRange = () => {
    if (fromDate && toDate && fromDate > toDate) {
      setError('From Date must not be after To Date');
      return false;
    }
    setError(null);
    return true;
  };

  // Handle search click
  const handleSearch = () => {
    if (!validateDateRange()) return;
    refetch();
  };

  // Handle reset click
  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
    setUserId('');
    setAmount('');
    setError(null);
  };

  // Handle export click
  const handleExport = () => {
    if (!validateDateRange()) return;
    exportMutation.mutate();
  };

  // Handle create fund transaction
  const handleCreateFund = () => {
    createFundMutation.mutate(fundForm);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDisplayDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Add a new useEffect for initial data load
  useEffect(() => {
    // Execute an initial search to show existing transactions when the page loads
    refetch();
  }, [refetch]); // Only run this once on component mount

  // Keep the existing useEffect for export notifications but update isLoading to isPending
  useEffect(() => {
    // Show export success/error message
    if (exportMutation.isSuccess) {
      setSnackbar({
        open: true,
        message: 'Report exported successfully',
        severity: 'success',
      });
    } else if (exportMutation.isError) {
      setSnackbar({
        open: true,
        message: 'Failed to export report',
        severity: 'error',
      });
    }
  }, [exportMutation.isSuccess, exportMutation.isError]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        p: { xs: 2, md: 4 },
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, #192238 0%, #111827 100%)' 
          : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        minHeight: '100vh'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 4, 
            color: theme.palette.mode === 'dark' ? '#fff' : '#1e293b',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            pb: 2
          }}
        >
          Traders Fund 
        </Typography>

        <Card 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.25)' 
              : '0 4px 20px rgba(0,0,0,0.05)',
            overflow: 'visible',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) => setFromDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!error && error.includes('From Date'),
                      InputProps: {
                        sx: {
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.divider, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                        }
                      }
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="To Date"
                  value={toDate}
                  onChange={(newValue) => setToDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!error && error.includes('To Date'),
                      InputProps: {
                        sx: {
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.divider, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                        }
                      }
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Search by user ID"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.divider, 0.2),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        ₹
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.divider, 0.2),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                    }
                  }}
                />
              </Grid>
            </Grid>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: theme.palette.error.light,
                }}
              >
                {error}
              </Alert>
            )}

            <Box sx={{ 
              mt: 3, 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'space-between',
              gap: 2,
              alignItems: { xs: 'stretch', sm: 'center' }
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5, 
                flexDirection: { xs: 'column', sm: 'row' }, 
                width: { xs: '100%', sm: 'auto' } 
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                  onClick={handleSearch}
                  disabled={isLoading}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 14px rgba(0,118,255,0.39)' 
                      : '0 4px 14px rgba(0,118,255,0.25)',
                    '&:hover': {
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 6px 20px rgba(0,118,255,0.4)' 
                        : '0 6px 20px rgba(0,118,255,0.35)',
                    }
                  }}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ResetIcon />}
                  onClick={handleReset}
                  disabled={isLoading}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: alpha(theme.palette.divider, 0.5),
                    color: theme.palette.text.primary,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  Reset
                </Button>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5, 
                flexDirection: { xs: 'column', sm: 'row' }, 
                width: { xs: '100%', sm: 'auto' } 
              }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setCreateDialogOpen(true)}
                  startIcon={<AddIcon />}
                  disabled={isLoading}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    bgcolor: theme.palette.success.main,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 14px rgba(34,197,94,0.39)' 
                      : '0 4px 14px rgba(34,197,94,0.25)',
                    '&:hover': {
                      bgcolor: theme.palette.success.dark,
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 6px 20px rgba(34,197,94,0.4)' 
                        : '0 6px 20px rgba(34,197,94,0.35)',
                    }
                  }}
                >
                  Create Funds WD
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={exportMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                  onClick={handleExport}
                  disabled={!data || data.total === 0 || exportMutation.isPending || isLoading}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    bgcolor: theme.palette.info.main,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 14px rgba(6,182,212,0.39)' 
                      : '0 4px 14px rgba(6,182,212,0.25)',
                    '&:hover': {
                      bgcolor: theme.palette.info.dark,
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 6px 20px rgba(6,182,212,0.4)' 
                        : '0 6px 20px rgba(6,182,212,0.35)',
                    }
                  }}
                >
                  Download Report
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card 
          elevation={0} 
          sx={{ 
            borderRadius: 3,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.25)' 
              : '0 4px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          {isLoading ? (
            <Box sx={{ 
              p: 6, 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: 300,
              bgcolor: theme.palette.background.paper
            }}>
              <CircularProgress size={48} sx={{ mb: 2 }} />
              <Typography variant="h6" color="text.secondary">Loading data...</Typography>
            </Box>
          ) : data && data.data && data.data.length > 0 ? (
            <>
              <Box sx={{ 
                p: 2.5, 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.primary.main, 0.02)
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Showing {data.data.length} of {data.total} transactions
                </Typography>
                
                <TextField
                  placeholder="Search in table..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      bgcolor: theme.palette.background.paper,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha(theme.palette.divider, 0.2),
                      }
                    }
                  }}
                  sx={{ width: 220 }}
                />
              </Box>
              
              <TableContainer sx={{ 
                maxHeight: 600,
                '&::-webkit-scrollbar': {
                  width: '8px',
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: alpha(theme.palette.divider, 0.1),
                }
              }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sx={{ 
                          fontWeight: 600, 
                          bgcolor: theme.palette.mode === 'dark' 
                            ? alpha(theme.palette.background.paper, 0.8) 
                            : theme.palette.background.paper,
                          color: theme.palette.text.primary,
                        }}
                      >
                        ID #
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Txn Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Txn Mode</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.map((transaction: TraderFundTransaction) => (
                      <TableRow 
                        key={transaction.id} 
                        hover
                        sx={{
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' 
                              ? alpha(theme.palette.primary.main, 0.1) 
                              : alpha(theme.palette.primary.main, 0.04),
                          },
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{transaction.id}</TableCell>
                        <TableCell>{transaction.userId}</TableCell>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>
                          <Typography 
                            sx={{ 
                              fontWeight: 600, 
                              color: transaction.txnType === 'Added' 
                                ? theme.palette.success.main 
                                : theme.palette.error.main 
                            }}
                          >
                            {formatCurrency(transaction.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.txnType} 
                            color={transaction.txnType === 'Added' ? 'success' : 'error'} 
                            size="small"
                            variant="filled"
                            sx={{ 
                              fontWeight: 600,
                              borderRadius: 1,
                              px: 0.5
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title={transaction.notes} arrow placement="top">
                            <Typography 
                              sx={{ 
                                maxWidth: 120,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {transaction.notes}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.txnMode} 
                            color={transaction.txnMode === 'Online' ? 'primary' : 'default'} 
                            size="small"
                            sx={{ 
                              fontWeight: 500,
                              borderRadius: 1,
                              bgcolor: transaction.txnMode === 'Online' 
                                ? alpha(theme.palette.primary.main, 0.1)
                                : alpha(theme.palette.grey[500], 0.1),
                              color: transaction.txnMode === 'Online' 
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary,
                              border: 'none'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {formatDisplayDate(transaction.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Transaction Details" arrow>
                            <IconButton 
                              size="small" 
                              color="primary"
                              component={Link}
                              href={`/trader-funds/${transaction.id}`}
                              sx={{ 
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                                }
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ 
                p: 2.5, 
                display: 'flex', 
                justifyContent: 'center',
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.primary.main, 0.02)
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    disabled
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    {'<<'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    disabled
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    {'<'}
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1,
                      fontWeight: 600
                    }}
                  >
                    1
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    2
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    3
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    {'>'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{
                      minWidth: '40px',
                      borderRadius: 1.5,
                      p: 1
                    }}
                  >
                    {'>>'}
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              p: 6, 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: 300,
              bgcolor: theme.palette.background.paper
            }}>
              <Box 
                component="img" 
                src="/empty-state.svg" 
                alt="No data" 
                sx={{ width: 120, height: 120, mb: 2, opacity: 0.6 }}
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Typography variant="h6" gutterBottom>No transactions found</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
                Use the search filters above to find transactions or create a new fund transaction.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Add New Transaction
              </Button>
            </Box>
          )}
        </Card>

        {/* Create Fund Dialog */}
        <Dialog 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              backgroundImage: theme.palette.mode === 'dark' 
                ? 'linear-gradient(to bottom, #1f2937, #111827)' 
                : 'linear-gradient(to bottom, #ffffff, #f8fafc)',
            }
          }}
        >
          <Box sx={{ 
            p: { xs: 2, md: 3 },
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Manage Trader Funds
            </Typography>
            <IconButton 
              onClick={() => setCreateDialogOpen(false)}
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                mb: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                py: 1.25,
                px: 3,
                bgcolor: theme.palette.success.main,
                fontWeight: 600,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 4px 14px rgba(34,197,94,0.39)' 
                  : '0 4px 14px rgba(34,197,94,0.25)',
                '&:hover': {
                  bgcolor: theme.palette.success.dark,
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 6px 20px rgba(34,197,94,0.4)' 
                    : '0 6px 20px rgba(34,197,94,0.35)',
                }
              }}
            >
              Create Funds WD
            </Button>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                    User ID
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <Select
                  value={fundForm.userId}
                  onChange={(e) => setFundForm({ ...fundForm, userId: e.target.value })}
                      displayEmpty
                      sx={{ 
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        '& .MuiOutlinedInput-notchedOutline': { 
                          borderColor: alpha(theme.palette.divider, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            mt: 0.5,
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select User
                      </MenuItem>
                      <MenuItem value="user1">John Doe (#user1)</MenuItem>
                      <MenuItem value="user2">Jane Smith (#user2)</MenuItem>
                      <MenuItem value="user3">Mike Johnson (#user3)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                    Funds
                  </Typography>
                <TextField
                  value={fundForm.amount}
                    onChange={(e) => setFundForm({ ...fundForm, amount: parseFloat(e.target.value) || 0 })}
                  fullWidth
                    variant="outlined"
                  type="number"
                    placeholder="0"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      sx: {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        '& .MuiOutlinedInput-notchedOutline': { 
                          borderColor: alpha(theme.palette.divider, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                    Notes
                  </Typography>
                <TextField
                  value={fundForm.notes}
                  onChange={(e) => setFundForm({ ...fundForm, notes: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                    variant="outlined"
                    placeholder="Add transaction notes here"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        '& .MuiOutlinedInput-notchedOutline': { 
                          borderColor: alpha(theme.palette.divider, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        },
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                    Transaction Password
                  </Typography>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    placeholder="••••••"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        '& .MuiOutlinedInput-notchedOutline': { 
                          borderColor: alpha(theme.palette.divider, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2
                        },
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  px: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: theme.palette.text.primary,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.04)
                  }
                }}
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              
            <Button 
                variant="contained"
                color="success"
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  px: 4,
                  textTransform: 'none',
                  fontWeight: 600,
                  bgcolor: theme.palette.success.main,
                  '&:hover': {
                    bgcolor: theme.palette.success.dark,
                  }
                }}
              onClick={handleCreateFund} 
                disabled={!fundForm.userId || fundForm.amount <= 0 || createFundMutation.isPending}
                startIcon={createFundMutation.isPending ? <CircularProgress size={20} /> : null}
              >
                SAVE
            </Button>
            </Box>
          </Box>
        </Dialog>

        {/* Snackbar for notifications */}
        <StyledSnackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            elevation={6}
            icon={snackbar.severity === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
            sx={{ 
              width: '100%', 
              alignItems: 'center', 
              borderLeft: snackbar.severity === 'success' 
                ? `4px solid ${theme.palette.success.dark}` 
                : `4px solid ${theme.palette.error.dark}`
            }}
          >
            {snackbar.message}
          </Alert>
        </StyledSnackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default TradersFundPage; 