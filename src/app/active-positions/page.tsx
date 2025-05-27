'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Divider,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
  Tooltip,
  IconButton,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoIcon from '@mui/icons-material/Info';

// Mock data for active positions
const mockPositions = [
  {
    id: 1,
    scrip: 'ABB25APRFUT',
    segment: 'Equity',
    activeBuy: { lots: 1.6, units: 200 },
    activeSell: { lots: 0, units: 0 },
    avgBuyRate: 5650.3,
    avgSellRate: 0,
    total: 1.6,
    net: 1.6,
    m2m: -3200,
  },
  {
    id: 2,
    scrip: 'ALUMINIUM25APRFUT',
    segment: 'Commodity',
    activeBuy: { lots: 0, units: 0 },
    activeSell: { lots: 0.1, units: 270 },
    avgBuyRate: 0,
    avgSellRate: 185.71,
    total: 0.1,
    net: -0.1,
    m2m: -500,
  },
  {
    id: 3,
    scrip: 'ACC25APR1920PE',
    segment: 'Options',
    activeBuy: { lots: 0, units: 0 },
    activeSell: { lots: 40, units: 40 },
    avgBuyRate: 0,
    avgSellRate: 89.25,
    total: 40,
    net: -40,
    m2m: -7200,
  },
  {
    id: 4,
    scrip: 'ADANIENT',
    segment: 'Equity',
    activeBuy: { lots: 3.0, units: 300 },
    activeSell: { lots: 0.1, units: 10 },
    avgBuyRate: 2734.15,
    avgSellRate: 2740.0,
    total: 3.1,
    net: 2.9,
    m2m: -1500,
  },
  {
    id: 5,
    scrip: 'AMBUJACEM',
    segment: 'Equity',
    activeBuy: { lots: 0, units: 0 },
    activeSell: { lots: 0.5, units: 50 },
    avgBuyRate: 0,
    avgSellRate: 592.8,
    total: 0.5,
    net: -0.5,
    m2m: 0,
  },
];

export default function ActivePositionsPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState(mockPositions);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate the total M2M
  const totalM2M = positions.reduce((sum, position) => sum + position.m2m, 0);

  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '100%',
          margin: '0 auto',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Active Positions
        </Typography>
        
        <Card 
          elevation={0}
          sx={{ 
            mb: 4,
            bgcolor: 'background.paper',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 2,
          }}
        >
          <Box 
            sx={{ 
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total M2M
              </Typography>
              <Typography 
                variant="h4" 
                color={totalM2M >= 0 ? 'success.main' : 'error.main'}
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                ₹{Math.abs(totalM2M).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Positions
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}
              >
                {positions.length}
              </Typography>
            </Box>
          </Box>
        </Card>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: 'background.paper',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Scrip
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Segment
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Active Buy
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Active Sell
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Avg Buy Rate
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Avg Sell Rate
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Total
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      Net
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 2
                      }}
                    >
                      M2M
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow 
                      key={position.id}
                      sx={{ 
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.02)
                        },
                        transition: 'background-color 0.2s ease-in-out'
                      }}
                    >
                      <TableCell 
                        sx={{ 
                          color: 'text.primary',
                          fontWeight: 'medium',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.scrip}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        <Chip 
                          label={position.segment} 
                          size="small"
                          sx={{ 
                            bgcolor: position.segment === 'Equity' ? alpha(theme.palette.primary.main, 0.1) :
                                    position.segment === 'Commodity' ? alpha(theme.palette.success.main, 0.1) :
                                    position.segment === 'Options' ? alpha(theme.palette.warning.main, 0.1) : 
                                    alpha(theme.palette.grey[500], 0.1),
                            color: position.segment === 'Equity' ? 'primary.main' :
                                   position.segment === 'Commodity' ? 'success.main' :
                                   position.segment === 'Options' ? 'warning.main' : 
                                   'text.secondary',
                            fontWeight: 'medium',
                            border: 'none'
                          }}
                        />
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.activeBuy.lots > 0 ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              bgcolor: 'success.main',
                            }} />
                            <Typography color="text.primary">
                              {position.activeBuy.lots} ({position.activeBuy.units})
                            </Typography>
                          </Box>
                        ) : '-'}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.activeSell.lots > 0 ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              bgcolor: 'error.main',
                            }} />
                            <Typography color="text.primary">
                              {position.activeSell.lots} ({position.activeSell.units})
                            </Typography>
                          </Box>
                        ) : '-'}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          color: 'text.primary',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.avgBuyRate > 0 ? `₹${position.avgBuyRate.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          color: 'text.primary',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.avgSellRate > 0 ? `₹${position.avgSellRate.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          color: 'text.primary',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.total}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          color: position.net > 0 ? 'success.main' : 
                                 position.net < 0 ? 'error.main' : 'text.primary',
                          fontWeight: 'bold',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        {position.net}
                      </TableCell>
                      <TableCell 
                        sx={{ 
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        <Typography 
                          sx={{ 
                            color: position.m2m >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {position.m2m >= 0 ? (
                            <TrendingUpIcon sx={{ fontSize: 16 }} />
                          ) : (
                            <TrendingDownIcon sx={{ fontSize: 16 }} />
                          )}
                          ₹{Math.abs(position.m2m).toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Box>
    </Box>
  );
} 