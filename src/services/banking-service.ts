import axiosInstance from "./axiosInstance";
import { debugLog } from "@/utils/debug";

export interface BankAccount {
  id?: number;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type?: string;
  is_primary: boolean;
  is_verified?: boolean;
  upi_id?: string;
  phone_pe?: string;
  google_pay?: string;
  paytm?: string;
  qr_code?: string;
}

/**
 * Get all bank accounts for the current user
 */
export const getBankAccounts = async (): Promise<BankAccount[]> => {
  try {
    const response = await axiosInstance.get("/api/banking/accounts");
    debugLog("getBankAccounts response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    throw error;
  }
};

/**
 * Create a new bank account
 */
export const createBank = async (
  bankData: Partial<BankAccount>
): Promise<BankAccount> => {
  try {
    const response = await axiosInstance.post(
      "/api/banking/accounts",
      bankData
    );
    debugLog("createBank response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating bank account:", error);
    throw error;
  }
};

/**
 * Update an existing bank account
 */
export const updateBank = async (
  id: number,
  bankData: Partial<BankAccount>
): Promise<BankAccount> => {
  try {
    const response = await axiosInstance.put(
      `/api/banking/accounts/${id}`,
      bankData
    );
    debugLog("updateBank response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating bank account with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a bank account
 */
export const deleteBank = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/banking/accounts/${id}`);
    debugLog("Bank account deleted successfully:", id);
  } catch (error) {
    console.error(`Error deleting bank account with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Set a bank account as primary
 */
export const setPrimaryBank = async (id: number): Promise<BankAccount> => {
  try {
    const response = await axiosInstance.put(
      `/api/banking/accounts/${id}/primary`,
      {}
    );
    debugLog("setPrimaryBank response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error setting bank account with ID ${id} as primary:`,
      error
    );
    throw error;
  }
};
