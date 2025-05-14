import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    Switch,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Tab,
    Tabs,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Security as SecurityIcon,
    LockPerson as LockPersonIcon,
    VpnKey as VpnKeyIcon,
    DeleteOutline as DeleteOutlineIcon,
    Edit as EditIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    Save as SaveIcon,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`security-tabpanel-${index}`}
            aria-labelledby={`security-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

// Mock API keys
const mockApiKeys = [
    { id: 1, name: 'Admin API', key: 'ht_admin_123456789abcdef', active: true, created: '2023-05-15', lastUsed: '2023-06-10' },
    { id: 2, name: 'Analytics API', key: 'ht_analytics_987654321fedcba', active: true, created: '2023-04-20', lastUsed: '2023-06-09' },
    { id: 3, name: 'Reporting API', key: 'ht_report_abcdef123456789', active: false, created: '2023-03-10', lastUsed: '2023-05-20' },
];

// Mock roles
const mockRoles = [
    { id: 1, name: 'Admin', usersCount: 3, permissions: 'Full access to all systems' },
    { id: 2, name: 'Manager', usersCount: 8, permissions: 'Access to user management and reports' },
    { id: 3, name: 'Support', usersCount: 12, permissions: 'Access to user data and basic reports' },
    { id: 4, name: 'Trader', usersCount: 45, permissions: 'Access to trading functions only' },
    { id: 5, name: 'Viewer', usersCount: 27, permissions: 'Read-only access to dashboards' },
];

// Security levels
const securityLevels = ['Low', 'Medium', 'High', 'Very High'];

const SecurityPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Authentication settings
    const [authSettings, setAuthSettings] = useState({
        requireMfa: true,
        passwordExpiration: 90, // days
        minPasswordLength: 8,
        requireSpecialChars: true,
        sessionTimeout: 30, // minutes
        maxLoginAttempts: 5,
        loginLockoutDuration: 15, // minutes
        securityLevel: 'High',
    });

    // New API key form
    const [newApiKeyName, setNewApiKeyName] = useState('');

    // Handle tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Handle auth settings change
    const handleAuthSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setAuthSettings({
            ...authSettings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle select change
    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setAuthSettings({
            ...authSettings,
            [name as string]: value,
        });
    };

    // Handle save settings
    const handleSaveSettings = () => {
        console.log('Saving authentication settings:', authSettings);
        setSuccessMessage('Authentication settings saved successfully');
        setShowSuccess(true);
    };

    // Generate new API key
    const handleGenerateApiKey = () => {
        if (!newApiKeyName.trim()) return;

        console.log('Generating new API key with name:', newApiKeyName);
        setSuccessMessage('New API key generated successfully');
        setShowSuccess(true);
        setNewApiKeyName('');
    };

    // Delete API key
    const handleDeleteApiKey = (id: number) => {
        console.log('Deleting API key with ID:', id);
        setSuccessMessage('API key deleted successfully');
        setShowSuccess(true);
    };

    return (
        <AdminLayout>
            <Container maxWidth={false}>
                <Box sx={{ pt: 3, pb: 3 }}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SecurityIcon fontSize="large" color="primary" />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" component="h1">
                                    Security Settings
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveSettings}
                                >
                                    Save Settings
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ width: '100%' }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="security tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab icon={<LockPersonIcon />} iconPosition="start" label="Authentication" />
                            <Tab icon={<VpnKeyIcon />} iconPosition="start" label="API Keys" />
                            <Tab icon={<SecurityIcon />} iconPosition="start" label="Roles & Permissions" />
                        </Tabs>

                        {/* Authentication Tab */}
                        <TabPanel value={tabValue} index={0}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardHeader title="Password Policy" />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Minimum Password Length"
                                                        name="minPasswordLength"
                                                        type="number"
                                                        value={authSettings.minPasswordLength}
                                                        onChange={handleAuthSettingChange}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: 6, max: 20 } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Password Expiration (days)"
                                                        name="passwordExpiration"
                                                        type="number"
                                                        value={authSettings.passwordExpiration}
                                                        onChange={handleAuthSettingChange}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: 0, max: 365 } }}
                                                    />
                                                    <Typography variant="caption" color="textSecondary">
                                                        Set to 0 for no expiration
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={authSettings.requireSpecialChars}
                                                                onChange={handleAuthSettingChange}
                                                                name="requireSpecialChars"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Require Special Characters"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardHeader title="Login Security" />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={authSettings.requireMfa}
                                                                onChange={handleAuthSettingChange}
                                                                name="requireMfa"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Require Multi-Factor Authentication"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Max Login Attempts"
                                                        name="maxLoginAttempts"
                                                        type="number"
                                                        value={authSettings.maxLoginAttempts}
                                                        onChange={handleAuthSettingChange}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Lockout Duration (minutes)"
                                                        name="loginLockoutDuration"
                                                        type="number"
                                                        value={authSettings.loginLockoutDuration}
                                                        onChange={handleAuthSettingChange}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: 5, max: 60 } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Session Settings" />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        label="Session Timeout (minutes)"
                                                        name="sessionTimeout"
                                                        type="number"
                                                        value={authSettings.sessionTimeout}
                                                        onChange={handleAuthSettingChange}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: 5, max: 120 } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Security Level</InputLabel>
                                                        <Select
                                                            name="securityLevel"
                                                            value={authSettings.securityLevel}
                                                            label="Security Level"
                                                            onChange={handleSelectChange}
                                                        >
                                                            {securityLevels.map((level) => (
                                                                <MenuItem key={level} value={level}>
                                                                    {level}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* API Keys Tab */}
                        <TabPanel value={tabValue} index={1}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Generate New API Key" />
                                        <Divider />
                                        <CardContent>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs>
                                                    <TextField
                                                        label="API Key Name"
                                                        value={newApiKeyName}
                                                        onChange={(e) => setNewApiKeyName(e.target.value)}
                                                        fullWidth
                                                        placeholder="Enter a name for your API key"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<AddCircleOutlineIcon />}
                                                        onClick={handleGenerateApiKey}
                                                        disabled={!newApiKeyName.trim()}
                                                    >
                                                        Generate Key
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="API Keys" />
                                        <Divider />
                                        <CardContent>
                                            <List>
                                                {mockApiKeys.map((apiKey) => (
                                                    <React.Fragment key={apiKey.id}>
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <VpnKeyIcon color={apiKey.active ? 'primary' : 'disabled'} />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={apiKey.name}
                                                                secondary={
                                                                    <>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="textPrimary"
                                                                        >
                                                                            {apiKey.key.substring(0, 8)}...
                                                                        </Typography>
                                                                        {` • Created: ${apiKey.created} • Last used: ${apiKey.lastUsed}`}
                                                                    </>
                                                                }
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={apiKey.active}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={apiKey.active ? 'Active' : 'Inactive'}
                                                                />
                                                                <Tooltip title="Delete API Key">
                                                                    <IconButton
                                                                        edge="end"
                                                                        onClick={() => handleDeleteApiKey(apiKey.id)}
                                                                        color="error"
                                                                    >
                                                                        <DeleteOutlineIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <Divider component="li" />
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* Roles Tab */}
                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddCircleOutlineIcon />}
                                        sx={{ mb: 2 }}
                                    >
                                        Create New Role
                                    </Button>
                                </Grid>

                                {mockRoles.map((role) => (
                                    <Grid item xs={12} md={6} lg={4} key={role.id}>
                                        <Card>
                                            <CardHeader
                                                title={role.name}
                                                subheader={`${role.usersCount} users`}
                                                action={
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                }
                                            />
                                            <Divider />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    {role.permissions}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                    </Paper>
                </Box>
            </Container>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                message={successMessage}
            />
        </AdminLayout>
    );
};

export default SecurityPage;