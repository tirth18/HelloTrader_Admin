export interface User {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
}

export interface Broker {
  id: string;
  username: string;
  parent: string;
  brokerageShare: number;
  profitShare: number;
  creditLimit: number;
  type: 'Broker' | 'Admin';
  totalClients: number;
  refCode: string;
  accountStatus: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
}

export interface Order {
  id: string;
  instrument: Instrument;
  type: string;
  side: string;
  quantity: number;
  price: number;
  status: 'open' | 'filled' | 'cancelled' | 'rejected';
}

export interface Instrument {
  id: string;
  symbol: string;
  riskSettings?: RiskSettings;
}

export interface RiskSettings {
  maxPositionSize: number;
  maxLeverage: number;
  marginRequirement: number;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  schedule: string;
  lastRun: string;
  status: string;
  parameters?: string;
}

export interface TradingMetrics {
  totalVolume: number;
  activeUsers: number;
  openPositions: number;
  riskAlerts: number;
}

export interface RiskMetrics {
  marketRisk: number;
  liquidityRisk: number;
  creditRisk: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export interface FormValues {
  email?: string;
  username?: string;
  password?: string;
  roles?: string[];
  name?: string;
  type?: string;
  parameters?: string;
  quantity?: number;
  price?: number;
  maxPositionSize?: number;
  maxLeverage?: number;
  marginRequirement?: number;
} 