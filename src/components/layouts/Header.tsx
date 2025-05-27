'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  alpha,
  useTheme,
  Container,
  Button,
  useMediaQuery,
  Paper,
  InputBase,
  styled
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Key as KeyIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { RootState } from '../../store';
import NotificationBell from '@/components/notifications/NotificationBell';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/contexts/ThemeContext';

interface HeaderProps {
  onDrawerToggle?: () => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.common.white, 0.1)
    : alpha(theme.palette.common.black, 0.04),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.common.black, 0.07),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.7)
    : alpha(theme.palette.common.black, 0.6),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
  '&::placeholder': {
    color: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.5)
      : alpha(theme.palette.common.black, 0.4),
    opacity: 1,
  },
}));

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const { mode, toggleColorMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const getUserInfo = () => {
    if (user) return user;
    
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
    }
    
    return {
      id: 1,
      username: 'admin',
    };
  };

  const displayUser = getUserInfo();

  const handleProfile = () => {
    router.push('/profile');
    handleCloseUserMenu();
  };

  const handleDashboard = () => {
    router.push('/dashboard');
    handleCloseUserMenu();
  };

  const handleSettings = () => {
    router.push('/settings');
    handleCloseUserMenu();
  };

  const handleChangeTransactionPassword = () => {
    router.push('/change-transaction-password');
    handleCloseUserMenu();
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={1}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(20px)',
        width: '100%',
        left: 0,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ minHeight: 64, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="toggle sidebar"
              edge="start"
              onClick={() => dispatch(toggleSidebar())}
              sx={{ 
                mr: 2,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                mr: 2, 
                display: 'flex',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '.15rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
              }}
            >
              HelloTrader
            </Typography>

            {/* Search Bar - Only show on desktop */}
            {!isMobile && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Theme Toggle Button */}
            <Tooltip title={mode === 'light' ? "Switch to dark mode" : "Switch to light mode"}>
              <IconButton 
                onClick={toggleColorMode} 
                sx={{ 
                  ml: { xs: 1, sm: 2 }, 
                  color: 'text.primary',
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            <NotificationBell />

            <Tooltip title="Open user menu">
              <IconButton 
                onClick={handleOpenUserMenu} 
                aria-label="user menu"
                aria-controls="user-menu"
                aria-haspopup="true"
                sx={{ 
                  p: 0, 
                  ml: 2,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    border: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                    color: theme.palette.primary.contrastText,
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}
                  aria-label="user avatar"
                >
                  {displayUser?.first_name?.[0] || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              id="user-menu"
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 250,
                  boxShadow: theme.palette.mode === 'light'
                    ? '0px 5px 15px rgba(0, 0, 0, 0.1)'
                    : '0px 5px 15px rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  backdropFilter: 'blur(20px)',
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  },
                }
              }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    sx={{ 
                      width: 45, 
                      height: 45, 
                      bgcolor: theme.palette.primary.main,
                      mr: 1.5,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    aria-label="user profile avatar"
                  >
                    {displayUser.first_name?.[0] || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.3 }}>
                      {displayUser.first_name} {displayUser.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      {displayUser.email}
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title="View profile settings">
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={handleProfile}
                    aria-label="manage account"
                    sx={{ 
                      mt: 1,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '0.8rem',
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      }
                    }}
                  >
                    Manage your account
                  </Button>
                </Tooltip>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <MenuItem onClick={handleDashboard} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Typography variant="body2">Dashboard</Typography>
              </MenuItem>
              
              <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Typography variant="body2">My Profile</Typography>
              </MenuItem>
              
              <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <Typography variant="body2">Settings</Typography>
              </MenuItem>
              
              <MenuItem onClick={handleChangeTransactionPassword} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <KeyIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <Typography variant="body2" color="warning.main">Change Transaction Password</Typography>
              </MenuItem>
              
              <Divider sx={{ my: 1 }} />
              
              <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography variant="body2" color="error.main">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 