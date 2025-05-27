'use client';

import React, { useState } from 'react';

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Download as DownloadIcon } from '@mui/icons-material';

// Mock data for testing
const mockTrades = [
  {
    id: 1,
    order_id: 'ORD001',
    instrument: { symbol: 'AAPL' },
    side: 'BUY',
    quantity: 100,
    price: 170.25,
    fee: 1.70,
    created_at: '2025-03-01T12:30:00Z',
  },
  {
    id: 2,
    order_id: 'ORD002',
    instrument: { symbol: 'MSFT' },
    side: 'SELL',
    quantity: 50,
    price: 350.80,
    fee: 1.75,
    created_at: '2025-03-02T10:15:00Z',
  },
  {
    id: 3,
    order_id: 'ORD003',
    instrument: { symbol: 'GOOGL' },
    side: 'BUY',
    quantity: 20,
    price: 2750.50,
    fee: 5.50,
    created_at: '2025-03-03T14:45:00Z',
  },
];

const mockTradingMetrics = {
  totalTrades: 3,
  totalVolume: 72526.50,
  avgTradeSize: 24175.50,
  totalFees: 8.95,
};

const TradeHistoryPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data: trades, isLoading } = useQuery(
    ['trades', startDate?.toISOString(), endDate?.toISOString()],
    async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTrades;
    },
    {
      enabled: !!startDate && !!endDate,
    }
  );

  const { data: tradingMetrics } = useQuery(
    ['tradingMetrics', startDate?.toISOString(), endDate?.toISOString()],
    async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockTradingMetrics;
    },
    {
      enabled: !!startDate && !!endDate,
    }
  );

  const handleExport = () => {
    alert('CSV Export functionality would be implemented here');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Trade ID', width: 90 },
    { field: 'order_id', headerName: 'Order ID', width: 90 },
    {
      field: 'instrument',
      headerName: 'Instrument',
      width: 130,
      valueGetter: (params) => params.row.instrument.symbol,
    },
    { field: 'side', headerName: 'Side', width: 100 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      type: 'number',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      type: 'number',
    },
    {
      field: 'fee',
      headerName: 'Fee',
      width: 100,
      type: 'number',
    },
    {
      field: 'created_at',
      headerName: 'Date',
      width: 180,
      valueGetter: (params) =>
        format(new Date(params.row.created_at), 'yyyy-MM-dd HH:mm:ss'),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Trade History</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export CSV
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Trades
              </Typography>
              <Typography variant="h4">
                {tradingMetrics?.totalTrades || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Volume
              </Typography>
              <Typography variant="h4">
                ${tradingMetrics?.totalVolume?.toFixed(2) || '0.00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Trade Size
              </Typography>
              <Typography variant="h4">
                ${tradingMetrics?.avgTradeSize?.toFixed(2) || '0.00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Fees
              </Typography>
              <Typography variant="h4">
                ${tradingMetrics?.totalFees?.toFixed(2) || '0.00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                  },
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ height: 600 }}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <DataGrid
                rows={trades || []}
                columns={columns}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradeHistoryPage; 