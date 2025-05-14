'use client';

import { useState } from 'react';
import { 
  Typography, 
  Box, 
  Container,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import WithdrawalRequestForm, { WithdrawalFormData } from '@/components/banking/WithdrawalRequestForm';

export default function CreateWithdrawalPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const userData = {
    id: 'user123',
    name: 'John Doe',
    username: '9876543210',
    availableBalance: 25000,
    ledgerBalance: 28000
  };
  
  const handleSubmitWithdrawal = async (data: WithdrawalFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to submit the withdrawal request
      console.log('Withdrawal request submitted:', data);
      
      // Return success
      return Promise.resolve();
    } catch (err) {
      setError('An error occurred while submitting your withdrawal request');
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          Request Withdrawal
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <WithdrawalRequestForm 
              onSubmit={handleSubmitWithdrawal}
              availableBalance={userData.availableBalance}
              ledgerBalance={userData.ledgerBalance}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Withdrawal Information
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="body2" paragraph>
                Please note the following before submitting a withdrawal request:
              </Typography>
              
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Withdrawal requests are processed within 24-48 hours.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    The minimum withdrawal amount is ₹1000.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    All withdrawals are subject to verification.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    Bank details must match with your KYC information.
                  </Typography>
                </Box>
                <Box component="li">
                  <Typography variant="body2">
                    A valid document may be required for verification purposes.
                  </Typography>
                </Box>
              </Box>
            </Paper>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Need Help?
                </Typography>
                <Typography variant="body2">
                  If you have any questions or need assistance with your withdrawal, please contact our support team at:
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Email: support@hellotrader.com
                </Typography>
                <Typography variant="body2">
                  Phone: +91 12345 67890
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 