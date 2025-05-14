'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Typography,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import BrokerForm, { Broker } from './components/BrokerForm';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

// Define API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://192.168.1.6:8003';

interface BrokerListItem {
  id: number;
  username: string;
  parent_id: number | null;
  parent_username?: string;
  brokerage_share: number;
  profit_loss_share: number;
  trading_clients_limit: number;
  broker_type: string;
  clients_count: number;
  reference_code: string;
  account_status: string;
  is_active: boolean;
}

export default function BrokerManagement() {
  const [isAddBrokerOpen, setIsAddBrokerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountStatus, setAccountStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brokers, setBrokers] = useState<BrokerListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  const fetchBrokers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await auth.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/v1/brokers/`, {
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Accept': 'application/json'
        },
        params: {
          search: searchQuery || undefined,
          status: accountStatus !== 'all' ? accountStatus : undefined
        }
      });

      setBrokers(response.data);
    } catch (error: any) {
      console.error('Error fetching brokers:', error);
      setError(error.response?.data?.detail || 'Failed to fetch brokers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, [searchQuery, accountStatus]);

  const handleAddBroker = async (broker: Broker) => {
    setIsSubmitting(true);
    try {
      await fetchBrokers(); // Refresh the list after adding
      setIsAddBrokerOpen(false);
    } catch (error) {
      console.error('Error adding broker:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setAccountStatus('all');
  };

  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Broker Management</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddBrokerOpen(true)}
            startIcon={<AddIcon />}
          >
            Add Broker
          </Button>
        </Box>

        {/* Search and Filter */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by Username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <Select
                value={accountStatus}
                displayEmpty
                onChange={(e) => setAccountStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleReset}
              sx={{ height: '100%' }}
              startIcon={<RefreshIcon />}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Brokers Table */
          <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: 'transparent' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Brokerage Share</TableCell>
                  <TableCell>Profit Share</TableCell>
                  <TableCell>Credit Limit</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Clients</TableCell>
                  <TableCell>Ref. Code</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brokers.map((broker) => (
                  <TableRow key={broker.id}>
                    <TableCell>{broker.id}</TableCell>
                    <TableCell>{broker.username}</TableCell>
                    <TableCell>{broker.parent_username || '-'}</TableCell>
                    <TableCell>{broker.brokerage_share}%</TableCell>
                    <TableCell>{broker.profit_loss_share}%</TableCell>
                    <TableCell>{broker.trading_clients_limit}</TableCell>
                    <TableCell>{broker.broker_type}</TableCell>
                    <TableCell>{broker.clients_count}</TableCell>
                    <TableCell>{broker.reference_code}</TableCell>
                    <TableCell>{broker.is_active ? 'Active' : 'Inactive'}</TableCell>
                  </TableRow>
                ))}
                {brokers.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No brokers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Broker Form Dialog */}
        <BrokerForm
          open={isAddBrokerOpen}
          onClose={() => setIsAddBrokerOpen(false)}
          onSubmit={handleAddBroker}
          isSubmitting={isSubmitting}
        />

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Rows per page: 10
          </Typography>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            {brokers.length > 0 ? `1-${brokers.length} of ${brokers.length}` : '0-0 of 0'}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
} 