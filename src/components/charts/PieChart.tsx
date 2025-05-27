import React from 'react';
import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
  const theme = useTheme();

  const data = {
    labels: ['Equity', 'Futures', 'Options', 'Currency'],
    datasets: [
      {
        data: [51, 25, 15, 9],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: theme.palette.text.primary,
          padding: 16,
          font: {
            size: 13,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    cutout: '75%',
  };

  return (
    <div style={{ height: 300, width: '100%', position: 'relative' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart; 