'use client';

import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ScriptUser {
  id: string;
  name: string;
  lots: number;
  avgBuyRate: number;
  avgSellRate: number;
  profitLoss: number;
  brokerage: number;
  netPL: number;
}

// Sample static data - this will be replaced with API data later
const usersData: ScriptUser[] = [
  {
    id: '683',
    name: 'Raman',
    lots: 0.769,
    avgBuyRate: 254.75,
    avgSellRate: 262.05,
    profitLoss: 14600,
    brokerage: 258.4,
    netPL: 14341.6,
  },
  {
    id: '714',
    name: '04',
    lots: 0.004,
    avgBuyRate: 254.75,
    avgSellRate: 275.95,
    profitLoss: 212,
    brokerage: 0,
    netPL: 212,
  },
  {
    id: '1959',
    name: 'Sathiyamoorthi',
    lots: 2.5,
    avgBuyRate: 275.81,
    avgSellRate: 275.57,
    profitLoss: -1550,
    brokerage: 179.2,
    netPL: -1729.2,
  },
  {
    id: '3713',
    name: 'MURALIDHARAN N',
    lots: 0,
    avgBuyRate: 277.2,
    avgSellRate: 276.9,
    profitLoss: -0.3,
    brokerage: 0.03,
    netPL: -0.33,
  },
  {
    id: '3738',
    name: 'Anil',
    lots: 1.385,
    avgBuyRate: 254.75,
    avgSellRate: 277,
    profitLoss: 80100,
    brokerage: 382.86,
    netPL: 79717.14,
  },
  {
    id: '4074',
    name: 'Aman',
    lots: 1.154,
    avgBuyRate: 254.75,
    avgSellRate: 276.25,
    profitLoss: 64500,
    brokerage: 477.9,
    netPL: 64022.1,
  },
  {
    id: '4803',
    name: 'Arun',
    lots: 3,
    avgBuyRate: 272.05,
    avgSellRate: 272,
    profitLoss: -390,
    brokerage: 212.18,
    netPL: -602.18,
  }
];

export default function ScriptDetailPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const searchParams = useSearchParams();
  const scriptName = searchParams.get('script') || 'Unknown Script';

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
        {scriptName}
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
                User
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
            {usersData.map((user) => (
              <TableRow
                key={user.id}
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
                  <Link
                    href={`/user-script-detail?script=${encodeURIComponent(scriptName)}&userId=${user.id}&userName=${user.name}`}
                    style={{ textDecoration: 'none' }}
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
                        cursor: 'pointer',
                        '&:hover': {
                          background: isDarkMode
                            ? 'linear-gradient(135deg, rgba(54, 153, 255, 0.3), rgba(54, 153, 255, 0.2))'
                            : 'linear-gradient(135deg, rgba(54, 153, 255, 0.15), rgba(54, 153, 255, 0.1))',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      {`${user.id} : ${user.name}`}
                    </Box>
                  </Link>
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
                  {user.lots.toFixed(3)}
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
                  {user.avgBuyRate.toFixed(2)}
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
                  {user.avgSellRate.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: user.profitLoss >= 0 
                      ? (isDarkMode ? '#50CD89' : '#027A48')
                      : (isDarkMode ? '#F1416C' : '#D92D20'),
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {user.profitLoss.toFixed(2)}
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
                  {user.brokerage.toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: user.netPL >= 0 
                      ? (isDarkMode ? '#50CD89' : '#027A48')
                      : (isDarkMode ? '#F1416C' : '#D92D20'),
                    borderBottom: 'inherit',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {user.netPL.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 