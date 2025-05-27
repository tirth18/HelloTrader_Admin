export interface TraderFundTransaction {
  id: string;
  userId: string;
  name?: string;
  username?: string;
  amount: number;
  txnType: 'Added' | 'Deducted';
  notes: string;
  txnMode: 'Online' | 'Offline';
  transactionFor?: string;
  createdAt: string;
  modifiedAt?: string;
}

export interface TraderFundFilters {
  fromDate?: string;
  toDate?: string;
  userId?: string;
  amount?: string | number;
}

export interface TraderFundResponse {
  success: boolean;
  data: TraderFundTransaction[];
  total: number;
}

export interface TraderFundExportResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
}

export interface CreateFundTransactionRequest {
  userId: string;
  amount: number;
  txnType: 'Added' | 'Deducted';
  notes: string;
  txnMode: 'Online' | 'Offline';
} 