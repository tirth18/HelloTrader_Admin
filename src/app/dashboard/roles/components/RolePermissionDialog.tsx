'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
import { PermissionService } from '@/services/permission-service';

interface RolePermissionDialogProps {
  open: boolean;
  onClose: () => void;
  roleId: number;
  roleName: string;
}

interface Permission {
  id: number;
  code: string;
  name: string;
  module: string;
  description: string;
}

interface ModulePermission {
  module: string;
  permissions: Permission[];
}

interface GroupedPermissions {
  [key: string]: Permission[];
}

export function RolePermissionDialog({ open, onClose, roleId, roleName }: RolePermissionDialogProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({});

  const permissionService = new PermissionService();

  useEffect(() => {
    if (open) {
      fetchPermissions();
    }
  }, [open, roleId]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all available permissions
      const allPerms = await permissionService.getAllPermissions();
      // Flatten module permissions into a single array of permissions
      const flattenedPermissions = allPerms.flatMap(mp => mp.permissions);
      setAllPermissions(flattenedPermissions);

      // Fetch role's current permissions
      const rolePerms = await permissionService.getRolePermissions(roleId);
      setSelectedPermissions(rolePerms.map(p => p.id));

      // Group permissions by module
      const grouped = flattenedPermissions.reduce((acc: GroupedPermissions, curr) => {
        if (!acc[curr.module]) {
          acc[curr.module] = [];
        }
        acc[curr.module].push(curr);
        return acc;
      }, {});
      setGroupedPermissions(grouped);
    } catch (err) {
      setError('Failed to load permissions. Please try again.');
      console.error('Error fetching permissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await permissionService.updateRolePermissions(roleId, selectedPermissions);
      onClose();
    } catch (err) {
      setError('Failed to save permissions. Please try again.');
      console.error('Error saving permissions:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleModuleSelectAll = (module: string, checked: boolean) => {
    const modulePermissionIds = groupedPermissions[module].map(p => p.id);
    setSelectedPermissions(prev => {
      if (checked) {
        return Array.from(new Set([...prev, ...modulePermissionIds]));
      } else {
        return prev.filter(id => !modulePermissionIds.includes(id));
      }
    });
  };

  const isModuleFullySelected = (module: string) => {
    return groupedPermissions[module].every(p => selectedPermissions.includes(p.id));
  };

  const isModulePartiallySelected = (module: string) => {
    const modulePermissions = groupedPermissions[module];
    const selectedCount = modulePermissions.filter(p => selectedPermissions.includes(p.id)).length;
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  };

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  if (loading) {
    return (
      <Dialog open={open} maxWidth="md" fullWidth>
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Manage Permissions - {roleName}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {Object.entries(groupedPermissions).map(([module, permissions]) => (
          <Box key={module} mb={3}>
            <Box mb={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isModuleFullySelected(module)}
                    indeterminate={isModulePartiallySelected(module)}
                    onChange={(e) => handleModuleSelectAll(module, e.target.checked)}
                  />
                }
                label={<Typography variant="subtitle1" fontWeight="500">{module}</Typography>}
              />
            </Box>
            <Box pl={4}>
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      size="small"
                    />
                  }
                  label={permission.name}
                />
              ))}
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={saving}
          startIcon={saving ? <CircularProgress size={20} /> : null}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
} 