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
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 'calc(6px + 1px)',
  width: 'calc(100% - 7px)',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'calc(6px + 1px)',
    width: 'calc(100% - 7px)',
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
      bgcolor: 'background.default',
    }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Main open={!isMobile && sidebarOpen}>
        <Toolbar />
        <Container 
          maxWidth={false}
          sx={{ 
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            p: 0,
          }}
        >
          <Fade in={true} timeout={500}>
            <Box 
              sx={{ 
                flexGrow: 1,
                borderRadius: theme.shape.borderRadius * 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
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