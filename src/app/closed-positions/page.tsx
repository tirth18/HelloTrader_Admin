'use client';

import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, useTheme } from '@mui/material';

interface Position {
  scrip: string;
  lots: number;
  avgBuyRate: number;
  avgSellRate: number;
  profitLoss: number;
  brokerage: number;
  netPL: number;
}

const closedPositions: Position[] = [
  {
    scrip: 'CME: NZD-USD (6NM5)',
    lots: 1.100,
    avgBuyRate: 0.60,
    avgSellRate: 0.60,
    profitLoss: -480.00,
    brokerage: 519.72,
    netPL: -999.72,
  },
  {
    scrip: 'AARTIIND25MAYFUT',
    lots: 134.782,
    avgBuyRate: 450.35,
    avgSellRate: 450.42,
    profitLoss: 259591.90,
    brokerage: 9772.96,
    netPL: 249818.94,
  },
  {
    scrip: 'ABB25MAYFUT',
    lots: 0.040,
    avgBuyRate: 5486.00,
    avgSellRate: 5487.50,
    profitLoss: 7.50,
    brokerage: 2.74,
    netPL: 4.76,
  },
  {
    scrip: 'ABCAPITAL25MAYFUT',
    lots: 0.741,
    avgBuyRate: 198.41,
    avgSellRate: 200.78,
    profitLoss: 4744.00,
    brokerage: 199.63,
    netPL: 4544.37,
  },
  {
    scrip: 'ABFRL25MAYFUT',
    lots: 2.087,
    avgBuyRate: 259.61,
    avgSellRate: 262.33,
    profitLoss: 12666.99,
    brokerage: 484.88,
    netPL: 12182.11,
  },
  {
    scrip: 'ACC25MAY1900CE',
    lots: 1.000,
    avgBuyRate: 29.30,
    avgSellRate: 19.75,
    profitLoss: -2865.00,
    brokerage: 40.00,
    netPL: -2905.00,
  },
  {
    scrip: 'ACC25MAYFUT',
    lots: 13.133,
    avgBuyRate: 1867.94,
    avgSellRate: 1906.59,
    profitLoss: 150131.00,
    brokerage: 178.51,
    netPL: 149952.49,
  },
  {
    scrip: 'ADANIENSOL25MAYFUT',
    lots: 9.261,
    avgBuyRate: 924.51,
    avgSellRate: 925.73,
    profitLoss: 7909.85,
    brokerage: 1942.95,
    netPL: 5966.90,
  }
];

export default function ClosedPositionsPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      height: '100%', 
      bgcolor: isDarkMode ? '#0B1437' : '#FFFFFF',
      p: { xs: 2, md: 4 },
      borderRadius: 3,
      boxShadow: isDarkMode 
        ? '0 0 50px rgba(0,0,0,0.2)'
        : '0 4px 24px rgba(0,0,0,0.05)',
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: isDarkMode ? '#fff' : '#1E2022',
          mb: 4,
          fontSize: '1.75rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          position: 'relative',
          paddingBottom: '16px',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '60px',
            height: '3px',
            background: '#3699FF',
            borderRadius: '2px',
          }
        }}
      >
        Closed Positions
      </Typography>
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: 'transparent',
          backgroundImage: isDarkMode 
            ? 'linear-gradient(rgba(27, 43, 78, 0.5), rgba(27, 43, 78, 0.2))'
            : 'linear-gradient(rgba(244, 247, 254, 0.75), rgba(244, 247, 254, 0.5))',
          boxShadow: 'none',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              bgcolor: isDarkMode ? 'rgba(27, 43, 78, 0.5)' : '#F4F7FE',
            }}>
              <TableCell 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Scrip
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Lots
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Avg buy rate
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Avg sell rate
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Profit / Loss
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Brokerage
              </TableCell>
              <TableCell 
                align="right" 
                sx={{ 
                  color: isDarkMode ? '#8C98B4' : '#505F79',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  fontSize: '0.875rem',
                  py: 3,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Net P/L
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closedPositions.map((position) => (
              <TableRow
                key={position.scrip}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(27, 43, 78, 0.8)' : '#E9EDF5'}`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: isDarkMode 
                      ? 'rgba(54, 153, 255, 0.08)'
                      : 'rgba(244, 247, 254, 0.95)',
                    transform: 'translateY(-1px)',
                    boxShadow: isDarkMode
                      ? '0 4px 12px rgba(0,0,0,0.1)'
                      : '0 4px 12px rgba(0,0,0,0.03)',
                  },
                }}
              >
                <TableCell 
                  sx={{ 
                    py: 2.5,
                    borderBottom: 'inherit',
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      background: isDarkMode
                        ? 'linear-gradient(135deg, rgba(54, 153, 255, 0.2), rgba(54, 153, 255, 0.1))'
                        : 'linear-gradient(135deg, rgba(54, 153, 255, 0.1), rgba(54, 153, 255, 0.05))',
                      color: isDarkMode ? '#3699FF' : '#0052CC',
                      py: 1.2,
                      px: 2.5,
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      border: `1px solid ${isDarkMode ? 'rgba(54, 153, 255, 0.2)' : 'rgba(54, 153, 255, 0.15)'}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isDarkMode
                          ? 'linear-gradient(135deg, rgba(54, 153, 255, 0.3), rgba(54, 153, 255, 0.2))'
                          : 'linear-gradient(135deg, rgba(54, 153, 255, 0.15), rgba(54, 153, 255, 0.1))',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    {position.scrip}
                  </Box>
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#1E2022',
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {position.lots.toFixed(3)}
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#1E2022',
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {position.avgBuyRate.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#1E2022',
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {position.avgSellRate.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: position.profitLoss >= 0 
                      ? (isDarkMode ? '#50CD89' : '#027A48')
                      : (isDarkMode ? '#F1416C' : '#D92D20'),
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {position.profitLoss.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#1E2022',
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {position.brokerage.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: position.netPL >= 0 
                      ? (isDarkMode ? '#50CD89' : '#027A48')
                      : (isDarkMode ? '#F1416C' : '#D92D20'),
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {position.netPL.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 