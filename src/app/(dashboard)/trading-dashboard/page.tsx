'use client';

import React from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Card,
  CardContent,
  Box, 
  CircularProgress, 
  Avatar,
  Chip,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Divider,
  Container
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  PeopleAlt as PeopleAltIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  ShowChart as ShowChartIcon,
  BarChart as BarChartIcon,
  History as HistoryIcon,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import useMockTradingData, { Position } from '../../../hooks/useMockTradingData';

// Currency formatter function
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

// Function to format numbers with commas
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
};

// Colors for the chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// TradingDashboardContent component
const TradingDashboardContent: React.FC = () => {
  const { data, isLoading, error } = useMockTradingData();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, mt: 2 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff4f4', borderRadius: 2 }}>
          <Typography color="error" variant="h6" gutterBottom>
            Error loading trading data:
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 3, mt: 2 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            No trading data available
          </Typography>
          <Typography>Please check your connection and try again.</Typography>
        </Paper>
      </Box>
    );
  }

  // Prepare positions data
  const positions = data.positions || [];

  // Prepare data for line chart (P&L over time)
  const lineChartData = [
    { name: '9:15', pnl: 105000 },
    { name: '10:30', pnl: 180000 },
    { name: '11:45', pnl: 150000 },
    { name: '13:00', pnl: 220000 },
    { name: '14:15', pnl: 310000 },
    { name: '15:30', pnl: data.metrics.totalPnL },
  ];

  // Prepare data for bar chart (segment-wise turnover)
  const turnoverData = Object.entries(data.turnover).map(([key, value]) => ({
    segment: key,
    value: value,
  }));

  // Prepare data for pie chart (segment distribution)
  const pieChartData = Object.entries(data.turnover).map(([key, value], index) => ({
    name: key,
    value: value,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: '1px solid #eaeaea',
          pb: 2
        }}>
          <ShowChartIcon sx={{ 
            fontSize: { xs: 28, sm: 32 }, 
            color: 'primary.main', 
            mr: 2 
          }} />
          <Typography variant="h5" fontWeight="bold">
            Trading Dashboard
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: data.metrics.totalPnL >= 0 ? 'success.light' : 'error.light', 
                    mr: 2,
                    width: { xs: 46, sm: 50 },
                    height: { xs: 46, sm: 50 }
                  }}>
                    {data.metrics.totalPnL >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      Total P&L
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      color: data.metrics.totalPnL >= 0 ? 'success.main' : 'error.main',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}>
                      {formatCurrency(data.metrics.totalPnL)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    size="small" 
                    label={data.metrics.totalPnL >= 0 ? "PROFIT" : "LOSS"}
                    color={data.metrics.totalPnL >= 0 ? "success" : "error"}
                    sx={{ fontWeight: 'bold', height: 24 }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Updated just now
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.light', 
                    mr: 2,
                    width: { xs: 46, sm: 50 },
                    height: { xs: 46, sm: 50 }
                  }}>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      Total Turnover
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}>
                      {formatCurrency(data.metrics.totalTurnover)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    size="small" 
                    label="TODAY" 
                    color="primary"
                    sx={{ fontWeight: 'bold', height: 24 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BarChartIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
                    <Typography variant="caption" color="textSecondary">
                      {formatNumber(data.metrics.totalTrades)} trades
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: 'warning.light', 
                    mr: 2,
                    width: { xs: 46, sm: 50 },
                    height: { xs: 46, sm: 50 }
                  }}>
                    <PeopleAltIcon />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      Active Users
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}>
                      {formatNumber(data.metrics.activeUsers)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    size="small" 
                    label="ONLINE" 
                    color="warning"
                    sx={{ fontWeight: 'bold', height: 24 }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Live trading users
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: 'info.light', 
                    mr: 2,
                    width: { xs: 46, sm: 50 },
                    height: { xs: 46, sm: 50 }
                  }}>
                    <HistoryIcon />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      Total Brokerage
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}>
                      {formatCurrency(data.metrics.totalBrokerage)}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    size="small" 
                    label="EARNINGS" 
                    color="info"
                    sx={{ fontWeight: 'bold', height: 24 }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    Current session
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* P&L Chart */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)', 
              height: '100%',
              borderRadius: 2
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                  P&L Trend Today
                </Typography>
                <Box sx={{ height: { xs: 250, sm: 300 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#eaeaea' }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `₹${value/1000}K`}
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#eaeaea' }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(value as number)}`, 'P&L']}
                        labelFormatter={(label) => `Time: ${label}`}
                        contentStyle={{ 
                          borderRadius: 8, 
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          border: 'none'
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line
                        name="Profit/Loss"
                        type="monotone"
                        dataKey="pnl"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#8884d8', strokeWidth: 1 }}
                        activeDot={{ r: 7, stroke: '#8884d8', strokeWidth: 1 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Segment Distribution */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)', 
              height: '100%',
              borderRadius: 2
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <PieChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Segment Distribution
                </Typography>
                <Box sx={{ 
                  height: { xs: 250, sm: 300 }, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' 
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(value as number)}`, 'Turnover']}
                        contentStyle={{ 
                          borderRadius: 8, 
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          border: 'none'
                        }}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Segment-wise Turnover Bar Chart */}
        <Card sx={{ 
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)', 
          mb: 4,
          borderRadius: 2
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
              Segment-wise Turnover
            </Typography>
            <Box sx={{ height: { xs: 250, sm: 300 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turnoverData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis 
                    dataKey="segment" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#eaeaea' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value/1000000}M`}
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#eaeaea' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(value as number)}`, 'Turnover']}
                    contentStyle={{ 
                      borderRadius: 8, 
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      border: 'none'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    name="Turnover Amount" 
                    dataKey="value" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Positions Table */}
        <Card sx={{ 
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          borderRadius: 2
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <ShowChartIcon sx={{ mr: 1, color: 'primary.main' }} />
              Broker Positions
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ overflow: 'auto' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ 
                    backgroundColor: 'background.default',
                    '& th': {
                      fontWeight: 'bold',
                      borderBottom: '2px solid #eaeaea'
                    }
                  }}>
                    <TableCell sx={{ py: 1.5 }}>Symbol</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>Quantity</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>Avg. Price</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>Current Price</TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>P&L</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {positions.map((position: Position) => (
                    <TableRow 
                      key={position.symbol}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: position.pnl >= 0 ? 'success.main' : 'error.main',
                            mr: 1.5,
                            boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                          }} />
                          <Typography sx={{ fontWeight: '500' }}>
                            {position.symbol}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 1.5 }}>{position.quantity}</TableCell>
                      <TableCell align="right" sx={{ py: 1.5 }}>{formatCurrency(position.avgPrice)}</TableCell>
                      <TableCell align="right" sx={{ py: 1.5 }}>{formatCurrency(position.currentPrice)}</TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          py: 1.5,
                          color: position.pnl >= 0 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {formatCurrency(position.pnl)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

// TradingDashboardPage component wrapped with ErrorBoundary
const TradingDashboardPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <TradingDashboardContent />
    </ErrorBoundary>
  );
};

export default TradingDashboardPage;