import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  alpha,
} from '@mui/material';

// Define types for the account data
export interface AccountData {
  name: string;
  broker: string;
  clientPL: number;
  clientBrokerage: number;
  clientNet: number;
  plShare: number;
  brokerageShare: number;
  netShare: number;
}

// Props for the component
interface AccountsTableProps {
  data: AccountData[];
  totals: {
    clientPL: number;
    clientBrokerage: number;
    clientNet: number;
    plShare: number;
    brokerageShare: number;
    netShare: number;
  };
  mode: 'light' | 'dark';
}

export default function AccountsTable({ data, totals, mode }: AccountsTableProps) {
  const theme = useTheme();

  // Table cell styles based on theme
  const tableCellStyle = {
    color: mode === 'dark' ? '#fff' : 'inherit',
    borderColor: mode === 'dark' ? alpha('#fff', 0.1) : 'inherit',
  };

  // Number formatting helper
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <TableContainer component={Paper} sx={{ 
      borderRadius: 2,
      mb: 4,
      bgcolor: mode === 'dark' ? alpha('#1e293b', 0.7) : alpha('#f1f5f9', 0.8),
      boxShadow: mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>Receivable / Payable</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>Broker:</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>SUM of Client PL</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>SUM of Client Brokerage</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>SUM of Client Net</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>PL Share</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>Brokerage Share</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>Net Share</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Total Row */}
          <TableRow sx={{ 
            '&:hover': { bgcolor: mode === 'dark' ? alpha('#334155', 0.3) : alpha('#e2e8f0', 0.6) },
            fontWeight: 'bold',
            bgcolor: mode === 'dark' ? alpha('#334155', 0.2) : alpha('#e2e8f0', 0.3),
          }}>
            <TableCell sx={tableCellStyle}><strong>Total</strong></TableCell>
            <TableCell sx={tableCellStyle}></TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.clientPL)}</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.clientBrokerage)}</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.clientNet)}</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.plShare)}</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.brokerageShare)}</TableCell>
            <TableCell sx={{ ...tableCellStyle, fontWeight: 'bold' }}>{formatNumber(totals.netShare)}</TableCell>
          </TableRow>
          
          {/* Data Rows */}
          {data.map((row, index) => (
            <TableRow key={index} sx={{ 
              '&:hover': { bgcolor: mode === 'dark' ? alpha('#334155', 0.3) : alpha('#e2e8f0', 0.6) },
              bgcolor: index % 2 === 0 
                ? (mode === 'dark' ? alpha('#334155', 0.1) : alpha('#e2e8f0', 0.2))
                : 'inherit',
            }}>
              <TableCell sx={tableCellStyle}>{row.name}</TableCell>
              <TableCell sx={tableCellStyle}>{row.broker}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.clientPL)}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.clientBrokerage)}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.clientNet)}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.plShare)}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.brokerageShare)}</TableCell>
              <TableCell sx={tableCellStyle}>{formatNumber(row.netShare)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 