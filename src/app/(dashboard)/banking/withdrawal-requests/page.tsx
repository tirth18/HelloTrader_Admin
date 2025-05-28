'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  Container,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
  Alert,
  Collapse,
} from '@mui/material';
import { format } from 'date-fns';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { styled, alpha } from '@mui/material/styles';
import { API_BASE_URL } from '@/config';

interface WithdrawalRequest {
  payment_method: string;
  amount: number;
  mobile_number: string;
  account_holder_name: string;
  account_number: string;
  ifsc: string;
  status: string;
  _id: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  backgroundColor: '#1a2234',
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: '#212b42',
  '& .MuiTableCell-head': {
    color: 'white',
    fontWeight: 600,
    borderBottom: 'none',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '16px 8px',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#141b2d',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#1a2234',
  },
  '&:hover': {
    backgroundColor: '#273352',
    transition: 'background-color 0.2s ease',
  },
  '& .MuiTableCell-root': {
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    fontSize: '0.875rem',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '12px 4px',
  whiteSpace: 'nowrap',
  fontSize: '0.875rem',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
  padding: '16px 24px',
  borderRadius: '16px 16px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0px',
  color: 'white',
  minWidth: 'min-content',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 10
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  minWidth: '120px',
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  }
}));

const StatusChipStyled = styled(Chip)(({ theme, color }) => ({
  borderRadius: '6px',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  padding: '0px 8px',
  height: '24px',
  letterSpacing: '0.5px',
  backgroundColor: 
    color === 'success' ? alpha('#10B981', 0.9) : 
    color === 'warning' ? alpha('#F59E0B', 0.9) : 
    color === 'error' ? alpha('#EF4444', 0.9) : 
    alpha('#6B7280', 0.9),
  color: 'white',
  border: 
    color === 'success' ? '1px solid #10B981' : 
    color === 'warning' ? '1px solid #F59E0B' : 
    color === 'error' ? '1px solid #EF4444' : 
    '1px solid #6B7280',
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
}));

const TableActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '6px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '6px 8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  minWidth: '75px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  }
}));

const WithdrawalRequests = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalReason, setApprovalReason] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/AllWithdraw`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setWithdrawals(data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching withdrawals:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching withdrawal requests');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setApprovalReason('');
    setOpenApproveDialog(true);
  };

  const handleRejectRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setRejectionReason('');
    setOpenRejectDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenApproveDialog(false);
    setOpenRejectDialog(false);
    setRejectionReason('');
    setApprovalReason('');
    setSelectedRequest(null);
  };

  const handleConfirmApprove = async () => {
    if (!selectedRequest || !approvalReason.trim()) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/updateWithdrawReq/${selectedRequest._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'approved',
          reason: approvalReason
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      await fetchWithdrawals(); // Refresh the list after approval
      handleCloseDialog();
    } catch (err) {
      console.error('Error approving withdrawal:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while approving the withdrawal request');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/updateWithdrawReq/${selectedRequest._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          reason: rejectionReason
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      await fetchWithdrawals(); // Refresh the list after rejection
      handleCloseDialog();
    } catch (err) {
      console.error('Error rejecting withdrawal:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while rejecting the withdrawal request');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAllRequests = () => {
    const pendingRequests = withdrawals.filter(req => req.status === 'pending');
    if (selectedRequests.length === pendingRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(pendingRequests.map(req => req._id));
    }
  };

  const handleProcessSelected = async (action: 'approve' | 'reject') => {
    if (selectedRequests.length === 0) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Process all selected requests sequentially
      const requests = selectedRequests.map(async (requestId) => {
        const response = await fetch(`${API_BASE_URL}/api/updateWithdrawReq/${requestId}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: action === 'approve' ? 'approved' : 'rejected',
            // Add a generic reason for bulk operations
            reason: action === 'approve' ? 'Approved in bulk operation' : 'Rejected in bulk operation'
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
      });

      // Wait for all requests to complete
      await Promise.all(requests);
      
      await fetchWithdrawals(); // Refresh the list after bulk action
      setSelectedRequests([]);
    } catch (err) {
      console.error(`Error ${action}ing withdrawals:`, err);
      setError(err instanceof Error ? err.message : `An error occurred while ${action}ing the selected withdrawal requests`);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading && withdrawals.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  const pendingRequests = withdrawals.filter(req => req.status === 'pending');

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Collapse in={showAlert}>
        <Alert 
          severity="error" 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, borderRadius: '8px' }}
        >
          {error}
        </Alert>
      </Collapse>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#fff' }}>
          Withdrawal Requests
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Refresh data">
          <ActionIconButton size="small" onClick={fetchWithdrawals}>
            <RefreshIcon />
          </ActionIconButton>
        </Tooltip>
        <Tooltip title="Filter">
          <ActionIconButton size="small">
            <FilterListIcon />
          </ActionIconButton>
        </Tooltip>
      </Stack>

      <StyledPaper>
        <HeaderBox>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              All Withdrawal Requests
            </Typography>
            <Chip 
              label={`${withdrawals.length} Total`} 
              size="small" 
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: 600,
                borderRadius: '4px',
              }}
            />
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5, 
            flexShrink: 0,
            '@media (max-width: 960px)': {
              flexDirection: 'column',
              alignItems: 'flex-end',
            } 
          }}>
            {selectedRequests.length > 0 && (
              <ActionButton
                variant="contained"
                color="primary"
                onClick={() => handleProcessSelected('approve')}
                startIcon={<CheckCircleOutlineIcon />}
                sx={{
                  backgroundColor: alpha('#3b82f6', 0.9),
                  '&:hover': { backgroundColor: '#3b82f6' }
                }}
              >
                Process ({selectedRequests.length})
              </ActionButton>
            )}
            <ActionButton
              variant="contained"
              color="success"
              onClick={() => handleProcessSelected('approve')}
              startIcon={<CheckCircleOutlineIcon />}
              sx={{
                backgroundColor: alpha('#10B981', 0.9),
                '&:hover': { backgroundColor: '#10B981' },
                minWidth: '140px'
              }}
            >
              Bulk Approve
            </ActionButton>
            <ActionButton
              variant="contained"
              color="error"
              onClick={() => handleProcessSelected('reject')}
              startIcon={<CancelIcon />}
              sx={{
                backgroundColor: alpha('#EF4444', 0.9),
                '&:hover': { backgroundColor: '#EF4444' },
                minWidth: '140px'
              }}
            >
              Bulk Reject
            </ActionButton>
          </Box>
        </HeaderBox>

        <TableContainer sx={{ 
          backgroundColor: '#1a2234',
          overflowX: 'auto',
          position: 'relative',
          maxHeight: 'calc(100vh - 250px)',
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '8px',
            backgroundColor: '#1a2234',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          }
        }}>
          <Table stickyHeader sx={{ minWidth: 'auto', tableLayout: 'fixed' }}>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell padding="checkbox" align="center" sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '40px' }}>
                  <Checkbox
                    checked={selectedRequests.length === pendingRequests.length && pendingRequests.length > 0}
                    indeterminate={selectedRequests.length > 0 && selectedRequests.length < pendingRequests.length}
                    onChange={handleSelectAllRequests}
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': {
                        color: '#3b82f6',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: '#3b82f6',
                      }
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '60px' }}>ID</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '140px' }}>Account Holder</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '120px' }}>Payment Method</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '100px' }}>Amount</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '130px' }}>Account Number</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '100px' }}>IFSC</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '120px' }}>Mobile Number</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '90px' }}>Status</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '120px' }}>Created At</StyledTableCell>
                <StyledTableCell align="center" sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '180px' }}>Actions</StyledTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {withdrawals.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={11} align="center">
                    <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <InfoOutlinedIcon sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.3)' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        No withdrawal requests found
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        There are no withdrawal requests to display at the moment
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={fetchWithdrawals}
                        startIcon={<RefreshIcon />}
                        sx={{ 
                          mt: 1, 
                          color: '#3b82f6', 
                          borderColor: '#3b82f6',
                          '&:hover': { borderColor: '#2563eb', backgroundColor: 'rgba(59, 130, 246, 0.1)' } 
                        }}
                      >
                        Refresh
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                withdrawals.map((withdrawal) => (
                  <StyledTableRow key={withdrawal._id}>
                    <StyledTableCell padding="checkbox" align="center">
                      {withdrawal.status === 'pending' && (
                        <Checkbox
                          checked={selectedRequests.includes(withdrawal._id)}
                          onChange={() => handleSelectRequest(withdrawal._id)}
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-checked': {
                              color: '#3b82f6',
                            }
                          }}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        #{withdrawal.id}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {withdrawal.account_holder_name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip 
                        label={withdrawal.payment_method} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                          color: '#3b82f6',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: '20px',
                          borderRadius: '4px',
                          maxWidth: '100%',
                        }} 
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981', fontSize: '0.8rem' }}>
                        ₹{withdrawal.amount.toLocaleString()}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title={withdrawal.account_number} arrow placement="top">
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {withdrawal.account_number}
                        </Typography>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {withdrawal.ifsc}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {withdrawal.mobile_number}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusChipStyled
                        label={withdrawal.status.toUpperCase()}
                        color={getStatusColor(withdrawal.status) as any}
                        sx={{ fontSize: '0.7rem', height: '20px' }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        {format(new Date(withdrawal.createdAt), 'dd MMM yyyy')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.65rem' }}>
                        {format(new Date(withdrawal.createdAt), 'HH:mm')}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: '180px' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        {withdrawal.status === 'pending' && (
                          <>
                            <TableActionButton
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApproveRequest(withdrawal)}
                              startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                              sx={{ 
                                backgroundColor: alpha('#10B981', 0.9),
                                '&:hover': { backgroundColor: '#10B981' },
                                fontSize: '0.75rem',
                                minWidth: '80px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Approve
                            </TableActionButton>
                            <TableActionButton
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleRejectRequest(withdrawal)}
                              startIcon={<CancelIcon fontSize="small" />}
                              sx={{ 
                                backgroundColor: alpha('#EF4444', 0.9),
                                '&:hover': { backgroundColor: '#EF4444' },
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                fontSize: '0.75rem',
                                minWidth: '80px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Reject
                            </TableActionButton>
                          </>
                        )}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <Dialog
        open={openApproveDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            backgroundColor: '#1a2234',
            color: 'white',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px',
          fontWeight: 600,
        }}>
          Approve Withdrawal Request
        </DialogTitle>
        <DialogContent sx={{ mt: 3, px: 3 }}>
          {selectedRequest && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Request ID
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  #{selectedRequest.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Account Holder
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedRequest.account_holder_name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Amount
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#10B981' }}>
                  ₹{selectedRequest.amount.toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          )}
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Please provide a reason for approving this withdrawal request:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Approval Reason"
            fullWidth
            multiline
            rows={3}
            value={approvalReason}
            onChange={(e) => setApprovalReason(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#10B981',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#10B981',
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px', 
              textTransform: 'none',
              px: 3,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmApprove} 
            color="success" 
            variant="contained"
            disabled={loading || !approvalReason.trim()}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: '#10B981',
              fontWeight: 600,
              px: 3,
              '&:hover': { backgroundColor: '#059669' }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Approval'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRejectDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            backgroundColor: '#1a2234',
            color: 'white',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(90deg, #DC2626 0%, #EF4444 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px',
          fontWeight: 600,
        }}>
          Reject Withdrawal Request
        </DialogTitle>
        <DialogContent sx={{ mt: 3, px: 3 }}>
          {selectedRequest && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Request ID
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  #{selectedRequest.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Account Holder
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedRequest.account_holder_name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Amount
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#10B981' }}>
                  ₹{selectedRequest.amount.toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          )}
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Please provide a reason for rejecting this withdrawal request:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            fullWidth
            multiline
            rows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#EF4444',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#EF4444',
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px', 
              textTransform: 'none',
              px: 3,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmReject} 
            color="error" 
            variant="contained"
            disabled={loading || !rejectionReason.trim()}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: '#EF4444',
              fontWeight: 600,
              px: 3,
              '&:hover': { backgroundColor: '#DC2626' }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Rejection'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WithdrawalRequests;
