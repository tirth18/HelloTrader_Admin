import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Paper,
  Stack,
  Divider,
  useTheme,
  alpha
} from '@mui/material';

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

interface ViewBrokerProfileProps {
  open: boolean;
  onClose: () => void;
  broker: BrokerListItem | null;
}

export default function ViewBrokerProfile({
  open,
  onClose,
  broker
}: ViewBrokerProfileProps) {
  const theme = useTheme();

  if (!broker) {
    return null;
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return theme.palette.success.main;
      case 'Inactive':
        return theme.palette.grey[500];
      case 'Suspended':
        return theme.palette.error.main;
      case 'Pending':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Broker Profile</Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight="bold">{broker.username}</Typography>
                <Chip 
                  label={broker.account_status} 
                  sx={{ 
                    backgroundColor: alpha(getStatusColor(broker.account_status), 0.9),
                    color: '#fff',
                    fontWeight: 'medium',
                    px: 1
                  }}
                />
              </Box>
              
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip label={`ID: ${broker.id}`} variant="outlined" size="small" />
                <Chip label={`Type: ${broker.broker_type}`} variant="outlined" size="small" />
                <Chip label={`Ref Code: ${broker.reference_code}`} variant="outlined" size="small" />
              </Stack>
              
              <Typography variant="body2" color="text.secondary">
                Parent: <strong>{broker.parent_username || 'None'}</strong>
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Financial</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Trading Clients Limit</Typography>
                  <Typography variant="h6">
                    {broker.trading_clients_limit}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Current Clients</Typography>
                  <Typography variant="h6">
                    {broker.clients_count}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Commission Rates</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Brokerage Share</Typography>
                  <Typography variant="h6">
                    {broker.brokerage_share}%
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Profit Share</Typography>
                  <Typography variant="h6">
                    {broker.profit_loss_share}%
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Status</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Account Status</Typography>
                  <Typography variant="h6">
                    {broker.account_status}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Active Status</Typography>
                  <Typography variant="h6">
                    {broker.is_active ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Account Details</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Reference Code</Typography>
                  <Typography variant="body1">
                    {broker.reference_code}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Broker Type</Typography>
                  <Typography variant="body1">
                    {broker.broker_type}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Parent ID</Typography>
                  <Typography variant="body1">
                    {broker.parent_id || 'None'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 