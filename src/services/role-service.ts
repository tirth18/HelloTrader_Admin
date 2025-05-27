import axiosInstance from './axiosInstance';

export interface Role {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

class RoleService {
  private baseUrl = '/roles';

  async getRoles(skip = 0, limit = 100): Promise<Role[]> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new Error('Failed to fetch roles. Please check if the backend server is running.');
    }
  }

  async getRole(id: number): Promise<Role> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching role ${id}:`, error);
      throw new Error('Failed to fetch role details');
    }
  }

  async createRole(roleData: CreateRoleDto): Promise<Role> {
    try {
      const response = await axiosInstance.post(this.baseUrl, roleData);
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw new Error('Failed to create role');
    }
  }

  async updateRole(id: number, roleData: UpdateRoleDto): Promise<Role> {
    try {
      const response = await axiosInstance.put(`${this.baseUrl}/${id}`, roleData);
      return response.data;
    } catch (error) {
      console.error(`Error updating role ${id}:`, error);
      throw new Error('Failed to update role');
    }
  }

  async deleteRole(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting role ${id}:`, error);
      throw new Error('Failed to delete role');
    }
  }

  async assignRoleToUser(roleId: number, userId: number): Promise<void> {
    try {
      await axiosInstance.post(`${this.baseUrl}/${roleId}/users/${userId}`);
    } catch (error) {
      console.error(`Error assigning role ${roleId} to user ${userId}:`, error);
      throw new Error('Failed to assign role to user');
    }
  }

  async removeRoleFromUser(roleId: number, userId: number): Promise<void> {
    try {
      await axiosInstance.delete(`${this.baseUrl}/${roleId}/users/${userId}`);
    } catch (error) {
      console.error(`Error removing role ${roleId} from user ${userId}:`, error);
      throw new Error('Failed to remove role from user');
    }
  }
}

export const roleService = new RoleService(); 