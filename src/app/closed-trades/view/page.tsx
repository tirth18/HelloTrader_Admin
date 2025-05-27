'use client';

import React, { useState, useEffect, Suspense } from 'react';

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';
import {
  Box,
  Typography,
  Button,
  useTheme,
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

function ViewTradePageContent() {
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
      setIsLoading(true);
      
      // Simulate API call with data matching the reference images
      setTimeout(() => {
        setTradeDetails({
          id: '3737073',
          scrip: 'BANKNIFTY25MAY55500PE',
          segment: 'NSE',
          userId: '1943',
          buyRate: '667.1',
          sellRate: '658.85',
          buyIp: '27.61.173.202',
          sellIp: '27.61.173.202',
          lotsUnits: '1 / 30',
          profitLoss: '-247.5',
          buyTurnover: '20013',
          sellTurnover: '19765.5',
          brokerage: '10',
          buyType: 'Market',
          sellType: 'Market',
          buyOrderId: '(not set)',
          sellOrderId: '(not set)',
          boughtAt: '2025-05-27 09:49:15',
          soldAt: '2025-05-27 09:51:11',
        });
        setIsLoading(false);
      }, 500);
    }
  }, [tradeId]);

  const handleUpdate = () => {
    router.push(`/closed-trades/update?id=${tradeId}`);
  };

  const handleDelete = () => {
    console.log('Delete trade:', tradeId);
  };

  const handleRestoreBuy = () => {
    console.log('Restore buy for trade:', tradeId);
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        width: '100%',
        height: '100vh',
        bgcolor: '#1B2B4E',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white'
      }}>
        <Typography>Loading trade details...</Typography>
      </Box>
    );
  }

  if (!tradeDetails) {
    return (
      <Box sx={{ 
        width: '100%',
        height: '100vh',
        bgcolor: '#1B2B4E',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white'
      }}>
        <Typography>Trade not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      bgcolor: '#1B2B4E',
      color: 'white',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      m: 0,
      p: 0, 
      padding: '100px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 100,
      bottom: 0,
    }}>
      {/* Action Buttons Section - Top */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 2.5,
        px: 3,
        gap: 1.5,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        bgcolor: '#1B2B4E',
      }}>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            bgcolor: '#9C27B0',
            '&:hover': {
              bgcolor: '#7B1FA2',
              transform: 'translateY(-1px)',
            },
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '0.75rem',
            px: 3.5,
            py: 1,
            minWidth: '100px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(156, 39, 176, 0.3)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          UPDATe
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          sx={{
            bgcolor: '#F44336',
            '&:hover': {
              bgcolor: '#D32F2F',
              transform: 'translateY(-1px)',
            },
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '0.75rem',
            px: 3.5,
            py: 1,
            minWidth: '100px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          DELETE
        </Button>
        <Button
          variant="contained"
          onClick={handleRestoreBuy}
          sx={{
            bgcolor: '#4CAF50',
            '&:hover': {
              bgcolor: '#388E3C',
              transform: 'translateY(-1px)',
            },
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '0.75rem',
            px: 3,
            py: 1,
            minWidth: '120px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          RESTORE BUY
        </Button>
      </Box>

      {/* Trade Details Grid Layout */}
      <Box sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Row 1: ID */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              ID
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.id}
            </Typography>
          </Box>
        </Box>

        {/* Row 2: Script */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Script
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.scrip}
            </Typography>
          </Box>
        </Box>

        {/* Row 3: Segment */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Segment
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.segment}
            </Typography>
          </Box>
        </Box>

        {/* Row 4: User ID */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              User ID
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.userId}
            </Typography>
          </Box>
        </Box>

        {/* Row 5: Buy Rate */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Buy Rate
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.buyRate}
            </Typography>
          </Box>
        </Box>

        {/* Row 6: Sell Rate */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sell Rate
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.sellRate}
            </Typography>
          </Box>
        </Box>

        {/* Row 7: Buy IP */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Buy IP
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.buyIp}
            </Typography>
          </Box>
        </Box>

        {/* Row 8: Sell IP */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sell IP
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.sellIp}
            </Typography>
          </Box>
        </Box>

        {/* Row 9: Lots / Units */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Lots / Units
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.lotsUnits}
            </Typography>
          </Box>
        </Box>

        {/* Row 10: Profit / Loss */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Profit / Loss
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: parseFloat(tradeDetails.profitLoss) >= 0 ? '#4CAF50' : '#F44336',
            }}>
              {tradeDetails.profitLoss}
            </Typography>
          </Box>
        </Box>

        {/* Row 11: Buy Turnover */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Buy Turnover
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.buyTurnover}
            </Typography>
          </Box>
        </Box>

        {/* Row 12: Sell Turnover */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sell Turnover
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.sellTurnover}
            </Typography>
          </Box>
        </Box>

        {/* Row 13: Brokerage */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Brokerage
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.brokerage}
            </Typography>
          </Box>
        </Box>

        {/* Row 14: Buy Type */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Buy Type
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.buyType}
            </Typography>
          </Box>
        </Box>

        {/* Row 15: Sell Type */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sell Type
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.sellType}
            </Typography>
          </Box>
        </Box>

        {/* Row 16: Buy Order ID */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Buy Order ID
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.buyOrderId}
            </Typography>
          </Box>
        </Box>

        {/* Row 17: Sell Order ID */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sell Order ID
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.sellOrderId}
            </Typography>
          </Box>
        </Box>

        {/* Row 18: Bought at */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Bought at
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.boughtAt}
            </Typography>
          </Box>
        </Box>

        {/* Row 19: Sold at - Last row without bottom border */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          minHeight: '48px',
        }}>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#2A3F5F',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#E0E0E0',
            }}>
              Sold at
            </Typography>
          </Box>
          <Box sx={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            pl: 3,
            bgcolor: '#1B2B4E',
          }}>
            <Typography sx={{ 
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'white',
            }}>
              {tradeDetails.soldAt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function ViewTradePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewTradePageContent />
    </Suspense>
  );
} 