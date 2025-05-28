import axiosInstance from "./axiosInstance";

export interface OptionScript {
  _id: string;
  symbol: string;
  aboveLtp: number;
  belowLtp: number;
  segment: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export const optionScriptService = {
  // Get all option scripts
  getOptionScripts: async (): Promise<OptionScript[]> => {
    try {
      const response = await axiosInstance.get("/api/getOptionScript");
      return response.data;
    } catch (error) {
      console.error("Error fetching option scripts:", error);
      throw error;
    }
  },

  // Update option script
  updateOptionScript: async (
    id: string,
    data: Partial<OptionScript>
  ): Promise<OptionScript> => {
    try {
      const response = await axiosInstance.put(
        `/api/updateOptionScript/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating option script:", error);
      throw error;
    }
  },

  // Create option script
  createOptionScript: async (
    data: Omit<OptionScript, "_id" | "createdAt" | "updatedAt" | "deleted_at">
  ): Promise<OptionScript> => {
    try {
      const response = await axiosInstance.post(
        "/api/createOptionScript",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating option script:", error);
      throw error;
    }
  },

  // Delete option script
  deleteOptionScript: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/deleteOptionScript/${id}`);
    } catch (error) {
      console.error("Error deleting option script:", error);
      throw error;
    }
  },
};
