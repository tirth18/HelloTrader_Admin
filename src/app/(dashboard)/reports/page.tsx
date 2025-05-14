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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const validationSchema = yup.object({
  name: yup.string().required('Report name is required'),
  type: yup.string().required('Report type is required'),
  parameters: yup.string(),
});

const ReportingPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: reports, isLoading: reportsLoading } = useQuery(
    'reports',
    async () => {
      const response = await fetch('/api/reports');
      return response.json();
    }
  );

  const { data: tradingMetrics, isLoading: metricsLoading } = useQuery(
    'tradingMetrics',
    async () => {
      const response = await fetch('/api/reports/metrics');
      return response.json();
    }
  );

  const { data: volumeData, isLoading: volumeLoading } = useQuery(
    'volumeData',
    async () => {
      const response = await fetch('/api/reports/volume');
      return response.json();
    }
  );

  const createReportMutation = useMutation(
    async (reportData: any) => {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reports');
        setOpen(false);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      parameters: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createReportMutation.mutate(values);
    },
  });

  const handleExport = async (reportId: string) => {
    const response = await fetch(`/api/reports/${reportId}/export`, {
      method: 'POST',
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${reportId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (reportsLoading || metricsLoading || volumeLoading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reporting & Analytics</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Create Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trading Volume
            </Typography>
            <Line
              data={volumeData || { labels: [], datasets: [] }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Trading Volume Over Time',
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Bar
              data={tradingMetrics || { labels: [], datasets: [] }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Performance Metrics',
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Scheduled Reports
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Last Run</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports?.map((report: any) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell>
                        {new Date(report.lastRun).toLocaleString()}
                      </TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleExport(report.id)}
                        >
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Report</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Report Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Report Type</InputLabel>
              <Select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <MenuItem value="daily_summary">Daily Summary</MenuItem>
                <MenuItem value="performance_metrics">Performance Metrics</MenuItem>
                <MenuItem value="risk_analysis">Risk Analysis</MenuItem>
                <MenuItem value="compliance_report">Compliance Report</MenuItem>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <Typography color="error" variant="caption">
                  {formik.errors.type}
                </Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              name="parameters"
              label="Parameters (JSON)"
              multiline
              rows={4}
              value={formik.values.parameters}
              onChange={formik.handleChange}
              error={
                formik.touched.parameters && Boolean(formik.errors.parameters)
              }
              helperText={
                formik.touched.parameters && formik.errors.parameters
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
              Create Report
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ReportingPage; 