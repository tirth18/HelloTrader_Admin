'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  alpha,
  Collapse,
  ListItemButton,
  IconButton,
  useMediaQuery,
  styled,
  Theme,
  CSSObject,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon,
  SwapHoriz as SwapHorizIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
  ViewList as ViewListIcon,
  AccountBalance as AccountBalanceIcon,
  ArrowUpward as ArrowUpwardIcon,
  ListAlt as ListAltIcon,
  CardTravel as CardTravelIcon,
  MailOutline as MailOutlineIcon,
  PlaylistAdd as PlaylistAddIcon,
  MonetizationOn as MonetizationOnIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  ShowChart as ShowChartIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Tune as TuneIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Article as ArticleIcon,
  ChevronLeft,
  ChevronRight,
  Key as KeyIcon,
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '../../store';
import { useLoading } from '../../contexts/LoadingContext';

// Helper type for nested menu items
type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
};

// Helper function to format paths correctly based on directory structure
const formatPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Routes that are known to be in the dashboard
  const dashboardGroupRoutes = [
    'dashboard',
    'trading-dashboard',
    'payment-gateways',
    'banking',
    'bank-details',
    'reports',
    'users',
    'risk',
    'orders',
    'trade-history',
    'trades'
  ];
  
  // Just use a simple direct path without any route group notation
  // We'll handle the appropriate route resolution in the navigation handler
  return `/${cleanPath}`;
};

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: formatPath('dashboard/overview') },
  { text: 'Live M2M', icon: <MonetizationOnIcon />, path: formatPath('live-m2m') },
  { text: 'Auto Scrip Config', icon: <PlaylistAddIcon />, path: formatPath('auto-scrip-config') },
  { text: 'Payment Gateways', icon: <PaymentIcon />, path: formatPath('payment-gateways') },
  { text: 'Bank Details', icon: <AccountBalanceIcon />, path: formatPath('banking') },
  { text: 'Market Watch', icon: <PieChartIcon />, path: formatPath('market-watch') },
  { text: 'Notifications', icon: <NotificationsIcon />, path: formatPath('admin/notifications') },
  { text: 'Action Ledger', icon: <ArticleIcon />, path: formatPath('action-ledger') },
  { text: 'Active Positions', icon: <ShowChartIcon />, path: formatPath('active-positions') },
  { text: 'Closed Positions', icon: <AssignmentIcon />, path: formatPath('closed-positions') },
  { text: 'Trading Clients', icon: <TrendingUpIcon />, path: '/trading-clients' },
  { text: 'Trades', icon: <CardTravelIcon />, path: formatPath('trades') },
  { text: 'Trades List', icon: <ListAltIcon />, path: formatPath('trades-list') },
  { text: 'Group Trades', icon: <CardTravelIcon />, path: formatPath('group-trades') },
  { text: 'Closed Trades', icon: <AssignmentIcon />, path: formatPath('closed-trades') },
  { text: 'Delete Trades', icon: <DeleteIcon />, path: formatPath('delete-trades') },
  { text: 'Pending Orders', icon: <AssignmentIcon />, path: formatPath('pending-orders') },
  { text: 'Trader Funds', icon: <PieChartIcon />, path: formatPath('trader-funds') },
  { text: 'Users', icon: <PeopleIcon />, path: formatPath('users') },
  { text: 'Scrip Data', icon: <FormatListBulletedIcon />, path: formatPath('scrip-data') },
  { text: 'Enquiries', icon: <AssignmentIcon />, path: formatPath('enquiries') },
  { text: 'Market Settings', icon: <TuneIcon />, path: formatPath('market-settings') },
  { text: 'Zerodha Settings', icon: <SettingsIcon />, path: formatPath('admin/zerodha-settings') },
  { text: '5paisa Settings', icon: <SettingsIcon />, path: formatPath('admin/5paisa-settings') },
  { text: 'Manage Holidays', icon: <ScheduleIcon />, path: formatPath('manage-holidays') },
  { text: 'Manage Scrips', icon: <PlaylistAddIcon />, path: formatPath('manage-scrips') },
  { text: 'Delete History', icon: <DeleteIcon />, path: formatPath('delete-history') },
  { text: 'Accounts', icon: <AccountBalanceIcon />, path: formatPath('accounts') },
  { text: 'Change Login Password', icon: <KeyIcon />, path: formatPath('settings/change-password') },
  { text: 'Change Transaction Password', icon: <KeyIcon />, path: formatPath('settings/change-transaction-password') },
  { text: 'Withdrawal Requests', icon: <CreditCardIcon />, path: formatPath('withdrawal-requests') },
  { text: 'Deposit Requests', icon: <CreditCardIcon />, path: formatPath('deposit-requests') },
  { text: 'Log Out', icon: <ExitToAppIcon />, path: formatPath('logout') },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { startLoading, stopLoading } = useLoading();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [isNavigating, setIsNavigating] = useState(false);

  const handleDrawerToggle = () => {
    dispatch({ type: 'ui/toggleSidebar' });
  };

  useEffect(() => {
    if (!pathname) return;
    stopLoading();
    setIsNavigating(false);
  }, [pathname, stopLoading]);

  const handleNavigation = async (path: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    startLoading();
    
    try {
      await router.push(path);
    } catch (e) {
      stopLoading();
      setIsNavigating(false);
      console.error('Navigation failed:', e);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const isSelected = pathname === item.path;

    return (
      <ListItemButton
        key={item.text}
        onClick={() => item.path && handleNavigation(item.path)}
        selected={isSelected}
        sx={{
          minHeight: 52,
          justifyContent: sidebarOpen ? 'initial' : 'center',
          px: sidebarOpen ? 2 : 2.5,
          borderRadius: 2,
          mb: 0.7,
          transition: 'all 0.15s ease-in-out',
          mx: 0.5,
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.15)
              : alpha(theme.palette.background.paper, 0.8),
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: sidebarOpen ? 2.5 : 'auto',
            justifyContent: 'center',
            color: isSelected ? theme.palette.primary.main : theme.palette.text.secondary,
            fontSize: '1.25rem',
            '& .MuiSvgIcon-root': {
              fontSize: '1.35rem'
            }
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text} 
          sx={{ 
            opacity: sidebarOpen ? 1 : 0,
            '& .MuiTypography-root': {
              fontWeight: isSelected ? 600 : 500,
              fontSize: '1rem',
              color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
            }
          }} 
        />
      </ListItemButton>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: 'none',
          },
        }}
      >
        <DrawerHeader>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.3rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05rem',
              mr: 'auto'
            }}
          >
            HelloTrader
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ mx: 2 }} />
        <List sx={{ py: 2, px: 1 }}>
          {menuItems.map((item) => renderMenuItem(item))}
        </List>
      </Drawer>

      {/* Desktop drawer */}
      <StyledDrawer variant="permanent" open={sidebarOpen}>
        <DrawerHeader>
          {sidebarOpen && (
            <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                fontSize: '1.3rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05rem',
              }}
            >
              HelloTrader
            </Typography>
          )}
          <IconButton onClick={handleDrawerToggle} sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            }
          }}>
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ mx: sidebarOpen ? 2 : 0.5, mb: 1 }} />
        <List
          sx={{
            px: 1,
            py: 1.5,
            maxHeight: 'calc(100vh - 64px)', // Limit height to viewport minus header height
            overflowY: 'auto', // Enable scrolling when content overflows
          }}
        >
          {menuItems.map((item) => renderMenuItem(item))}
        </List>
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar; 