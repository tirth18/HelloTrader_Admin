import React, { useState, useCallback } from 'react';
import {
  Badge,
  IconButton,
  Popover,
  List,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/contexts/NotificationContext';

const NotificationBell: React.FC = () => {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  
  // Only show 5 most recent notifications in the popover
  const recentNotifications = notifications.slice(0, 5);
  
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead();
    // Don't close the popover automatically
  }, [markAllAsRead]);
  
  const handleNotificationClick = useCallback((id: number) => {
    markAsRead(id);
    // You could add navigation here if notifications have links
  }, [markAsRead]);
  
  const handleViewAll = useCallback(() => {
    router.push('/notifications');
    setAnchorEl(null);
  }, [router]);

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="notifications"
        onClick={handleClick}
        data-testid="notification-bell"
      >
        <Badge badgeContent={unreadCount} color="error" overlap="circular">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            width: '350px',
            maxHeight: '500px',
          },
        }}
      >
        <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </Typography>
          {unreadCount > 0 && (
            <Button 
              size="small" 
              onClick={handleMarkAllAsRead}
              variant="text"
              color="primary"
            >
              Mark all as read
            </Button>
          )}
        </Box>
        
        <Divider />
        
        {recentNotifications.length > 0 ? (
          <List sx={{ p: 0, maxHeight: '400px', overflow: 'auto' }}>
            {recentNotifications.map((notification) => (
              <Box 
                key={notification.id} 
                sx={{ 
                  p: 2, 
                  bgcolor: notification.status === 'read' ? 'inherit' : 'action.hover',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer'
                }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <Typography variant="subtitle2" component="div">
                  {notification.title}
                </Typography>
                {notification.message && (
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  {format(new Date(notification.created_at), 'MMM dd, yyyy HH:mm')}
                </Typography>
              </Box>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="textSecondary">
              No notifications
            </Typography>
          </Box>
        )}
        
        <Divider />
        
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Button 
            size="small" 
            color="primary"
            onClick={handleViewAll}
          >
            View all notifications
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell; 