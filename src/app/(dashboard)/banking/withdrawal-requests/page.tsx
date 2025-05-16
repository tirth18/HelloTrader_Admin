'use client';

import { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Chip,
  Checkbox
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

interface WithdrawalRequest {
  id: string;
  name: string;
  username: string;
  ledgerBalance: number;
  availableBalance: number;
  broker?: string;
  brokerCode?: string;
  amount: number;
  paymentMethod: string;
  mobile?: string;
  upiId?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentProof?: string; // URL to payment proof image
}

const StatusChip = styled(Chip)(({ theme, color }) => ({
  fontWeight: 500,
  borderRadius: '16px',
  textTransform: 'capitalize',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  ...(color === 'primary' && {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  }),
  ...(color === 'success' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ...(color === 'error' && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 'none'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  '& .MuiTableCell-head': {
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderBottom: 'none'
  },
}));

export default function WithdrawalRequestsPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([
    {
      id: '1012',
      name: 'Hariyannan',
      username: '7362353656',
      ledgerBalance: 5000,
      availableBalance: 4200,
      broker: 'Angel One',
      brokerCode: 'ANGL-123',
      amount: 2000,
      paymentMethod: 'UPI',
      time: '25 Apr 2025 11:21 am',
      status: 'pending',
      paymentProof: '/images/payment-proof-1.jpg'
    },
    {
      id: '1011',
      name: 'Rahul',
      username: '8508847725',
      ledgerBalance: 15000,
      availableBalance: 12500,
      broker: 'Zerodha',
      brokerCode: 'ZRDH-456',
      amount: 10000,
      paymentMethod: 'Bank Transfer',
      time: '25 Apr 2025 10:27 am',
      status: 'pending',
      paymentProof: '/images/payment-proof-2.jpg'
    },
    {
      id: '1010',
      name: 'Laxmi Acharya (Nepal)',
      username: '9686806717',
      ledgerBalance: 8000,
      availableBalance: 6500,
      broker: 'ICICI Direct',
      brokerCode: 'ICICI-789',
      amount: 5000,
      paymentMethod: 'UPI',
      time: '25 Apr 2025 09:38 pm',
      status: 'pending',
      paymentProof: '/images/payment-proof-3.jpg'
    },
    {
      id: '1009',
      name: 'Manki Enterprise',
      username: '9686806717',
      ledgerBalance: 25000,
      availableBalance: 22000,
      broker: 'HDFC Securities',
      brokerCode: 'HDFC-321',
      amount: 15000,
      paymentMethod: 'Bank Transfer',
      time: '25 Apr 2025 01:36 pm',
      status: 'pending',
      paymentProof: '/images/payment-proof-4.jpg'
    },
    {
      id: '1008',
      name: 'Prakash Amin',
      username: '9273005195',
      ledgerBalance: 18000,
      availableBalance: 14000,
      broker: 'Upstox',
      brokerCode: 'UPST-654',
      amount: 10000,
      paymentMethod: 'UPI',
      time: '24 Apr 2025 11:00 am',
      status: 'approved',
      paymentProof: '/images/payment-proof-5.jpg'
    },
    {
      id: '1007',
      name: 'Prakash Amin',
      username: '9273005195',
      ledgerBalance: 18000,
      availableBalance: 14000,
      broker: 'Upstox',
      brokerCode: 'UPST-654',
      amount: 10000,
      paymentMethod: 'UPI',
      time: '24 Apr 2025 11:45 am',
      status: 'approved',
      paymentProof: '/images/payment-proof-6.jpg'
    },
    {
      id: '1006',
      name: 'Prakash Amin',
      username: '9273005195',
      ledgerBalance: 18000,
      availableBalance: 14000,
      broker: 'Upstox',
      brokerCode: 'UPST-654',
      amount: 10000,
      paymentMethod: 'UPI',
      time: '24 Apr 2025 10:00 am',
      status: 'approved',
      paymentProof: '/images/payment-proof-7.jpg'
    },
    {
      id: '1005',
      name: 'K Gupta',
      username: '9740407953',
      ledgerBalance: 30000,
      availableBalance: 27500,
      broker: 'Motilal Oswal',
      brokerCode: 'MOTI-987',
      amount: 20000,
      paymentMethod: 'Bank Transfer',
      time: '20 Apr 2025 04:36 pm',
      status: 'approved',
      paymentProof: '/images/payment-proof-8.jpg'
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  const handleViewDetail = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setOpenDetailDialog(true);
  };

  const handleApproveRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setOpenApproveDialog(true);
  };

  const handleRejectRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setOpenRejectDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDetailDialog(false);
    setOpenApproveDialog(false);
    setOpenRejectDialog(false);
    setRejectionReason('');
  };

  const handleConfirmApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to update the request status
      const updatedRequests = withdrawalRequests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'approved' as const } 
          : req
      );
      
      setWithdrawalRequests(updatedRequests);
      handleCloseDialog();
    } catch (err) {
      setError('An error occurred while approving the withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedRequest) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to update the request status with rejection reason
      const updatedRequests = withdrawalRequests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'rejected' as const } 
          : req
      );
      
      setWithdrawalRequests(updatedRequests);
      handleCloseDialog();
    } catch (err) {
      setError('An error occurred while rejecting the withdrawal request');
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
    if (selectedRequests.length === withdrawalRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(withdrawalRequests.map(req => String(req.id)));
    }
  };

  const handleProcessSelected = async (action: 'approve' | 'reject') => {
    if (selectedRequests.length === 0) return;
    
    try {
      setLoading(true);
      
      const updatedRequests = withdrawalRequests.map(req => 
        selectedRequests.includes(String(req.id))
          ? { ...req, status: (action === 'approve' ? 'approved' : 'rejected') as 'approved' | 'rejected' }
          : req
      );
      
      setWithdrawalRequests(updatedRequests as WithdrawalRequest[]);
      setSelectedRequests([]);
    } catch (err) {
      setError(`An error occurred while ${action}ing the selected withdrawal requests`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && withdrawalRequests.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <StyledPaper sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            color: 'white',
            p: 2,
            borderRadius: '12px',
          }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Withdrawal Requests
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {selectedRequests.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleProcessSelected('approve')}
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  Process Selected ({selectedRequests.length})
                </Button>
              )}
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleOutlineIcon />}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Bulk Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<CancelIcon />}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Bulk Reject
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {error}
            </Alert>
          )}

          <TableContainer>
            <Table 
              sx={{ 
                minWidth: 650,
                '& .MuiTableRow-root': {
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '16px',
                    right: '16px',
                    height: '1px',
                    backgroundColor: (theme) => theme.palette.divider,
                    borderRadius: '8px',
                  },
                  '&:last-child:after': {
                    display: 'none'
                  }
                },
              }}
            >
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRequests.length === withdrawalRequests.length}
                      indeterminate={selectedRequests.length > 0 && selectedRequests.length < withdrawalRequests.length}
                      onChange={handleSelectAllRequests}
                      sx={{ color: 'white' }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>User Details</StyledTableCell>
                  <StyledTableCell>Broker & Code</StyledTableCell>
                  <StyledTableCell>Payment Proof</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {withdrawalRequests.map((request) => (
                  <StyledTableRow key={request.id} hover>
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRequests.includes(String(request.id))}
                        onChange={() => handleSelectRequest(String(request.id))}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        #{request.id}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {request.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {request.username}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            Ledger: ₹{request.ledgerBalance}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Available: ₹{request.availableBalance}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      {request.broker ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {request.broker}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {request.brokerCode}
                          </Typography>
                        </Box>
                      ) : '-'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {request.paymentProof ? (
                        <Box 
                          component="img" 
                          src={request.paymentProof} 
                          alt="Payment Proof"
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            objectFit: 'cover', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: 3
                            }
                          }}
                          onClick={() => handleViewDetail(request)}
                        />
                      ) : (
                        <Box 
                          component="img" 
                          src="/placeholder-document.jpg" 
                          alt="No Document"
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            objectFit: 'cover', 
                            borderRadius: '8px',
                            opacity: 0.5
                          }}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2">
                        {request.time}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {request.status === 'pending' ? (
                          <>
                            <Button 
                              variant="contained" 
                              color="success"
                              size="small"
                              onClick={() => handleApproveRequest(request)}
                              startIcon={<CheckCircleOutlineIcon />}
                              sx={{ 
                                textTransform: 'none',
                                borderRadius: '8px',
                                minWidth: '100px'
                              }}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="contained" 
                              color="error"
                              size="small"
                              onClick={() => handleRejectRequest(request)}
                              startIcon={<CancelIcon />}
                              sx={{ 
                                textTransform: 'none',
                                borderRadius: '8px',
                                minWidth: '100px'
                              }}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <StatusChip 
                            label={request.status} 
                            size="medium" 
                            color={
                              request.status === 'approved' ? 'success' : 
                              request.status === 'rejected' ? 'error' : 'primary'
                            } 
                          />
                        )}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          color: 'white',
          borderRadius: '16px 16px 0 0',
        }}>
          Withdrawal Request Details
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedRequest && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3, borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      User Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body1">
                        <strong>ID:</strong> {selectedRequest.id}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Name:</strong> {selectedRequest.name}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Username:</strong> {selectedRequest.username}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ledger Balance:</strong> ₹{selectedRequest.ledgerBalance}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Available Balance:</strong> ₹{selectedRequest.availableBalance}
                      </Typography>
                      {selectedRequest.broker && (
                        <>
                          <Typography variant="body1">
                            <strong>Broker:</strong> {selectedRequest.broker}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Broker Code:</strong> {selectedRequest.brokerCode}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Withdrawal Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body1">
                        <strong>Amount:</strong> ₹{selectedRequest.amount}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Payment Method:</strong> {selectedRequest.paymentMethod}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Time:</strong> {selectedRequest.time}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Status:</strong> 
                        <StatusChip 
                          label={selectedRequest.status} 
                          size="small" 
                          color={
                            selectedRequest.status === 'approved' ? 'success' : 
                            selectedRequest.status === 'rejected' ? 'error' : 'primary'
                          } 
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Payment Details
                    </Typography>
                    {selectedRequest.paymentMethod === 'Bank Transfer' ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1">
                          <strong>Account Holder:</strong> {selectedRequest.accountHolder || selectedRequest.name}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Account Number:</strong> {selectedRequest.accountNumber || '****1234'}
                        </Typography>
                        <Typography variant="body1">
                          <strong>IFSC:</strong> {selectedRequest.ifsc || 'HDFC0001234'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body1">
                          <strong>UPI ID:</strong> {selectedRequest.upiId || `${selectedRequest.username.substring(0, 5)}@upi`}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Mobile:</strong> {selectedRequest.mobile || selectedRequest.username}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {selectedRequest && selectedRequest.status === 'pending' && (
            <>
              <Button 
                onClick={() => {
                  handleCloseDialog();
                  handleRejectRequest(selectedRequest);
                }} 
                color="error"
                variant="outlined"
                startIcon={<CancelIcon />}
                sx={{ borderRadius: '8px' }}
              >
                Reject
              </Button>
              <Button 
                onClick={() => {
                  handleCloseDialog();
                  handleApproveRequest(selectedRequest);
                }} 
                color="success"
                variant="contained"
                startIcon={<CheckCircleOutlineIcon />}
                sx={{ borderRadius: '8px' }}
              >
                Approve
              </Button>
            </>
          )}
          <Button 
            onClick={handleCloseDialog} 
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog
        open={openApproveDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
          color: 'white',
          borderRadius: '16px 16px 0 0',
        }}>
          Approve Withdrawal Request
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText>
            Are you sure you want to approve this withdrawal request? This action will update the user's ledger balance.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmApprove} 
            color="success" 
            variant="contained"
            disabled={loading}
            sx={{ borderRadius: '8px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Approve'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={openRejectDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
          color: 'white',
          borderRadius: '16px 16px 0 0',
        }}>
          Reject Withdrawal Request
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText>
            Please provide a reason for rejecting this withdrawal request:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rejection-reason"
            label="Rejection Reason"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ mt: 2, borderRadius: '8px' }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmReject} 
            color="error" 
            variant="contained"
            disabled={loading || !rejectionReason.trim()}
            sx={{ borderRadius: '8px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
