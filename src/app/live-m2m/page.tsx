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
  Chip,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useRouter } from "next/navigation";

const m2mData = [
  { userId: "0 : Self", profitLoss: -74103.25, trades: 203, margin: 1242471.28 },
  { userId: "62 : jain01", profitLoss: 60875.5, trades: 74, margin: 689339.67 },
  { userId: "64 : jain02", profitLoss: 3672.5, trades: 15, margin: 1464.82 },
  { userId: "66 : jain04", profitLoss: 220, trades: 1, margin: 213.12 },
  { userId: "67 : jain05", profitLoss: 8030, trades: 11, margin: 27352.04 },
  { userId: "70 : jain06", profitLoss: -56868.55, trades: 301, margin: 97502.5 },
  { userId: "72 : jain08", profitLoss: -32432, trades: 15, margin: 26647.35 },
  { userId: "73 : jain09", profitLoss: -1081274.6, trades: 115, margin: 1888729.09 },
];

export default function LiveM2MPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
          <MonetizationOnIcon sx={{ mr: 1, color: "primary.main" }} /> Live M2M under: HELLO TRADER
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ p: { xs: 2, sm: 3 }, pt: 2, pb: 0 }}>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ bgcolor: isDark ? "#1e293b" : "#e0f7fa", boxShadow: "none" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Active Profit/Loss</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "error.main" }}>-71,848,40.43</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Card sx={{ bgcolor: isDark ? "#1e293b" : "#e8f5e9", boxShadow: "none" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Active Trades</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>1,588</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Card sx={{ bgcolor: isDark ? "#1e293b" : "#fff3e0", boxShadow: "none" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Margin Used</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "secondary.main" }}>19,144,092.84</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Active Profit/Loss</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Active Trades</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "1rem" }}>Margin Used</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Total Row */}
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.07) }}>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "error.main" }}>-71,848,40.43</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>1,588</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "secondary.main" }}>19,144,092.84</TableCell>
              </TableRow>
              {m2mData.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell>
                    <Chip
                      label={row.userId}
                      color={row.profitLoss < 0 ? "error" : "success"}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", textDecoration: "underline", '&:hover': { opacity: 0.8 } }}
                      onClick={() => router.push(`/live-m2m/${encodeURIComponent(row.userId)}`)}
                    />
                  </TableCell>
                  <TableCell sx={{ color: row.profitLoss < 0 ? "error.main" : "success.main", fontWeight: 500 }}>
                    {row.profitLoss.toLocaleString()}
                  </TableCell>
                  <TableCell>{row.trades}</TableCell>
                  <TableCell sx={{ color: "secondary.main" }}>{row.margin.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
} 