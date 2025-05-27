import axiosInstance from './axiosInstance';
import { getAuthToken, debugLocalStorage } from '@/utils/tokenUtils';

export interface ChangeTransactionPasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangeTransactionPasswordResponse {
  success: boolean;
  message?: string;
}

export const changeTransactionPassword = async (
  data: ChangeTransactionPasswordRequest
): Promise<ChangeTransactionPasswordResponse> => {
  try {
    // Debug localStorage contents
    debugLocalStorage();
    
    // Check if token exists before making the request
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }

    console.log('Making API request to change transaction password...');
    console.log('Request data:', {
      currentPassword: '***',
      newPassword: '***',
      confirmNewPassword: '***'
    });

    const response = await axiosInstance.post('/api/admin/change_trans_Password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });

    console.log('API response:', response.data);

    return {
      success: true,
      message: response.data.message || 'Transaction password changed successfully',
    };
  } catch (error: any) {
    console.error('Error changing transaction password:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      throw new Error('Unauthorized. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid request. Please check your input.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to change transaction password. Please try again.');
    }
  }
}; 