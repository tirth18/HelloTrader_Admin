'use client';

import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
  Collapse,
  ListItemButton,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  ShowChart as ShowChartIcon,
  AccountBalance as AccountBalanceIcon,
  Payment as PaymentIcon,
  AccountBox as AccountBoxIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  PieChart as PieChartIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Article as ArticleIcon,
  MonetizationOn as MonetizationOnIcon,
  Tune as TuneIcon,
  PlaylistAdd as PlaylistAddIcon,
  CreditCard as CreditCardIcon,
  FormatListBulleted as FormatListBulletedIcon,
  CardTravel as CardTravelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ListAlt as ListAltIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { useThemeContext } from '@/contexts/ThemeContext';

type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Auto Scrip Config', icon: <PlaylistAddIcon />, path: '/auto-scrip-config' },
  { text: 'Action Ledger', icon: <ArticleIcon />, path: '/action-ledger' },
  { text: 'Trading Clients', icon: <PeopleIcon />, path: '/trading-clients' },
  { text: 'Trades', icon: <CardTravelIcon />, path: '/trades' },
  { text: 'Group Trades', icon: <CardTravelIcon />, path: '/group-trades' },
  { text: 'Closed Trades', icon: <AssignmentIcon />, path: '/closed-trades' },
  { 
    text: 'Payment', 
    icon: <MonetizationOnIcon />, 
    children: [
      { text: 'Payment Gateways', icon: <PaymentIcon />, path: '/payment-gateways' },
      { text: 'Bank Details', icon: <AccountBalanceIcon />, path: '/bank-details' },
      { text: 'Trader Funds', icon: <PieChartIcon />, path: '/trader-funds' },
      { text: 'Withdrawal Requests', icon: <ListAltIcon />, path: '/withdrawal-requests' },
      { text: 'Deposit Requests', icon: <CreditCardIcon />, path: '/deposit-requests' },
    ] 
  },
  { text: 'Market Watch', icon: <ShowChartIcon />, path: '/market-watch' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { text: 'Active Positions', icon: <ShowChartIcon />, path: '/active-positions' },
  { text: 'Closed Positions', icon: <AssignmentIcon />, path: '/closed-positions' },
  { text: 'Pending Orders', icon: <ScheduleIcon />, path: '/pending-orders' },
  { text: 'Trader Funds', icon: <PieChartIcon />, path: '/trader-funds' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Scrip Data', icon: <FormatListBulletedIcon />, path: '/scrip-data' },
  { text: 'Enquiries', icon: <AssignmentIcon />, path: '/enquiries' },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    children: [
      { text: 'Market Settings', icon: <TuneIcon />, path: '/market-settings' },
      { text: 'Zerodha Settings', icon: <SettingsIcon />, path: '/admin/zerodha-settings' },
      { text: '5paisa Settings', icon: <TuneIcon />, path: '/admin/5paisa-settings' },
      { text: 'Manage Holidays', icon: <ScheduleIcon />, path: '/manage-holidays' },
      { text: 'Manage Scrips', icon: <PlaylistAddIcon />, path: '/manage-scrips' },
      { text: 'Delete History', icon: <HistoryIcon />, path: '/delete-history' },
      { text: 'Accounts', icon: <AccountBalanceIcon />, path: '/accounts' },
      { text: 'Change Password', icon: <SettingsIcon />, path: '/dashboard/change-login-password' },
    ] 
  },
  { 
    text: 'Accounts', 
    icon: <AccountBoxIcon />, 
    children: [
      { text: 'Change Transaction Password', icon: <SettingsIcon />, path: '/change-transaction-password' },
      { text: 'Withdrawal Requests', icon: <ArrowUpwardIcon />, path: '/withdrawal-requests' },
      { text: 'Deposit Requests', icon: <CreditCardIcon />, path: '/deposit-requests' },
    ] 
  },
  { text: 'Log Out', icon: <AccountBoxIcon />, path: '/logout' },
];

const SimpleSidebar: React.FC = () => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const pathname = usePathname();
  const router = useRouter();
  
  // State to track which menu sections are expanded
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  // Automatically expand sections based on current path on initial load
  useEffect(() => {
    if (!pathname) return;
    
    const normalizedPath = cleanPath(pathname);
    
    // Find and expand parent sections of active child items
    menuItems.forEach(item => {
      if (item.children) {
        // Check if any child path matches the current path
        const hasActiveChild = item.children.some(child => 
          child.path && (
            cleanPath(child.path) === normalizedPath ||
            normalizedPath.startsWith(cleanPath(child.path))
          )
        );
        
        if (hasActiveChild) {
          setOpenSections(prev => ({
            ...prev,
            [item.text]: true
          }));
        }
      }
    });
  }, [pathname]);

  // Check for stored path in session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPath = sessionStorage.getItem('current_menu_path');
      if (storedPath) {
        // Find and expand the section that contains this path
        menuItems.forEach(item => {
          if (item.children) {
            const hasStoredPath = item.children.some(child => 
              child.path === storedPath
            );
            
            if (hasStoredPath) {
              setOpenSections(prev => ({
                ...prev,
                [item.text]: true
              }));
            }
          }
        });
      }
    }
  }, []);

  // Toggle section expansion
  const handleToggleSection = (text: string) => {
    setOpenSections(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  // Clean route path for comparison
  const cleanPath = (path: string): string => {
    return path.replace(/\/\([^)]+\)\//g, '/').replace(/\([^)]+\)\//g, '/');
  };

  // Check if a path is selected
  const isPathSelected = (itemPath: string | undefined): boolean => {
    if (!itemPath || !pathname) return false;
    
    // Check session storage for current menu path (for special cases)
    if (typeof window !== 'undefined') {
      const storedPath = sessionStorage.getItem('current_menu_path');
      if (storedPath === itemPath) {
        return true;
      }
    }
    
    const normalizedPath = cleanPath(pathname);
    const normalizedItemPath = cleanPath(itemPath);
    
    // Exact match or child route match
    return normalizedPath === normalizedItemPath || 
           normalizedPath.startsWith(`${normalizedItemPath}/`);
  };

  // Navigate to a path
  const navigateTo = (path: string) => {
    // Store in session storage for special cases
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('current_menu_path', path);
    }
    
    router.push(path);
  };

  // Toggle sidebar
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Render menu item
  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const isSelected = isPathSelected(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openSections[item.text] || false;
    
    const indent = depth * 16; // Indentation for nested items
    
    if (hasChildren) {
      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleToggleSection(item.text)}
              sx={{
                pl: 2 + indent,
                pr: 2,
                py: 1,
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.2),
                },
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.05 : 0.1),
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 36, 
                  color: isSelected || isOpen ? 'primary.main' : 'inherit',
                  '& .MuiSvgIcon-root': { 
                    fontSize: '1.25rem' 
                  }
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  fontWeight: isSelected || isOpen ? 600 : 400,
                  color: isSelected || isOpen ? 'primary.main' : 'text.primary',
                }}
              />
              {isOpen ? (
                <ExpandLessIcon fontSize="small" color={isSelected ? 'primary' : 'inherit'} />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </ListItemButton>
          </ListItem>
          
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
    
    return (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          selected={isSelected}
          onClick={() => item.path && navigateTo(item.path)}
          sx={{
            pl: 2 + indent,
            pr: 2,
            py: 1,
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.2),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.15 : 0.25),
              }
            },
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.05 : 0.1),
            },
          }}
        >
          <ListItemIcon 
            sx={{ 
              minWidth: 36, 
              color: isSelected ? 'primary.main' : 'inherit',
              '& .MuiSvgIcon-root': { 
                fontSize: '1.25rem' 
              }
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{ 
              variant: 'body2',
              fontWeight: isSelected ? 600 : 400,
              color: isSelected ? 'primary.main' : 'text.primary',
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? 280 : 68,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? 280 : 68,
            boxSizing: 'border-box',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: theme.palette.mode === 'light'
              ? '0px 2px 8px rgba(0, 0, 0, 0.05)'
              : '0px 2px 8px rgba(0, 0, 0, 0.15)',
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
              : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarOpen ? 'space-between' : 'center',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            px: sidebarOpen ? 2 : 0,
          }}
        >
          {sidebarOpen && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '.1rem',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HELLOTRADER
            </Typography>
          )}

          <Tooltip title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
            <IconButton
              onClick={handleToggleSidebar}
              sx={{
                borderRadius: 1.5,
                p: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            height: 'calc(100% - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.text.secondary, 0.2),
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: alpha(theme.palette.text.secondary, 0.3),
            },
          }}
        >
          {!sidebarOpen ? (
            // Collapsed view
            <List sx={{ pt: 1.5, pb: 2 }}>
              {menuItems.map((item) => (
                <Tooltip 
                  key={item.text}
                  title={item.text}
                  placement="right"
                >
                  <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                    <ListItemButton
                      selected={isPathSelected(item.path)}
                      onClick={() => item.path && navigateTo(item.path)}
                      sx={{
                        minHeight: 40,
                        justifyContent: 'center',
                        px: 2.5,
                        mx: 1,
                        borderRadius: 2,
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.2),
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 'auto',
                          justifyContent: 'center',
                          color: isPathSelected(item.path) ? 'primary.main' : 'inherit',
                          '& .MuiSvgIcon-root': { 
                            fontSize: '1.25rem' 
                          }
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          ) : (
            // Expanded view
            <List sx={{ pt: 1.5, pb: 2 }}>
              {menuItems.map(item => renderMenuItem(item))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SimpleSidebar; 