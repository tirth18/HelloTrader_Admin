import React, { useCallback, useMemo, memo } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Box,
  Chip,
  Tooltip,
  Paper
} from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Notifications as NotificationsIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  LocalFireDepartment as PriorityIcon
} from '@mui/icons-material';
import { Notification } from '@/contexts/NotificationContext';
import { useNotifications } from '@/contexts/NotificationContext';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

// Simplified presentation component for notifications
const NotificationItem = memo(({ notification, onClose }: NotificationItemProps) => {
  const { markAsRead } = useNotifications();
  const isRead = notification.status === 'read';
  
  // Create memoized icons outside render function to avoid recreation
  const iconByType = useMemo(() => {
    switch (notification.type?.toLowerCase() || 'system') {
      case 'security':
      case 'compliance':
        return <ErrorIcon color="error" />;
      case 'market':
        return <InfoIcon color="info" />;
      case 'trade':
        return <WarningIcon color="warning" />;
      case 'system':
        return <CheckCircleIcon color="success" />;
      default:
        return <NotificationsIcon color="action" />;
    }
  }, [notification.type]);
  
  const priorityColor = useMemo(() => {
    switch (notification.priority?.toLowerCase() || 'medium') {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  }, [notification.priority]);
  
  const handleRead = useCallback(() => {
    if (!isRead) {
      markAsRead(notification.id);
    }
    
    if (onClose) {
      onClose();
    }
    
    // Handle navigation based on metadata if needed
    if (notification.metadata?.link) {
      window.location.href = notification.metadata.link;
    }
  }, [isRead, markAsRead, notification.id, notification.metadata?.link, onClose]);
  
  // Pre-compute formatted date to avoid function call in render
  const formattedDate = useMemo(() => {
    const date = new Date(notification.created_at);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 7) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM dd, yyyy HH:mm');
    }
  }, [notification.created_at]);
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 1.5, 
        borderRadius: 1,
        backgroundColor: isRead ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
        border: '1px solid',
        borderColor: isRead ? 'divider' : 'primary.main',
        overflow: 'hidden'
      }}
    >
      <ListItem disablePadding>
        <ListItemButton onClick={handleRead} sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {iconByType}
          </ListItemIcon>
          
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="subtitle1" component="span" fontWeight={isRead ? 400 : 500}>
                  {notification.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {notification.priority && notification.priority.toLowerCase() !== 'low' && (
                    <Tooltip title={`Priority: ${notification.priority}`}>
                      <Chip 
                        size="small"
                        label={notification.priority} 
                        color={priorityColor as any}
                        sx={{ height: '20px' }}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>
            }
            secondary={
              <>
                {notification.message && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block', mb: 0.5 }}
                  >
                    {notification.message}
                  </Typography>
                )}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {formattedDate}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}, (prevProps, nextProps) => {
  // Custom equality function to prevent unnecessary re-renders
  return (
    prevProps.notification.id === nextProps.notification.id &&
    prevProps.notification.status === nextProps.notification.status &&
    prevProps.notification.title === nextProps.notification.title &&
    prevProps.notification.message === nextProps.notification.message &&
    prevProps.notification.created_at === nextProps.notification.created_at
  );
});

NotificationItem.displayName = 'NotificationItem';

export default NotificationItem; 