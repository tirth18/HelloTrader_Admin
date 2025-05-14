'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  IconButton,
  Dialog,
  CircularProgress,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import BankAccountForm from './BankAccountForm';
import axios from 'axios';

interface BankAccount {
  id: number;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type: string;
  is_primary: boolean;
  is_verified: boolean;
  verification_date?: string;
}

export default function BankAccountsList() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  // Fetch bank accounts
  const fetchBankAccounts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      /*const response = await axios.get('/api/banking/bank-accounts');
      setBankAccounts(response.data.bank_accounts);*/
      
      // Mock data for development
      setTimeout(() => {
        const mockAccounts: BankAccount[] = [
          {
            id: 1,
            account_holder_name: 'John Doe',
            bank_name: 'HDFC Bank',
            account_number: '●●●●●●1234',
            ifsc_code: 'HDFC0001234',
            account_type: 'Savings',
            is_primary: true,
            is_verified: true,
            verification_date: '2023-06-15T10:30:00Z'
          },
          {
            id: 2,
            account_holder_name: 'John Doe',
            bank_name: 'ICICI Bank',
            account_number: '●●●●●●5678',
            ifsc_code: 'ICIC0002345',
            account_type: 'Current',
            is_primary: false,
            is_verified: false
          }
        ];
        setBankAccounts(mockAccounts);
        setLoading(false);
      }, 800);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to fetch bank accounts');
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const handleAddAccount = () => {
    setOpenAddDialog(true);
  };

  const handleEditAccount = (account: BankAccount) => {
    setSelectedAccount(account);
    setOpenEditDialog(true);
  };

  const handleDeleteAccount = (account: BankAccount) => {
    setSelectedAccount(account);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedAccount(null);
  };

  const handleMakePrimary = async (accountId: number) => {
    try {
      // TODO: Implement actual API call
      /*await axios.put(`/api/banking/bank-accounts/${accountId}`, {
        is_primary: true
      });*/
      
      // Update state
      setBankAccounts(accounts => 
        accounts.map(account => ({
          ...account,
          is_primary: account.id === accountId
        }))
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to update bank account');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleSaveAccount = async (accountData: Partial<BankAccount>) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*const response = await axios.post('/api/banking/bank-accounts', accountData);
      const newAccount = response.data.bank_account;*/
      
      // Mock response
      const newAccount: BankAccount = {
        id: bankAccounts.length + 1,
        account_holder_name: accountData.account_holder_name || '',
        bank_name: accountData.bank_name || '',
        account_number: accountData.account_number ? '●●●●●●' + accountData.account_number.slice(-4) : '',
        ifsc_code: accountData.ifsc_code || '',
        account_type: accountData.account_type || 'Savings',
        is_primary: accountData.is_primary || false,
        is_verified: false
      };
      
      setBankAccounts([...bankAccounts, newAccount]);
      handleCloseDialog();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to create bank account');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccount = async (accountData: Partial<BankAccount>) => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*const response = await axios.put(`/api/banking/bank-accounts/${selectedAccount.id}`, accountData);
      const updatedAccount = response.data.bank_account;*/
      
      // Mock update
      const updatedAccount: BankAccount = {
        ...selectedAccount,
        ...accountData,
        account_number: accountData.account_number 
          ? '●●●●●●' + accountData.account_number.slice(-4)
          : selectedAccount.account_number
      };
      
      setBankAccounts(accounts => 
        accounts.map(account => 
          account.id === selectedAccount.id ? updatedAccount : account
        )
      );
      handleCloseDialog();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to update bank account');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      // TODO: Implement actual API call
      /*await axios.delete(`/api/banking/bank-accounts/${selectedAccount.id}`);*/
      
      // Update state
      setBankAccounts(accounts => 
        accounts.filter(account => account.id !== selectedAccount.id)
      );
      handleCloseDialog();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Failed to delete bank account');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && bankAccounts.length === 0) {
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
          Your Bank Accounts
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddAccount}
        >
          Add Bank Account
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {bankAccounts.length === 0 ? (
        <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.default' }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                You haven't added any bank accounts yet.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddAccount}
                sx={{ mt: 2 }}
              >
                Add Your First Bank Account
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {bankAccounts.map((account) => (
            <Grid item xs={12} md={6} key={account.id}>
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
                        {account.bank_name}
                        {account.is_primary && (
                          <Chip 
                            size="small" 
                            label="Primary" 
                            color="primary" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Holder: {account.account_holder_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Number: {account.account_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        IFSC Code: {account.ifsc_code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Type: {account.account_type}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        {account.is_verified ? (
                          <Chip 
                            icon={<VerifiedIcon />} 
                            label="Verified" 
                            color="success" 
                            size="small" 
                            variant="outlined"
                          />
                        ) : (
                          <Chip 
                            label="Verification Pending" 
                            color="warning" 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <IconButton 
                        color={account.is_primary ? "default" : "primary"}
                        onClick={() => handleMakePrimary(account.id)}
                        disabled={account.is_primary}
                        title={account.is_primary ? "Primary Account" : "Make Primary"}
                      >
                        {account.is_primary ? <StarIcon /> : <StarOutlineIcon />}
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditAccount(account)}
                        title="Edit Account"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteAccount(account)}
                        title="Delete Account"
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
      )}

      {/* Add Bank Account Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <BankAccountForm 
          onClose={handleCloseDialog} 
          onSave={handleSaveAccount}
          title="Add Bank Account"
        />
      </Dialog>

      {/* Edit Bank Account Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <BankAccountForm 
          onClose={handleCloseDialog} 
          onSave={handleUpdateAccount}
          title="Edit Bank Account"
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
            Are you sure you want to delete this bank account? This action cannot be undone.
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