import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Typography,
    FormControlLabel,
    Card,
    CardContent,
    CardHeader,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    Snackbar,
    IconButton,
    Tooltip,
    Stack,
} from '@mui/material';
import {
    Save as SaveIcon,
    ExpandMore as ExpandMoreIcon,
    Refresh as RefreshIcon,
    Info as InfoIcon,
    DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';

// Mock trading settings
interface RiskManagement {
    maxRiskPerTrade: number;
    maxDailyLoss: number;
    stopLossRequired: boolean;
    trailingStopLossEnabled: boolean;
}

interface OrderDefaults {
    orderType: string;
    validity: string;
    productType: string;
    disclosedQuantity: number;
    afterMarketOrdersAllowed: boolean;
}

interface TradingHours {
    openingTime: string;
    closingTime: string;
    allowPreMarketOrders: boolean;
    allowAfterMarketOrders: boolean;
}

interface Instruments {
    equity: boolean;
    futures: boolean;
    options: boolean;
    currency: boolean;
    commodity: boolean;
}

interface Notifications {
    orderExecuted: boolean;
    orderRejected: boolean;
    marginCalls: boolean;
    marketNews: boolean;
    priceAlerts: boolean;
}

interface TradingSettings {
    tradingEnabled: boolean;
    defaultLotSize: number;
    maxLotSize: number;
    riskManagement: RiskManagement;
    orderDefaults: OrderDefaults;
    tradingHours: TradingHours;
    instruments: Instruments;
    notifications: Notifications;
    [key: string]: any; // Index signature to allow string indexing
}

const initialSettings: TradingSettings = {
    tradingEnabled: true,
    defaultLotSize: 1,
    maxLotSize: 10,
    riskManagement: {
        maxRiskPerTrade: 2, // percentage
        maxDailyLoss: 5, // percentage
        stopLossRequired: true,
        trailingStopLossEnabled: false,
    },
    orderDefaults: {
        orderType: 'LIMIT',
        validity: 'DAY',
        productType: 'CNC',
        disclosedQuantity: 0,
        afterMarketOrdersAllowed: false,
    },
    tradingHours: {
        openingTime: '09:15',
        closingTime: '15:30',
        allowPreMarketOrders: true,
        allowAfterMarketOrders: false,
    },
    instruments: {
        equity: true,
        futures: true,
        options: true,
        currency: false,
        commodity: false,
    },
    notifications: {
        orderExecuted: true,
        orderRejected: true,
        marginCalls: true,
        marketNews: false,
        priceAlerts: true,
    },
};

// Order types
const orderTypes = ['MARKET', 'LIMIT', 'SL', 'SL-M'];

// Product types
const productTypes = ['CNC', 'MIS', 'NRML'];

// Validity types
const validityTypes = ['DAY', 'IOC', 'GTC'];

const TradingSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState(initialSettings);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setSettings({
                ...settings,
                [section]: {
                    ...settings[section],
                    [field]: type === 'checkbox' ? checked : value,
                },
            });
        } else {
            setSettings({
                ...settings,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };
    
    // Handle select change
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setSettings({
                ...settings,
                [section]: {
                    ...settings[section],
                    [field]: value,
                },
            });
        } else {
            setSettings({
                ...settings,
                [name]: value,
            });
        }
    };
    
    // Handle save settings
    const handleSaveSettings = () => {
        // In a real app, this would save to backend
        console.log('Saving settings:', settings);
        setShowSuccess(true);
    };
    
    // Handle reset to defaults
    const handleResetToDefaults = () => {
        setSettings(initialSettings);
    };
    
    return (
        <AdminLayout>
            <Container maxWidth={false}>
                <Box sx={{ pt: 3, pb: 3 }}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h1">
                                    Trading Settings
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                                <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<RefreshIcon />}
                                        onClick={handleResetToDefaults}
                                    >
                                        Reset to Defaults
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSaveSettings}
                                    >
                                        Save Settings
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid container spacing={3}>
                        {/* Global Settings */}
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Global Trading Settings" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.tradingEnabled}
                                                        onChange={handleChange}
                                                        name="tradingEnabled"
                                                        color="primary"
                                                    />
                                                }
                                                label="Enable Trading"
                                            />
                                            <Typography variant="caption" color="textSecondary">
                                                When disabled, no new orders can be placed platform-wide.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Default Lot Size"
                                                name="defaultLotSize"
                                                type="number"
                                                value={settings.defaultLotSize}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{ 
                                                    endAdornment: (
                                                        <Tooltip title="Default quantity for order placement">
                                                            <IconButton size="small">
                                                                <InfoIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) 
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Maximum Lot Size"
                                                name="maxLotSize"
                                                type="number"
                                                value={settings.maxLotSize}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{ 
                                                    endAdornment: (
                                                        <Tooltip title="Maximum quantity allowed per order">
                                                            <IconButton size="small">
                                                                <InfoIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) 
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Risk Management */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardHeader title="Risk Management" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Max Risk Per Trade (%)"
                                                name="riskManagement.maxRiskPerTrade"
                                                type="number"
                                                value={settings.riskManagement.maxRiskPerTrade}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Max Daily Loss (%)"
                                                name="riskManagement.maxDailyLoss"
                                                type="number"
                                                value={settings.riskManagement.maxDailyLoss}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.riskManagement.stopLossRequired}
                                                        onChange={handleChange}
                                                        name="riskManagement.stopLossRequired"
                                                        color="primary"
                                                    />
                                                }
                                                label="Require Stop Loss for All Orders"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.riskManagement.trailingStopLossEnabled}
                                                        onChange={handleChange}
                                                        name="riskManagement.trailingStopLossEnabled"
                                                        color="primary"
                                                    />
                                                }
                                                label="Enable Trailing Stop Loss"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Order Defaults */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardHeader title="Order Defaults" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel>Default Order Type</InputLabel>
                                                <Select
                                                    name="orderDefaults.orderType"
                                                    value={settings.orderDefaults.orderType}
                                                    label="Default Order Type"
                                                    onChange={handleSelectChange}
                                                >
                                                    {orderTypes.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel>Default Validity</InputLabel>
                                                <Select
                                                    name="orderDefaults.validity"
                                                    value={settings.orderDefaults.validity}
                                                    label="Default Validity"
                                                    onChange={handleSelectChange}
                                                >
                                                    {validityTypes.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel>Default Product Type</InputLabel>
                                                <Select
                                                    name="orderDefaults.productType"
                                                    value={settings.orderDefaults.productType}
                                                    label="Default Product Type"
                                                    onChange={handleSelectChange}
                                                >
                                                    {productTypes.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Default Disclosed Quantity (%)"
                                                name="orderDefaults.disclosedQuantity"
                                                type="number"
                                                value={settings.orderDefaults.disclosedQuantity}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Trading Hours */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardHeader title="Trading Hours" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Market Opening Time"
                                                name="tradingHours.openingTime"
                                                type="time"
                                                value={settings.tradingHours.openingTime}
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Market Closing Time"
                                                name="tradingHours.closingTime"
                                                type="time"
                                                value={settings.tradingHours.closingTime}
                                                onChange={handleChange}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.tradingHours.allowPreMarketOrders}
                                                        onChange={handleChange}
                                                        name="tradingHours.allowPreMarketOrders"
                                                        color="primary"
                                                    />
                                                }
                                                label="Allow Pre-Market Orders"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.tradingHours.allowAfterMarketOrders}
                                                        onChange={handleChange}
                                                        name="tradingHours.allowAfterMarketOrders"
                                                        color="primary"
                                                    />
                                                }
                                                label="Allow After-Market Orders"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Instruments */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardHeader title="Enabled Instruments" />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.instruments.equity}
                                                        onChange={handleChange}
                                                        name="instruments.equity"
                                                        color="primary"
                                                    />
                                                }
                                                label="Equity"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.instruments.futures}
                                                        onChange={handleChange}
                                                        name="instruments.futures"
                                                        color="primary"
                                                    />
                                                }
                                                label="Futures"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.instruments.options}
                                                        onChange={handleChange}
                                                        name="instruments.options"
                                                        color="primary"
                                                    />
                                                }
                                                label="Options"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.instruments.currency}
                                                        onChange={handleChange}
                                                        name="instruments.currency"
                                                        color="primary"
                                                    />
                                                }
                                                label="Currency"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.instruments.commodity}
                                                        onChange={handleChange}
                                                        name="instruments.commodity"
                                                        color="primary"
                                                    />
                                                }
                                                label="Commodity"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Notification Settings */}
                        <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Notification Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.notifications.orderExecuted}
                                                        onChange={handleChange}
                                                        name="notifications.orderExecuted"
                                                        color="primary"
                                                    />
                                                }
                                                label="Order Executed Notifications"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.notifications.orderRejected}
                                                        onChange={handleChange}
                                                        name="notifications.orderRejected"
                                                        color="primary"
                                                    />
                                                }
                                                label="Order Rejected Notifications"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.notifications.marginCalls}
                                                        onChange={handleChange}
                                                        name="notifications.marginCalls"
                                                        color="primary"
                                                    />
                                                }
                                                label="Margin Call Notifications"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.notifications.marketNews}
                                                        onChange={handleChange}
                                                        name="notifications.marketNews"
                                                        color="primary"
                                                    />
                                                }
                                                label="Market News Notifications"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={settings.notifications.priceAlerts}
                                                        onChange={handleChange}
                                                        name="notifications.priceAlerts"
                                                        color="primary"
                                                    />
                                                }
                                                label="Price Alert Notifications"
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        {/* Advanced Settings */}
                        <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="h6">Advanced Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography color="textSecondary" paragraph>
                                        Advanced settings are available for server-side configurations. Please contact system administrators for changes.
                                    </Typography>
                                    <Alert severity="info">
                                        Some advanced trading parameters can only be configured by administrators with elevated privileges.
                                    </Alert>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>

                    {/* Save Button */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveSettings}
                            size="large"
                        >
                            Save All Settings
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                message="Settings saved successfully"
            />
        </AdminLayout>
    );
};

export default TradingSettingsPage; 