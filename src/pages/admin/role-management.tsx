import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Security as SecurityIcon } from '@mui/icons-material';
import { usePermission } from '../../hooks/usePermission';
import { RolePermissionDialog } from '../../components/RolePermissionDialog';
import { PageHeader } from '../../components/PageHeader';

interface Role {
  id: number;
  name: string;
  description: string;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);

  const { hasPermission: canManageRoles } = usePermission('roles.manage');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setNewRole({ name: role.name, description: role.description });
    setIsRoleDialogOpen(true);
  };

  const handleEditPermissions = (role: Role) => {
    setSelectedRole(role);
    setIsPermissionDialogOpen(true);
  };

  const handleSaveRole = async () => {
    try {
      if (!newRole.name.trim()) {
        alert('Role name is required');
        return;
      }

      const method = selectedRole ? 'PUT' : 'POST';
      const url = selectedRole ? `/api/roles/${selectedRole.id}` : '/api/roles';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) throw new Error('Failed to save role');

      setIsRoleDialogOpen(false);
      setSelectedRole(null);
      setNewRole({ name: '', description: '' });
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Failed to save role. Please try again.');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete role');
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false}>
      <PageHeader 
        title="Role Management"
        action={
          canManageRoles && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedRole(null);
                setNewRole({ name: '', description: '' });
                setIsRoleDialogOpen(true);
              }}
            >
              Add New Role
            </Button>
          )
        }
      />

      <Paper sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell align="right">
                    {canManageRoles && (
                      <Box>
                        <IconButton 
                          onClick={() => handleEditRole(role)} 
                          color="primary" 
                          title="Edit Role"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleEditPermissions(role)} 
                          color="primary" 
                          title="Manage Permissions"
                          size="small"
                        >
                          <SecurityIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteRole(role.id)} 
                          color="error" 
                          title="Delete Role"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Role Edit Dialog */}
      <Dialog
        open={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Create New Role'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRoleDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveRole} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Management Dialog */}
      {selectedRole && (
        <RolePermissionDialog
          open={isPermissionDialogOpen}
          onClose={() => {
            setIsPermissionDialogOpen(false);
            setSelectedRole(null);
          }}
          roleId={selectedRole.id}
          roleName={selectedRole.name}
        />
      )}
    </Container>
  );
};

export default RoleManagement; 