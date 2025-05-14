import axiosInstance from './axiosInstance';
import { Permission, ModulePermission, ALL_PERMISSIONS } from '../types/permissions';

export class PermissionService {
  async getAllPermissions(): Promise<ModulePermission[]> {
    try {
      const response = await axiosInstance.get('/permissions');
      return response.data;
    } catch (error) {
      console.error('Error fetching all permissions:', error);
      return ALL_PERMISSIONS; // Fallback to predefined permissions
    }
  }

  async getRolePermissions(roleId: number): Promise<Permission[]> {
    try {
      const response = await axiosInstance.get(`/roles/${roleId}/permissions`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching permissions for role ${roleId}:`, error);
      // Return empty array for now
      return [];
    }
  }

  async updateRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    try {
      await axiosInstance.put(`/roles/${roleId}/permissions`, permissionIds);
    } catch (error) {
      console.error(`Error updating permissions for role ${roleId}:`, error);
      throw error;
    }
  }

  async checkPermission(permissionCode: string): Promise<boolean> {
    try {
      const response = await axiosInstance.get(`/permissions/check/${permissionCode}`);
      return response.data.hasPermission;
    } catch (error) {
      console.error(`Error checking permission ${permissionCode}:`, error);
      return false;
    }
  }
} 