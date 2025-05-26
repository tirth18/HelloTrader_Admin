"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Paper,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { useRouter } from "next/navigation";

// Styled components
const PageContainer = styled(Box)(() => ({
  backgroundColor: '#141b2d',
  minHeight: '100vh',
  width: '100%',
  color: 'white',
}));

const DarkBlueBox = styled(Box)(() => ({
  backgroundColor: '#1a2138',
  color: 'white',
  padding: '24px',
  marginBottom: '24px',
}));

const SearchButton = styled(Button)(() => ({
  backgroundColor: '#2196f3',
  color: 'white',
  textTransform: 'uppercase',
  padding: '8px 24px',
  borderRadius: '4px',
  fontWeight: 'bold',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
}));

const ResetButton = styled(Button)(() => ({
  backgroundColor: '#2196f3',
  color: 'white',
  textTransform: 'uppercase',
  padding: '8px 24px',
  borderRadius: '4px',
  fontWeight: 'bold',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#1976d2',
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

const StyledTableContainer = styled(TableContainer)(() => ({
  backgroundColor: '#1a2138',
  color: 'white',
  borderRadius: 0,
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
    backgroundColor: '#232e48',
    borderRadius: 0,
    height: '40px',
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
    padding: '8px 14px',
    color: 'white',
  },
}));

const StyledSelect = styled(Select)(() => ({
  backgroundColor: '#232e48',
  borderRadius: 0,
  height: '40px',
  color: 'white',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    color: 'white',
  },
  '& .MuiSelect-select': {
    padding: '8px 14px',
  },
}));

const RefCodeText = styled(Typography)(() => ({
  color: '#00bcd4',
  fontWeight: 'bold',
}));

const PageTitle = styled(Typography)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '24px',
  marginBottom: '20px',
}));

const InputLabel = styled(Typography)(() => ({
  color: 'white',
  fontSize: '14px',
  marginBottom: '8px',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [accountStatus, setAccountStatus] = useState('All');
  const router = useRouter();
  
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
      <Box sx={{ p: 3 }}>
        <PageTitle>Users</PageTitle>
        
        <DarkBlueBox>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
              <Box sx={{ flex: 1 }}>
                <InputLabel>Username</InputLabel>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder=""
                  InputProps={{
                    sx: { height: '40px' }
                  }}
                />
        </Box>
              
              <Box sx={{ flex: 1 }}>
                <InputLabel>Account Status</InputLabel>
                <FormControl fullWidth size="small">
                  <StyledSelect
                    value={accountStatus}
                    onChange={(e) => setAccountStatus(e.target.value as string)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Account Status' }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <SearchButton variant="contained" onClick={handleSearch}>
                SEARCH
              </SearchButton>
              <ResetButton variant="contained" onClick={handleReset} startIcon={<RefreshIcon />}>
                RESET
              </ResetButton>
            </Box>
          </Box>
        </DarkBlueBox>

        <Box sx={{ mt: 3, mb: 3 }}>
          <CreateUserButton 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => router.push("/users/create")}
          >
            CREATE USER
          </CreateUserButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Showing 50 of 115 items.
          </Typography>
      </Box>

        <StyledTableContainer>
          <Paper sx={{ backgroundColor: '#1a2138', borderRadius: 0 }}>
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
                        <ActionButton size="small" onClick={() => router.push(`/users/view/${user.id}`)}>
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
          </Paper>
        </StyledTableContainer>

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
              <Select
                value={currentUser?.type || ''}
                displayEmpty
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
              <Select
                value={currentUser?.status || ''}
                displayEmpty
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
    </Box>
    </PageContainer>
  );
};

export default UsersPage; 