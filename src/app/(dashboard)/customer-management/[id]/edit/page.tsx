'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Link } from '@mui/material';
import CustomerForm from '../../../../../components/customer/CustomerForm';
import { useRouter, useParams } from 'next/navigation';
import { getCustomerById, CustomerData } from '../../../../../services/customerService';
import { useSnackbar } from 'notistack';

const EditCustomerPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!params?.id) return;
      
      try {
        const customerId = parseInt(params.id as string, 10);
        const data = await getCustomerById(customerId);
        setCustomer(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch customer data. Please try again.');
        enqueueSnackbar('Failed to fetch customer data', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params?.id, enqueueSnackbar]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" gutterBottom>
          {error || 'Customer not found'}
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push('/customer-management')}
        >
          Go back to Customer Management
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Customer: {customer.personal_details?.name || 'Unnamed Customer'}
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <CustomerForm initialData={customer} isEditing />
      </Paper>
    </Box>
  );
};

export default EditCustomerPage; 