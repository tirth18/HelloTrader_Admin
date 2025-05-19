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
  useTheme,
  alpha,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";

const userM2MData = [
  { userId: "650 : DEMO ID", ledger: 124041.84, m2m: 127076.84, profitLoss: 3035, trades: 2, margin: 4678.13 },
  { userId: "652 : Vijay kumar", ledger: 2000000, m2m: 2387910, profitLoss: 388090, trades: 6, margin: 109633.46 },
  { userId: "659 : Parv", ledger: 800000, m2m: 820000, profitLoss: 20000, trades: 2, margin: 17717.5 },
  { userId: "660 : Prashant", ledger: 4244.97, m2m: 4094.97, profitLoss: -150, trades: 2, margin: 278 },
  { userId: "662 : ADM", ledger: 250000, m2m: 258875, profitLoss: 8885, trades: 2, margin: 2802.57 },
  { userId: "663 : Ramdev soni", ledger: 5646048.77, m2m: 5106768.77, profitLoss: -546240, trades: 13, margin: 1460305.6 },
  { userId: "666 : Harish", ledger: 500000, m2m: 496660, profitLoss: -2930, trades: 10, margin: 10639.46 },
  { userId: "669 : Tushar Ji", ledger: 25352.07, m2m: 21442.07, profitLoss: -4150, trades: 2, margin: 3720.42 },
  { userId: "671 : K Ravikiran", ledger: 4109.27, m2m: 2409.27, profitLoss: -1700, trades: 1, margin: 142.3 },
  { userId: "677 : Jitendra", ledger: 200885.73, m2m: 195285.73, profitLoss: -5600, trades: 1, margin: 37288.4 },
];

export default function UserM2MDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const params = useParams();
  const userId = decodeURIComponent(params.userId as string);
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "background.default" : "grey.50",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          pb: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, display: "flex", alignItems: "center" }}
        >
          Live M2M under: <Box component="span" sx={{ ml: 1, color: "primary.main" }}>{userId}</Box>
        </Typography>
      </Box>

      {/* Table Section */}
      <Box sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: "none",
            overflow: "auto",
          }}
        >
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Ledger Balance</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>M2M</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Active Profit/Loss</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Active Trades</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Margin Used</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userM2MData.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell
                    sx={{ color: "success.main", fontWeight: 600, cursor: "pointer", textDecoration: "underline", '&:hover': { opacity: 0.8 } }}
                    onClick={() => router.push(`/live-m2m/${encodeURIComponent(row.userId)}/active-positions`)}
                  >
                    {row.userId}
                  </TableCell>
                  <TableCell>{row.ledger.toLocaleString()}</TableCell>
                  <TableCell>{row.m2m.toLocaleString()}</TableCell>
                  <TableCell sx={{ color: row.profitLoss < 0 ? "error.main" : "success.main", fontWeight: 500 }}>{row.profitLoss.toLocaleString()}</TableCell>
                  <TableCell>{row.trades}</TableCell>
                  <TableCell>{row.margin.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
} 