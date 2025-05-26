'use client';

import React, { useEffect } from 'react';
import { 
  Box, 
  CssBaseline, 
  useTheme, 
  useMediaQuery, 
  Container,
  Fade,
  Toolbar,
  styled,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { useThemeContext } from '@/contexts/ThemeContext';
import useTokenPersistence from '@/hooks/useTokenPersistence';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 'calc(6px + 1px)',
  width: 'calc(100% - 7px)',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'calc(6px + 1px)',
    width: 'calc(100% - 7px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { mode } = useThemeContext();
  
  // Use token persistence hook
  useTokenPersistence();
  
  // Verify token exists on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('DashboardLayout - Token check:', token ? 'Token exists' : 'No token');
  }, []);
  
  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      dispatch(toggleSidebar());
    }
  }, [isMobile, dispatch, sidebarOpen]);

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      height: '100vh',
      bgcolor: 'background.default',
      overflow: 'hidden',
    }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Main open={!isMobile && sidebarOpen}>
        <Toolbar />
        <Container 
          maxWidth={false}
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 0,
            m: 0,
            maxWidth: 'none !important',
            width: '100%',
            height: 'calc(100vh - 64px)',
            overflow: 'hidden',
          }}
        >
          <Fade in={true} timeout={500}>
            <Box 
              sx={{ 
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: 0,
                overflow: 'hidden',
                bgcolor: 'transparent',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                '& > *': {
                  flex: 1,
                  minHeight: 0,
                },
              }}
            >
              {children}
            </Box>
          </Fade>
        </Container>
      </Main>
    </Box>
  );
};

export default DashboardLayout; 