import { 
  TraderFundFilters, 
  TraderFundResponse, 
  TraderFundExportResponse,
  CreateFundTransactionRequest,
  TraderFundTransaction
} from '@/types/trader-funds';

/**
 * Fetches trader funds transactions based on provided filters
 */
export const fetchTraderFunds = async (filters: TraderFundFilters): Promise<TraderFundResponse> => {
  const params = new URLSearchParams();
  
  if (filters.userId) params.append('userId', filters.userId);
  if (filters.fromDate) params.append('fromDate', filters.fromDate);
  if (filters.toDate) params.append('toDate', filters.toDate);
  if (filters.amount) params.append('amount', filters.amount.toString());

  const response = await fetch(`/api/mock/trader-funds?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch trader funds data');
  }
  
  return response.json();
};

/**
 * Fetches a single trader fund transaction by ID
 */
export const fetchTraderFundById = async (id: string): Promise<TraderFundTransaction> => {
  const response = await fetch(`/api/mock/trader-funds/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch transaction details');
  }
  
  const result = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error('Failed to fetch transaction details');
  }
  
  return result.data;
};

/**
 * Exports trader funds data based on filters
 */
export const exportTraderFunds = async (filters: TraderFundFilters): Promise<TraderFundExportResponse> => {
  const response = await fetch('/api/mock/trader-funds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filters }),
  });

  if (!response.ok) {
    throw new Error('Failed to export trader funds data');
  }

  return response.json();
};

/**
 * Creates a new fund transaction
 */
export const createFundTransaction = async (
  data: CreateFundTransactionRequest
): Promise<{ success: boolean }> => {
  const response = await fetch('/api/mock/trader-funds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      createTransaction: data
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create fund transaction');
  }
  
  return response.json();
}; 