import axios from "axios";
import { API_BASE_URL } from "@/config";

// Define interfaces for script data
export interface ScriptDataItem {
  id: number;
  scripId: string;
  exchangeTime: string;
  systemTime: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  ltp: number;
}

// Script data service for API calls
export const scriptDataService = {
  // Get script data by date, time and script
  getScriptData: async (
    date: Date,
    hour: string,
    minute: string,
    script: string
  ): Promise<ScriptDataItem[]> => {
    try {
      const formattedDate = formatDate(date);
      const response = await axios.get(`${API_BASE_URL}/api/script-data`, {
        params: {
          date: formattedDate,
          time: `${hour}:${minute}`,
          script,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching script data:", error);
      throw error;
    }
  },

  // Get available scripts
  getScripts: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/scripts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching scripts:", error);
      throw error;
    }
  },
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
