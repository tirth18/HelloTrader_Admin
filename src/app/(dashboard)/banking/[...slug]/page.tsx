'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DashboardBankingCatchAll() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string[] || [];

  // Try to determine if this is a withdrawal or deposit request path
  useEffect(() => {
    if (slug.includes('withdrawal-requests')) {
      router.replace('/banking/withdrawal-requests');
    } else if (slug.includes('create-withdrawal')) {
      router.replace('/banking/create-withdrawal');
    } else if (slug.includes('deposit-requests')) {
      router.replace('/banking/deposit-requests');
    }
  }, [router, slug]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Banking Section
        </Typography>
        
        <Typography variant="body1" paragraph>
          The page you're looking for might be one of these:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => router.push('/banking')}
            sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
          >
            Bank Accounts
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/banking/deposit-requests')}
            sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
          >
            Deposit Requests
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/banking/withdrawal-requests')}
            sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
          >
            Withdrawal Requests
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/banking/create-withdrawal')}
            sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
          >
            Create Withdrawal Request
          </Button>
        </Box>
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Paper>
    </Container>
  );
} 