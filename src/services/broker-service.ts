import axios from 'axios';
import { Broker } from '../types';

// Define the base URL for broker API endpoints
const API_URL = '/api/brokers';

/**
 * Fetch brokers with optional filtering
 */
export const fetchBrokers = async (filters?: { username?: string; accountStatus?: string }) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching brokers:', error);
    throw error;
  }
};

/**
 * Get a single broker by ID
 */
export const getBrokerById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching broker with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new broker
 */
export const createBroker = async (brokerData: Omit<Broker, 'id'>) => {
  try {
    const response = await axios.post(API_URL, brokerData);
    return response.data;
  } catch (error) {
    console.error('Error creating broker:', error);
    throw error;
  }
};

/**
 * Update an existing broker
 */
export const updateBroker = async (id: string, brokerData: Partial<Broker>) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, brokerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating broker with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a broker by ID
 */
export const deleteBroker = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting broker with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deposit funds to a broker account
 */
export const depositFunds = async (id: string, amount: number, notes?: string) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/deposit`, { amount, notes });
    return response.data;
  } catch (error) {
    console.error(`Error depositing funds to broker with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Withdraw funds from a broker account
 */
export const withdrawFunds = async (id: string, amount: number, notes?: string) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/withdraw`, { amount, notes });
    return response.data;
  } catch (error) {
    console.error(`Error withdrawing funds from broker with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Generate a unique reference code
 */
export const generateReferenceCode = async () => {
  try {
    const response = await axios.get(`${API_URL}/generate-ref-code`);
    return response.data.refCode;
  } catch (error) {
    console.error('Error generating reference code:', error);
    throw error;
  }
}; 