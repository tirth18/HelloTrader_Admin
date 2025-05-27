import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArticleIcon from '@mui/icons-material/Article';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useRouter } from 'next/router';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Auto Scrip Config', icon: <PlaylistAddIcon />, path: '/auto-scrip-config' },
  { text: 'Action Ledger', icon: <ArticleIcon />, path: '/action-ledger' },
  { text: 'Trading Clients', icon: <TrendingUpIcon />, path: '/trading-clients' },
  { text: 'Trades', icon: <CardTravelIcon />, path: '/trades' },
  { text: 'Group Trades', icon: <CardTravelIcon />, path: '/group-trades' },
  { text: 'Closed Trades', icon: <AssignmentIcon />, path: '/closed-trades' },
  { text: 'Financial', icon: <MonetizationOnIcon />, path: '/financial' }
];

interface NewSidebarProps {
  open: boolean;
  onClose: () => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ open, onClose }) => {
  const router = useRouter();

  const handleItemClick = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              sx={{
                backgroundColor: router.pathname === item.path ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NewSidebar; 