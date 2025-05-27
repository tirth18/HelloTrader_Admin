import { Broker } from '../types';
import axiosInstance from './axiosInstance';

export interface BrokerFilters {
  username?: string;
  account_status?: string;
  skip?: number;
  limit?: number;
}

export const brokerService = {
  getBrokers: async (filters: BrokerFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.username) params.append('username', filters.username);
    if (filters.account_status) params.append('account_status', filters.account_status);
    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());

    const response = await axiosInstance.get(`/api/v1/brokers?${params.toString()}`);
    return response.data;
  },

  getBrokerById: async (id: number) => {
    const response = await axiosInstance.get(`/api/v1/brokers/${id}`);
    return response.data;
  },

  createBroker: async (brokerData: any) => {
    try {
      // Transform the data to match backend expectations
      const transformedData = {
        username: brokerData.username,
        first_name: brokerData.firstName || brokerData.first_name,
        last_name: brokerData.lastName || brokerData.last_name,
        parent_id: brokerData.parentId ? parseInt(brokerData.parentId) : (brokerData.parent_id || null),
        brokerage_share: parseFloat(brokerData.brokerageShare || brokerData.brokerage_share) || 0,
        profit_loss_share: parseFloat(brokerData.profitLossShare || brokerData.profit_loss_share) || 0,
        credit_limit: 0,
        type: brokerData.type || 'Broker',
        ref_code: brokerData.referenceCode || brokerData.ref_code,
        account_status: brokerData.accountStatus || brokerData.account_status,
        enable_mcx_trading: brokerData.mcxTrading || brokerData.enable_mcx_trading || false,
        enable_equity_trading: brokerData.equityTrading || brokerData.enable_equity_trading || false
      };

      console.log('Sending broker data:', transformedData);
      const response = await axiosInstance.post('/api/v1/brokers', transformedData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating broker:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  updateBroker: async (id: number, brokerData: Partial<Broker>) => {
    const response = await axiosInstance.put(`/api/v1/brokers/${id}`, brokerData);
    return response.data;
  },

  deleteBroker: async (id: number) => {
    const response = await axiosInstance.delete(`/api/v1/brokers/${id}`);
    return response.data;
  },

  generateRefCode: async () => {
    const response = await axiosInstance.get('/api/v1/brokers/generate-ref-code');
    return response.data;
  },

  updateBrokerStatus: async (id: number, status: string) => {
    const response = await axiosInstance.post(`/api/v1/brokers/${id}/status`, { status });
    return response.data;
  },

  updateBrokerCreditLimit: async (id: number, creditLimit: number) => {
    const response = await axiosInstance.post(`/api/v1/brokers/${id}/credit-limit`, { credit_limit: creditLimit });
    return response.data;
  }
}; 