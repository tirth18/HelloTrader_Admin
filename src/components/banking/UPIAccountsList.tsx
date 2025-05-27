'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UPIAccount {
  id: number;
  type: string;
  upi_id: string;
  is_primary: boolean;
  is_verified: boolean;
  qr_code_url?: string;
}

export default function UPIAccountsList() {
  const [upiAccounts, setUpiAccounts] = useState<UPIAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<UPIAccount | null>(null);

  // Fetch UPI accounts
  const fetchUpiAccounts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      /*const response = await axios.get('/api/banking/upi-accounts');
      setUpiAccounts(response.data.upi_accounts);*/
      
      // Mock data for development
      setTimeout(() => {
        const mockAccounts: UPIAccount[] = [
          {
            id: 1,
            type: 'Google Pay',
            upi_id: 'johndoe@okicici',
            is_primary: true,
            is_verified: true
          },
          {
            id: 2,
            type: 'PhonePe',
            upi_id: 'john.doe@ybl',
            is_primary: false,
            is_verified: true
          },
          {
            id: 3,
            type: 'Paytm',
            upi_id: 'paytm.johndoe@paytm',
            is_primary: false,
            is_verified: false
          }
        ];
        setUpiAccounts(mockAccounts);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch UPI accounts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpiAccounts();
  }, []);

  const handleAddAccount = () => {
    setOpenAddDialog(true);
  };

  const handleEditAccount = (account: UPIAccount) => {
    setSelectedAccount(account);
    setOpenEditDialog(true);
  };

  const handleDeleteAccount = (account: UPIAccount) => {
    setSelectedAccount(account);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedAccount(null);
  };

  const handleSaveAccount = async (accountData: Omit<UPIAccount, 'id'>) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*const response = await axios.post('/api/banking/upi-accounts', accountData);
      const newAccount = response.data.upi_account;*/
      
      // Mock response
      const newAccount: UPIAccount = {
        id: upiAccounts.length + 1,
        ...accountData as any,
        is_verified: false
      };
      
      setUpiAccounts([...upiAccounts, newAccount]);
      handleCloseDialog();
    } catch (err) {
      setError('Failed to create UPI account');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccount = async (accountData: Partial<UPIAccount>) => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*const response = await axios.put(`/api/banking/upi-accounts/${selectedAccount.id}`, accountData);
      const updatedAccount = response.data.upi_account;*/
      
      // Mock update
      const updatedAccount: UPIAccount = {
        ...selectedAccount,
        ...accountData as any,
      };
      
      setUpiAccounts(accounts => 
        accounts.map(account => 
          account.id === selectedAccount.id ? updatedAccount : account
        )
      );
      handleCloseDialog();
    } catch (err) {
      setError('Failed to update UPI account');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*await axios.delete(`/api/banking/upi-accounts/${selectedAccount.id}`);*/
      
      // Update state
      setUpiAccounts(accounts => 
        accounts.filter(account => account.id !== selectedAccount.id)
      );
      handleCloseDialog();
    } catch (err) {
      setError('Failed to delete UPI account');
    } finally {
      setLoading(false);
    }
  };

  if (loading && upiAccounts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Your UPI Accounts
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddAccount}
          sx={{ bgcolor: '#4CAF50' }}
        >
          Add UPI Account
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {upiAccounts.length === 0 ? (
        <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.default' }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                You haven't added any UPI accounts yet.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddAccount}
                sx={{ mt: 2 }}
              >
                Add Your First UPI Account
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) :
        <Grid container spacing={2}>
          {upiAccounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card variant="outlined" sx={{ 
                mb: 2, 
                bgcolor: account.is_primary ? 'primary.50' : 'background.default',
                border: account.is_primary ? '1px solid' : undefined,
                borderColor: account.is_primary ? 'primary.main' : undefined
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {account.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        UPI ID: {account.upi_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status: {account.is_verified ? 'Verified' : 'Verification Pending'}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditAccount(account)}
                        title="Edit UPI"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteAccount(account)}
                        title="Delete UPI"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      }

      {/* Add UPI Dialog */}
      <Dialog 
        open={openAddDialog || openEditDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <UpiAccountForm 
          onClose={handleCloseDialog} 
          onSave={openAddDialog ? handleSaveAccount : handleUpdateAccount}
          title={openAddDialog ? "Add UPI Account" : "Edit UPI Account"}
          initialData={selectedAccount || undefined}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete this UPI account? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

// UPI Account Form Component
interface UpiAccountFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  initialData?: UPIAccount;
}

function UpiAccountForm({ onClose, onSave, title, initialData }: UpiAccountFormProps) {
  const [loading, setLoading] = useState(false);

  const upiTypes = [
    'Google Pay', 
    'PhonePe', 
    'Paytm', 
    'BHIM UPI', 
    'Amazon Pay',
    'Other'
  ];

  const formik = useFormik({
    initialValues: initialData ? {
      ...initialData
    } : {
      type: 'Google Pay',
      upi_id: '',
      is_primary: false
    },
    validationSchema: Yup.object({
      type: Yup.string().required('UPI type is required'),
      upi_id: Yup.string()
        .required('UPI ID is required')
        .matches(/^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}/, 'Invalid UPI ID format')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        onSave(values);
      } catch (error) {
        console.error('Error saving UPI account:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          select
          margin="normal"
          fullWidth
          id="type"
          label="UPI Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          SelectProps={{
            native: true,
          }}
        >
          {upiTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          margin="normal"
          fullWidth
          id="upi_id"
          label="UPI ID"
          name="upi_id"
          value={formik.values.upi_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.upi_id && Boolean(formik.errors.upi_id)}
          helperText={formik.touched.upi_id && formik.errors.upi_id || 'Format: username@bank (e.g., johndoe@okicici)'}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained" 
            color="primary"
            disabled={loading || !formik.isValid}
            sx={{ bgcolor: '#4CAF50' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 