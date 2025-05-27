'use client';

import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '5rem', md: '8rem' }, fontWeight: 700, color: 'primary.main' }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" sx={{ mt: 2, mb: 4, fontWeight: 600 }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          We couldn't find the page you're looking for. The page might have been removed, renamed, or is temporarily unavailable.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ px: 3 }}
          >
            Go Back
          </Button>
          
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/dashboard')}
            sx={{ px: 3 }}
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 