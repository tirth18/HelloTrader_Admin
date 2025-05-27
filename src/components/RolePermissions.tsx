import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Typography, Paper, Grid, Button, CircularProgress } from '@mui/material';
import { PermissionService } from '../services/permission-service';
import { ModulePermission, Permission } from '../types/permissions';

interface RolePermissionsProps {
  roleId: number;
  onSave: () => void;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({ roleId, onSave }) => {
  const [modulePermissions, setModulePermissions] = useState<ModulePermission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const permissionService = new PermissionService();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const [allPermissions, rolePermissions] = await Promise.all([
          permissionService.getAllPermissions(),
          permissionService.getRolePermissions(roleId)
        ]);
        
        setModulePermissions(allPermissions);
        setSelectedPermissions(new Set(rolePermissions.map(p => p.id)));
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [roleId]);

  const handlePermissionChange = (permissionId: number) => {
    const newSelectedPermissions = new Set(selectedPermissions);
    if (newSelectedPermissions.has(permissionId)) {
      newSelectedPermissions.delete(permissionId);
    } else {
      newSelectedPermissions.add(permissionId);
    }
    setSelectedPermissions(newSelectedPermissions);
  };

  const handleModuleSelectAll = (module: string, checked: boolean) => {
    const modulePerms = modulePermissions.find(m => m.module === module)?.permissions || [];
    const newSelectedPermissions = new Set(selectedPermissions);
    
    modulePerms.forEach(permission => {
      if (checked) {
        newSelectedPermissions.add(permission.id);
      } else {
        newSelectedPermissions.delete(permission.id);
      }
    });
    
    setSelectedPermissions(newSelectedPermissions);
  };

  const isModuleFullySelected = (module: string): boolean => {
    const modulePerms = modulePermissions.find(m => m.module === module)?.permissions || [];
    return modulePerms.every(permission => selectedPermissions.has(permission.id));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await permissionService.updateRolePermissions(roleId, Array.from(selectedPermissions));
      onSave();
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Role Permissions
      </Typography>
      
      <Grid container spacing={2}>
        {modulePermissions.map((modulePermission) => (
          <Grid item xs={12} key={modulePermission.module}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isModuleFullySelected(modulePermission.module)}
                      onChange={(e) => handleModuleSelectAll(modulePermission.module, e.target.checked)}
                      indeterminate={
                        modulePermission.permissions.some(p => selectedPermissions.has(p.id)) &&
                        !isModuleFullySelected(modulePermission.module)
                      }
                    />
                  }
                  label={<Typography variant="subtitle1" fontWeight="bold">{modulePermission.module}</Typography>}
                />
              </Box>
              
              <Grid container spacing={2}>
                {modulePermission.permissions.map((permission) => (
                  <Grid item xs={12} sm={6} md={4} key={permission.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPermissions.has(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
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
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <CircularProgress size={24} /> : 'Save Permissions'}
        </Button>
      </Box>
    </Box>
  );
};

export default RolePermissions; 