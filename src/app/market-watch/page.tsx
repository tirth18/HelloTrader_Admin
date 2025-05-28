'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  IconButton,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fade,
  Grow,
  Tooltip,
  Badge,
  Avatar,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  FilterList as FilterIcon,
  ViewColumn as ViewColumnIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import io from 'socket.io-client';
import { API_BASE_URL } from '@/config';

export default function MarketWatchPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState(3);

  // WebSocket related states
  const [myScriptData, setMyscriptData] = useState<string[]>([]);
  const [totalScripts, setTotalScripts] = useState(0);
  const [activeClients, setActiveClients] = useState(71); 
  const [connected, setConnected] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const [newToken, setNewToken] = useState('');
  const [lastReceivedMessage, setLastReceivedMessage] = useState('');
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [stockData, setStockData] = useState<Record<string, any>>({});
  const [scriptIdMap, setScriptIdMap] = useState<Record<string, string>>({});
  const [loadingButtons, setLoadingButtons] = useState<Record<string, boolean>>({});
  const [isError, setIsError] = useState('');
  const [readyState, setReadyState] = useState(3); // Default to closed
  
  // Socket.IO connection reference
  const socketRef = useRef<any>(null);
  
  // Socket.IO endpoint 
  const socketUrl = 'ws://13.233.225.7:8080';
  
  // Fallback HTTP polling URL (for environments where WebSocket is blocked)
  const fallbackUrl = 'http://13.233.225.7:8080/api/data';
  
  // Polling interval reference for fallback mode
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  
  // Convert connection readyState to text for display
  const connectionStatus: Record<number, string> = {
    0: 'Connecting',
    1: 'Open',
    2: 'Closing',
    3: 'Closed',
    4: 'Fallback Mode' // Used when connection fails and we switch to HTTP polling
  };

  // WebSocket connection styles
  const statusDotStyle = {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '8px',
  };

  const connectedDotStyle = {
    ...statusDotStyle,
    backgroundColor: '#42B883', // Green
    boxShadow: '0 0 5px #42B883',
  };

  const disconnectedDotStyle = {
    ...statusDotStyle,
    backgroundColor: '#dc3545', // Red
    boxShadow: '0 0 5px #dc3545',
  };
  
  // Function to fetch and map script IDs
  const fetchScriptIds = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_BASE_URL}/api/Allscript`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      
      // Create a map of script names to their IDs
      const idMap: Record<string, string> = {};
      response.data.forEach((script: any) => {
        idMap[script.scriptname] = script._id;
      });
      
      setScriptIdMap(idMap);
      console.log("Script ID map updated:", idMap);
      return idMap;
    } catch (error) {
      console.error("Error fetching script IDs:", error);
      return {};
    }
  }, []);
  
  // Switch to fallback mode after multiple Socket.IO connection failures
  const switchToFallbackMode = useCallback(() => {
    console.log('Switching to fallback HTTP polling mode');
    setUseFallback(true);
    setConnected(true);
    setReadyState(4); // Custom state for fallback mode
    setIsError("");
    
    // Clear any existing polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
    
    // Display a message instead of mock data
    setStockData({
      'WEBSOCKET_DISCONNECTED': {
        name: 'Socket.IO Disconnected',
        bid: 0,
        ask: 0,
        ltp: 0,
        change: '0.0',
        high: 0,
        low: 0,
        status: 'INACTIVE'
      }
    });
  }, []);

  // Send subscription reference
  const sendSubscription = useCallback((symbol: string, instrumentToken: number) => {
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn('Cannot send subscription, connection not established');
      return false;
    }
    
    try {
      console.log(`Subscribing to instrument ${symbol} with token ${instrumentToken}`);
      
      // Send subscription with basic object
      const subscription = {
        "symbol": symbol,
        "instrument_token": instrumentToken
      };
      console.log('Sending subscription:', subscription);
      socketRef.current.emit('subscribe', subscription);
      
      console.log(`Successfully sent subscription request for ${symbol}`);
      return true;
    } catch (error) {
      console.error(`Error sending subscription for ${symbol}:`, error);
      return false;
    }
  }, []);

  // Function to get script data and subscribe
  const getMyPostData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE_URL}/api/Allscript`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      
      // Store the full script data with instrument tokens
      const scriptData = res.data;
      
      // Extract just the script names for the UI display
      const scripts = scriptData.map((script: any) => script.scriptname);
      setMyscriptData(scripts);
      setTotalScripts(scriptData.length);
      
      console.log(`Retrieved ${scriptData.length} scripts from API`);
      
      // Subscribe to all instruments with their actual instrument tokens
      if (socketRef.current && socketRef.current.connected && scriptData.length > 0) {
        console.log('Subscribing to all instruments with their tokens in batches of 10...');
        
        // Process scripts in batches of 10
        const BATCH_SIZE = 10;
        const processBatch = (startIndex: number) => {
          // Get the current batch (up to 10 scripts)
          const endIndex = Math.min(startIndex + BATCH_SIZE, scriptData.length);
          const currentBatch = scriptData.slice(startIndex, endIndex);
          
          console.log(`Processing batch ${startIndex / BATCH_SIZE + 1}: scripts ${startIndex + 1} to ${endIndex}`);
          
          // Process all scripts in this batch
          currentBatch.forEach((script: any) => {
            const instrumentToken = script.instrument_token;
            const scriptName = script.scriptname;
            
            console.log(`Subscribing to ${scriptName} with token ${instrumentToken}`);
            sendSubscription(scriptName, instrumentToken);
          });
          
          // Add placeholder entries for all scripts in this batch at once
          setStockData(prev => {
            const batchUpdates: Record<string, any> = {};
            
            currentBatch.forEach((script: any) => {
              const scriptName = script.scriptname;
              // Only add if it doesn't exist to prevent overwriting live data
              if (!prev[scriptName]) {
                batchUpdates[scriptName] = {
                  name: scriptName,
                  bid: 0,
                  ask: 0,
                  ltp: 0,
                  change: "0.0",
                  high: 0,
                  low: 0,
                  status: "PENDING"
                };
              }
            });
            
            // If we have any updates, return a new state object
            if (Object.keys(batchUpdates).length > 0) {
              return {
                ...prev,
                ...batchUpdates
              };
            }
            
            // Otherwise return the previous state unchanged
            return prev;
          });
          
          // Schedule the next batch if there are more scripts
          if (endIndex < scriptData.length) {
            setTimeout(() => {
              processBatch(endIndex);
            }, 500); // 500ms delay between batches
          }
        };
        
        // Start processing the first batch
        processBatch(0);
      } else {
        console.warn("Socket not connected, can't subscribe to instruments");
        if (!socketRef.current || !socketRef.current.connected) {
          setIsError("Socket.IO not connected. Please connect first to get live data.");
        }
      }
      
      return scriptData;
    } catch (error: any) {
      console.error("Error fetching script data:", error);
      setIsError(`Error fetching scripts: ${error.message}`);
      throw error;
    }
  }, [sendSubscription]);

  // Process WebSocket messages - prevents blinking by handling updates carefully
  const processWebSocketMessage = useCallback((data: any) => {
    try {
      // Get instrument name from the response - prioritize instrumentName
      let instrumentName = data.instrumentName || data.symbol;
      
      // If we can't determine the instrument name, log and return
      if (!instrumentName) {
        console.log('Message does not contain instrument data:', data);
        return;
      }
      
      // Extract numeric values safely
      const extractNumber = (value: any) => {
        if (value === undefined || value === null) return 0;
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
          const parsed = parseFloat(value);
          return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
      };
      
      // Update the stock data with fields from the response
      setStockData(prev => {
        const existingData = prev[instrumentName];
        
        // Only update if data has actually changed
        const newData = {
          name: instrumentName,
          bid: extractNumber(data.bid),
          ask: extractNumber(data.ask),
          ltp: extractNumber(data.ltp),
          change: data.change !== null ? parseFloat(extractNumber(data.change).toFixed(2)) : existingData?.change || 0,
          high: extractNumber(data.high || existingData?.high || 0),
          low: extractNumber(data.low || existingData?.low || 0),
          status: "ACTIVE",
          exchange: data.exchange || existingData?.exchange || "",
          instrumentToken: data.instrumentToken || existingData?.instrumentToken
        };

        // Check if the data has actually changed
        if (existingData && 
            existingData.bid === newData.bid &&
            existingData.ask === newData.ask &&
            existingData.ltp === newData.ltp &&
            existingData.change === newData.change &&
            existingData.high === newData.high &&
            existingData.low === newData.low) {
          return prev; // Return previous state if nothing changed
        }
        
        // Create a new object only if data has changed
        return {
          ...prev,
          [instrumentName]: newData
        };
      });
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
      console.error('Data that caused the error:', data);
    }
  }, []);
  
  // Try all connection methods for Socket.IO
  const tryAllConnectionMethods = useCallback(() => {
    console.log("Trying connection methods");
    
    // Prevent multiple connection attempts
    if (socketRef.current?.connected) {
      console.log("Socket is already connected");
      return;
    }
    
    let attemptCount = 0;
    let connectionSuccess = false;
    
    const attemptConnection = () => {
      if (connectionSuccess) return; // Don't attempt if already connected
      
      attemptCount++;
      console.log(`Connection attempt ${attemptCount}`);
      
      try {
        // Close any existing connection
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
        
        setReadyState(0); // Connecting
        
        // Set connection timeout
        const timeout = setTimeout(() => {
          if (!connectionSuccess) {
            console.log(`Connection attempt ${attemptCount} timed out`);
            
            // Try next method if we have more attempts left
            if (attemptCount < 3 && !connectionSuccess) {
              attemptConnection();
            } else if (!connectionSuccess) {
              // Switch to fallback mode if all attempts fail
              switchToFallbackMode();
            }
          }
        }, 5000);
        
        // Socket.IO connection options
        const options = {
          transports: attemptCount === 1 ? ['websocket'] : ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 5000,
          autoConnect: true,
          forceNew: true
        };
        
        console.log(`Attempt ${attemptCount} options:`, options);
        
        // Create Socket.IO connection
        const socket = io(socketUrl, options);
        console.log("Socket created:", socket);
        socketRef.current = socket;
        
        // Connection events
        socket.on('connect', () => {
          console.log(`Socket.IO connected successfully on attempt ${attemptCount}`);
          clearTimeout(timeout);
          connectionSuccess = true;
          
          setConnected(true);
          setReadyState(1);
          setIsError("");
          
          // Subscribe to all instruments when connected
          console.log("Connected to Socket.IO, subscribing to all instruments");
          getMyPostData().catch(error => {
            console.error('Error subscribing to instruments on connection:', error);
          });
        });
        
        // Set up event listeners for data
        socket.on('priceUpdate', (data: any) => {
          console.log('Received priceUpdate event:', data);
          setLastReceivedMessage(JSON.stringify(data, null, 2));
          processWebSocketMessage(data);
        });
        
        socket.on('error', (error: any) => {
          console.error(`Socket.IO error on attempt ${attemptCount}:`, error);
          setIsError(`Socket.IO error: ${error.message || 'Unknown error'}`);
        });
        
        socket.on('disconnect', (reason: string) => {
          console.log(`Socket.IO disconnected on attempt ${attemptCount}: ${reason}`);
          setConnected(false);
          setReadyState(3);
          setIsError(`Socket.IO disconnected: ${reason}`);
          
          if (!connectionSuccess) {
            if (attemptCount < 3) {
              attemptConnection();
            } else {
              switchToFallbackMode();
            }
          }
        });
        
      } catch (error) {
        console.error(`Exception on Socket.IO attempt ${attemptCount}:`, error);
        
        if (attemptCount < 3 && !connectionSuccess) {
          attemptConnection();
        } else {
          switchToFallbackMode();
        }
      }
    };
    
    // Start the first attempt
    attemptConnection();
  }, [socketUrl, switchToFallbackMode, getMyPostData, processWebSocketMessage]);

  // Function to subscribe to all available instruments
  const subscribeToAllInstruments = useCallback(() => {
    try {
      if (!socketRef.current || !socketRef.current.connected) {
        setIsError("Socket.IO not connected. Please connect first.");
        console.log('Socket.IO not connected, attempting to connect...');
        tryAllConnectionMethods();
        
        // Set a timeout to try subscription after connection attempt
        setTimeout(() => {
          if (socketRef.current && socketRef.current.connected) {
            console.log("Now connected, subscribing to all instruments");
            getMyPostData().catch(error => {
              console.error('Error subscribing to all instruments:', error);
              setIsError(`Failed to subscribe: ${error.message}`);
            });
          } else {
            console.warn('Still not connected after connection attempt');
            setIsError("Could not connect to Socket.IO server");
          }
        }, 2000);
        
        return;
      }
      
      // If already connected, subscribe to all instruments
      console.log("Socket already connected, subscribing to all instruments");
      getMyPostData().catch(error => {
        console.error('Error subscribing to all instruments:', error);
        setIsError(`Failed to subscribe: ${error.message}`);
      });
    } catch (error: any) {
      console.error("Error in subscribeToAllInstruments:", error);
      setIsError(`Error: ${error.message}`);
    }
  }, [tryAllConnectionMethods]);

  const getActiveClients = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE_URL}/api/clients/active`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setActiveClients(res.data.count || 0);
    } catch (error) {
      console.error("Error fetching active clients:", error);
    }
  }, []);

  /**
   * Handles the "Add to Ban" button click for a script
   */
  const handleAddToBan = useCallback(async (scriptCode: string) => {
    try {
      // Set loading state for this button
      setLoadingButtons(prev => ({ ...prev, [scriptCode]: true }));
      
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error. Please log in again.");
        return;
      }
      
      // Get the script ID from our map
      const scriptId = scriptIdMap[scriptCode];
      if (!scriptId) {
        console.error("Script ID not found for:", scriptCode);
        alert(`Error: Could not find ID for script "${scriptCode}"`);
        return;
      }
      
      console.log(`Attempting to ban script "${scriptCode}" with ID ${scriptId}`);
      
      // Make the API call to update the script as banned
      const response = await axios.put(
        `${API_BASE_URL}/api/updatescript/${scriptId}`,
        { isBan: true },
        {
          headers: { Authorization: `${token}` },
        }
      );
      
      // Check if the response was successful
      if (response.status === 200 || response.status === 201) {
        console.log(`SUCCESS: Script "${scriptCode}" with ID ${scriptId} has been banned`);
        console.log("Response data:", response.data);
        
        // Show a success message
        alert(`Script "${scriptCode}" has been banned successfully`);
      } else {
        console.error("Unexpected response from server:", response);
        alert(`Error banning script "${scriptCode}". Please try again.`);
      }
      
    } catch (error: any) {
      console.error("Error banning script:", error.response?.data || error.message || error);
      alert(`Error banning script "${scriptCode}": ${error.response?.data?.message || error.message || "Unknown error"}`);
    } finally {
      // Reset loading state
      setLoadingButtons(prev => ({ ...prev, [scriptCode]: false }));
    }
  }, [scriptIdMap]);

  // Update search handler to maintain compatibility with both implementations
  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Update WebSocket search results will happen in the useEffect
  }, []);

  // Handle refresh with debouncing to prevent excessive updates
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Initial setup effect - runs only once
  useEffect(() => {
    // Prevent setup if already connected
    if (socketRef.current?.connected) {
      console.log("Socket is already connected, skipping setup");
      return;
    }

    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    // Initial connection attempt
    if (!useFallback) {
      tryAllConnectionMethods();
    }
    
    // Fetch script IDs
    fetchScriptIds();
    
    // Cleanup on component unmount
    return () => {
      clearTimeout(timer);
      
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
      
      if (socketRef.current) {
        console.log('Disconnecting Socket.IO on unmount');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [useFallback, tryAllConnectionMethods, fetchScriptIds]);
  
  // Derived filteredResults for table rendering
  const filteredResults = useMemo(() => {
    if (!searchQuery) return Object.keys(stockData);
    return Object.keys(stockData).filter(code =>
      stockData[code]?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stockData]);

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: '1600px',
      margin: '0 auto',
      bgcolor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.background.default, 0.8)
        : alpha(theme.palette.background.paper, 0.8),
      minHeight: '100vh',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
        zIndex: 0,
        pointerEvents: 'none'
      }
    }}>
      {/* Header Section */}
      <Fade in timeout={500}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 3,
          p: 3,
          borderRadius: 3,
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.8)
            : 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ 
              p: 2,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                pointerEvents: 'none'
              }
            }}>
              <BarChartIcon sx={{ 
                fontSize: 40,
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }} />
            </Box>
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Market Watch
              </Typography>
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <TextField
                placeholder="Search scrips..."
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: { xs: '100%', sm: 300 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius * 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 1,
                      }
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          transition: 'all 0.2s ease-in-out',
                        }} 
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh Data">
                <IconButton 
                  onClick={() => {
                    handleRefresh();
                    if (connected) {
                      getMyPostData().catch(err => console.error("Error refreshing data:", err));
                    } else {
                      tryAllConnectionMethods();
                    }
                  }}
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'rotate(180deg)',
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <RefreshIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <Badge badgeContent={notifications} color="error">
                  <IconButton sx={{ p: 2 }}>
                    <NotificationsIcon sx={{ fontSize: '1.5rem' }} />
                  </IconButton>
                </Badge>
              </Tooltip>
              <Tooltip title="More Options">
                <IconButton sx={{ p: 2 }}>
                  <MoreVertIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Active Clients & Info */}
        <Fade in timeout={800}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 'medium',
                fontSize: { xs: '1.1rem', sm: '1.3rem' }
              }}>
                Active Clients:
              </Typography>
              <Chip 
                label={activeClients} 
                color="primary" 
                size="medium"
                sx={{ 
                  fontWeight: 'bold',
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  fontSize: { xs: '1.1rem', sm: '1.2rem' },
                  height: '36px',
                  '& .MuiChip-label': {
                    px: 2
                  }
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}>
            {Object.keys(stockData).length > 0 ? 
              `Showing ${filteredResults.length} of ${totalScripts || Object.keys(stockData).length} scrips` :
              "No data available"
            }
            </Typography>
          </Box>
        </Fade>
      
      {/* Connection Status Message */}
      {isError && (
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          bgcolor: alpha(theme.palette.error.main, 0.1), 
          color: theme.palette.error.main,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`
        }}>
          <Typography>{isError}</Typography>
      </Box>
      )}
      
      {/* Table Section - Only WebSocket Data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Fade in timeout={1000}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              bgcolor: theme.palette.background.paper,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`,
                pointerEvents: 'none',
                zIndex: 0
              }
            }}
          >
            <Table aria-label="market watch table">
              <TableHead>
                <TableRow sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.2)
                    : theme.palette.primary.main,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                  }
                }}>
                  <TableCell sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Script Name</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Bid</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Ask</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>LTP</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Change</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>High</TableCell>
                  <TableCell align="right" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Low</TableCell>
                  <TableCell align="center" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Exchange</TableCell>
                  <TableCell align="center" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* WebSocket Data (if available) - Only showing real-time data */}
                {Object.keys(stockData).length > 0 ? (
                  filteredResults.length > 0 ? (
                    filteredResults.map((scriptCode) => {
                      const stock = stockData[scriptCode];
                      if (!stock) return null;
                      
                      // For fallback mode message
                      if (scriptCode === 'WEBSOCKET_DISCONNECTED') {
                        return (
                          <TableRow key={scriptCode}>
                            <TableCell colSpan={9} align="center">
                              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h6" color="error">
                                  Disconnected - Please reconnect to see live market data
                                </Typography>
                                <Button 
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setUseFallback(false);
                                    setConnectionAttempts(0);
                                    tryAllConnectionMethods();
                                  }}
                                  sx={{ mt: 1 }}
                                >
                                  Connect to Live Data
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                      
                      return (
                        <TableRow 
                          key={scriptCode} 
                          hover
                          sx={{ 
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            }
                          }}
                        >
                          <TableCell sx={{ 
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }}>{stock.name}</TableCell>
                          <TableCell align="right" sx={{ 
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }}>{stock.bid}</TableCell>
                          <TableCell align="right" sx={{ 
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }}>{stock.ask}</TableCell>
                          <TableCell align="right" sx={{ 
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }}>{stock.ltp}</TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              color: parseFloat(stock.change) >= 0 ? 'success.main' : 'error.main',
                              fontWeight: 'bold',
                              fontSize: '1.1rem'
                            }}
                          >
                            {stock.change !== null ? (
                              parseFloat(stock.change) >= 0 
                                ? `+${parseFloat(stock.change).toFixed(2)}` 
                                : parseFloat(stock.change).toFixed(2)
                            ) : '-'}
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.1rem' }}>
                            {stock.high || '-'}
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.1rem' }}>
                            {stock.low || '-'}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '1.1rem' }}>
                            {stock.exchange || '-'}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              disabled={loadingButtons[scriptCode]}
                              onClick={() => handleAddToBan(scriptCode)}
                              sx={{ 
                                fontSize: '0.7rem',
                                p: '4px 8px',
                                minWidth: '80px'
                              }}
                            >
                              {loadingButtons[scriptCode] ? (
                                <>
                                  <CircularProgress size={14} color="inherit" sx={{ mr: 1 }} />
                                  Banning...
                                </>
                              ) : (
                                "ADD TO BAN"
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography>No matches found for "{searchQuery}"</Typography>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  // No data available
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6">
                          {connected ? 'Loading market data...' : 'No market data available'}
                        </Typography>
                        {!connected && (
                          <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setUseFallback(false);
                              setConnectionAttempts(0);
                              tryAllConnectionMethods();
                            }}
                            sx={{ mt: 1 }}
                          >
                            Connect to Live Data
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Fade>
      )}
    </Box>
  );
} 