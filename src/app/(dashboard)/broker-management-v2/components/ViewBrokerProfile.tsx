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
import { Broker } from './BrokerForm';

interface ViewBrokerProfileProps {
  open: boolean;
  onClose: () => void;
  broker: Broker | null;
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
                  label={broker.accountStatus} 
                  sx={{ 
                    backgroundColor: alpha(getStatusColor(broker.accountStatus), 0.9),
                    color: '#fff',
                    fontWeight: 'medium',
                    px: 1
                  }}
                />
              </Box>
              
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip label={`ID: ${broker.id}`} variant="outlined" size="small" />
                <Chip label={`Type: ${broker.type}`} variant="outlined" size="small" />
                <Chip label={`Ref Code: ${broker.refCode}`} variant="outlined" size="small" />
              </Stack>
              
              <Typography variant="body2" color="text.secondary">
                Parent: <strong>{broker.parent}</strong>
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Financial</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Balance</Typography>
                  <Typography variant="h6">
                    ${broker.balance?.toLocaleString() || '0.00'}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Credit Limit</Typography>
                  <Typography variant="h6">
                    ${broker.creditLimit.toLocaleString()}
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
                    {broker.brokerageShare}%
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Profit Share</Typography>
                  <Typography variant="h6">
                    {broker.profitShare}%
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Clients</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Total Clients</Typography>
                  <Typography variant="h6">
                    {broker.totalClients || 0}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Active Clients</Typography>
                  <Typography variant="h6">
                    {Math.floor((broker.totalClients || 0) * 0.8)} {/* Mock data - 80% active */}
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
                  <Typography variant="body2" color="text.secondary">Account Created</Typography>
                  <Typography variant="body1">
                    {new Date().toLocaleDateString()} {/* Mock date */}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Last Login</Typography>
                  <Typography variant="body1">
                    {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} {/* Mock date */}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">IP Address</Typography>
                  <Typography variant="body1">
                    192.168.1.1 {/* Mock IP */}
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