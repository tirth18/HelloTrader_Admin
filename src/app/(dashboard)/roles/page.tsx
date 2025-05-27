'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Avatar,
  Grid,
  Alert,
  Tooltip,
  alpha,
  useTheme,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  VpnKey as KeyIcon,
  Security as SecurityIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as BrokerIcon,
} from '@mui/icons-material';
import { RolePermissionDialog } from './components/RolePermissionDialog';
import { Role, roleService } from '@/services/role-service';

export default function RoleManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRoles();
  }, [searchQuery]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await roleService.getRoles();
      
      // Apply search filter if searchQuery exists
      let filteredRoles = data;
      if (searchQuery) {
        filteredRoles = data.filter(role => 
          role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (role.description && role.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setRoles(filteredRoles);
      setError(null);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Failed to fetch roles. Please try again.');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setEditName(role.name);
    setEditDescription(role.description);
    setIsEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRole(null);
    setEditName('');
    setEditDescription('');
    setIsEditDialogOpen(true);
  };

  const handlePermissionsClick = (role: Role) => {
    setSelectedRole(role);
    setIsPermissionDialogOpen(true);
  };

  const handleSaveRole = async () => {
    if (!editName.trim()) {
      setError('Role name is required');
      return;
    }

    try {
      if (selectedRole) {
        // Update existing role
        await roleService.updateRole(selectedRole.id, {
          name: editName,
          description: editDescription,
        });
      } else {
        // Create new role
        await roleService.createRole({
          name: editName,
          description: editDescription,
        });
      }
      fetchRoles();
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      setEditName('');
      setEditDescription('');
      setError(null);
    } catch (error) {
      console.error('Error saving role:', error);
      setError('Failed to save role. Please try again.');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      await roleService.deleteRole(roleId);
      fetchRoles();
      setError(null);
    } catch (error) {
      console.error('Error deleting role:', error);
      setError('Failed to delete role. Please try again.');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  // Stat cards data
  const stats = [
    {
      title: 'Total Roles',
      value: roles.length,
      icon: <KeyIcon />,
      color: 'primary' as const,
      trend: 'Manage access levels'
    },
    {
      title: 'Admin Roles',
      value: roles.filter(role => role.name.toLowerCase().includes('admin')).length,
      icon: <AdminIcon />,
      color: 'error' as const,
      trend: 'Full system access'
    },
    {
      title: 'Broker Roles',
      value: roles.filter(role => role.name.toLowerCase().includes('broker')).length,
      icon: <BrokerIcon />,
      color: 'info' as const,
      trend: 'Trading permissions'
    },
    {
      title: 'Security',
      value: 'Role-based',
      icon: <SecurityIcon />,
      color: 'success' as const,
      trend: 'Access control'
    }
  ];

  return (
    <Box 
      component="main"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, md: 3 },
          overflow: 'auto',
          maxWidth: '100%'
        }}
      >
        {/* Header Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            gap: 2,
            width: '100%',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 0.5,
                color: theme.palette.primary.main,
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Role Management
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 500
              }}
            >
              Manage roles and permissions for system access control
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{ 
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '8px',
                height: '40px',
                px: 2,
                whiteSpace: 'nowrap',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`
                },
                transition: 'all 0.2s ease'
              }}
            >
              Add Role
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3, width: '100%' }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  bgcolor: `${theme.palette[stat.color].main}14`,
                  border: `1px solid ${theme.palette[stat.color].main}1f`,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${theme.palette[stat.color].main}14`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${theme.palette[stat.color].main}1f`
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          bgcolor: alpha(theme.palette[stat.color].main, 0.12),
                          color: theme.palette[stat.color].main
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette[stat.color].main, mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette[stat.color].main,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontWeight: 600
                      }}
                    >
                      {stat.trend}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search & Filter Panel */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 2.5,
            mb: 3,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
            <FilterIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Search Roles
            </Typography>
          </Stack>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={10}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by role name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    '& fieldset': {
                      borderColor: alpha(theme.palette.divider, 0.2),
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleReset}
                sx={{
                  height: '40px',
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Roles Table */}
        <Paper 
          elevation={0} 
          sx={{ 
            width: '100%',
            overflow: 'hidden',
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(roles) && roles.length > 0 ? (
                    roles.map((role) => (
                      <TableRow key={role.id}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                          },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                bgcolor: `${theme.palette.primary.main}15`,
                                color: 'primary.main',
                                fontSize: '0.875rem',
                                fontWeight: 600
                              }}
                            >
                              {role.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{role.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{role.description || '-'}</TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="Edit Role">
                              <IconButton 
                                size="small"
                                onClick={() => handleEditClick(role)}
                                sx={{ 
                                  color: 'primary.main',
                                  '&:hover': { 
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    transform: 'translateY(-2px)',
                                    transition: 'transform 0.2s'
                                  }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Permissions">
                              <IconButton 
                                size="small"
                                onClick={() => handlePermissionsClick(role)}
                                sx={{ 
                                  color: 'secondary.main',
                                  '&:hover': { 
                                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                    transform: 'translateY(-2px)',
                                    transition: 'transform 0.2s'
                                  }
                                }}
                              >
                                <SecurityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Role">
                              <IconButton 
                                size="small"
                                onClick={() => handleDeleteRole(role.id)}
                                sx={{ 
                                  color: 'error.main',
                                  '&:hover': { 
                                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                                    transform: 'translateY(-2px)',
                                    transition: 'transform 0.2s'
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Box py={3}>
                          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                            No roles found
                          </Typography>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<AddIcon />}
                            onClick={handleAddClick}
                          >
                            Add Role
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Edit/Create Role Dialog */}
        <Dialog 
          open={isEditDialogOpen} 
          onClose={() => setIsEditDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>
            {selectedRole ? 'Edit Role' : 'Create Role'}
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Role Name"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 1 }}>
            <Button 
              onClick={() => setIsEditDialogOpen(false)}
              variant="outlined"
              sx={{ borderRadius: 1.5 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveRole} 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: 1.5 }}
            >
              {selectedRole ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Permissions Dialog */}
        {selectedRole && (
          <RolePermissionDialog
            open={isPermissionDialogOpen}
            onClose={() => setIsPermissionDialogOpen(false)}
            roleId={selectedRole.id}
            roleName={selectedRole.name}
          />
        )}
      </Box>
    </Box>
  );
} 