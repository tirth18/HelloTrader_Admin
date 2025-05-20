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
  Checkbox,
  Tooltip,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
  Collapse
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { getUserDeposits, approveDepositRequest, rejectDepositRequest, bulkProcessDepositRequests, DepositRequest } from '@/services/deposit-service';
import ErrorBoundary from '@/components/ErrorBoundary';
import { isAuthenticated } from '@/utils/auth';
import { format } from 'date-fns';

// Styled components
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
  padding: '16px 8px',
  whiteSpace: 'nowrap',
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
  padding: '6px 12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  minWidth: '80px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  }
}));

function DepositRequestsContent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
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
  const [showAlert, setShowAlert] = useState(false);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Helper function to format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy HH:mm');
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
    fetchDepositRequests();
  }, []);

  const fetchDepositRequests = async () => {
    try {
      setLoading(true);
      
      // Check authentication status using the utility function
      if (!isAuthenticated()) {
        console.warn("User is not authenticated");
        setError("Authentication required. Please log in again.");
        setShowAlert(true);
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
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

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
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) return;
    
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

  if (loading && depositRequests.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  const pendingRequests = depositRequests.filter(req => req.status === 'pending');

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
          Deposit Requests
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Refresh data">
          <ActionIconButton size="small" onClick={fetchDepositRequests}>
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
              All Deposit Requests
            </Typography>
            <Chip 
              label={`${depositRequests.length} Total`} 
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
                '&:hover': { backgroundColor: '#10B981' }
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
                '&:hover': { backgroundColor: '#EF4444' }
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
          <Table stickyHeader sx={{ minWidth: 1200 }}>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell padding="checkbox" align="center" sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>
                  <Checkbox
                    checked={selectedRequests.length === depositRequests.length && depositRequests.length > 0}
                    indeterminate={selectedRequests.length > 0 && selectedRequests.length < depositRequests.length}
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
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>ID</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>User Details</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>Amount</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>Payment Proof</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>Status</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1 }}>Created At</StyledTableCell>
                <StyledTableCell align="center" sx={{ backgroundColor: '#212b42', position: 'sticky', top: 0, zIndex: 1, width: '180px' }}>Actions</StyledTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {depositRequests.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align="center">
                    <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <InfoOutlinedIcon sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.3)' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        No deposit requests found
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        There are no deposit requests to display at the moment
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={fetchDepositRequests}
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
                depositRequests.map((request) => (
                  <StyledTableRow key={request.id}>
                    <StyledTableCell padding="checkbox" align="center">
                      <Checkbox
                        checked={selectedRequests.includes(String(request.id))}
                        onChange={() => handleSelectRequest(String(request.id))}
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-checked': {
                            color: '#3b82f6',
                          }
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        #{request.id}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {getUserDisplayName(request)}
                        </Typography>
                        {request.user_id && (
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            ID: {request.user_id.substring(0, 12)}
                          </Typography>
                        )}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                        ₹{request.amount.toLocaleString()}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      {(request.paymentProof || request.image) ? (
                        <Box 
                          component="img" 
                          src={request.paymentProof || request.image} 
                          alt="Payment Proof"
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            objectFit: 'cover', 
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                          }}
                          onClick={() => handleViewImage(request.paymentProof || request.image)}
                        />
                      ) : (
                        <Chip 
                          label="No Proof" 
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(107, 114, 128, 0.2)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            height: '24px'
                          }}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusChipStyled
                        label={request.status.toUpperCase()}
                        color={getStatusColor(request.status) as any}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        {formatDate(request.createdAt || request.time)}
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
                        {request.status === 'pending' ? (
                          <>
                            <TableActionButton
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApproveRequest(request)}
                              startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                              sx={{ 
                                backgroundColor: alpha('#10B981', 0.9),
                                '&:hover': { backgroundColor: '#10B981' }
                              }}
                            >
                              Approve
                            </TableActionButton>
                            <TableActionButton
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleRejectRequest(request)}
                              startIcon={<CancelIcon fontSize="small" />}
                              sx={{ 
                                backgroundColor: alpha('#EF4444', 0.9),
                                '&:hover': { backgroundColor: '#EF4444' },
                                border: '2px solid rgba(255, 255, 255, 0.2)'
                              }}
                            >
                              Reject
                            </TableActionButton>
                          </>
                        ) : (
                          <TableActionButton
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewDetail(request)}
                            startIcon={<VisibilityIcon fontSize="small" />}
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)',
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderColor: 'rgba(255, 255, 255, 0.3)' 
                              }
                            }}
                          >
                            Details
                          </TableActionButton>
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

      {/* Detail Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
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
          background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px',
          fontWeight: 600,
        }}>
          Deposit Request Details
        </DialogTitle>
        <DialogContent sx={{ mt: 3, px: 3 }}>
          {selectedRequest && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  mb: 3, 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#3b82f6', fontWeight: 600 }}>
                      User Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          #{selectedRequest.id}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          User ID
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {selectedRequest.user_id || 'N/A'}
                        </Typography>
                      </Box>
                      {selectedRequest.name && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Name
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedRequest.name}
                          </Typography>
                        </Box>
                      )}
                      {selectedRequest.username && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Username
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedRequest.username}
                          </Typography>
                        </Box>
                      )}
                      {selectedRequest.ledgerBalance !== undefined && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Ledger Balance
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                            ₹{selectedRequest.ledgerBalance.toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                      {selectedRequest.availableBalance !== undefined && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Available Balance
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                            ₹{selectedRequest.availableBalance.toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#3b82f6', fontWeight: 600 }}>
                      Deposit Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          Amount
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                          ₹{selectedRequest.amount.toLocaleString()}
                        </Typography>
                      </Box>
                      {selectedRequest.paymentMethod && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Payment Method
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedRequest.paymentMethod}
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          Created At
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatDate(selectedRequest.createdAt || selectedRequest.time)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          Status
                        </Typography>
                        <StatusChipStyled 
                          label={selectedRequest.status.toUpperCase()} 
                          size="small" 
                          color={getStatusColor(selectedRequest.status) as any}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#3b82f6', fontWeight: 600 }}>
                      Payment Proof
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flex: 1,
                      minHeight: '200px'
                    }}>
                      {(selectedRequest.paymentProof || selectedRequest.image) ? (
                        <Box 
                          component="img" 
                          src={selectedRequest.paymentProof || selectedRequest.image} 
                          alt="Payment Proof"
                          sx={{ 
                            maxWidth: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                            }
                          }}
                          onClick={() => handleViewImage(selectedRequest.paymentProof || selectedRequest.image)}
                        />
                      ) : (
                        <Box sx={{ textAlign: 'center' }}>
                          <InfoOutlinedIcon sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.3)', mb: 1 }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            No payment proof available
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
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
            borderRadius: '12px',
            backgroundColor: '#1a2234',
            color: 'white',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
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
        <DialogActions sx={{ p: 2, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Button 
            onClick={handleCloseImageDialog}
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.3)' 
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve Dialog */}
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
          Approve Deposit Request
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
                  User
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {getUserDisplayName(selectedRequest)}
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
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            Are you sure you want to approve this deposit request?
            <br />
            This action will update the user's ledger balance and cannot be undone.
          </DialogContentText>
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
            disabled={loading}
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

      {/* Reject Dialog */}
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
          Reject Deposit Request
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
                  User
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {getUserDisplayName(selectedRequest)}
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
            Please provide a reason for rejecting this deposit request:
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
}

export default function DepositRequestsPage() {
  return (
    <ErrorBoundary>
      <DepositRequestsContent />
    </ErrorBoundary>
  );
} 