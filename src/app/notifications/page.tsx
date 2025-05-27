'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tab,
  Tabs,
  CircularProgress,
  List
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationItem from '@/components/notifications/NotificationItem';
import { useNotifications } from '@/contexts/NotificationContext';
import { styled } from '@mui/material/styles';

// Styled components for a nicer look
const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  flex: 1,
  marginRight: theme.spacing(2)
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  minWidth: 100
}));

// Create a proper component for the notification list
interface NotificationListProps {
  notifications: any[];
  isLoading: boolean;
  emptyMessage: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, isLoading, emptyMessage }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (notifications.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <NotificationsOffIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography color="textSecondary">{emptyMessage}</Typography>
      </Box>
    );
  }
  
  return (
    <List sx={{ width: '100%' }}>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </List>
  );
};

const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, isLoading, markAllAsRead, fetchNotifications } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  
  // Add a ref to track if component is mounted
  const isMounted = useRef(true);
  
  // Create a safe fetch function that won't update state after unmount
  const safeFetchNotifications = useCallback(async () => {
    if (isMounted.current) {
      await fetchNotifications();
    }
  }, [fetchNotifications]);
  
  // Set up cleanup on component unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Fetch notifications only once on mount
  useEffect(() => {
    if (isMounted.current && !isLoading) {
      const timer = setTimeout(() => {
        safeFetchNotifications();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [safeFetchNotifications, isLoading]);
  
  // Handle tab change
  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);
  
  // Handle filters
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  const handleTypeChange = useCallback((e: any) => {
    setFilterType(e.target.value);
  }, []);
  
  const handlePriorityChange = useCallback((e: any) => {
    setFilterPriority(e.target.value);
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterType('all');
    setFilterPriority('all');
  }, []);

  // Filter notifications based on search, type, priority, and tab
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by notification type
      const matchesType = filterType === 'all' || notification.type === filterType;
      
      // Filter by priority
      const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
      
      // Filter by read/unread status based on current tab
      const matchesTab = 
        (tabValue === 0) || // ALL
        (tabValue === 1 && notification.status !== 'read') || // UNREAD
        (tabValue === 2 && notification.status === 'read'); // READ
      
      return matchesSearch && matchesType && matchesPriority && matchesTab;
    });
  }, [notifications, searchTerm, filterType, filterPriority, tabValue]);

  // Count notifications by tab
  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter(n => n.status !== 'read').length,
      read: notifications.filter(n => n.status === 'read').length
    };
  }, [notifications]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Notifications
        </Typography>
        
        {/* Tabs for ALL/UNREAD/READ */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
          centered
        >
          <StyledTab label={`ALL (${counts.all})`} />
          <StyledTab label={`UNREAD (${counts.unread})`} />
          <StyledTab label={`READ (${counts.read})`} />
        </Tabs>
        
        {/* Search and filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SearchBox>
            <SearchIcon color="action" sx={{ mr: 1 }} />
            <StyledInputBase
              placeholder="Search notifications"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBox>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="system">System</MenuItem>
                <MenuItem value="market">Market</MenuItem>
                <MenuItem value="trade">Trade</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="compliance">Compliance</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={handlePriorityChange}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              variant="text" 
              onClick={handleClearFilters}
              disabled={filterType === 'all' && filterPriority === 'all' && searchTerm === ''}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
        
        {/* Notification list based on current tab */}
        <NotificationList 
          notifications={filteredNotifications} 
          isLoading={isLoading} 
          emptyMessage={
            tabValue === 0 ? "You have no notifications" :
            tabValue === 1 ? "You have no unread notifications" :
            "You have no read notifications"
          }
        />
      </Paper>
    </Container>
  );
};

export default NotificationsPage; 