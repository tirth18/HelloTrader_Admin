'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const demoNotifications = [
  {
    id: 1,
    title: 'System Maintenance',
    message: 'System will be under maintenance on Sunday, 2:00 AM IST',
    timestamp: '2024-03-20 10:30:00',
  },
  {
    id: 2,
    title: 'New Feature Released',
    message: 'Check out our new market analysis tools!',
    timestamp: '2024-03-19 15:45:00',
  },
];

export default function NotificationsPage() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(demoNotifications);
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'Information',
    target: 'All Users',
  });

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    setNotificationData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationData({
      title: '',
      message: '',
      type: 'Information',
      target: 'All Users',
    });
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Box
      sx={{
      minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : '#f4f6fb',
        p: { xs: 1, sm: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
          sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {/* Form Box */}
        <Box
          sx={{ 
            flex: 1,
            bgcolor: theme.palette.mode === 'dark' ? '#16213e' : '#fff',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, md: 0 },
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 32px 0 rgba(0,0,0,0.7)'
              : '0 4px 32px 0 rgba(0,0,0,0.08)',
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NotificationsIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: 28,
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: theme.palette.text.primary, flex: 1 }}
        >
          Notifications
        </Typography>
      </Box>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            sx={{ mb: 2, color: theme.palette.text.secondary }}
          >
            Send New Notification
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}
          >
            <TextField
              fullWidth
              placeholder="Title"
              value={notificationData.title}
              onChange={handleInputChange('title')}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              placeholder="Message"
              multiline
              rows={3}
              value={notificationData.message}
              onChange={handleInputChange('message')}
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={notificationData.type}
                  onChange={handleInputChange('type')}
                >
                  <MenuItem value="Information">Information</MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="Error">Error</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <Select
                  value={notificationData.target}
                  onChange={handleInputChange('target')}
                >
                  <MenuItem value="All Users">All Users</MenuItem>
                  <MenuItem value="Active Users">Active Users</MenuItem>
                  <MenuItem value="Premium Users">Premium Users</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SendIcon />}
              sx={{
                alignSelf: 'flex-start',
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                fontSize: 16,
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Send Notification
            </Button>
          </Box>
        </Box>

        {/* Notification List Box */}
        <Box
          sx={{
          flex: 1,
            bgcolor: theme.palette.mode === 'dark' ? '#16213e' : '#fff',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 32px 0 rgba(0,0,0,0.7)'
              : '0 4px 32px 0 rgba(0,0,0,0.08)',
            minWidth: 0,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={500}
            sx={{ mb: 2, color: theme.palette.text.secondary }}
          >
            Recent Notifications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(0,0,0,0.01)',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  border: `1px solid ${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.08)'
                  }`,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(0,0,0,0.03)',
                  },
                }}
              >
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={600}
                    sx={{ 
                      color: theme.palette.primary.main,
                      mb: 0.5,
                    }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      mb: 0.5,
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.text.disabled,
                    }}
                  >
                    {notification.timestamp}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleDelete(notification.id)}
                  size="small"
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(0,0,0,0.3)',
                    p: 0.5,
                    ml: 1,
                    '&:hover': {
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.08)',
                      color: theme.palette.error.main,
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 