'use client';

import React from 'react';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
  alpha,
  useTheme,
} from '@mui/material';

export default function ClientSettingsPage({ params }: { params: { id: string } }) {
  const theme = useTheme();

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Client Settings
        </Typography>
        
        {/* Comex Config */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Comex Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Comex Trading"
              />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>Comex brokerage</Typography>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="200.0000"
                  type="number"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Maximum lots per single trade</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 3 }}>Maximum lots per scrip</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Max Size All Comex</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="10"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Holding Exposure/Margin</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="100"
                type="number"
                helperText="Holding Exposure auto calculates the margin money required to hold a position overnight"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Orders to be away by %</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="0.0000"
                type="number"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Forex Config */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Forex Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Forex Trading"
              />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>Forex brokerage</Typography>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="200.0000"
                  type="number"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Maximum lots per single trade</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 3 }}>Maximum lots per scrip</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Max Size All forex</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="10"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Holding Exposure/Margin</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="100"
                type="number"
                helperText="Holding Exposure auto calculates the margin money required to hold a position overnight"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Orders to be away by %</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="0.0000"
                type="number"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Crypto Config */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Crypto Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Crypto Trading"
              />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1 }}>Crypto brokerage</Typography>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="200.0000"
                  type="number"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Maximum lots per single trade</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 3 }}>Maximum lots per scrip</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="5"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Max Size All crypto</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="10"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Holding Exposure/Margin</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="100"
                type="number"
                helperText="Holding Exposure auto calculates the margin money required to hold a position overnight"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Orders to be away by %</Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="0.0000"
                type="number"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
