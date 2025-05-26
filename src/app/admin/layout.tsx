'use client';

import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, styled, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '@/components/layouts/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
}));

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: '100vh',
  overflow: 'hidden',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // Let flexbox handle the width automatically based on sidebar state
}));

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  const handleDrawerToggle = () => {
    dispatch({ type: 'ui/toggleSidebar' });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <StyledAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}>
            HelloTrader
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Sidebar />
      <Main>
        <Toolbar /> {/* Add spacing for fixed AppBar */}
        {children}
      </Main>
    </Box>
  );
} 