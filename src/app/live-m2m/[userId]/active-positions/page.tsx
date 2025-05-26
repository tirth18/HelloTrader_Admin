"use client";

import React from "react";
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
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { useParams } from "next/navigation";

const activePositionsData = [
  {
    scrip: "GOLD25JUNFUT",
    activeBuy: "0.2(20)",
    activeSell: "0(0)",
    avgBuyRate: 93129,
    avgSellRate: 0,
    total: 0.2,
    net: 0.2,
    m2m: 2240,
    marginUsed: 3725.16,
    cmp: 93241,
  },
  {
    scrip: "SILVER25JULFUT",
    activeBuy: "0.167(5)",
    activeSell: "0(0)",
    avgBuyRate: 95297,
    avgSellRate: 0,
    total: 0.167,
    net: 0.167,
    m2m: 2060,
    marginUsed: 952.97,
    cmp: 95709,
  },
];

const totals = {
  activeBuy: 0.367,
  activeSell: 0,
  total: 0.367,
  net: 0.367,
  m2m: 4300,
  marginUsed: 4678.13,
};

export default function UserActivePositionsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const params = useParams();
  const userId = decodeURIComponent(params.userId as string);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: isDark ? 'background.default' : 'grey.50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          minHeight: 540,
          bgcolor: alpha(theme.palette.background.paper, 0.98),
          borderRadius: 3,
          border: `1.5px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          p: { xs: 2, sm: 4 },
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary, textAlign: 'center', width: '100%' }}
        >
          {userId}'s Active Positions
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: 'none',
            overflowX: 'auto',
            mb: 3,
            width: '100%',
            maxHeight: 400,
          }}
        >
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Scrip</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Active Buy</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Active Sell</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Avg buy rate</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Avg sell rate</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Net</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>M2m</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Margin Used</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>CMP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activePositionsData.map((row) => (
                <TableRow key={row.scrip}>
                  <TableCell>{row.scrip}</TableCell>
                  <TableCell>{row.activeBuy}</TableCell>
                  <TableCell>{row.activeSell}</TableCell>
                  <TableCell>{row.avgBuyRate}</TableCell>
                  <TableCell>{row.avgSellRate}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.net}</TableCell>
                  <TableCell>{row.m2m}</TableCell>
                  <TableCell>{row.marginUsed}</TableCell>
                  <TableCell>{row.cmp}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.07) }}>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{totals.activeBuy}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{totals.activeSell}</TableCell>
                <TableCell />
                <TableCell />
                <TableCell sx={{ fontWeight: 700 }}>{totals.total}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{totals.net}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{totals.m2m}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{totals.marginUsed}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mt: 3, fontWeight: 600, borderRadius: 1, minWidth: 320, alignSelf: 'center' }}
        >
          GO TO {userId.toUpperCase()}'S ACCOUNT
        </Button>
      </Box>
    </Box>
  );
} 