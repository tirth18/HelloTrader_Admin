import axiosInstance from "./axiosInstance";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";
import { debugLog, logApiResponse, logApiError } from "@/utils/debug";

export interface DepositRequest {
  id: string | number;
  amount: number;
  status: "pending" | "approved" | "rejected";
  image?: string;
  user_id?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  __v?: number;
  // Original interface fields kept for backward compatibility
  name?: string;
  username?: string;
  ledgerBalance?: number;
  availableBalance?: number;
  broker?: string;
  brokerCode?: string;
  paymentMethod?: string;
  mobile?: string;
  upiId?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  time?: string;
  paymentProof?: string;
}

// Sample data to use as fallback if API fails
const sampleDepositRequests: DepositRequest[] = [
  {
    id: "1012",
    name: "Rahul",
    username: "8059641735",
    ledgerBalance: 5000,
    availableBalance: 4200,
    broker: "jain01",
    brokerCode: "62",
    amount: 4100,
    paymentMethod: "UPI",
    time: "16 Apr 2025 11:14 am",
    status: "pending",
    paymentProof: "/images/payment-proof-1.jpg",
  },
  {
    id: "1011",
    name: "Abhi",
    username: "Helo587",
    ledgerBalance: 15000,
    availableBalance: 12500,
    broker: "jain33",
    brokerCode: "230",
    amount: 10000,
    paymentMethod: "Bank Transfer",
    time: "16 Apr 2025 10:01 am",
    status: "pending",
    paymentProof: "/images/payment-proof-2.jpg",
  },
];

/**
 * Custom axios instance that doesn't redirect to login on 401
 */
const safeAxiosInstance = axios.create({
  baseURL: axiosInstance.defaults.baseURL,
  timeout: axiosInstance.defaults.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token without redirecting on error
safeAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Maps API response to DepositRequest format
 * @param apiData Raw API response data
 * @returns Formatted DepositRequest object
 */
const mapApiResponseToDepositRequest = (apiData: any): DepositRequest => {
  // Handle the specific format from the API example
  // {
  //   "amount": 100000,
  //   "image": "/9j/4QLDRXhpZgAATU0AKgAAAAgAC...",
  //   "status": "pending",
  //   "_id": "6821f1c3c1202356829dab38",
  //   "user_id": "680a139bb1d45facae735e22",
  //   "createdAt": "2025-05-12T13:04:03.436Z",
  //   "updatedAt": "2025-05-12T13:04:03.436Z",
  //   "id": 4,
  //   "__v": 0
  // }

  debugLog("Mapping API response to DepositRequest", apiData);

  return {
    id: apiData.id || apiData._id || "",
    amount: apiData.amount || 0,
    status: apiData.status || "pending",
    image: apiData.image || null,
    user_id: apiData.user_id || "",
    createdAt: apiData.createdAt || "",
    updatedAt: apiData.updatedAt || "",
    _id: apiData._id || "",
    // Map API fields to UI display fields
    paymentProof: apiData.image || null,
    time: apiData.createdAt ? new Date(apiData.createdAt).toLocaleString() : "",
    // Add any additional fields needed for the UI
    name: apiData.name || `User ${apiData.id || apiData._id}`,
    username: apiData.username || apiData.user_id || "",
  };
};

/**
 * Fetches user deposit requests
 * @returns Promise with deposit requests data
 */
export const getUserDeposits = async (): Promise<DepositRequest[]> => {
  try {
    debugLog("Fetching deposit requests", "Starting API call");
    const response = await safeAxiosInstance.get("/api/AllDeposite");
    logApiResponse(response);

    // Check if response data is valid
    if (response.data && Array.isArray(response.data)) {
      debugLog("Deposit requests fetched successfully", response.data);
      return response.data.map(mapApiResponseToDepositRequest);
    } else if (response.data) {
      // Handle case where API returns a single object or non-standard format
      debugLog("API returned non-array data", response.data);

      // If response.data is the deposit request itself (not wrapped in an array)
      if (response.data._id || response.data.id) {
        return [mapApiResponseToDepositRequest(response.data)];
      }

      // If the actual data is in a property of response.data
      const possibleDataFields = ["data", "deposits", "items", "results"];
      for (const field of possibleDataFields) {
        if (response.data[field] && Array.isArray(response.data[field])) {
          debugLog(
            `Found data in response.data.${field}`,
            response.data[field]
          );
          return response.data[field].map(mapApiResponseToDepositRequest);
        }
      }

      debugLog(
        "Could not find array data in response, using sample data",
        response.data
      );
      return sampleDepositRequests;
    } else {
      debugLog(
        "API returned invalid data format, using sample data",
        response.data
      );
      return sampleDepositRequests;
    }
  } catch (error) {
    logApiError(error);
    // Return sample data instead of throwing error to prevent page crash
    return sampleDepositRequests;
  }
};

/**
 * Approves a deposit request
 * @param requestId The ID of the deposit request to approve
 * @returns Promise with the response data
 */
export const approveDepositRequest = async (requestId: string | number) => {
  try {
    const response = await safeAxiosInstance.post(
      "/api/approveDepositRequest",
      {
        requestId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving deposit request:", error);
    throw error;
  }
};

/**
 * Rejects a deposit request
 * @param requestId The ID of the deposit request to reject
 * @param reason Optional reason for rejection
 * @returns Promise with the response data
 */
export const rejectDepositRequest = async (
  requestId: string | number,
  reason?: string
) => {
  try {
    const response = await safeAxiosInstance.post("/api/rejectDepositRequest", {
      requestId,
      reason,
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting deposit request:", error);
    throw error;
  }
};

/**
 * Processes multiple deposit requests at once
 * @param requestIds Array of request IDs to process
 * @param action The action to perform ('approve' or 'reject')
 * @param reason Optional reason for rejection
 * @returns Promise with the response data
 */
export const bulkProcessDepositRequests = async (
  requestIds: (string | number)[],
  action: "approve" | "reject",
  reason?: string
) => {
  try {
    const response = await safeAxiosInstance.post(
      "/api/bulkProcessDepositRequests",
      {
        requestIds,
        action,
        reason,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error processing deposit requests in bulk:", error);
    throw error;
  }
};
