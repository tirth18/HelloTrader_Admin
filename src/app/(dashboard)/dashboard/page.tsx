'use client';

import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  alpha,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Warning,
  MoreHoriz,
  ArrowForward,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatsCard from '@/components/dashboard/StatsCard';
import NextLink from 'next/link';
import { ChartData, TradingMetrics, RiskMetrics } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for development
const mockTradingMetrics: TradingMetrics = {
  totalVolume: 8456789,
  activeUsers: 2547,
  openPositions: 1285,
  riskAlerts: 42
};

const mockRiskMetrics: RiskMetrics = {
  marketRisk: 64,
  liquidityRisk: 48,
  creditRisk: 72
};

const mockRecentOrders = [
  { id: '1', symbol: 'AAPL', type: 'buy', quantity: 100, price: 152.34, status: 'filled' },
  { id: '2', symbol: 'MSFT', type: 'sell', quantity: 50, price: 295.67, status: 'filled' },
  { id: '3', symbol: 'GOOGL', type: 'buy', quantity: 20, price: 2745.89, status: 'pending' },
];

const mockChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Trading Volume',
      data: [65, 59, 80, 81, 56, 55, 72],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
    }
  ]
};

const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();

  const { data: tradingMetrics, isLoading: isLoadingTradingMetrics } = useQuery({
    queryKey: ['tradingMetrics'],
    queryFn: async () => {
      try {
        // For development, return mock data
        if (process.env.NODE_ENV === 'development') {
          return mockTradingMetrics;
        }
        
        const response = await fetch('/api/metrics/trading');
        return response.json();
      } catch (error) {
        console.error('Error fetching trading metrics:', error);
        return mockTradingMetrics;
      }
    }
  });

  const { data: riskMetrics, isLoading: isLoadingRiskMetrics } = useQuery({
    queryKey: ['riskMetrics'],
    queryFn: async () => {
      try {
        // For development, return mock data
        if (process.env.NODE_ENV === 'development') {
          return mockRiskMetrics;
        }
        
        const response = await fetch('/api/metrics/risk');
        return response.json();
      } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return mockRiskMetrics;
      }
    }
  });

  const { data: recentOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: async () => {
      try {
        // For development, return mock data
        if (process.env.NODE_ENV === 'development') {
          return mockRecentOrders;
        }
        
        const response = await fetch('/api/orders/recent');
        return response.json();
      } catch (error) {
        console.error('Error fetching recent orders:', error);
        return mockRecentOrders;
      }
    }
  });

  const { data: chartData, isLoading: isLoadingChartData } = useQuery({
    queryKey: ['tradingVolumeChart'],
    queryFn: async () => {
      try {
        // For development, return mock data
        if (process.env.NODE_ENV === 'development') {
          return mockChartData;
        }
        
        const response = await fetch('/api/charts/trading-volume');
        return response.json();
      } catch (error) {
        console.error('Error fetching chart data:', error);
        return mockChartData;
      }
    }
  });

  // Mock recent activity data
  const recentActivity = [
    { id: 1, type: 'Deposit', user: 'John Doe', amount: '₹50,000', time: '10:30 AM' },
    { id: 2, type: 'Withdrawal', user: 'Jane Smith', amount: '₹25,000', time: '11:45 AM' },
    { id: 3, type: 'Trade', user: 'Mike Johnson', amount: '₹100,000', time: '12:15 PM' },
    { id: 4, type: 'Login', user: 'Sarah Williams', amount: '-', time: '01:20 PM' },
  ];

  if (isLoadingTradingMetrics || isLoadingRiskMetrics || isLoadingOrders || isLoadingChartData) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress sx={{ height: 4, borderRadius: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, sm: 3, md: 4 },
      ml: { xs: 0, lg: -1 },
      maxWidth: '100%',
      overflow: 'hidden',
      minHeight: '100vh',
      background: (theme) => theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, rgba(10, 25, 41, 0.8) 0%, rgba(10, 25, 41, 0.95) 100%)'
        : 'linear-gradient(180deg, rgba(245, 247, 250, 0.8) 0%, rgba(245, 247, 250, 0.95) 100%)',
    }}>
      <Box sx={{ 
        mb: 6, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 3,
        p: { xs: 3, sm: 4 },
        pl: { xs: 5, sm: 6, md: 7 },
        pr: { xs: 4, sm: 5 },
        borderRadius: '16px',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(25, 118, 210, 0.04) 100%)',
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.25)'
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
      }}>
        <Box sx={{ 
          flex: 1,
          pl: { xs: 2, sm: 3 },
          pr: { xs: 3, sm: 4 },
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              letterSpacing: '-0.5px',
              mb: 1.5,
              display: 'inline-block',
              position: 'relative',
              ml: { xs: 1, sm: 2 },
              textShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 2px 10px rgba(33, 150, 243, 0.3)'
                : 'none',
            }}
          >
            Welcome back, {user?.username || 'Admin'}
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: (theme) => alpha(theme.palette.text.secondary, 0.95),
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: '600px',
              ml: { xs: 1.5, sm: 2.5 },
            }}
          >
            Here's what's happening with your trading account today
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
              : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
            px: 4,
            py: 1.5,
            '&:hover': {
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)'
                : 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
            }
          }}
        >
          View Reports
        </Button>
      </Box>
      
      <Grid container spacing={4}>
        {[
          {
            title: "Total Volume",
            value: tradingMetrics?.totalVolume || 0,
            icon: <TrendingUp />,
            change: { value: 12.5, isPositive: true },
            subtitle: "vs last week",
            currency: true,
            color: "primary",
            tooltip: "Total trading volume across all assets"
          },
          {
            title: "Active Users",
            value: tradingMetrics?.activeUsers || 0,
            icon: <AccountBalance />,
            change: { value: 8.1, isPositive: true },
            subtitle: "vs last week",
            color: "success"
          },
          {
            title: "Open Positions",
            value: tradingMetrics?.openPositions || 0,
            icon: <TrendingDown />,
            change: { value: -3.2, isPositive: false },
            subtitle: "vs last week",
            color: "warning"
          },
          {
            title: "Risk Alerts",
            value: tradingMetrics?.riskAlerts || 0,
            icon: <Warning />,
            change: { value: 2.5, isPositive: false },
            subtitle: "vs last week",
            color: "error",
            tooltip: "Number of active risk alerts requiring attention"
          }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              borderRadius: '16px',
              background: (theme) => theme.palette.mode === 'dark' 
                ? `linear-gradient(135deg, ${theme.palette[stat.color].main}15 0%, ${theme.palette[stat.color].main}08 100%)`
                : `linear-gradient(135deg, ${theme.palette[stat.color].main}08 0%, ${theme.palette[stat.color].main}03 100%)`,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.25)'
                : '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '0 12px 28px rgba(0, 0, 0, 0.4)'
                  : '0 12px 28px rgba(0, 0, 0, 0.08)',
              },
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: '12px',
                    background: (theme) => theme.palette.mode === 'dark'
                      ? `rgba(${theme.palette[stat.color].main}, 0.1)`
                      : `rgba(${theme.palette[stat.color].main}, 0.05)`,
                  }}>
                    {stat.icon}
                  </Box>
                  <Chip
                    label={`${stat.change.isPositive ? '+' : ''}${stat.change.value}%`}
                    size="small"
                    color={stat.change.isPositive ? 'success' : 'error'}
                    sx={{ 
                      borderRadius: '8px',
                      fontWeight: 600,
                      height: 24,
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  mb: 1,
                  color: (theme) => theme.palette.text.primary,
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                }}>
                  {stat.currency ? `₹${stat.value.toLocaleString()}` : stat.value}
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 0.5,
                }}>
                  {stat.title}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: (theme) => theme.palette.text.secondary,
                  display: 'block',
                  fontSize: '0.75rem',
                }}>
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 4 }}>
        <DashboardCard 
          title="Trading Volume" 
          subtitle="Daily trading volume over the last 30 days"
          headerDivider
          actions={[
            { 
              label: 'Download CSV', 
              icon: <ArrowForward fontSize="small" />, 
              onClick: () => console.log('Download chart data') 
            },
            { 
              label: 'View detailed report', 
              icon: <MoreHoriz fontSize="small" />, 
              onClick: () => console.log('View detailed report') 
            }
          ]}
          sx={{
            borderRadius: '16px',
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.25)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          }}
        >
          <Box sx={{ p: 3, height: 400, position: 'relative' }}>
            <Line
              data={chartData || { 
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], 
                datasets: [
                  {
                    label: 'Trading Volume',
                    data: [65, 59, 80, 81, 56, 55, 72],
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: theme.palette.background.paper,
                    pointBorderColor: theme.palette.primary.main,
                    pointBorderWidth: 2,
                    fill: true,
                  }
                ] 
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                plugins: {
                  legend: {
                    position: 'top' as const,
                    labels: {
                      boxWidth: 10,
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                      font: {
                        size: 12,
                        weight: '600',
                      },
                    }
                  },
                  tooltip: {
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    titleColor: theme.palette.text.primary,
                    bodyColor: theme.palette.text.secondary,
                    borderColor: theme.palette.divider,
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    boxWidth: 10,
                    callbacks: {
                      label: (context) => {
                        return `₹${context.parsed.y.toLocaleString()}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: theme.palette.text.secondary,
                      font: {
                        size: 12,
                      }
                    }
                  },
                  y: {
                    grid: {
                      color: alpha(theme.palette.divider, 0.5),
                      drawBorder: false,
                    },
                    ticks: {
                      color: theme.palette.text.secondary,
                      font: {
                        size: 12,
                      },
                      callback: (value) => `₹${value.toLocaleString()}`
                    }
                  }
                }
              }}
            />
          </Box>
        </DashboardCard>
      </Grid>
      
      <Grid container spacing={4} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <DashboardCard 
            title="Risk Metrics" 
            subtitle="Current risk indicators"
            headerDivider
            sx={{
              borderRadius: '16px',
              background: (theme) => theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(244, 67, 54, 0.05) 0%, rgba(244, 67, 54, 0.02) 100%)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.25)'
                : '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            }}
          >
            <Box sx={{ p: 3 }}>
              {[
                { label: 'Market Risk', value: riskMetrics?.marketRisk || 0 },
                { label: 'Liquidity Risk', value: riskMetrics?.liquidityRisk || 0 },
                { label: 'Credit Risk', value: riskMetrics?.creditRisk || 0 }
              ].map((metric, index) => (
                <Box key={metric.label} sx={{ mb: index < 2 ? 4 : 0 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1.5,
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.primary,
                        fontSize: '1rem',
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: metric.value > 70 
                          ? theme.palette.error.main 
                          : theme.palette.text.secondary,
                        fontSize: '1rem',
                      }}
                    >
                      {metric.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    color={metric.value > 70 ? 'error' : 'primary'}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }
                    }}
                  />
                </Box>
              ))}
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  component={NextLink}
                  href="/risk"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.error.main, 0.2)
                      : alpha(theme.palette.error.main, 0.1),
                    color: (theme) => theme.palette.error.main,
                    border: `1px solid ${theme.palette.error.main}`,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.error.main, 0.3)
                        : alpha(theme.palette.error.main, 0.2),
                      boxShadow: 'none',
                    }
                  }}
                >
                  View full risk report
                </Button>
              </Box>
            </Box>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <DashboardCard 
            title="Recent Activity" 
            subtitle="Latest platform activity"
            headerDivider
            actions={[
              { 
                label: 'View all activity', 
                icon: <ArrowForward fontSize="small" />, 
                onClick: () => console.log('View all activity') 
              },
            ]}
            sx={{
              borderRadius: '16px',
              background: (theme) => theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.25)'
                : '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            }}
          >
            <Box sx={{ p: 3 }}>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <Box sx={{ 
                    py: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: '12px',
                        background: (theme) => {
                          switch (activity.type) {
                            case 'Deposit':
                              return theme.palette.mode === 'dark'
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(76, 175, 80, 0.05)';
                            case 'Withdrawal':
                              return theme.palette.mode === 'dark'
                                ? 'rgba(244, 67, 54, 0.1)'
                                : 'rgba(244, 67, 54, 0.05)';
                            default:
                              return theme.palette.mode === 'dark'
                                ? 'rgba(33, 150, 243, 0.1)'
                                : 'rgba(33, 150, 243, 0.05)';
                          }
                        },
                      }}>
                        {activity.type === 'Deposit' ? (
                          <TrendingUp sx={{ color: 'success.main' }} />
                        ) : activity.type === 'Withdrawal' ? (
                          <TrendingDown sx={{ color: 'error.main' }} />
                        ) : (
                          <AccountBalance sx={{ color: 'primary.main' }} />
                        )}
                      </Box>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: (theme) => theme.palette.text.primary,
                            fontSize: '1rem',
                            mb: 0.5,
                          }}
                        >
                          {activity.type}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: (theme) => theme.palette.text.secondary,
                            fontSize: '0.875rem',
                          }}
                        >
                          {activity.user} • {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: activity.type === 'Deposit' 
                          ? theme.palette.success.main
                          : activity.type === 'Withdrawal'
                            ? theme.palette.error.main
                            : theme.palette.text.primary,
                        fontSize: '1rem',
                      }}
                    >
                      {activity.amount}
                    </Typography>
                  </Box>
                  {index < recentActivity.length - 1 && (
                    <Divider 
                      sx={{ 
                        opacity: 0.6,
                        my: 0.5,
                        borderColor: (theme) => theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)',
                      }} 
                    />
                  )}
                </React.Fragment>
              ))}
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={NextLink}
                  href="/reports"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    py: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.success.main, 0.2)
                      : alpha(theme.palette.success.main, 0.1),
                    color: (theme) => theme.palette.success.main,
                    border: `1px solid ${theme.palette.success.main}`,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.success.main, 0.3)
                        : alpha(theme.palette.success.main, 0.2),
                      boxShadow: 'none',
                    }
                  }}
                >
                  View all activity
                </Button>
              </Box>
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 