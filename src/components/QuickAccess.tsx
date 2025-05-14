'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  VpnKey as KeyIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface QuickAccessProps {
  showTitle?: boolean;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ showTitle = true }) => {
  const theme = useTheme();
  const router = useRouter();

  const quickLinks = [
    {
      title: 'Profile',
      icon: <ProfileIcon />,
      path: '/profile',
      color: '#2196F3', // Bright blue
      description: 'Update your profile',
    },
    {
      title: 'Login Password',
      icon: <LockIcon />,
      path: '/change-login-password',
      color: '#4CAF50', // Green
      description: 'Change login password',
    },
    {
      title: 'Transaction Password',
      icon: <KeyIcon />,
      path: '/change-transaction-password',
      color: '#FF5722', // Deep orange
      description: 'Change transaction password',
    },
    {
      title: 'Security',
      icon: <SecurityIcon />,
      path: '/security',
      color: '#FFC107', // Amber
      description: 'Security settings',
    },
    {
      title: 'Notifications',
      icon: <NotificationsIcon />,
      path: '/notifications',
      color: '#00BCD4', // Cyan
      description: 'Notification settings',
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
      color: '#9C27B0', // Purple
      description: 'All settings',
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {showTitle && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            fontSize: '1rem',
            color: theme => theme.palette.mode === 'dark' ? '#fff' : '#1A2027'
          }}
        >
          Quick Access
        </Typography>
      )}
      
      <Grid 
        container 
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {quickLinks.map((link) => (
          <Grid item xs={4} sm={2} key={link.title}>
            <Tooltip title={link.description} arrow placement="top">
              <Paper
                elevation={0}
                onClick={() => handleNavigate(link.path)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  background: theme => theme.palette.mode === 'dark' 
                    ? alpha(link.color, 0.1)
                    : alpha(link.color, 0.05),
                  border: '1px solid',
                  borderColor: theme => theme.palette.mode === 'dark'
                    ? alpha(link.color, 0.2)
                    : alpha(link.color, 0.1),
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: theme => theme.palette.mode === 'dark'
                      ? alpha(link.color, 0.2)
                      : alpha(link.color, 0.1),
                    borderColor: link.color,
                    '& .icon': {
                      color: link.color,
                      transform: 'scale(1.1)',
                    },
                    '& .title': {
                      color: link.color,
                    }
                  },
                }}
              >
                <Box
                  className="icon"
                  sx={{
                    color: theme => theme.palette.mode === 'dark' 
                      ? alpha(link.color, 0.8)
                      : link.color,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {React.cloneElement(link.icon, { 
                    sx: { fontSize: '1.75rem' } 
                  })}
                </Box>
                <Typography 
                  className="title"
                  variant="caption" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    color: theme => theme.palette.mode === 'dark' 
                      ? alpha(link.color, 0.8)
                      : 'text.secondary',
                    textAlign: 'center',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.title}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickAccess; 