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
import { getUserDeposits, approveDepositRequest, rejectDepositRequest, bulkProcessDepositRequests, DepositRequest } from '@/services/deposit-service';
import ErrorBoundary from '@/components/ErrorBoundary';
import { isAuthenticated } from '@/utils/auth';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTableCell-head': {
    color: theme.palette.common.white,
    fontWeight: 600,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'capitalize',
}));

function DepositRequestsContent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([]);
  
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // Helper function to format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch (e) {
      return dateString;
    }
  };

  // Helper function to get user display name
  const getUserDisplayName = (request: DepositRequest) => {
    return request.name || request.user_id || 'User';
  };

  // Fetch deposit requests on component mount
  useEffect(() => {
    const fetchDepositRequests = async () => {
      try {
        setLoading(true);
        
        // Add a small delay to ensure the component is fully mounted
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check authentication status using the utility function
        if (!isAuthenticated()) {
          console.warn("User is not authenticated");
          setError("Authentication required. Please log in again.");
          setLoading(false);
          return;
        }
        
        // Fetch data with proper error handling
        const data = await getUserDeposits();
        console.log("Deposit requests loaded:", data);
        setDepositRequests(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch deposit requests:', err);
        setError('Failed to load deposit requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepositRequests();
  }, []);

  const handleViewDetail = (request: DepositRequest) => {
    setSelectedRequest(request);
    setOpenDetailDialog(true);
  };

  const handleViewImage = (imageSrc: string | undefined) => {
    if (imageSrc) {
      setSelectedImage(imageSrc);
      setOpenImageDialog(true);
    }
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleApproveRequest = (request: DepositRequest) => {
    setSelectedRequest(request);
    setOpenApproveDialog(true);
  };

  const handleRejectRequest = (request: DepositRequest) => {
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
      
      await approveDepositRequest(selectedRequest.id);
      
      // Update local state
      const updatedRequests = depositRequests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'approved' as const } 
          : req
      );
      
      setDepositRequests(updatedRequests);
      handleCloseDialog();
    } catch (err) {
      setError('An error occurred while approving the deposit request');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedRequest) return;
    
    try {
      setLoading(true);
      
      await rejectDepositRequest(selectedRequest.id, rejectionReason);
      
      // Update local state
      const updatedRequests = depositRequests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'rejected' as const } 
          : req
      );
      
      setDepositRequests(updatedRequests);
      handleCloseDialog();
    } catch (err) {
      setError('An error occurred while rejecting the deposit request');
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
    if (selectedRequests.length === depositRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(depositRequests.map(req => String(req.id)));
    }
  };

  const handleProcessSelected = async (action: 'approve' | 'reject') => {
    if (selectedRequests.length === 0) return;
    
    try {
      setLoading(true);
      
      await bulkProcessDepositRequests(selectedRequests, action);
      
      // Update local state
      const updatedRequests = depositRequests.map(req => 
        selectedRequests.includes(String(req.id))
          ? { ...req, status: (action === 'approve' ? 'approved' : 'rejected') as 'approved' | 'rejected' }
          : req
      );
      
      setDepositRequests(updatedRequests as DepositRequest[]);
      setSelectedRequests([]);
    } catch (err) {
      setError(`An error occurred while ${action}ing the selected deposit requests`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && depositRequests.length === 0) {
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
              Deposit Requests
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
                      checked={selectedRequests.length === depositRequests.length}
                      indeterminate={selectedRequests.length > 0 && selectedRequests.length < depositRequests.length}
                      onChange={handleSelectAllRequests}
                      sx={{ color: 'white' }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>User Details</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Payment Proof</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {depositRequests.map((request) => (
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
                          {getUserDisplayName(request)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {request.user_id?.substring(0, 12)}
                        </Typography>
                        {(request.ledgerBalance !== undefined || request.availableBalance !== undefined) && (
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            {request.ledgerBalance !== undefined && (
                              <Typography variant="body2" color="text.secondary">
                                Ledger: ₹{request.ledgerBalance}
                              </Typography>
                            )}
                            {request.availableBalance !== undefined && (
                              <Typography variant="body2" color="text.secondary">
                                Available: ₹{request.availableBalance}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ₹{request.amount}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      {(request.paymentProof || request.image) ? (
                        <Box 
                          component="img" 
                          src={request.paymentProof || request.image} 
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
                          onClick={() => handleViewImage(request.paymentProof || request.image)}
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
                        {request.time || formatDate(request.createdAt)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
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
          Deposit Request Details
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
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
                        <strong>User ID:</strong> {selectedRequest.user_id || 'N/A'}
                      </Typography>
                      {selectedRequest.name && (
                        <Typography variant="body1">
                          <strong>Name:</strong> {selectedRequest.name}
                        </Typography>
                      )}
                      {selectedRequest.username && (
                        <Typography variant="body1">
                          <strong>Username:</strong> {selectedRequest.username}
                        </Typography>
                      )}
                      {selectedRequest.ledgerBalance !== undefined && (
                        <Typography variant="body1">
                          <strong>Ledger Balance:</strong> ₹{selectedRequest.ledgerBalance}
                        </Typography>
                      )}
                      {selectedRequest.availableBalance !== undefined && (
                        <Typography variant="body1">
                          <strong>Available Balance:</strong> ₹{selectedRequest.availableBalance}
                        </Typography>
                      )}
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
                      Deposit Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body1">
                        <strong>Amount:</strong> ₹{selectedRequest.amount}
                      </Typography>
                      {selectedRequest.paymentMethod && (
                        <Typography variant="body1">
                          <strong>Payment Method:</strong> {selectedRequest.paymentMethod}
                        </Typography>
                      )}
                      <Typography variant="body1">
                        <strong>Time:</strong> {selectedRequest.time || formatDate(selectedRequest.createdAt)}
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
                          <strong>Account Holder:</strong> {selectedRequest.accountHolder || selectedRequest.name || 'N/A'}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Account Number:</strong> {selectedRequest.accountNumber || '****1234'}
                        </Typography>
                        <Typography variant="body1">
                          <strong>IFSC:</strong> {selectedRequest.ifsc || 'N/A'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {selectedRequest.upiId && (
                          <Typography variant="body1">
                            <strong>UPI ID:</strong> {selectedRequest.upiId}
                          </Typography>
                        )}
                        {selectedRequest.mobile && (
                          <Typography variant="body1">
                            <strong>Mobile:</strong> {selectedRequest.mobile}
                          </Typography>
                        )}
                        <Typography variant="body1">
                          <strong>Created At:</strong> {formatDate(selectedRequest.createdAt)}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Updated At:</strong> {formatDate(selectedRequest.updatedAt)}
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
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
          {selectedImage && (
            <Box 
              component="img" 
              src={selectedImage} 
              alt="Payment Proof"
              sx={{ 
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseImageDialog}
            variant="contained"
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
          Approve Deposit Request
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText>
            Are you sure you want to approve this deposit request? This action will update the user's ledger balance.
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
          Reject Deposit Request
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to reject this deposit request? Please provide a reason for rejection.
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
            sx={{ borderRadius: '8px' }}
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

export default function DepositRequestsPage() {
  return (
    <ErrorBoundary>
      <DepositRequestsContent />
    </ErrorBoundary>
  );
} 