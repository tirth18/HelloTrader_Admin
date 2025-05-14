'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Types
export interface Notification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  status: string;
  metadata?: Record<string, any>;
  created_at: string;
  sent_at?: string;
  read_at?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  sendNotification: (notification: any) => Promise<void>;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  fetchNotifications: async () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  sendNotification: async () => {},
  clearNotifications: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  // Add mounted ref to prevent state updates after unmount
  const isMounted = useRef(true);
  
  const { user, isAuthenticated, getToken } = useAuth();
  const router = useRouter();

  // Add cleanup function for component unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Connect to WebSocket for real-time notifications
  useEffect(() => {
    if (!isAuthenticated || !user || typeof window === 'undefined' || !isMounted.current) return;
    
    // Close any existing connections
    if (socket) {
      socket.close();
    }
    
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${wsProtocol}://${window.location.host}/api/ws/notifications`;
    const newSocket = new WebSocket(wsUrl);
    
    newSocket.onopen = async () => {
      // Authenticate with token
      const token = await getToken();
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.send(JSON.stringify({ token }));
        console.log('WebSocket connection established');
      }
    };
    
    newSocket.onmessage = (event) => {
      if (!isMounted.current) return;
      
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'notification') {
          // Add new notification to state
          setNotifications(prev => [data.data, ...prev]);
          // Update unread count
          if (data.data.status !== 'read') {
            setUnreadCount(prev => prev + 1);
          }
        }
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    };
    
    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    setSocket(newSocket);
    
    // Clean up on unmount
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [isAuthenticated, user, getToken]);

  // Generate mock notifications for development
  const generateMockNotifications = useCallback((): Notification[] => {
    const now = new Date();
    return [
      {
        id: 1,
        type: "warning",
        priority: "high",
        title: "Margin Call Alert",
        message: "Your account is approaching margin call threshold",
        status: "unread",
        created_at: new Date(now.getTime() - 10 * 60000).toISOString(),
      },
      {
        id: 2,
        type: "info",
        priority: "medium",
        title: "System Update",
        message: "System maintenance scheduled for tonight at 2AM UTC",
        status: "read",
        created_at: new Date(now.getTime() - 3 * 3600000).toISOString(),
        read_at: new Date(now.getTime() - 2 * 3600000).toISOString(),
      },
      {
        id: 3,
        type: "error",
        priority: "high",
        title: "API Connection Error",
        message: "External price feed connection interrupted",
        status: "unread",
        created_at: new Date(now.getTime() - 25 * 60000).toISOString(),
      },
      {
        id: 4,
        type: "success",
        priority: "low",
        title: "Batch Process Complete",
        message: "Daily settlement process completed successfully",
        status: "unread",
        created_at: new Date(now.getTime() - 1 * 3600000).toISOString(),
      },
      {
        id: 5,
        type: "info",
        priority: "medium",
        title: "New Trade Feature",
        message: "Check out our new advanced charting tools",
        status: "unread",
        created_at: new Date(now.getTime() - 6 * 3600000).toISOString(),
      },
    ];
  }, []);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated || !isMounted.current) return;
    
    // Prevent duplicate calls if already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In development, use mock data
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (isMounted.current) {
          const mockNotifications = generateMockNotifications();
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => n.status !== 'read').length);
          setIsLoading(false);
        }
        return;
      }
      
      const token = await getToken();
      const response = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Check if component is still mounted before updating state
      if (isMounted.current) {
        setNotifications(response.data);
        setUnreadCount(response.data.filter((n: Notification) => n.status !== 'read').length);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.response?.data?.detail || 'Failed to fetch notifications');
        console.error('Error fetching notifications:', err);
        
        // In case of error in development, still show mock data
        if (process.env.NODE_ENV === 'development') {
          const mockNotifications = generateMockNotifications();
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => n.status !== 'read').length);
        }
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, getToken, isLoading, generateMockNotifications]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: number) => {
    if (!isAuthenticated || !isMounted.current) return;
    
    try {
      // In development, directly update state without API call
      if (process.env.NODE_ENV === 'development') {
        // Update local state
        if (isMounted.current) {
          setNotifications(prev => 
            prev.map(notification => 
              notification.id === id 
                ? { ...notification, status: 'read', read_at: new Date().toISOString() } 
                : notification
            )
          );
          
          // Update unread count
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        return;
      }
      
      const token = await getToken();
      await axios.put(`/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      if (isMounted.current) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === id 
              ? { ...notification, status: 'read', read_at: new Date().toISOString() } 
              : notification
          )
        );
        
        // Update unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.response?.data?.detail || `Failed to mark notification ${id} as read`);
        console.error('Error marking notification as read:', err);
      }
    }
  }, [isAuthenticated, getToken]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!isAuthenticated || !isMounted.current) return;
    
    try {
      // In development, directly update state without API call
      if (process.env.NODE_ENV === 'development') {
        // Update local state
        if (isMounted.current) {
          setNotifications(prev => 
            prev.map(notification => ({ 
              ...notification, 
              status: 'read', 
              read_at: new Date().toISOString() 
            }))
          );
          
          // Reset unread count
          setUnreadCount(0);
        }
        return;
      }
      
      const token = await getToken();
      await axios.put('/api/notifications/read-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      if (isMounted.current) {
        setNotifications(prev => 
          prev.map(notification => ({ 
            ...notification, 
            status: 'read', 
            read_at: new Date().toISOString() 
          }))
        );
        
        // Reset unread count
        setUnreadCount(0);
      }
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.response?.data?.detail || 'Failed to mark all notifications as read');
        console.error('Error marking all notifications as read:', err);
      }
    }
  }, [isAuthenticated, getToken]);

  // Send a notification (admin only)
  const sendNotification = useCallback(async (notification: any) => {
    if (!isAuthenticated || !isMounted.current) return;
    
    try {
      // In development, directly update state without API call
      if (process.env.NODE_ENV === 'development') {
        // Create a new mock notification
        const newNotification: Notification = {
          id: Date.now(), // Use timestamp as ID for mock
          type: notification.type || 'info',
          priority: notification.priority || 'medium',
          title: notification.title,
          message: notification.message,
          status: 'unread',
          created_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
        };
        
        // Add to notifications state
        if (isMounted.current) {
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
        
        return;
      }
      
      const token = await getToken();
      await axios.post('/api/notifications', notification, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err: any) {
      if (isMounted.current) {
        setError(err.response?.data?.detail || 'Failed to send notification');
        console.error('Error sending notification:', err);
      }
      throw err;
    }
  }, [isAuthenticated, getToken]);

  // Clear notifications (local only)
  const clearNotifications = useCallback(() => {
    if (isMounted.current) {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, []);

  // Load notifications on initial mount and authentication change
  useEffect(() => {
    // Prevent immediate fetchNotifications call
    let timer: NodeJS.Timeout;
    
    if (isAuthenticated && isMounted.current) {
      // Add delay to avoid React 18 double effect calls causing loops
      timer = setTimeout(() => {
        if (isMounted.current && notifications.length === 0 && !isLoading) {
          fetchNotifications();
        }
      }, 100);
    } else if (isMounted.current) {
      clearNotifications();
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated, fetchNotifications, clearNotifications, notifications.length, isLoading]);

  const value = {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    sendNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext; 