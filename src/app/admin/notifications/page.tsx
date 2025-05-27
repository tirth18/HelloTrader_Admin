'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const NotificationsPage = () => {
  const theme = useTheme();
  
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'Information',
    target: 'All Users',
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      message: 'System will be under maintenance on Sunday, 2:00 AM IST',
      type: 'info',
      timestamp: '2024-03-20 10:30:00',
    },
    {
      id: 2,
      title: 'New Feature Released',
      message: 'Check out our new market analysis tools!',
      type: 'success',
      timestamp: '2024-03-19 15:45:00',
    },
  ]);

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setNotificationData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(notificationData);
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#0A1929',
      color: '#fff',
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: '16px 24px',
      }}>
        <NotificationsIcon 
          sx={{ 
            color: '#2196F3',
            fontSize: '24px'
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#fff',
            fontWeight: 500,
            fontSize: '20px',
          }}
        >
          Notifications
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        p: '0 24px 24px',
        flex: 1,
      }}>
        {/* Left Panel - Send New Notification */}
        <Box sx={{
          flex: 1,
          bgcolor: '#132F4C',
          borderRadius: 1,
          p: 2.5,
        }}>
          <Typography variant="subtitle1" sx={{ mb: 2.5, color: '#fff', fontWeight: 500 }}>
            Send New Notification
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              fullWidth
              placeholder="Title"
              value={notificationData.title}
              onChange={handleInputChange('title')}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196F3',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Message"
              multiline
              rows={4}
              value={notificationData.message}
              onChange={handleInputChange('message')}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196F3',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <Select
                  value={notificationData.type}
                  onChange={handleInputChange('type')}
                  displayEmpty
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3',
                    },
                    '& .MuiSelect-select': {
                      color: '#fff',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  <MenuItem value="Information">Information</MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="Error">Error</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  value={notificationData.target}
                  onChange={handleInputChange('target')}
                  displayEmpty
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3',
                    },
                    '& .MuiSelect-select': {
                      color: '#fff',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
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
                bgcolor: '#2196F3',
                color: '#fff',
                px: 3,
                py: 1,
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#1976D2',
                },
              }}
            >
              Send Notification
            </Button>
          </form>
        </Box>

        {/* Right Panel - Recent Notifications */}
        <Box sx={{
          flex: 1,
          bgcolor: '#132F4C',
          borderRadius: 1,
          p: 2.5,
        }}>
          <Typography variant="subtitle1" sx={{ mb: 2.5, color: '#fff', fontWeight: 500 }}>
            Recent Notifications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: '#2196F3',
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    {notification.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 0.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {notification.timestamp}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleDelete(notification.id)}
                  size="small"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    p: 0.5,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: '#f44336',
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
};

export default NotificationsPage; 