import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/admin/dashboard',
        },
        {
            text: 'Zerodha Settings',
            icon: <SettingsIcon />,
            path: '/admin/zerodha-settings',
        },
        {
            text: 'Market Watch',
            icon: <ShowChartIcon />,
            path: '/admin/market-watch',
        },
    ];

    const drawer = (
        <Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" noWrap component="div">
                    Hello Trader Admin
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.text} passHref>
                        <ListItem
                            button
                            selected={router.pathname === item.path}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout; 