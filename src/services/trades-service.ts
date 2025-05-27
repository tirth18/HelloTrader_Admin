import axiosInstance from './axiosInstance';
import { getAuthToken, debugLocalStorage } from '@/utils/tokenUtils';

export interface ClosedTrade {
  id: string;
  scrip: string;
  segment: string;
  userId: string;
  username: string;
  buyRate: string | number;
  sellRate: string | number;
  lotsUnits: string | number;
  profit: string | number;
  // Additional fields that might be returned by the API
  tradeId?: string;
  symbol?: string;
  quantity?: number;
  entryPrice?: number;
  exitPrice?: number;
  pnl?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  closedAt?: string;
  // Alternative field names that API might use
  name?: string;
  buy_rate?: string | number;
  sell_rate?: string | number;
  lots?: string | number;
  units?: string | number;
  timeDiff?: string | number;
  time_diff?: string | number;
  timeDifferenceInSeconds?: string | number;
  boughtAt?: string;
  bought_at?: string;
  Bought_at?: string;
  soldAt?: string;
  sold_at?: string;
  Sold_at?: string;
  _id?: string;
  script?: string;
  user_id?: string;
}

export interface ClosedTradesRequest {
  page?: number;
  limit?: number;
  timeDiff?: string;
  scrip?: string;
  username?: string;
}

export interface ClosedTradesResponse {
  success: boolean;
  data: ClosedTrade[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  message?: string;
}

export interface UpdateTradeRequest {
  buy_rate: number;
  sell_rate: number;
  lots: number;
  units: number;
}

export interface UpdateTradeResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const updateTradeByAdmin = async (
  tradeId: string,
  data: UpdateTradeRequest
): Promise<UpdateTradeResponse> => {
  try {
    // Debug localStorage contents
    debugLocalStorage();
    
    // Check if token exists before making the request
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }

    console.log('Making API request to update trade...');
    console.log('Trade ID:', tradeId);
    console.log('Update data:', data);

    const endpoint = `/api/updateTradeByAdmin/${tradeId}`;
    console.log('Full API endpoint:', `${axiosInstance.defaults.baseURL}${endpoint}`);

    const response = await axiosInstance.post(endpoint, data);

    console.log('API response:', response.data);

    return {
      success: true,
      message: response.data.message || 'Trade updated successfully',
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error updating trade:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      throw new Error('Unauthorized. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid request data.');
    } else if (error.response?.status === 404) {
      throw new Error('Trade not found.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to update trade. Please try again.');
    }
  }
};

export const getClosedTrades = async (
  params: ClosedTradesRequest = {}
): Promise<ClosedTradesResponse> => {
  try {
    // Debug localStorage contents
    debugLocalStorage();
    
    // Check if token exists before making the request
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }

    // Set default values
    const { page = 1, limit = 10, timeDiff, scrip, username } = params;

    console.log('Making API request to get closed trades...');
    console.log('Request params:', { page, limit, timeDiff, scrip, username });

    // Build query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional filters
    if (timeDiff) queryParams.append('timeDiff', timeDiff);
    if (scrip) queryParams.append('scrip', scrip);
    if (username) queryParams.append('username', username);

    const endpoint = `/api/getAllTradeByStatus/closed?${queryParams.toString()}`;
    console.log('Full API endpoint:', `${axiosInstance.defaults.baseURL}${endpoint}`);

    const response = await axiosInstance.get(endpoint);

    console.log('API response:', response.data);

    // Transform the response to match our interface
    // Handle different possible response structures
    let trades = [];
    let total = 0;
    
    if (Array.isArray(response.data)) {
      // If response.data is directly an array
      trades = response.data;
      total = response.data.length;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      // If trades are in response.data.data
      trades = response.data.data;
      total = response.data.total || response.data.count || response.data.data.length;
    } else if (response.data.trades && Array.isArray(response.data.trades)) {
      // If trades are in response.data.trades
      trades = response.data.trades;
      total = response.data.total || response.data.count || response.data.trades.length;
    } else {
      console.warn('Unexpected API response structure:', response.data);
      trades = [];
      total = 0;
    }

    const transformedData: ClosedTradesResponse = {
      success: true,
      data: trades,
      total: total,
      page: response.data.page || page,
      limit: response.data.limit || limit,
      totalPages: response.data.totalPages || Math.ceil(total / limit),
      message: response.data.message,
    };

    return transformedData;
  } catch (error: any) {
    console.error('Error fetching closed trades:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      throw new Error('Unauthorized. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid request parameters.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to fetch closed trades. Please try again.');
    }
  }
}; 