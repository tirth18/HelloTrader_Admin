'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSnackbar } from 'notistack';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock risk settings data for development
const mockRiskSettings = [
  {
    id: '1',
    symbol: 'BTC/USD',
    maxPositionSize: 10,
    maxLeverage: 20,
    marginRequirement: 5
  },
  {
    id: '2',
    symbol: 'ETH/USD',
    maxPositionSize: 15,
    maxLeverage: 15,
    marginRequirement: 6.5
  },
  {
    id: '3',
    symbol: 'XRP/USD',
    maxPositionSize: 20,
    maxLeverage: 10,
    marginRequirement: 8
  }
];

// Mock risk metrics data
const mockRiskMetrics = {
  marketRisk: 45,
  liquidityRisk: 32,
  creditRisk: 28
};

// Mock risk history data
const mockRiskHistory = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Market Risk',
      data: [40, 45, 50, 48, 47, 45],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
    },
    {
      label: 'Liquidity Risk',
      data: [30, 32, 35, 34, 33, 32],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46, 125, 50, 0.2)',
    },
    {
      label: 'Credit Risk',
      data: [25, 27, 28, 30, 29, 28],
      borderColor: '#ed6c02',
      backgroundColor: 'rgba(237, 108, 2, 0.2)',
    },
  ],
};

// Mock instruments data
const mockInstruments = [
  {
    id: '1',
    symbol: 'BTC/USD',
    riskSettings: {
      maxPositionSize: 10,
      maxLeverage: 20,
      marginRequirement: 5
    }
  },
  {
    id: '2',
    symbol: 'ETH/USD',
    riskSettings: {
      maxPositionSize: 15,
      maxLeverage: 15,
      marginRequirement: 6.5
    }
  },
  {
    id: '3',
    symbol: 'XRP/USD',
    riskSettings: {
      maxPositionSize: 20,
      maxLeverage: 10,
      marginRequirement: 8
    }
  }
];

const validationSchema = yup.object({
  maxPositionSize: yup
    .number()
    .required('Maximum position size is required')
    .min(0, 'Must be greater than 0'),
  maxLeverage: yup
    .number()
    .required('Maximum leverage is required')
    .min(1, 'Must be greater than 1'),
  marginRequirement: yup
    .number()
    .required('Margin requirement is required')
    .min(0, 'Must be greater than 0')
    .max(100, 'Must be less than 100'),
});

const RiskManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<any>(null);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: riskMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['riskMetrics'],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
        return mockRiskMetrics;
      }
      const response = await fetch('/api/risk/metrics');
      return response.json();
    }
  });

  const { data: instruments, isLoading: instrumentsLoading } = useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
        return mockInstruments;
      }
      const response = await fetch('/api/instruments');
      return response.json();
    }
  });

  const { data: riskHistory, isLoading: historyLoading } = useQuery({
    queryKey: ['riskHistory'],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
        return mockRiskHistory;
      }
      const response = await fetch('/api/risk/history');
      return response.json();
    }
  });

  const { data: riskSettings = [], isLoading } = useQuery({
    queryKey: ['riskSettings'],
    queryFn: async () => {
      try {
        // For development, use mock data
        if (process.env.NODE_ENV === 'development') {
          return mockRiskSettings;
        }
        
        const response = await fetch('/api/risk-settings');
        return response.json();
      } catch (error) {
        console.error('Error fetching risk settings:', error);
        return [];
      }
    }
  });

  const updateRiskSettingMutation = useMutation({
    mutationFn: async ({ id, settingData }: { id: string; settingData: any }) => {
      const response = await fetch(`/api/risk-settings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['riskSettings'] });
      enqueueSnackbar('Risk setting updated successfully', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to update risk setting', { variant: 'error' });
    }
  });

  const formik = useFormik({
    initialValues: {
      maxPositionSize: 0,
      maxLeverage: 1,
      marginRequirement: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (selectedInstrument) {
        updateRiskSettingMutation.mutate({
          id: selectedInstrument.id,
          settingData: values,
        });
      }
    },
  });

  const handleOpen = (instrument: any) => {
    setSelectedInstrument(instrument);
    formik.setValues({
      maxPositionSize: instrument.riskSettings?.maxPositionSize || 0,
      maxLeverage: instrument.riskSettings?.maxLeverage || 1,
      marginRequirement: instrument.riskSettings?.marginRequirement || 0,
    });
    setOpen(true);
  };

  const RiskCard: React.FC<{
    title: string;
    value: number;
    threshold: number;
    color: string;
  }> = ({ title, value, threshold, color }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ mr: 2 }}>
            {value}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min((value / threshold) * 100, 100)}
            sx={{
              flexGrow: 1,
              height: 10,
              borderRadius: 5,
              backgroundColor: `${color}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              },
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Threshold: {threshold}%
        </Typography>
      </CardContent>
    </Card>
  );

  if (metricsLoading || instrumentsLoading || historyLoading || isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Risk Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RiskCard
            title="Market Risk"
            value={riskMetrics?.marketRisk || 0}
            threshold={70}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RiskCard
            title="Liquidity Risk"
            value={riskMetrics?.liquidityRisk || 0}
            threshold={80}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RiskCard
            title="Credit Risk"
            value={riskMetrics?.creditRisk || 0}
            threshold={60}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Risk History
            </Typography>
            <Line
              data={riskHistory || { labels: [], datasets: [] }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Risk Metrics Over Time',
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Instrument Risk Settings
            </Typography>
            <Grid container spacing={2}>
              {instruments?.map((instrument: any) => (
                <Grid item xs={12} sm={6} md={4} key={instrument.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{instrument.symbol}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Max Position: {instrument.riskSettings?.maxPositionSize || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Max Leverage: {instrument.riskSettings?.maxLeverage || 1}x
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Margin Req: {instrument.riskSettings?.marginRequirement || 0}%
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpen(instrument)}
                        sx={{ mt: 1 }}
                      >
                        Edit Settings
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Risk Settings - {selectedInstrument?.symbol}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="maxPositionSize"
              label="Maximum Position Size"
              type="number"
              value={formik.values.maxPositionSize}
              onChange={formik.handleChange}
              error={
                formik.touched.maxPositionSize &&
                Boolean(formik.errors.maxPositionSize)
              }
              helperText={
                formik.touched.maxPositionSize && formik.errors.maxPositionSize
              }
            />
            <TextField
              fullWidth
              margin="normal"
              name="maxLeverage"
              label="Maximum Leverage"
              type="number"
              value={formik.values.maxLeverage}
              onChange={formik.handleChange}
              error={
                formik.touched.maxLeverage &&
                Boolean(formik.errors.maxLeverage)
              }
              helperText={
                formik.touched.maxLeverage && formik.errors.maxLeverage
              }
            />
            <TextField
              fullWidth
              margin="normal"
              name="marginRequirement"
              label="Margin Requirement (%)"
              type="number"
              value={formik.values.marginRequirement}
              onChange={formik.handleChange}
              error={
                formik.touched.marginRequirement &&
                Boolean(formik.errors.marginRequirement)
              }
              helperText={
                formik.touched.marginRequirement &&
                formik.errors.marginRequirement
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RiskManagementPage; 