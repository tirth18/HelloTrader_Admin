import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Refresh as RefreshIcon,
    Visibility as VisibilityIcon,
    FileDownload as FileDownloadIcon,
} from '@mui/icons-material';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#141b2d',
    minHeight: '100vh',
    padding: theme.spacing(3),
    color: 'white',
}));

const DarkBlueBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#1a2138',
    color: 'white',
    padding: theme.spacing(3),
    borderRadius: 0,
    marginBottom: theme.spacing(3),
}));

const SearchButton = styled(Button)(() => ({
    backgroundColor: '#4caf50',
    color: 'white',
    textTransform: 'uppercase',
    padding: '10px 30px',
    borderRadius: '4px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#388e3c',
    },
}));

const ResetButton = styled(Button)(() => ({
    backgroundColor: '#9e9e9e',
    color: 'white',
    textTransform: 'uppercase',
    padding: '10px 30px',
    borderRadius: '4px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#757575',
    },
}));

const CreateUserButton = styled(Button)(() => ({
    backgroundColor: '#4caf50',
    color: 'white',
    textTransform: 'uppercase',
    padding: '10px 30px',
    borderRadius: '4px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#388e3c',
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: '#1a2138',
    color: 'white',
    borderRadius: 0,
    '& .MuiTable-root': {
        backgroundColor: '#1a2138',
    },
}));

const StyledTableHead = styled(TableHead)(() => ({
    backgroundColor: '#1a2138',
    '& th': {
        color: 'white',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
}));

const StyledTableCell = styled(TableCell)(() => ({
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '16px 8px',
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ActionButton = styled(IconButton)(() => ({
    color: 'white',
    padding: '4px',
}));

const GenerateButton = styled(Button)(() => ({
    color: 'white',
    textTransform: 'none',
    padding: '2px 8px',
    fontSize: '0.75rem',
}));

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: 0,
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        padding: '10px 14px',
    },
}));

const StyledSelect = styled(Select)(() => ({
    backgroundColor: 'white',
    borderRadius: 0,
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiSelect-select': {
        padding: '10px 14px',
    },
}));

const RefCodeText = styled(Typography)(({ theme }) => ({
    color: '#00bcd4',
    fontWeight: 'bold',
}));

// Mock user data
const mockUsers = [
    {
        id: 347,
        username: 'LAK159',
        realUsername: 'jain122',
        parent: 'Admin',
        parentId: 0,
        brokerageShare: 50.00,
        profitShare: 0.00,
        creditLimit: 0.0000,
        type: 'Broker',
        totalClients: 2,
        refCode: 'LAK159',
        status: 'Active',
    },
    {
        id: 346,
        username: 'Johnson mathew',
        realUsername: 'jain121',
        parent: 'Admin',
        parentId: 0,
        brokerageShare: 50.00,
        profitShare: 0.00,
        creditLimit: 0.0000,
        type: 'Broker',
        totalClients: 2,
        refCode: 'JOHNMW',
        status: 'Active',
    },
];

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState(mockUsers);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState('username');
    const [selected, setSelected] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [accountStatus, setAccountStatus] = useState('All');
    
    // Dialogs state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: '',
        role: '',
        status: 'Active',
        password: '',
        confirmPassword: '',
    });

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        type: 'Broker',
        brokerageShare: 50,
        profitShare: 0,
        creditLimit: 0,
    });

    // Handle search
    const handleSearch = () => {
        if (searchTerm.trim() === '' && accountStatus === 'All') {
            setUsers(mockUsers);
            return;
        }

        const filtered = mockUsers.filter(user => {
            const matchesUsername = searchTerm.trim() === '' || 
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.realUsername.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = accountStatus === 'All' || user.status === accountStatus;
            
            return matchesUsername && matchesStatus;
        });
        
        setUsers(filtered);
    };

    // Handle reset
    const handleReset = () => {
        setSearchTerm('');
        setAccountStatus('All');
        setUsers(mockUsers);
    };

    // Handle create user dialog
    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
        // Reset the newUser form data
        setNewUser({
            username: '',
            password: '',
            type: 'Broker',
            brokerageShare: 50,
            profitShare: 0,
            creditLimit: 0,
        });
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleAddUser = () => {
        const newId = Math.max(...users.map(user => user.id)) + 1;
        const createdUser = {
            id: newId,
            username: newUser.username,
            realUsername: newUser.username.toLowerCase().replace(/\s+/g, ''),
            parent: 'Admin',
            parentId: 0,
            brokerageShare: newUser.brokerageShare,
            profitShare: newUser.profitShare,
            creditLimit: newUser.creditLimit,
            type: newUser.type,
            totalClients: 0,
            refCode: newUser.username.substring(0, 6).toUpperCase(),
            status: 'Active',
        };
        
        setUsers([...users, createdUser]);
        setOpenAddDialog(false);
        setNewUser({
            username: '',
            password: '',
            type: 'Broker',
            brokerageShare: 50,
            profitShare: 0,
            creditLimit: 0,
        });
    };

    // Handle edit user dialog
    const handleOpenEditDialog = (user: any) => {
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email || '',
            fullName: user.fullName || '',
            role: user.role || '',
            status: user.status,
            password: '',
            confirmPassword: '',
        });
        setOpenEditDialog(true);
    };

    // Handle delete user dialog
    const handleOpenDeleteDialog = (user: any) => {
        setCurrentUser(user);
        setOpenDeleteDialog(true);
    };

    const handleDeleteUser = () => {
        if (currentUser) {
            setUsers(users.filter(user => user.id !== currentUser.id));
        setOpenDeleteDialog(false);
        }
    };

    return (
        <PageContainer>
            <DarkBlueBox>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: 'white' }}>Username</Typography>
                        <StyledTextField
                            fullWidth
                            variant="outlined"
                                            size="small"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ mb: 2 }}
                                        />
                                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: 'white' }}>Account Status</Typography>
                        <FormControl fullWidth size="small">
                            <StyledSelect
                                value={accountStatus}
                                onChange={(e) => setAccountStatus(e.target.value as string)}
                                displayEmpty
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="Suspended">Suspended</MenuItem>
                            </StyledSelect>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <SearchButton variant="contained" onClick={handleSearch}>
                        SEARCH
                    </SearchButton>
                    <ResetButton variant="contained" startIcon={<RefreshIcon />} onClick={handleReset}>
                        RESET
                    </ResetButton>
                </Box>
            </DarkBlueBox>

            <Box sx={{ mt: 3, mb: 3 }}>
                <CreateUserButton 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                >
                    CREATE USER
                </CreateUserButton>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Showing 50 of 115 items.
                </Typography>
            </Box>

            <Paper sx={{ backgroundColor: '#1a2138' }}>
                <StyledTableContainer>
                    <Table>
                        <StyledTableHead>
                                        <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>Parent</StyledTableCell>
                                <StyledTableCell>Brokerage Share</StyledTableCell>
                                <StyledTableCell>Profit Share</StyledTableCell>
                                <StyledTableCell>Credit Limit</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Total Clients</StyledTableCell>
                                <StyledTableCell>Ref. Code</StyledTableCell>
                                <StyledTableCell>Account Status</StyledTableCell>
                                        </TableRow>
                        </StyledTableHead>
                                    <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell>{user.id}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <ActionButton size="small">
                                                <VisibilityIcon fontSize="small" />
                                            </ActionButton>
                                            <ActionButton size="small" onClick={() => handleOpenEditDialog(user)}>
                                                        <EditIcon fontSize="small" />
                                            </ActionButton>
                                            <ActionButton size="small">
                                                <FileDownloadIcon fontSize="small" />
                                            </ActionButton>
                                            <ActionButton size="small" onClick={() => handleOpenDeleteDialog(user)}>
                                                        <DeleteIcon fontSize="small" />
                                            </ActionButton>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell>{user.id}</StyledTableCell>
                                    <StyledTableCell>
                                        {user.username}
                                        <Typography variant="caption" display="block" sx={{ color: '#aaa' }}>
                                            ({user.realUsername})
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {user.parent}
                                        <Typography variant="caption" display="block" sx={{ color: '#aaa' }}>
                                            (admin: {user.parentId})
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>{user.brokerageShare.toFixed(2)}%</StyledTableCell>
                                    <StyledTableCell>{user.profitShare.toFixed(2)}%</StyledTableCell>
                                    <StyledTableCell>{user.creditLimit.toFixed(4)}</StyledTableCell>
                                    <StyledTableCell>{user.type}</StyledTableCell>
                                    <StyledTableCell>{user.totalClients}</StyledTableCell>
                                    <StyledTableCell>
                                        <RefCodeText>{user.refCode}</RefCodeText>
                                        <Box sx={{ mt: 1 }}>
                                            <GenerateButton variant="outlined" size="small">
                                                Generate
                                            </GenerateButton>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell>{user.status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                                    </TableBody>
                                </Table>
                </StyledTableContainer>
            </Paper>

                {/* Add User Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Create New User</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter the details for the new user.
                    </DialogContentText>
                                <TextField
                        autoFocus
                        margin="dense"
                                    label="Username"
                        type="text"
                                    fullWidth
                        variant="outlined"
                        value={newUser.username}
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                                />
                                <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                                    fullWidth
                        variant="outlined"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                                    <Select
                            value={newUser.type}
                            label="Type"
                            onChange={(e) => setNewUser({...newUser, type: e.target.value as string})}
                        >
                            <MenuItem value="Broker">Broker</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                    <TextField
                        margin="dense"
                        label="Brokerage Share (%)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={newUser.brokerageShare}
                        onChange={(e) => setNewUser({...newUser, brokerageShare: parseFloat(e.target.value)})}
                    />
                                <TextField
                        margin="dense"
                        label="Profit Share (%)"
                        type="number"
                                    fullWidth
                        variant="outlined"
                        value={newUser.profitShare}
                        onChange={(e) => setNewUser({...newUser, profitShare: parseFloat(e.target.value)})}
                                />
                                <TextField
                        margin="dense"
                        label="Credit Limit"
                        type="number"
                                    fullWidth
                        variant="outlined"
                        value={newUser.creditLimit}
                        onChange={(e) => setNewUser({...newUser, creditLimit: parseFloat(e.target.value)})}
                                />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button onClick={handleAddUser} variant="contained" color="primary">Create</Button>
                    </DialogActions>
                </Dialog>

                {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                                <TextField
                        autoFocus
                        margin="dense"
                                    label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                                    value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={currentUser?.type || ''}
                            label="Type"
                            onChange={(e) => setCurrentUser({...currentUser, type: e.target.value})}
                        >
                            <MenuItem value="Broker">Broker</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Brokerage Share (%)"
                        type="number"
                                    fullWidth
                        variant="outlined"
                        value={currentUser?.brokerageShare || 0}
                        onChange={(e) => setCurrentUser({...currentUser, brokerageShare: parseFloat(e.target.value)})}
                                />
                                <TextField
                        margin="dense"
                        label="Profit Share (%)"
                        type="number"
                                    fullWidth
                        variant="outlined"
                        value={currentUser?.profitShare || 0}
                        onChange={(e) => setCurrentUser({...currentUser, profitShare: parseFloat(e.target.value)})}
                                />
                                <TextField
                        margin="dense"
                        label="Credit Limit"
                        type="number"
                                    fullWidth
                        variant="outlined"
                        value={currentUser?.creditLimit || 0}
                        onChange={(e) => setCurrentUser({...currentUser, creditLimit: parseFloat(e.target.value)})}
                    />
                    <FormControl fullWidth margin="dense">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                            value={currentUser?.status || ''}
                                        label="Status"
                            onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                            <MenuItem value="Suspended">Suspended</MenuItem>
                                    </Select>
                                </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={() => {
                        setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
                        setOpenEditDialog(false);
                    }} variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete User Dialog */}
                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Are you sure you want to delete the user "{currentUser?.username}"? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                        <Button onClick={handleDeleteUser} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
        </PageContainer>
    );
};

export default UsersPage; 