import { useState, useEffect, useCallback } from 'react';
import { PermissionService } from '../services/permission-service';

const permissionService = new PermissionService();

export const usePermission = (permissionCode: string) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkPermission = useCallback(async () => {
    try {
      setLoading(true);
      const result = await permissionService.checkPermission(permissionCode);
      setHasPermission(result);
    } catch (error) {
      console.error('Error checking permission:', error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  }, [permissionCode]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { hasPermission, loading };
};

export const usePermissions = (permissionCodes: string[]) => {
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const checkPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const results = await Promise.all(
        permissionCodes.map(code => permissionService.checkPermission(code))
      );
      const permissionMap = permissionCodes.reduce((acc, code, index) => {
        acc[code] = results[index];
        return acc;
      }, {} as Record<string, boolean>);
      setPermissions(permissionMap);
    } catch (error) {
      console.error('Error checking permissions:', error);
      const failedPermissionMap = permissionCodes.reduce((acc, code) => {
        acc[code] = false;
        return acc;
      }, {} as Record<string, boolean>);
      setPermissions(failedPermissionMap);
    } finally {
      setLoading(false);
    }
  }, [permissionCodes]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return { permissions, loading };
}; 