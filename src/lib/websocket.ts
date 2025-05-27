import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { addNotification } from '../store/slices/uiSlice';

class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;

  constructor() {
    this.connect();
  }

  private connect() {
    const token = store.getState().auth.token;
    if (!token) return;

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws', {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectTimeout,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.reconnectTimeout = 1000;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.handleReconnect();
    });

    this.socket.on('trading_update', (data) => {
      // Handle trading updates
      console.log('Trading update:', data);
    });

    this.socket.on('risk_alert', (data) => {
      // Handle risk alerts
      store.dispatch(
        addNotification({
          message: data.message,
          type: 'warning',
          read: false,
        })
      );
    });

    this.socket.on('system_status', (data) => {
      // Handle system status updates
      console.log('System status:', data);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.reconnectTimeout *= 2; // Exponential backoff
      setTimeout(() => this.connect(), this.reconnectTimeout);
    } else {
      store.dispatch(
        addNotification({
          message: 'WebSocket connection failed. Please refresh the page.',
          type: 'error',
          read: false,
        })
      );
    }
  }

  public subscribe(channel: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(channel, callback);
    }
  }

  public unsubscribe(channel: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.off(channel, callback);
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const wsClient = new WebSocketClient(); 