import axiosInstance from "../lib/axios";

export interface ActionMessage {
  id: string;
  message: string;
  createdAt: string;
}

export interface ActionLedgerResponse {
  messages: ActionMessage[];
  total: number;
}

export const actionLedgerService = {
  // Get all messages with optional search query and pagination
  getMessages: async (
    search?: string,
    page: number = 0,
    pageSize: number = 10
  ): Promise<ActionLedgerResponse> => {
    try {
      const params = {
        ...(search ? { search } : {}),
        page,
        pageSize,
      };

      const response = await axiosInstance.get("/api/action-ledger", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching action ledger messages:", error);
      throw error;
    }
  },
};
