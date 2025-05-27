import axios from "axios";
import { API_BASE_URL } from "@/config";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Change admin password using the specific API endpoint format
 * @param data - Password change data
 * @returns Promise with the response
 */
export const changeAdminPassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/admin/changeAdminPassword`,
      data,
      {
        headers: {
          Authorization: token, // Using token directly as shown in curl command
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Password changed successfully",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to change password"
    );
  }
};
