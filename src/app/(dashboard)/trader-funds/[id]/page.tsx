'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { TraderFundTransaction } from '@/types/trader-funds';
import { fetchTraderFundById } from '@/services/trader-funds';

const TransactionDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<TraderFundTransaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const transactionId = params.id as string;
        const transactionData = await fetchTraderFundById(transactionId);
        
        setTransaction(transactionData);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        setError('Failed to load transaction details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTransactionDetails();
    }
  }, [params.id]);

  const handleBack = () => {
    router.push('/trader-funds');
  };

  // Format transaction detail fields for display
  const getFieldValue = (label: string, value: string | number) => {
    // Special formatting for different field types
    if (label === 'Amount') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(value as number);
    }
    
    return value;
  };

  const renderField = (label: string, value: string | number | undefined) => {
    if (value === undefined) return null;

    return (
      <Grid container sx={{ mb: 2, py: 1.5 }}>
        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          {label === 'Transaction Type' ? (
            <Chip 
              label={value as string} 
              color={value === 'Deducted' ? 'error' : 'success'} 
              size="small"
              variant="outlined"
            />
          ) : label === 'Transaction Mode' ? (
            <Chip 
              label={value as string} 
              color={value === 'Online' ? 'primary' : 'default'} 
              size="small"
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary'
              }}
            >
              {getFieldValue(label, value as string | number)}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !transaction) {
    return (
      <Box sx={{ p: 3 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Transactions
        </Button>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            {error || 'Transaction not found'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            The transaction you are looking for does not exist or has been removed.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Transactions
      </Button>

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ bgcolor: '#1a2138', color: 'white', p: 2 }}>
          <Typography variant="h6">Transaction Details</Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {renderField('ID', transaction.id)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('User ID', transaction.userId)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('username', transaction.username || transaction.userId)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Amount', transaction.amount)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Notes', transaction.notes || '-')}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Transaction for', transaction.transactionFor || (transaction.txnType === 'Deducted' ? 'Withdrawal' : 'Deposit'))}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Transaction Type', transaction.txnType)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Transaction Mode', transaction.txnMode)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Created At', transaction.createdAt)}
          <Divider sx={{ my: 1 }} />
          
          {renderField('Modified At', transaction.modifiedAt || transaction.createdAt)}
        </Box>
      </Paper>
    </Box>
  );
};

export default TransactionDetailsPage; 