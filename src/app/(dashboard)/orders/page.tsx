'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { wsClient } from '../../../lib/websocket';
import { useSnackbar } from 'notistack';

const validationSchema = yup.object({
  quantity: yup
    .number()
    .required('Quantity is required')
    .min(0, 'Must be greater than 0'),
  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Must be greater than 0'),
});

const OrderMonitoringPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // Mock data for testing
  const mockOrders = [
    {
      id: '1',
      instrument: { id: '1', symbol: 'BTC/USD' },
      type: 'limit',
      side: 'buy',
      quantity: 0.5,
      price: 50000,
      status: 'open',
    },
    {
      id: '2',
      instrument: { id: '2', symbol: 'ETH/USD' },
      type: 'market',
      side: 'sell',
      quantity: 2.0,
      price: 2500,
      status: 'filled',
    },
    {
      id: '3',
      instrument: { id: '3', symbol: 'SOL/USD' },
      type: 'limit',
      side: 'buy',
      quantity: 10,
      price: 100,
      status: 'cancelled',
    },
  ];

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        // For development, use mock data
        if (process.env.NODE_ENV === 'development') {
          return mockOrders;
        }
        
        const response = await fetch('/api/orders');
        return response.json();
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    }
  });

  const { data: instruments } = useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      const response = await fetch('/api/instruments');
      return response.json();
    }
  });

  useEffect(() => {
    wsClient.subscribe('order_update', (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    });

    return () => {
      wsClient.unsubscribe('order_update', () => {});
    };
  }, [queryClient]);

  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      enqueueSnackbar('Order cancelled successfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to cancel order', { variant: 'error' });
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, orderData }: { id: string; orderData: any }) => {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setOpen(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      quantity: 0,
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedOrder) {
        updateOrderMutation.mutate({
          id: selectedOrder.id,
          orderData: values,
        });
      }
    },
  });

  const handleOpen = (order: any) => {
    setSelectedOrder(order);
    formik.setValues({
      quantity: order.quantity,
      price: order.price || 0,
    });
    setOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'success';
      case 'filled':
        return 'primary';
      case 'cancelled':
        return 'error';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 90 },
    {
      field: 'instrument',
      headerName: 'Instrument',
      width: 130,
      renderCell: (params) => params.value?.symbol || 'Unknown',
    },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'side', headerName: 'Side', width: 100 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Unknown'}
          color={getStatusColor(params.value || '')}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          {params.row?.status === 'open' && (
            <>
              <Tooltip title="Edit Order">
                <IconButton
                  size="small"
                  onClick={() => handleOpen(params.row)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel Order">
                <IconButton
                  size="small"
                  onClick={() => cancelOrderMutation.mutate(params.row.id)}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Order Monitoring</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => queryClient.invalidateQueries({ queryKey: ['orders'] })}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Open Orders
              </Typography>
              <Typography variant="h4">
                {orders?.filter((order: any) => order.status === 'open').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Filled Orders
              </Typography>
              <Typography variant="h4">
                {orders?.filter((order: any) => order.status === 'filled').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cancelled Orders
              </Typography>
              <Typography variant="h4">
                {orders?.filter((order: any) => order.status === 'cancelled').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rejected Orders
              </Typography>
              <Typography variant="h4">
                {orders?.filter((order: any) => order.status === 'rejected').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={orders || mockOrders}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              loading={isLoading}
            />
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Order</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={
                formik.touched.quantity && Boolean(formik.errors.quantity)
              }
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
            <TextField
              fullWidth
              margin="normal"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Update Order
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default OrderMonitoringPage; 