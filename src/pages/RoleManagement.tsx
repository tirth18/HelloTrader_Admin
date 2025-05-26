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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Security as SecurityIcon } from '@mui/icons-material';
import { RolePermissionDialog } from '../components/RolePermissionDialog';
import { usePermission } from '../hooks/usePermission';

interface Role {
  id: number;
  name: string;
  description: string;
}

export const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const { hasPermission: canManageRoles } = usePermission('roles.manage');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
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
      const method = selectedRole ? 'PUT' : 'POST';
      const url = selectedRole ? `/api/roles/${selectedRole.id}` : '/api/roles';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      setIsRoleDialogOpen(false);
      setSelectedRole(null);
      setNewRole({ name: '', description: '' });
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;

    try {
      await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Role Management
        </Typography>
        {canManageRoles && (
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
        )}
      </Box>

      <TableContainer component={Paper}>
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
                    <>
                      <IconButton onClick={() => handleEditRole(role)} color="primary" title="Edit Role">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditPermissions(role)} color="primary" title="Manage Permissions">
                        <SecurityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRole(role.id)} color="error" title="Delete Role">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Role Edit Dialog */}
      <Dialog
        open={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
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