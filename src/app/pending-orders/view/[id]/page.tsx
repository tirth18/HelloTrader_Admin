'use client';
 
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
 
// Static sample order data to display for every order
const order = {
  id: '3733510',
  commodity: 'CRUDEOILM25JUNFUT',
  userId: '6093',
  trade: 'Sell',
  rate: '5326.00000000',
  lots: '1',
  condition: 'Above',
  status: 'Pending',
  date: '2025-05-26 14:46:07',
  executedOn: '(not set)',
  cancelledOn: '(not set)',
  ipAddress: '223.184.191.181',
};
 
export default function PendingOrderDetailPage() {
  const theme = useTheme();
  const router = useRouter();
 
  // For table rows
  const rows = [
    { label: 'ID', value: order.id },
    { label: 'Commodity', value: order.commodity },
    { label: 'User ID', value: order.userId },
    { label: 'Trade', value: order.trade },
    { label: 'Rate', value: order.rate },
    { label: 'Lots', value: order.lots },
    { label: 'Condition', value: order.condition },
    { label: 'Status', value: order.status },
    { label: 'Date', value: order.date },
    { label: 'Executed On', value: order.executedOn },
    { label: 'Cancelled On', value: order.cancelledOn },
    { label: 'Ip Address', value: order.ipAddress },
  ];
 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? '#101a2b' : '#f4f6fb',
        p: { xs: 1, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1100, mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            px: 4,
            py: 1,
            fontSize: 18,
            boxShadow: 'none',
          }}
        >
          DELETE
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 1100,
          borderRadius: 2,
          overflow: 'hidden',
          border: theme.palette.mode === 'dark'
            ? '1px solid #222b3c'
            : '1px solid #e0e7ef',
          bgcolor: theme.palette.mode === 'dark' ? alpha('#0f172a', 0.95) : '#fff',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}
                style={{
                  borderBottom: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.04)'
                    : '1px solid #e0e7ef',
                }}
              >
                <td
                  style={{
                    padding: '18px 24px',
                    fontWeight: 500,
                    color: theme.palette.mode === 'dark' ? '#b0b8c1' : '#222b3c',
                    width: '240px',
                    fontSize: '1.1rem',
                  }}
                >
                  {row.label}
                </td>
                <td
                  style={{
                    padding: '18px 24px',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#222b3c',
                    fontSize: '1.1rem',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}