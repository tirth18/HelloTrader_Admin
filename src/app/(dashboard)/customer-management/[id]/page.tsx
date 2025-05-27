'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Button,
  Tabs,
  Tab,
  Link,
  Paper
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { getCustomerById, CustomerData } from '../../../../services/customerService';
import { useSnackbar } from 'notistack';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const CustomerDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {customer.personal_details?.name || 'Unnamed Customer'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/customer-management/${params?.id || ''}/edit`)}
        >
          Edit
        </Button>
      </Box>

      <Box mb={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Username
                </Typography>
                <Typography variant="body1">
                  {customer.personal_details?.username || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Mobile
                </Typography>
                <Typography variant="body1">
                  {customer.personal_details?.mobile || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  City
                </Typography>
                <Typography variant="body1">
                  {customer.personal_details?.city || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Initial Funds
                </Typography>
                <Typography variant="body1">
                  ₹{customer.personal_details?.initial_funds?.toLocaleString() || '0'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Account Status
                </Typography>
                <Chip 
                  label={customer.config?.account_status || 'Unknown'} 
                  color={
                    customer.config?.account_status === 'Active' 
                      ? 'success' 
                      : customer.config?.account_status === 'Inactive' 
                        ? 'default' 
                        : 'error'
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Account Type
                </Typography>
                <Chip 
                  label={customer.config?.demo_account ? 'Demo Account' : 'Live Account'} 
                  color={customer.config?.demo_account ? 'info' : 'success'}
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Paper>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Configuration" />
            <Tab label="MCX Futures" />
            <Tab label="Equity Futures" />
            <Tab label="Options" />
            <Tab label="Other Settings" />
          </Tabs>

          <Box sx={{ p: 2 }}>
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Trading Configuration
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Auto Close Trades Loss Percent
                          </Typography>
                          <Typography variant="body1">
                            {customer.config?.auto_close_trades_loss_percent}%
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Notify Client Loss Percent
                          </Typography>
                          <Typography variant="body1">
                            {customer.config?.notify_client_loss_percent}%
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Trading Permissions
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Allow Fresh Entry Order Above/Below High/Low" 
                              color={customer.config?.allow_fresh_entry_order_above_high_below_low ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip 
                              label="Allow Orders Between High/Low" 
                              color={customer.config?.allow_orders_between_high_low ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip 
                              label="Trade Equity as Units" 
                              color={customer.config?.trade_equity_as_units ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        MCX Futures Settings
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            MCX Trading
                          </Typography>
                          <Chip 
                            label={customer.mcx_futures?.mcx_trading ? 'Enabled' : 'Disabled'} 
                            color={customer.mcx_futures?.mcx_trading ? 'success' : 'default'}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Brokerage Type
                          </Typography>
                          <Typography variant="body1">
                            {customer.mcx_futures?.brokerage_type || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Brokerage
                          </Typography>
                          <Typography variant="body1">
                            {customer.mcx_futures?.brokerage || 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Equity Futures Settings
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Equity Trading
                          </Typography>
                          <Chip 
                            label={customer.equity_futures?.equity_trading ? 'Enabled' : 'Disabled'} 
                            color={customer.equity_futures?.equity_trading ? 'success' : 'default'}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Equity Brokerage Per Crore
                          </Typography>
                          <Typography variant="body1">
                            {customer.equity_futures?.equity_brokerage_per_crore || 'N/A'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Options Settings
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Options Trading
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label="Index Options" 
                              color={customer.options_config?.index_options_trading ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip 
                              label="Equity Options" 
                              color={customer.options_config?.equity_options_trading ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip 
                              label="MCX Options" 
                              color={customer.options_config?.mcx_options_trading ? 'success' : 'default'}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Other Settings
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Broker
                          </Typography>
                          <Typography variant="body1">
                            {customer.other?.broker || 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Select User
                          </Typography>
                          <Typography variant="body1">
                            {customer.other?.select_user || 'N/A'}
                          </Typography>
                        </Grid>
                        {customer.other?.notes && (
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="textSecondary">
                              Notes
                            </Typography>
                            <Typography variant="body1">
                              {customer.other?.notes}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomerDetailPage; 