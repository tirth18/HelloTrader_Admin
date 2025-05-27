import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
} from '@mui/material';
import { zerodhaService, Instrument, MarketData } from '../services/zerodha';

const MarketWatch: React.FC = () => {
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [marketData, setMarketData] = useState<Record<number, MarketData>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            try {
                const matchedInstruments = await zerodhaService.matchScripts();
                if (isMounted) {
                    setInstruments(matchedInstruments);
                }
                
                // Subscribe to market data
                zerodhaService.connectWebSocket((data: MarketData) => {
                    if (isMounted) {
                        setMarketData(prev => ({
                            ...prev,
                            [data.token]: data
                        }));
                    }
                });

                // Subscribe to all instrument tokens
                const tokens = matchedInstruments.map(i => i.instrument_token);
                zerodhaService.subscribeToTokens(tokens);
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load market data');
                    console.error('Market data error:', err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        init();

        return () => {
            isMounted = false;
            const tokens = instruments.map(i => i.instrument_token);
            zerodhaService.unsubscribeFromTokens(tokens);
            zerodhaService.disconnectWebSocket();
        };
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Market Watch
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Price</TableCell>
                            <TableCell>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instruments.map((instrument) => {
                            const data = marketData[instrument.instrument_token];
                            const lastPrice = data?.last_price || instrument.last_price;
                            const timestamp = data?.timestamp || 'N/A';

                            return (
                                <TableRow key={instrument.instrument_token}>
                                    <TableCell>{instrument.tradingsymbol}</TableCell>
                                    <TableCell>{instrument.name}</TableCell>
                                    <TableCell>{lastPrice.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(timestamp).toLocaleTimeString()}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MarketWatch; 