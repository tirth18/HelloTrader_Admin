'use client';

import React from 'react';
import DashboardLayout from '../../../../../components/layouts/DashboardLayout';
import {
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useParams } from 'next/navigation';

export default function TradingConfigPage() {
  const params = useParams();
  const clientId = params.id;

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Trading Configuration - Client {clientId}
        </Typography>
        
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Alert severity="info">
            Trading configuration page for client {clientId} is under development.
          </Alert>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
