'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Assessment,
  People,
  Notifications,
  Payment,
  ShowChart,
  AttachMoney,
} from '@mui/icons-material';
import ErrorBoundary from '../../../components/ErrorBoundary';
import QuickAccess from '../../../components/QuickAccess';

// Mock data for demonstration
const dashboardStats = [
  { 
    title: 'Total Trading Volume', 
    value: '₹14,532,650', 
    change: '+12.4%', 
    trend: 'up',
    icon: <ShowChart fontSize="large" color="primary" />,
    color: '#3f51b5' 
  },
  { 
    title: 'Active Trades', 
    value: '1,083', 
    change: '+5.2%', 
    trend: 'up', 
    icon: <Assessment fontSize="large" color="secondary" />,
    color: '#2196f3' 
  },
  { 
    title: 'Total Profit/Loss', 
    value: '₹2,116,357', 
    change: '+18.7%', 
    trend: 'up', 
    icon: <AttachMoney fontSize="large" color="success" />,
    color: '#4caf50' 
  },
  { 
    title: 'Margin Used', 
    value: '₹30,127,597', 
    change: '-3.5%', 
    trend: 'down', 
    icon: <AccountBalance fontSize="large" color="error" />,
    color: '#f44336' 
  },
];

const recentActivities = [
  { 
    id: 1, 
    action: 'New Trade Created', 
    user: 'jain01', 
    details: 'GOLD25APRFUT - Buy 0.1 lots at ₹90,200', 
    time: '2 minutes ago',
    avatar: 'J',
    avatarColor: '#f44336'
  },
  { 
    id: 2, 
    action: 'Position Closed', 
    user: 'jain02', 
    details: 'NGK5 - 0.1 lots with profit of ₹800', 
    time: '15 minutes ago',
    avatar: 'J',
    avatarColor: '#3f51b5'
  },
  { 
    id: 3, 
    action: 'Deposit Request', 
    user: 'Vipul', 
    details: 'Amount: ₹50,000 - Pending Approval', 
    time: '1 hour ago',
    avatar: 'V',
    avatarColor: '#4caf50'
  },
  { 
    id: 4, 
    action: 'Withdrawal Request', 
    user: 'Abhishek Mishra', 
    details: 'Amount: ₹25,000 - Approved', 
    time: '3 hours ago',
    avatar: 'A',
    avatarColor: '#ff9800'
  },
  { 
    id: 5, 
    action: 'New Client Added', 
    user: 'Admin', 
    details: 'Client: HEL0119', 
    time: '5 hours ago',
    avatar: 'A',
    avatarColor: '#9c27b0'
  },
];

const segmentData = [
  { segment: 'MCX', buyTurnover: '₹5,234,567', sellTurnover: '₹4,987,432', activeUsers: 12 },
  { segment: 'Equity', buyTurnover: '₹8,765,432', sellTurnover: '₹8,345,123', activeUsers: 25 },
  { segment: 'Options', buyTurnover: '₹3,432,123', sellTurnover: '₹3,876,543', activeUsers: 18 },
  { segment: 'COMEX', buyTurnover: '₹2,345,678', sellTurnover: '₹2,234,567', activeUsers: 8 },
];

// Dashboard content component
const DashboardContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        flex: 1,
        p: '24px 24px 24px 0',
        pl: 0,
        maxWidth: '100%',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0A1929' : '#F5F7FA',
        marginLeft: 0,
        width: '100%',
        borderLeft: 'none',
        backgroundImage: (theme) => theme.palette.mode === 'dark' 
          ? 'radial-gradient(circle at 50% 0%, rgba(33, 150, 243, 0.03) 0%, rgba(33, 150, 243, 0) 50%)'
          : 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0) 50%)',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 4, 
        alignItems: 'center',
        flexWrap: 'wrap',
        pl: 3,
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: { xs: 2, sm: 0 },
            fontSize: '1.75rem',
            fontWeight: 700,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
              : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}
        >
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label="Today, April 03, 2025" 
            color="primary" 
            variant="outlined" 
            size="small"
            sx={{ 
              fontWeight: 600,
              height: 32,
              borderRadius: '16px',
              background: (theme) => theme.palette.mode === 'dark' 
                ? 'rgba(33, 150, 243, 0.1)' 
                : 'rgba(25, 118, 210, 0.05)',
              borderColor: (theme) => theme.palette.mode === 'dark' 
                ? 'rgba(33, 150, 243, 0.5)' 
                : 'rgba(25, 118, 210, 0.3)',
              '& .MuiChip-label': {
                px: 2.5,
                fontSize: '0.875rem'
              }
            }} 
          />
        </Box>
      </Box>

      {/* Quick Access Links */}
      <Box sx={{ mb: 4, pl: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2.5, 
            fontWeight: 600,
            fontSize: '1.125rem',
            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '40px',
              height: '3px',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              borderRadius: '2px'
            }
          }}
        >
          Quick Access
        </Typography>
        <QuickAccess showTitle={false} />
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4, pl: 2 }}>
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: '16px',
              background: (theme) => theme.palette.mode === 'dark' 
                ? `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`
                : `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}03 100%)`,
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 0.75, fontWeight: 600, fontSize: '0.875rem' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
                      fontSize: '1.5rem',
                      letterSpacing: '-0.5px'
                    }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1.5,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                  background: (theme) => stat.trend === 'up'
                    ? theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.05)'
                    : theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(244, 67, 54, 0.05)',
                  borderRadius: '8px',
                  py: 0.5,
                  px: 1,
                  width: 'fit-content'
                }}>
                  {stat.trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                  <Typography variant="body2" sx={{ ml: 0.75, fontWeight: 600, fontSize: '0.875rem' }}>
                    {stat.change} from last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Market Segment Overview and Recent Activity */}
      <Grid container spacing={3} sx={{ pl: 2 }}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: '16px',
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.02)'
              : '#fff',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.25)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            height: '100%',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.07)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                mb: 3.5, 
                fontWeight: 600, 
                fontSize: '1.25rem',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                    : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  borderRadius: '2px'
                }
              }}>
                Market Segment Overview
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        fontWeight: 600, 
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
                        borderBottom: (theme) => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontSize: '0.875rem',
                        py: 2
                      }}>
                        Segment
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: 600,
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
                        borderBottom: (theme) => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontSize: '0.875rem',
                        py: 2
                      }}>
                        Buy Turnover
                      </TableCell>
                      <TableCell align="right" sx={{ 
                        fontWeight: 600,
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
                        borderBottom: (theme) => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontSize: '0.875rem',
                        py: 2
                      }}>
                        Sell Turnover
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontWeight: 600,
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1A2027',
                        borderBottom: (theme) => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontSize: '0.875rem',
                        py: 2
                      }}>
                        Active Users
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {segmentData.map((row) => (
                      <TableRow key={row.segment} sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.01)',
                        },
                      }}>
                        <TableCell component="th" scope="row" sx={{
                          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                          py: 2
                        }}>
                          <Chip 
                            label={row.segment} 
                            size="small"
                            sx={{ 
                              fontWeight: 600,
                              backgroundColor: (theme) => theme.palette.mode === 'dark' 
                                ? 'rgba(33, 150, 243, 0.1)'
                                : 'rgba(33, 150, 243, 0.05)',
                              color: '#2196f3',
                              height: 28,
                              '& .MuiChip-label': {
                                px: 2,
                                fontSize: '0.8125rem'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{
                          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                          py: 2,
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {row.buyTurnover}
                        </TableCell>
                        <TableCell align="right" sx={{
                          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                          py: 2,
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {row.sellTurnover}
                        </TableCell>
                        <TableCell align="center" sx={{
                          borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                          py: 2
                        }}>
                          <Chip 
                            label={row.activeUsers}
                            size="small"
                            sx={{ 
                              minWidth: '40px',
                              height: 28,
                              backgroundColor: (theme) => theme.palette.mode === 'dark' 
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(76, 175, 80, 0.05)',
                              color: '#4caf50',
                              fontWeight: 600,
                              '& .MuiChip-label': {
                                px: 1.5,
                                fontSize: '0.8125rem'
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: '16px',
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.02)'
              : '#fff',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.25)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            height: '100%',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.07)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                mb: 3.5, 
                fontWeight: 600, 
                fontSize: '1.25rem',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)'
                    : 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  borderRadius: '2px'
                }
              }}>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{
                        px: 0,
                        py: 2,
                        transition: 'all 0.2s',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: (theme) => theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.01)',
                          transform: 'translateX(4px)'
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '44px' }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            bgcolor: activity.avatarColor,
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: (theme) => theme.palette.mode === 'dark'
                              ? '0 2px 8px rgba(0, 0, 0, 0.25)'
                              : '0 2px 8px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {activity.avatar}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                              {activity.action}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="textSecondary" 
                              sx={{ 
                                fontSize: '0.75rem',
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(0, 0, 0, 0.03)',
                                px: 1,
                                py: 0.5,
                                borderRadius: '4px',
                                fontWeight: 500
                              }}
                            >
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography 
                            variant="body2" 
                            color="textSecondary" 
                            sx={{ 
                              fontSize: '0.875rem',
                              opacity: 0.8
                            }}
                          >
                            {activity.user} - {activity.details}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ 
                        ml: 0,
                        borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Wrap with ErrorBoundary for error handling
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  );
} 