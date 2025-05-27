'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, useTheme, alpha, Grid, Paper } from '@mui/material';
import PaymentGatewayTable from '@/components/PaymentGateways/PaymentGatewayTable';
import AddGatewayDialog from '@/components/PaymentGateways/AddGatewayDialog';
import EditGatewayDialog from '@/components/PaymentGateways/EditGatewayDialog';
import { useSnackbar } from 'notistack';
import { 
  Add as AddIcon, 
  CreditCard as CreditCardIcon, 
  CheckCircle as CheckCircleIcon, 
  Cancel as CancelIcon,
  AccountBalanceWallet as WalletIcon 
} from '@mui/icons-material';
import { PaymentGateway } from '@/types/paymentGateway';
import { createPaymentGateway, getAllPaymentGateways, updatePaymentGateway } from '@/services/paymentGatewayService';

export default function PaymentGatewaysPage() {
  const theme = useTheme();
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentGateway, setCurrentGateway] = useState<PaymentGateway | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch payment gateways on page load
  useEffect(() => {
    const fetchGateways = async () => {
      try {
        setLoading(true);
        const data = await getAllPaymentGateways();
        
        // Map API response to our state format
        const mappedGateways = data.map((gateway, index) => ({
          ...gateway,
          id: index + 1, // Assign sequential ID for UI
          linkKeyToken: gateway.key, // Map key to linkKeyToken for UI
          isEnabled: gateway.isEnabled ?? true // Default to enabled if not specified
        }));
        
        setGateways(mappedGateways);
      } catch (error) {
        console.error('Error fetching payment gateways:', error);
        enqueueSnackbar('Failed to load payment gateways', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchGateways();
  }, [enqueueSnackbar]);

  const handleEdit = (id: number) => {
    const gateway = gateways.find(g => g.id === id) || null;
    setCurrentGateway(gateway);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedGateway: PaymentGateway) => {
    try {
      // Prepare payload - API expects key instead of linkKeyToken
      const payloadData = {
        publicName: updatedGateway.publicName,
        privateName: updatedGateway.privateName,
        key: updatedGateway.linkKeyToken || updatedGateway.key || ''
      };

      // We need the MongoDB _id for the API, not the display id
      const id = updatedGateway._id || ''; 
      
      // Call the API
      await updatePaymentGateway(id, payloadData);
      
      // Update local state
      setGateways(prev => 
        prev.map(g => g.id === updatedGateway.id ? {
          ...updatedGateway,
          key: payloadData.key // Make sure key is updated
        } : g)
      );
      
      setIsEditDialogOpen(false);
      setCurrentGateway(null);
      enqueueSnackbar('Payment gateway updated successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error updating payment gateway:', error);
      enqueueSnackbar('Failed to update payment gateway', { variant: 'error' });
    }
  };

  const handleToggleStatus = (id: number) => {
    setGateways((prev) =>
      prev.map((gateway) =>
        gateway.id === id
          ? { ...gateway, isEnabled: !gateway.isEnabled }
          : gateway
      )
    );

    const gateway = gateways.find((g) => g.id === id);
    enqueueSnackbar(
      `${gateway?.publicName} has been ${gateway?.isEnabled ? 'disabled' : 'enabled'}`,
      { variant: 'success' }
    );
  };

  const handleAddGateway = async (newGateway: {
    publicName: string;
    privateName: string;
    linkKeyToken: string;
  }) => {
    try {
      const payloadData = {
        publicName: newGateway.publicName,
        privateName: newGateway.privateName,
        key: newGateway.linkKeyToken // API expects 'key' instead of 'linkKeyToken'
      };

      const response = await createPaymentGateway(payloadData);
      
      // Add the new gateway to the list with returned data from API
      const newGatewayWithId: PaymentGateway = {
        ...response,
        id: gateways.length + 1, // Assign sequential ID for UI display
        _id: response._id, // Store the MongoDB _id for API operations
        isEnabled: true,
        linkKeyToken: response.key // Map the key to linkKeyToken for UI display
      };

      setGateways((prev) => [...prev, newGatewayWithId]);
      setIsAddDialogOpen(false);
      enqueueSnackbar('Payment gateway added successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error adding payment gateway:', error);
      enqueueSnackbar('Failed to add payment gateway', { variant: 'error' });
    }
  };

  const totalGateways = gateways.length;
  const activeGateways = gateways.filter(g => g.isEnabled).length;
  const inactiveGateways = totalGateways - activeGateways;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        p: { xs: 2, md: 3 },
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, rgba(13,17,31,1) 0%, rgba(0,0,0,1) 100%)'
          : 'linear-gradient(180deg, rgba(240,242,255,1) 0%, rgba(255,255,255,1) 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 0%, rgba(51, 102, 255, 0.15) 0%, transparent 100%)'
            : 'radial-gradient(circle at 50% 0%, rgba(51, 102, 255, 0.08) 0%, transparent 100%)',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 3,
            animation: 'fadeIn 0.5s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)'
                    : 'linear-gradient(135deg, #1a1a1a 0%, rgba(26,26,26,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}
              >
                Payment Gateways
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{ 
              borderRadius: '12px',
              textTransform: 'none',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3366FF 0%, #5B8DEF 100%)',
              boxShadow: '0 4px 12px rgba(51, 102, 255, 0.3)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(135deg, #2B5BD9 0%, #4A7CDE 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(51, 102, 255, 0.4)',
              },
            }}
          >
            Add New Gateway
          </Button>
        </Box>

        {/* Summary Cards */}
        <Box 
          sx={{ 
            mx: -1,
            mb: 4,
            '& .MuiGrid-root': { 
              p: 1,
            },
            animation: 'fadeIn 0.5s ease-out 0.2s both',
          }}
        >
          <Grid container>
            {[
              { 
                title: 'Total Gateways',
                value: totalGateways,
                icon: CreditCardIcon,
                color: '#3366FF',
                bgColor: theme.palette.mode === 'dark' ? 'rgba(51, 102, 255, 0.12)' : 'rgba(51, 102, 255, 0.08)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(51, 102, 255, 0.25)' : 'rgba(51, 102, 255, 0.15)',
                hoverBg: theme.palette.mode === 'dark' ? 'rgba(51, 102, 255, 0.15)' : 'rgba(51, 102, 255, 0.1)'
              },
              {
                title: 'Active Gateways',
                value: activeGateways,
                icon: CheckCircleIcon,
                color: '#2EA043',
                bgColor: theme.palette.mode === 'dark' ? 'rgba(46, 160, 67, 0.12)' : 'rgba(46, 160, 67, 0.08)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(46, 160, 67, 0.25)' : 'rgba(46, 160, 67, 0.15)',
                hoverBg: theme.palette.mode === 'dark' ? 'rgba(46, 160, 67, 0.15)' : 'rgba(46, 160, 67, 0.1)'
              },
              {
                title: 'Inactive Gateways',
                value: inactiveGateways,
                icon: CancelIcon,
                color: '#DA3633',
                bgColor: theme.palette.mode === 'dark' ? 'rgba(218, 54, 51, 0.12)' : 'rgba(218, 54, 51, 0.08)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(218, 54, 51, 0.25)' : 'rgba(218, 54, 51, 0.15)',
                hoverBg: theme.palette.mode === 'dark' ? 'rgba(218, 54, 51, 0.15)' : 'rgba(218, 54, 51, 0.1)'
              }
            ].map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '140px',
                    borderRadius: '20px',
                    background: card.bgColor,
                    border: `1px solid ${card.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    p: '24px',
                    gap: 3,
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: card.hoverBg,
                      borderColor: theme.palette.mode === 'dark' 
                        ? alpha(card.color, 0.35)
                        : alpha(card.color, 0.25),
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px ${alpha(card.color, 0.15)}`,
                      '& .icon-box': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${card.color} 0%, ${alpha(card.color, 0.8)} 100%)`,
                      flexShrink: 0,
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: `0 4px 12px ${alpha(card.color, 0.3)}`
                    }}
                  >
                    {React.createElement(card.icon, { sx: { color: '#fff', fontSize: 28 } })}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: '32px',
                        background: theme.palette.mode === 'dark'
                          ? `linear-gradient(135deg, #fff 0%, ${alpha('#fff', 0.8)} 100%)`
                          : `linear-gradient(135deg, #1a1a1a 0%, ${alpha('#1a1a1a', 0.8)} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: '4px',
                        lineHeight: 1.2,
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.mode === 'dark' 
                          ? alpha('#fff', 0.7)
                          : alpha('#1a1a1a', 0.7),
                        fontWeight: 500,
                        fontSize: '16px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Table Section */}
        <Paper
          elevation={0}
          sx={{ 
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.5)'
              : '#fff',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'}`,
            mx: 1,
            transition: 'all 0.3s ease-in-out',
            animation: 'fadeIn 0.5s ease-out 0.4s both',
            '&:hover': {
              border: `1px solid ${theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.15)'}`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <Box sx={{ p: '24px' }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: '18px',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
                  mb: 1,
                }}
              >
                Gateway List
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? alpha('#fff', 0.7)
                    : alpha('#1a1a1a', 0.7),
                  fontSize: '15px',
                }}
              >
                View and manage all your payment gateway configurations
              </Typography>
            </Box>
            <PaymentGatewayTable
              gateways={gateways}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              loading={loading}
            />
          </Box>
        </Paper>
      </Box>

      <AddGatewayDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddGateway}
      />
      <EditGatewayDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setCurrentGateway(null);
        }}
        onSave={handleSaveEdit}
        gateway={currentGateway}
      />
    </Box>
  );
} 