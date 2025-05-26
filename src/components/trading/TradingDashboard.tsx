import React from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  useTheme, 
  alpha,
  Grid,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { LineChart } from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { BarChart } from '../charts/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartIcon from '@mui/icons-material/BarChart';

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: string;
}

interface StatItem {
  title: string;
  value: string | number;
  change: string;
  changeColor: string;
  icon: React.ReactNode;
  iconBg: string;
  subtitle: string;
  metric: string;
}

const positions: Position[] = [
  {
    symbol: 'RELIANCE',
    quantity: 300,
    avgPrice: 2450,
    currentPrice: 2510,
    pnl: '6,000'
  },
  {
    symbol: 'HDFCBANK',
    quantity: 200,
    avgPrice: 1620,
    currentPrice: 1595,
    pnl: '-5,000'
  },
  {
    symbol: 'TCS',
    quantity: 50,
    avgPrice: 3200,
    currentPrice: 3350,
    pnl: '7,500'
  },
  {
    symbol: 'INFY',
    quantity: 150,
    avgPrice: 1450,
    currentPrice: 1480,
    pnl: '4,500'
  }
];

const TradingDashboard = () => {
  const theme = useTheme();

  const stats: StatItem[] = [
    {
      title: 'Total P&L',
      value: '₹3,50,000',
      change: '+14.5%',
      changeColor: '#2e7d32',
      icon: <ShowChartIcon sx={{ color: '#fff' }} />,
      iconBg: '#2e7d32',
      subtitle: 'Updated just now',
      metric: 'PROFIT'
    },
    {
      title: 'Total Turnover',
      value: '₹2,45,00,000',
      change: '+1,256',
      changeColor: '#1976d2',
      icon: <AccountBalanceIcon sx={{ color: '#fff' }} />,
      iconBg: '#1976d2',
      subtitle: '1,256 trades',
      metric: 'TODAY'
    },
    {
      title: 'Active Users',
      value: '342',
      change: '+12',
      changeColor: '#ed6c02',
      icon: <GroupIcon sx={{ color: '#fff' }} />,
      iconBg: '#ed6c02',
      subtitle: 'Live trading users',
      metric: 'ONLINE'
    },
    {
      title: 'Total Brokerage',
      value: '₹1,25,000',
      change: '+₹12,500',
      changeColor: '#0288d1',
      icon: <MonetizationOnIcon sx={{ color: '#fff' }} />,
      iconBg: '#0288d1',
      subtitle: 'Current session',
      metric: 'EARNINGS'
    }
  ];

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: theme.spacing(4),
          gap: theme.spacing(1)
        }}
      >
        <ShowChartIcon 
          sx={{ 
            color: theme.palette.primary.main,
            fontSize: theme.typography.h4.fontSize
          }} 
        />
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: theme.typography.fontWeightBold,
            letterSpacing: '0.02em',
            color: theme.palette.text.primary
          }}
        >
          Trading Dashboard
        </Typography>
      </Box>

      <Grid container spacing={theme.spacing(3)} sx={{ mb: theme.spacing(4) }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: theme.spacing(3),
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: theme.shadows[1],
                borderRadius: theme.shape.borderRadius * 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(2), mb: theme.spacing(2) }}>
                <Avatar
                  sx={{
                    bgcolor: stat.iconBg,
                    width: 56,
                    height: 56,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: theme.spacing(0.5),
                      color: theme.palette.text.secondary,
                      fontWeight: theme.typography.fontWeightMedium,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: theme.typography.fontWeightBold,
                      color: theme.palette.text.primary
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Chip
                  label={stat.metric}
                  size="small"
                  sx={{
                    bgcolor: stat.changeColor,
                    color: 'white',
                    fontWeight: theme.typography.fontWeightMedium,
                    fontSize: '0.75rem',
                    height: 24
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.75rem'
                  }}
                >
                  {stat.subtitle}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={theme.spacing(4)}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: theme.spacing(4), height: '100%', boxShadow: theme.shadows[1], borderRadius: theme.shape.borderRadius }}>
            <Box sx={{ mb: theme.spacing(3), display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
              <ShowChartIcon sx={{ fontSize: theme.typography.h6.fontSize, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={theme.typography.fontWeightBold}>
                P&L Trend Today
              </Typography>
            </Box>
            <LineChart />
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: theme.spacing(4), height: '100%', boxShadow: theme.shadows[1], borderRadius: theme.shape.borderRadius }}>
            <Box sx={{ mb: theme.spacing(3), display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
              <PieChartIcon sx={{ fontSize: theme.typography.h6.fontSize, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={theme.typography.fontWeightBold}>
                Segment Distribution
              </Typography>
            </Box>
            <PieChart />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: theme.spacing(4), boxShadow: theme.shadows[1], borderRadius: theme.shape.borderRadius }}>
            <Box sx={{ mb: theme.spacing(3), display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
              <BarChartIcon sx={{ fontSize: theme.typography.h6.fontSize, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={theme.typography.fontWeightBold}>
                Segment-wise Turnover
              </Typography>
            </Box>
            <BarChart />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: theme.spacing(4), boxShadow: theme.shadows[1], borderRadius: theme.shape.borderRadius }}>
            <Box sx={{ mb: theme.spacing(3), display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
              <TableChartIcon sx={{ fontSize: theme.typography.h6.fontSize, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight={theme.typography.fontWeightBold}>
                Broker Positions
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Avg. Price</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">P&L</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.symbol}>
                      <TableCell component="th" scope="row">
                        {position.symbol}
                      </TableCell>
                      <TableCell align="right">{position.quantity}</TableCell>
                      <TableCell align="right">₹{position.avgPrice}</TableCell>
                      <TableCell align="right">₹{position.currentPrice}</TableCell>
                      <TableCell 
                        align="right"
                        sx={{ 
                          color: position.pnl.startsWith('-') ? 'error.main' : 'success.main',
                          fontWeight: theme.typography.fontWeightBold
                        }}
                      >
                        ₹{position.pnl}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradingDashboard; 