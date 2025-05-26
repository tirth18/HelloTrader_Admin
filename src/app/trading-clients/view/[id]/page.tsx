'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
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
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Close as CloseIcon,
  AccountBalance as AccountBalanceIcon,
  ShowChart as ShowChartIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface TradeData {
  id: string;
  scrip: string;
  buyRate: number;
  sellRate: number;
  lots: number;
  buyTurnover: number;
  sellTurnover: number;
  cmp: number;
  activePnl: number;
  marginUsed: number;
  boughtAt: string;
  soldAt: string;
  buyLp: number;
  sellLp: number;
}

interface FundData {
  amount: number;
  createdAt: string;
  notes: string;
}

interface PendingOrder {
  id: string;
  trade: string;
  lots: number;
  commodity: string;
  condition: string;
  rate: number;
  date: string;
  ipAddress: string;
}

export default function TradingClientViewPage() {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const clientId = params.id;

  const [fromDate, setFromDate] = useState('2025-06-26');
  const [toDate, setToDate] = useState('2025-06-26');

  // Mock data - replace with actual API calls
  const fundData: FundData[] = [
    {
      amount: 50000,
      createdAt: '2025-06-26 00:00:00',
      notes: 'Opening Balance Opening Balance'
    }
  ];

  const activeTradesData: TradeData[] = [
    {
      id: '3726753',
      scrip: 'SILVERDJULFUT',
      buyRate: 88200,
      sellRate: 0,
      lots: 1,
      buyTurnover: 88200,
      sellTurnover: 0,
      cmp: 87760,
      activePnl: -440,
      marginUsed: 1995,
      boughtAt: '2025-06-26 03:00:00',
      soldAt: '(not set)',
      buyLp: 127.0,
      sellLp: 0.1
    },
    {
      id: '3726847',
      scrip: 'GOLDGUINIFUT',
      buyRate: 69400,
      sellRate: 0,
      lots: 1,
      buyTurnover: 102800,
      sellTurnover: 0,
      cmp: 69683,
      activePnl: 283,
      marginUsed: 3856,
      boughtAt: '2025-06-26 03:00:00',
      soldAt: '(not set)',
      buyLp: 127.0,
      sellLp: 0.1
    }
  ];

  const closedTradesData: TradeData[] = [];

  const pendingOrdersData = {
    mcx: [] as PendingOrder[],
    nse: [] as PendingOrder[],
    bse: [] as PendingOrder[],
    comex: [] as PendingOrder[]
  };

  const handleExportFunds = () => {
    console.log('Exporting funds data');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => router.back()} 
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Trading Client Details
          </Typography>
        </Box>

        {/* Date Range Filter */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 3, 
            p: 3, 
            borderRadius: 2, 
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  color="success" 
                  sx={{ fontWeight: 600 }}
                >
                  EXPORT FUNDS
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ fontWeight: 600 }}
                >
                  EXPORT TRADES
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ fontWeight: 600 }}
                >
                  EXPORT FUNDS
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* View Details Button */}
        <Box sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            color="success" 
            size="large"
            sx={{ 
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            VIEW DETAILS
          </Button>
        </Box>

        {/* Fund - Withdrawal & Deposits */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.05),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <AccountBalanceIcon sx={{ mr: 1 }} />
              Fund - Withdrawal & Deposits
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing 1 of 1 items
            </Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundData.map((fund, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{formatCurrency(fund.amount)}</TableCell>
                    <TableCell>{fund.createdAt}</TableCell>
                    <TableCell>{fund.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Active Trades */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.success.main, 0.05),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <ShowChartIcon sx={{ mr: 1 }} />
              Active Trades
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing 2 of 2 items
            </Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
                  <TableCell sx={{ fontWeight: 600 }}>X</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ID #</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Scrip</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lots / Units</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Turnover</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Turnover</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>CMP</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Active P/L</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Margin Used</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Bought at</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sold at</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Lp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Lp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeTradesData.map((trade) => (
                  <TableRow key={trade.id} hover>
                    <TableCell>
                      <IconButton size="small">
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.scrip}</TableCell>
                    <TableCell>{formatNumber(trade.buyRate)}</TableCell>
                    <TableCell>{trade.sellRate || '-'}</TableCell>
                    <TableCell>{trade.lots}</TableCell>
                    <TableCell>{formatNumber(trade.buyTurnover)}</TableCell>
                    <TableCell>{trade.sellTurnover || '-'}</TableCell>
                    <TableCell>{formatNumber(trade.cmp)}</TableCell>
                    <TableCell>
                      <Chip
                        label={trade.activePnl}
                        size="small"
                        color={trade.activePnl >= 0 ? 'success' : 'error'}
                        icon={trade.activePnl >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>{formatNumber(trade.marginUsed)}</TableCell>
                    <TableCell>{trade.boughtAt}</TableCell>
                    <TableCell>{trade.soldAt}</TableCell>
                    <TableCell>{trade.buyLp}</TableCell>
                    <TableCell>{trade.sellLp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Closed Trades */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.warning.main, 0.1) : alpha(theme.palette.warning.main, 0.05),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ mr: 1 }} />
              Closed Trades
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing 0 of 0 items
            </Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID #</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Scrip</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lots / Units</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Turnover</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Turnover</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Profit / Loss</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Brokerage</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Bought at</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sold at</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Buy Lp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sell Lp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={13} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No records found
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Pending Orders Sections */}
        {Object.entries(pendingOrdersData).map(([exchange, orders]) => (
          <Paper 
            key={exchange}
            elevation={0} 
            sx={{ 
              mb: 4, 
              borderRadius: 2, 
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.info.main, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ mr: 1 }} />
                {exchange.toUpperCase()} Pending Orders
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Showing 0 of 0 items
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Trade</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Lots</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Commodity</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Ip Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No records found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}

        {/* COMEX Pending Orders with Scrip column */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.secondary.main, 0.05),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon sx={{ mr: 1 }} />
              COMEX Pending Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing 0 of 0 items
            </Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trade</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lots</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Scrip</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Ip Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No records found
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </DashboardLayout>
  );
} 