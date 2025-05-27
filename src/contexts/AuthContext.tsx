'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

// Update user interface to match the API response
interface User {
  id: number;
  username: string;
  // Add any other fields that come from your API
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => Promise<string>;
  clearError: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => false,
  logout: () => {},
  getToken: async () => '',
  clearError: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return; // Skip on server-side
      }

      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage on init:', token);
        
        if (!token) {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Get user data from localStorage if available
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);
            console.log('User loaded from localStorage:', parsedUser);
            return;
          } catch (parseError) {
            console.error('Failed to parse user data:', parseError);
            // Continue to API fetch if parsing fails
          }
        }

        // If no user data in localStorage or parsing failed, fetch from API
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/me`, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        const apiUserData = response.data.user;
        setUser(apiUserData);
        localStorage.setItem('user', JSON.stringify(apiUserData));
        setIsAuthenticated(true);
        console.log('User fetched from API:', apiUserData);
      } catch (err) {
        console.error('Failed to load user:', err);
        
        // Don't remove token on error, just set auth state to false
        setUser(null);
        setIsAuthenticated(false);
        setError('Session expired. Please login again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/login`,
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const { token, user } = response.data;
      console.log('Login successful, received token and user data');
      
      // Store auth data in localStorage - use try/catch to handle potential storage issues
      try {
        localStorage.setItem('token', token);
        console.log('Token stored in localStorage:', token ? 'Success' : 'Failed');
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          console.log('User data stored in localStorage');
        }
      } catch (storageError) {
        console.error('Error storing auth data in localStorage:', storageError);
      }
      
      // Update state
      setUser(user);
      setIsAuthenticated(true);
      
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to login page
    router.push('/login');
  }, [router]);

  // Get token function - updated to return a Promise for consistency
  const getToken = useCallback(async () => {
    if (typeof window === 'undefined') {
      return '';
    }
    
    return localStorage.getItem('token') || '';
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        getToken,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 