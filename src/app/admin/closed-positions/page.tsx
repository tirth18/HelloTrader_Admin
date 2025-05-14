'use client';

import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface Position {
  scrip: string;
  lots: number;
  avgBuyRate: number;
  avgSellRate: number;
  profitLoss: number;
  brokerage: number;
  netPL: number;
}

// Sample static data
const closedPositions: Position[] = [
  {
    scrip: 'AARTIIND25MAYFUT',
    lots: 134.782,
    avgBuyRate: 450.35,
    avgSellRate: 450.42,
    profitLoss: 259591.9,
    brokerage: 9772.96,
    netPL: 249818.94,
  },
  {
    scrip: 'ABCAPITAL25MAYFUT',
    lots: 0.741,
    avgBuyRate: 198.41,
    avgSellRate: 200.78,
    profitLoss: 4744,
    brokerage: 199.63,
    netPL: 4544.37,
  },
  {
    scrip: 'ACC25MAYFUT',
    lots: 13.133,
    avgBuyRate: 1867.94,
    avgSellRate: 1906.59,
    profitLoss: 150131,
    brokerage: 178.51,
    netPL: 149952.49,
  },
  {
    scrip: 'ADANIENSOL25MAYFUT',
    lots: 9.261,
    avgBuyRate: 924.51,
    avgSellRate: 925.73,
    profitLoss: 7909.85,
    brokerage: 1942.95,
    netPL: 5966.9,
  },
  {
    scrip: 'ABB25MAYFUT',
    lots: 0.04,
    avgBuyRate: 5486,
    avgSellRate: 5487.5,
    profitLoss: 7.5,
    brokerage: 2.74,
    netPL: 4.76,
  },
];

export default function ClosedPositionsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Closed Positions
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Scrip</TableCell>
              <TableCell align="right">Lots</TableCell>
              <TableCell align="right">Avg buy rate</TableCell>
              <TableCell align="right">Avg sell rate</TableCell>
              <TableCell align="right">Profit / Loss</TableCell>
              <TableCell align="right">Brokerage</TableCell>
              <TableCell align="right">Net P/L</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closedPositions.map((position) => (
              <TableRow
                key={position.scrip}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {position.scrip}
                </TableCell>
                <TableCell align="right">{position.lots.toFixed(3)}</TableCell>
                <TableCell align="right">{position.avgBuyRate.toFixed(2)}</TableCell>
                <TableCell align="right">{position.avgSellRate.toFixed(2)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{ color: position.profitLoss >= 0 ? 'success.main' : 'error.main' }}
                >
                  {position.profitLoss.toFixed(2)}
                </TableCell>
                <TableCell align="right">{position.brokerage.toFixed(2)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{ color: position.netPL >= 0 ? 'success.main' : 'error.main' }}
                >
                  {position.netPL.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 