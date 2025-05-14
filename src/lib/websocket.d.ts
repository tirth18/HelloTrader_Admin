import { Socket } from 'socket.io-client';

export interface WebSocketClient {
  subscribe(channel: string, callback: (data: any) => void): void;
  unsubscribe(channel: string, callback: (data: any) => void): void;
  disconnect(): void;
}

export interface WebSocketData {
  trading_update: {
    orderId: string;
    status: string;
    price?: number;
    quantity?: number;
  };
  risk_alert: {
    message: string;
    level: 'warning' | 'error' | 'info';
    timestamp: string;
  };
  system_status: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    timestamp: string;
  };
}

declare const wsClient: WebSocketClient;
export default wsClient; 