import React, { useState, useEffect } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Permission } from '../types/permissions';

interface RolePermissionDialogProps {
  open: boolean;
  onClose: () => void;
  roleId: number;
  roleName: string;
}

interface ModulePermissions {
  [key: string]: Permission[];
}

export const RolePermissionDialog: React.FC<RolePermissionDialogProps> = ({
  open,
  onClose,
  roleId,
  roleName,
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modulePermissions, setModulePermissions] = useState<ModulePermissions>({});
  const [selectedPermissions, setSelectedPermissions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open) {
      fetchPermissions();
    }
  }, [open, roleId]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      // Fetch all available permissions
      const allPermsResponse = await fetch('/api/permissions');
      const allPermissions: Permission[] = await allPermsResponse.json();

      // Group permissions by module
      const grouped = allPermissions.reduce((acc, perm) => {
        if (!acc[perm.module]) {
          acc[perm.module] = [];
        }
        acc[perm.module].push(perm);
        return acc;
      }, {} as ModulePermissions);
      setModulePermissions(grouped);

      // Fetch role's current permissions
      const rolePermsResponse = await fetch(`/api/roles/${roleId}/permissions`);
      const rolePermissions: Permission[] = await rolePermsResponse.json();
      setSelectedPermissions(new Set(rolePermissions.map(p => p.id)));
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await fetch(`/api/roles/${roleId}/permissions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissionIds: Array.from(selectedPermissions),
        }),
      });
      onClose();
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleModuleChange = (module: string, checked: boolean) => {
    const newSelected = new Set(selectedPermissions);
    modulePermissions[module].forEach(permission => {
      if (checked) {
        newSelected.add(permission.id);
      } else {
        newSelected.delete(permission.id);
      }
    });
    setSelectedPermissions(newSelected);
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    const newSelected = new Set(selectedPermissions);
    if (checked) {
      newSelected.add(permissionId);
    } else {
      newSelected.delete(permissionId);
    }
    setSelectedPermissions(newSelected);
  };

  const isModuleFullySelected = (module: string): boolean => {
    return modulePermissions[module]?.every(permission => selectedPermissions.has(permission.id)) ?? false;
  };

  const isModulePartiallySelected = (module: string): boolean => {
    const modulePerms = modulePermissions[module] || [];
    return modulePerms.some(permission => selectedPermissions.has(permission.id)) && 
           !modulePerms.every(permission => selectedPermissions.has(permission.id));
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
        <Box sx={{ mt: 2 }}>
          {Object.entries(modulePermissions).map(([module, permissions]) => (
            <Accordion key={module} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FormControlLabel
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  control={
                    <Checkbox
                      checked={isModuleFullySelected(module)}
                      indeterminate={isModulePartiallySelected(module)}
                      onChange={(e) => handleModuleChange(module, e.target.checked)}
                    />
                  }
                  label={<Typography fontWeight="bold">{module}</Typography>}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
                  {permissions.map((permission) => (
                    <FormControlLabel
                      key={permission.id}
                      control={
                        <Checkbox
                          checked={selectedPermissions.has(permission.id)}
                          onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2">{permission.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {permission.description}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </Box>
              </AccordionDetails>
              <Divider />
            </Accordion>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 