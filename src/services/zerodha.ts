import axios from 'axios';
import { WebSocket } from 'ws';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
// Fix for "window is not defined" error during server-side rendering
const getRedirectUri = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering, use a default value
    return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/zerodha-settings`;
  }
  // Client-side, we can use window
  return `${window.location.origin}/admin/zerodha-settings`;
};

export interface ZerodhaToken {
    access_token: string;
    expires_at: string;
    refresh_token: string;
}

export interface Instrument {
    instrument_token: number;
    exchange_token: string;
    tradingsymbol: string;
    name: string;
    last_price: number;
    expiry: string;
    strike: number;
    tick_size: number;
    lot_size: number;
    instrument_type: string;
    segment: string;
    exchange: string;
}

export interface MarketData {
    token: number;
    last_price: number;
    timestamp: string;
}

class ZerodhaService {
    private ws: WebSocket | null = null;
    private marketDataCallbacks: ((data: MarketData) => void)[] = [];

    async getLoginUrl(): Promise<string> {
        const response = await axios.get(`${API_BASE_URL}/zerodha/login-url`, {
            params: {
                redirect_uri: getRedirectUri()
            }
        });
        return response.data.login_url;
    }

    async getAccessToken(requestToken: string): Promise<ZerodhaToken> {
        const response = await axios.post(`${API_BASE_URL}/zerodha/access-token`, {
            request_token: requestToken,
            redirect_uri: getRedirectUri()
        });
        return response.data;
    }

    async getInstruments(): Promise<Instrument[]> {
        const response = await axios.get(`${API_BASE_URL}/zerodha/instruments`);
        return response.data;
    }

    async matchScripts(): Promise<Instrument[]> {
        const response = await axios.get(`${API_BASE_URL}/zerodha/match-scripts`);
        return response.data;
    }

    connectWebSocket(onMarketData: (data: MarketData) => void) {
        // Only run this on the client side
        if (typeof window === 'undefined') {
            console.warn('WebSocket connection attempted during SSR');
            return;
        }
        
        this.marketDataCallbacks.push(onMarketData);
        
        if (!this.ws) {
            this.ws = new WebSocket(`ws://localhost:8000/api/v1/zerodha/ws/market`);
            
            this.ws.onmessage = (event) => {
                // Fix for the data type issue - convert to string first if needed
                let jsonData: string;
                if (typeof event.data === 'string') {
                    jsonData = event.data;
                } else if (event.data instanceof ArrayBuffer) {
                    jsonData = new TextDecoder().decode(event.data);
                } else if (event.data instanceof Blob) {
                    // Read blob as text asynchronously
                    const reader = new FileReader();
                    reader.onload = () => {
                        const text = reader.result as string;
                        try {
                            const data = JSON.parse(text);
                            this.marketDataCallbacks.forEach(callback => callback(data));
                        } catch (e) {
                            console.error('Failed to parse WebSocket data:', e);
                        }
                    };
                    reader.readAsText(event.data);
                    return; // Early return as we're handling this asynchronously
                } else {
                    console.error('Unsupported WebSocket data format');
                    return;
                }
                
                try {
                    const data = JSON.parse(jsonData);
                    this.marketDataCallbacks.forEach(callback => callback(data));
                } catch (e) {
                    console.error('Failed to parse WebSocket data:', e);
                }
            };
            
            this.ws.onclose = () => {
                console.log('WebSocket connection closed');
                this.ws = null;
            };
        }
    }

    disconnectWebSocket() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    subscribeToTokens(tokens: number[]) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'subscribe',
                tokens: tokens
            }));
        }
    }

    unsubscribeFromTokens(tokens: number[]) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'unsubscribe',
                tokens: tokens
            }));
        }
    }
}

// Export as a function that returns the service to avoid initialization during SSR
export const getZerodhaService = () => {
    if (typeof window === 'undefined') {
        // Return a mock service during SSR
        return {
            getLoginUrl: async () => "",
            getAccessToken: async () => ({ access_token: "", expires_at: "", refresh_token: "" }),
            getInstruments: async () => [],
            matchScripts: async () => [],
            connectWebSocket: () => {},
            disconnectWebSocket: () => {},
            subscribeToTokens: () => {},
            unsubscribeFromTokens: () => {}
        };
    }
    
    // Create and return a real service on the client
    return new ZerodhaService();
};

// For backward compatibility with existing code
export const zerodhaService = typeof window === 'undefined' ? 
    {} as ZerodhaService : 
    new ZerodhaService(); 