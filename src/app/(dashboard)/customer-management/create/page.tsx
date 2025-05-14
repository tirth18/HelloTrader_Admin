'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CustomerForm from '../../../../components/customer/CustomerForm';

const CreateCustomerPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Customer
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <CustomerForm />
      </Paper>
    </Box>
  );
};

export default CreateCustomerPage; 