import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Stack,
    Tooltip,
    DialogContentText,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

// Mock broker data
const initialBrokers = [
    {
        id: 1,
        name: 'Zerodha',
        apiKey: 'zrd_api_12345',
        status: 'Active',
        tradingEnabled: true,
        type: 'Stock',
        usersCount: 145,
        createdAt: '2023-01-15',
    },
    {
        id: 2,
        name: 'ICICI Direct',
        apiKey: 'icici_api_67890',
        status: 'Active',
        tradingEnabled: true,
        type: 'Stock',
        usersCount: 98,
        createdAt: '2023-02-20',
    },
    {
        id: 3,
        name: 'HDFC Securities',
        apiKey: 'hdfc_api_24680',
        status: 'Inactive',
        tradingEnabled: false,
        type: 'Stock',
        usersCount: 72,
        createdAt: '2023-03-05',
    },
    {
        id: 4,
        name: 'Upstox',
        apiKey: 'upstox_api_13579',
        status: 'Active',
        tradingEnabled: true,
        type: 'Stock',
        usersCount: 56,
        createdAt: '2023-04-10',
    },
    {
        id: 5,
        name: 'Angel Broking',
        apiKey: 'angel_api_97531',
        status: 'Active',
        tradingEnabled: true,
        type: 'Stock',
        usersCount: 110,
        createdAt: '2023-05-15',
    },
];

// Broker types
const brokerTypes = ['Stock', 'Futures', 'Options', 'Commodity', 'Forex', 'Crypto'];

// Broker statuses
const brokerStatuses = ['Active', 'Inactive', 'Pending', 'Suspended'];

const BrokerManagementPage: React.FC = () => {
    const [brokers, setBrokers] = useState(initialBrokers);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentBroker, setCurrentBroker] = useState<any>(null);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        apiKey: '',
        status: 'Active',
        tradingEnabled: true,
        type: 'Stock',
        apiSecret: '',
        callbackUrl: '',
        description: '',
    });

    // Open add dialog
    const handleOpenAddDialog = () => {
        setFormData({
            name: '',
            apiKey: '',
            status: 'Active',
            tradingEnabled: true,
            type: 'Stock',
            apiSecret: '',
            callbackUrl: '',
            description: '',
        });
        setOpenAddDialog(true);
    };

    // Open edit dialog
    const handleOpenEditDialog = (broker: any) => {
        setCurrentBroker(broker);
        setFormData({
            name: broker.name,
            apiKey: broker.apiKey,
            status: broker.status,
            tradingEnabled: broker.tradingEnabled,
            type: broker.type,
            apiSecret: '••••••••••••',
            callbackUrl: 'https://api.hellotrader.com/callback/' + broker.id,
            description: '',
        });
        setOpenEditDialog(true);
    };

    // Open delete dialog
    const handleOpenDeleteDialog = (broker: any) => {
        setCurrentBroker(broker);
        setOpenDeleteDialog(true);
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target as { name: string; value: string | boolean };
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Add broker
    const handleAddBroker = () => {
        const newBroker = {
            id: brokers.length + 1,
            name: formData.name,
            apiKey: formData.apiKey,
            status: formData.status,
            tradingEnabled: formData.tradingEnabled,
            type: formData.type,
            usersCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setBrokers([...brokers, newBroker]);
        setOpenAddDialog(false);
    };

    // Edit broker
    const handleEditBroker = () => {
        const updatedBrokers = brokers.map((broker) =>
            broker.id === currentBroker.id
                ? {
                      ...broker,
                      name: formData.name,
                      apiKey: formData.apiKey,
                      status: formData.status,
                      tradingEnabled: formData.tradingEnabled,
                      type: formData.type,
                  }
                : broker
        );
        setBrokers(updatedBrokers);
        setOpenEditDialog(false);
    };

    // Delete broker
    const handleDeleteBroker = () => {
        const updatedBrokers = brokers.filter((broker) => broker.id !== currentBroker.id);
        setBrokers(updatedBrokers);
        setOpenDeleteDialog(false);
    };

    return (
        <AdminLayout>
            <Container maxWidth={false}>
                <Box sx={{ pt: 3, pb: 3 }}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h1">
                                    Broker Management
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenAddDialog}
                                >
                                    Add Broker
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 2, overflow: 'hidden' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>API Key</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Trading</TableCell>
                                        <TableCell>Users</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {brokers.map((broker) => (
                                        <TableRow key={broker.id}>
                                            <TableCell>{broker.id}</TableCell>
                                            <TableCell>{broker.name}</TableCell>
                                            <TableCell>{broker.apiKey}</TableCell>
                                            <TableCell>{broker.type}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={broker.status}
                                                    color={
                                                        broker.status === 'Active'
                                                            ? 'success'
                                                            : broker.status === 'Inactive'
                                                            ? 'default'
                                                            : broker.status === 'Pending'
                                                            ? 'warning'
                                                            : 'error'
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={broker.tradingEnabled ? 'Enabled' : 'Disabled'}
                                                    color={broker.tradingEnabled ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>{broker.usersCount}</TableCell>
                                            <TableCell>{broker.createdAt}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleOpenEditDialog(broker)}
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Settings">
                                                        <IconButton size="small" color="info">
                                                            <SettingsIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleOpenDeleteDialog(broker)}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>

                {/* Add Broker Dialog */}
                <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Add New Broker</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Broker Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        label="Type"
                                    >
                                        {brokerTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="apiKey"
                                    label="API Key"
                                    value={formData.apiKey}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="apiSecret"
                                    label="API Secret"
                                    type="password"
                                    value={formData.apiSecret}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="callbackUrl"
                                    label="Callback URL"
                                    value={formData.callbackUrl}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        label="Status"
                                    >
                                        {brokerStatuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trading</InputLabel>
                                    <Select
                                        name="tradingEnabled"
                                        value={formData.tradingEnabled}
                                        onChange={handleInputChange}
                                        label="Trading"
                                    >
                                        <MenuItem value={true}>Enabled</MenuItem>
                                        <MenuItem value={false}>Disabled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddBroker} variant="contained" color="primary">
                            Add Broker
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Broker Dialog */}
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Broker</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Broker Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        label="Type"
                                    >
                                        {brokerTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="apiKey"
                                    label="API Key"
                                    value={formData.apiKey}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="apiSecret"
                                    label="API Secret"
                                    type="password"
                                    value={formData.apiSecret}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="callbackUrl"
                                    label="Callback URL"
                                    value={formData.callbackUrl}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        label="Status"
                                    >
                                        {brokerStatuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trading</InputLabel>
                                    <Select
                                        name="tradingEnabled"
                                        value={formData.tradingEnabled}
                                        onChange={handleInputChange}
                                        label="Trading"
                                    >
                                        <MenuItem value={true}>Enabled</MenuItem>
                                        <MenuItem value={false}>Disabled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                        <Button onClick={handleEditBroker} variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Broker Dialog */}
                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Delete Broker</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the broker "{currentBroker?.name}"? This action cannot be
                            undone and may affect users who are using this broker.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={handleDeleteBroker} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AdminLayout>
    );
};

export default BrokerManagementPage;