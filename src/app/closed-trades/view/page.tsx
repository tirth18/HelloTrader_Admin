'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
  Container,
} from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface TradeDetail {
  id: string;
  scrip: string;
  segment: string;
  userId: string;
  buyRate: string;
  sellRate: string;
  buyIp: string;
  sellIp: string;
  lotsUnits: string;
  profitLoss: string;
  buyTurnover: string;
  sellTurnover: string;
  brokerage: string;
  buyType: string;
  sellType: string;
  buyOrderId: string;
  sellOrderId: string;
  boughtAt: string;
  soldAt: string;
}

export default function ViewTradePage() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mode } = useThemeContext();
  
  // Get trade ID from URL if available
  const tradeId = searchParams.get('id');
  
  // State to hold trade details
  const [tradeDetails, setTradeDetails] = useState<TradeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trade data when component mounts
  useEffect(() => {
    if (tradeId) {
      // In a real application, we would fetch the data from an API
      // For now, let's mock the data based on the image
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock data for the trade with ID tradeId
        setTradeDetails({
          id: '3676462',
          scrip: 'GCM5',
          segment: 'COMEX',
          userId: '867',
          buyRate: '3192.9',
          sellRate: '3205.3',
          buyIp: '106.193.176.222',
          sellIp: '127.0.0.1',
          lotsUnits: '0.5 / 50',
          profitLoss: '49600',
          buyTurnover: '12771600',
          sellTurnover: '12821200',
          brokerage: '300',
          buyType: 'Market',
          sellType: 'Market',
          buyOrderId: '(not set)',
          sellOrderId: '(not set)',
          boughtAt: '2025-05-16 23:34:09',
          soldAt: '2025-05-17 03:04:20',
        });
        setIsLoading(false);
      }, 500);
    }
  }, [tradeId]);

  const handleUpdate = () => {
    router.push(`/closed-trades/update?id=${tradeId}`);
  };

  const handleDelete = () => {
    // Handle delete logic
    console.log('Delete trade:', tradeId);
  };

  const handleRestoreBuy = () => {
    // Handle restore buy logic
    console.log('Restore buy for trade:', tradeId);
  };

  // Dark mode styles - make it solid dark like in the image
  const darkModeStyles = {
    bgcolor: '#111827',
    color: 'white',
    minHeight: '100vh',
  };

  // Row styles
  const rowStyles = {
    display: 'flex',
    borderBottom: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    py: 1.2,
  };

  // Label styles
  const labelStyles = {
    width: '50%',
    fontWeight: 500,
    fontSize: '1rem',
    color: '#fff',
    pl: 4,
  };

  // Value styles
  const valueStyles = {
    width: '50%',
    fontWeight: 500,
    fontSize: '1rem',
    color: '#fff',
    pr: 4,
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', ...darkModeStyles }}>
        <Typography>Loading trade details...</Typography>
      </Box>
    );
  }

  if (!tradeDetails) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', ...darkModeStyles }}>
        <Typography>Trade not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={darkModeStyles}>
      <Container maxWidth={false} disableGutters>
        {/* Title - centered */}
        <Box sx={{ textAlign: 'center', pt: 2, pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Trade Details
          </Typography>
          
          {/* Action buttons - centered as in image */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                bgcolor: '#3b82f6', // Blue as shown in image
                '&:hover': {
                  bgcolor: '#2563eb',
                },
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '20px',
                px: 4,
                py: 0.75,
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{
                bgcolor: '#3b82f6', // Blue as shown in image
                '&:hover': {
                  bgcolor: '#2563eb',
                },
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '20px',
                px: 4,
                py: 0.75,
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={handleRestoreBuy}
              sx={{
                bgcolor: '#3b82f6', // Blue as shown in image
                '&:hover': {
                  bgcolor: '#2563eb',
                },
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '20px',
                px: 4,
                py: 0.75,
              }}
            >
              Restore Buy
            </Button>
          </Box>
        </Box>

        {/* Trade details */}
        <Box>
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>ID</Typography>
            <Typography sx={valueStyles}>{tradeDetails.id}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Script</Typography>
            <Typography sx={valueStyles}>{tradeDetails.scrip}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Segment</Typography>
            <Typography sx={valueStyles}>{tradeDetails.segment}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>User ID</Typography>
            <Typography sx={valueStyles}>{tradeDetails.userId}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Buy Rate</Typography>
            <Typography sx={valueStyles}>{tradeDetails.buyRate}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sell Rate</Typography>
            <Typography sx={valueStyles}>{tradeDetails.sellRate}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Buy IP</Typography>
            <Typography sx={valueStyles}>{tradeDetails.buyIp}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sell IP</Typography>
            <Typography sx={valueStyles}>{tradeDetails.sellIp}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Lots / Units</Typography>
            <Typography sx={valueStyles}>{tradeDetails.lotsUnits}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Profit / Loss</Typography>
            <Typography 
              sx={{ 
                ...valueStyles, 
                color: '#4ade80', // Green like in the image
                fontWeight: 600,
              }}
            >
              {tradeDetails.profitLoss}
            </Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Buy Turnover</Typography>
            <Typography sx={valueStyles}>{tradeDetails.buyTurnover}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sell Turnover</Typography>
            <Typography sx={valueStyles}>{tradeDetails.sellTurnover}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Brokerage</Typography>
            <Typography sx={valueStyles}>{tradeDetails.brokerage}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Buy Type</Typography>
            <Typography sx={valueStyles}>{tradeDetails.buyType}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sell Type</Typography>
            <Typography sx={valueStyles}>{tradeDetails.sellType}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Buy Order ID</Typography>
            <Typography sx={valueStyles}>{tradeDetails.buyOrderId}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sell Order ID</Typography>
            <Typography sx={valueStyles}>{tradeDetails.sellOrderId}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Bought at</Typography>
            <Typography sx={valueStyles}>{tradeDetails.boughtAt}</Typography>
          </Box>
          
          <Box sx={rowStyles}>
            <Typography sx={labelStyles}>Sold at</Typography>
            <Typography sx={valueStyles}>{tradeDetails.soldAt}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 