import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    People as PeopleIcon,
    Money as MoneyIcon,
    Assessment as AssessmentIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';

// Mock data for demo purposes
const stats = {
    totalUsers: 1458,
    activeUsers: 857,
    tradingVolume: '₹24.5M',
    revenue: '₹1.25M',
    pendingOrders: 57,
    activeBrokers: 8,
    recentTransactions: [
        { id: 1, user: 'John Doe', amount: '₹25,000', type: 'Deposit', date: '2023-06-10' },
        { id: 2, user: 'Jane Smith', amount: '₹15,000', type: 'Withdrawal', date: '2023-06-09' },
        { id: 3, user: 'Bob Johnson', amount: '₹32,500', type: 'Deposit', date: '2023-06-09' },
        { id: 4, user: 'Alice Williams', amount: '₹18,000', type: 'Withdrawal', date: '2023-06-08' },
        { id: 5, user: 'Tom Brown', amount: '₹45,000', type: 'Deposit', date: '2023-06-08' },
    ],
    recentUsers: [
        { id: 1, name: 'Michael Scott', email: 'michael@example.com', joined: '2023-06-10' },
        { id: 2, name: 'Pam Beesly', email: 'pam@example.com', joined: '2023-06-09' },
        { id: 3, name: 'Jim Halpert', email: 'jim@example.com', joined: '2023-06-08' },
        { id: 4, name: 'Dwight Schrute', email: 'dwight@example.com', joined: '2023-06-07' },
        { id: 5, name: 'Angela Martin', email: 'angela@example.com', joined: '2023-06-07' },
    ],
    recentNotifications: [
        { id: 1, title: 'System Update', message: 'System will be updated tonight at 2 AM', time: '1 hour ago' },
        { id: 2, title: 'New User Registration', message: '10 new users registered today', time: '3 hours ago' },
        { id: 3, title: 'Server Maintenance', message: 'Scheduled maintenance completed', time: '5 hours ago' },
        { id: 4, title: 'Payment Gateway', message: 'Payment gateway integration successful', time: 'Yesterday' },
        { id: 5, title: 'New Feature', message: 'Market watch module updated with new features', time: 'Yesterday' },
    ],
};

const DashboardPage: React.FC = () => {
    return (
        <AdminLayout>
            <Container maxWidth={false}>
                <Box sx={{ pt: 3, pb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Admin Dashboard
                    </Typography>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon sx={{ fontSize: 48, mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h4">{stats.totalUsers}</Typography>
                                        <Typography variant="body2" color="textSecondary">Total Users</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TrendingUpIcon sx={{ fontSize: 48, mr: 2, color: 'success.main' }} />
                                    <Box>
                                        <Typography variant="h4">{stats.tradingVolume}</Typography>
                                        <Typography variant="body2" color="textSecondary">Trading Volume</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                    <MoneyIcon sx={{ fontSize: 48, mr: 2, color: 'info.main' }} />
                                    <Box>
                                        <Typography variant="h4">{stats.revenue}</Typography>
                                        <Typography variant="body2" color="textSecondary">Revenue</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AssessmentIcon sx={{ fontSize: 48, mr: 2, color: 'warning.main' }} />
                                    <Box>
                                        <Typography variant="h4">{stats.activeBrokers}</Typography>
                                        <Typography variant="body2" color="textSecondary">Active Brokers</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Main Content */}
                    <Grid container spacing={3}>
                        {/* Recent Transactions */}
                        <Grid item xs={12} md={6} lg={8}>
                            <Paper sx={{ p: 2, height: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Recent Transactions</Typography>
                                    <Button size="small" variant="outlined">View All</Button>
                                </Box>
                                <List>
                                    {stats.recentTransactions.map((transaction) => (
                                        <React.Fragment key={transaction.id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`${transaction.user} - ${transaction.amount}`}
                                                    secondary={`${transaction.type} • ${transaction.date}`}
                                                />
                                                {transaction.type === 'Deposit' ? (
                                                    <TrendingUpIcon color="success" />
                                                ) : (
                                                    <TrendingDownIcon color="error" />
                                                )}
                                            </ListItem>
                                            <Divider component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        {/* Recent Notifications */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper sx={{ p: 2, height: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Recent Notifications</Typography>
                                    <Button size="small" variant="outlined">View All</Button>
                                </Box>
                                <List>
                                    {stats.recentNotifications.map((notification) => (
                                        <React.Fragment key={notification.id}>
                                            <ListItem>
                                                <NotificationsIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                <ListItemText
                                                    primary={notification.title}
                                                    secondary={`${notification.message} • ${notification.time}`}
                                                />
                                            </ListItem>
                                            <Divider component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        {/* Recent Users */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Recent Users</Typography>
                                    <Button size="small" variant="outlined">View All</Button>
                                </Box>
                                <Grid container spacing={2}>
                                    {stats.recentUsers.map((user) => (
                                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={user.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography variant="subtitle1">{user.name}</Typography>
                                                    <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                                    <Typography variant="caption">Joined: {user.joined}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Quick Actions */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            Add User
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            Send Notification
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            View Reports
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            Manage Brokers
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            System Settings
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={3} lg={2}>
                                        <Button variant="contained" fullWidth sx={{ height: '100px' }}>
                                            View Logs
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default DashboardPage; 