'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  useMediaQuery,
  alpha,
  CircularProgress,
  Alert,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

export default function EditClientPage({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    city: '',
    mobile: '',
    password: '',
    // Config section
    demoAccount: false,
    allowOrdersBetweenHighLow: false,
    accountStatus: false,
    allowFreshEntryOrder: false,
    tradeEquityAsUnits: false,
    autoCloseTrades: false,
    autoClosePercentage: '90',
    notifyLossPercentage: '70',
    minTimeToBookProfit: '120',
    // MCX Futures section
    mcxTrading: false,
    maxMcxLotSize: '5',
    maxActiveMcxLotSize: '10',
    mcxBrokerage: '1500.0000',
    minMarginMcx: '500',
    minSizeAllCommodity: '50',
    mcxBrokerageType: 'Per Crore Basis',
    exposureMarginType: 'Per Turnover Basis',
    marginGOLD: '0.0000',
    marginSILVER: '0.0000',
    marginCRUDEOIL: '0.0000',
    marginCOPPER: '0.0000',
    marginZINC: '0.0000',
    marginNATURALGAS: '0.0000',
    marginALUMINIUM: '0.0000',
    marginCOTTON: '0.0000',
    marginLEAD: '0.0000',
    marginNICKEL: '0.0000',
    marginMENTHAOIL: '0.0000',
    marginSILVERMIC: '0.0000',
    // Equity Futures section
    equityTrading: false,
    equityBrokeragePerCrore: '1500.0000',
    minEquityQuantity: '0',
    maxEquityQuantity: '5',
    minEquityIndexQuantity: '0',
    maxEquityIndexQuantity: '5',
    maxActiveEquityQuantity: '20',
    maxActiveEquityIndexQuantity: '20',
    maxSizeAllEquity: '100',
    maxSizeAllIndex: '100',
    intradayExposureMarginEquity: '500',
    holdingExposureMarginEquity: '100',
    ordersAwayPercent: '0.00',
    // Options Config section
    indexOptionsTrading: false,
    mcxOptionsTrading: false,
    equityOptionsTrading: false,
    optionsIndexBrokerage: '20.0000',
    optionsEquityBrokerage: '20.0000',
    optionsMcxBrokerage: '20.0000',
    optionsIndexBrokerageType: 'Per Lot Basis',
    optionsEquityBrokerageType: 'Per Lot Basis',
    optionsMcxBrokerageType: 'Per Lot Basis',
    optionsMinProfitPrice: '0.0000',
    maxEquityOptionsQuantity: '5',
    maxEquityIndexOptionsQuantity: '5',
    maxMcxOptionsQuantity: '5',
    maxActiveEquityOptionsQuantity: '10',
    maxActiveIndexOptionsQuantity: '10',
    maxSizeAllEquityOptions: '100',
    maxSizeAllIndexOptions: '100',
    maxSizeAllMcxOptions: '100',
    holdingExposureMarginOptionsIndex: '15',
    holdingExposureMarginOptionsEquity: '15',
    holdingExposureMarginOptionsMcx: '15',
    // Options Shortselling Config section
    optionsIndexShortsellBrokerageType: 'Per Lot Basis',
    optionsEquityShortsellBrokerageType: 'Per Lot Basis',
    optionsMcxShortsellBrokerageType: 'Per Lot Basis',
    optionsIndexShortsellBrokerage: '20.0000',
    optionsEquityShortsellBrokerage: '20.0000',
    optionsMcxShortsellBrokerage: '20.0000',
    minEquityOptionsShortsellQuantity: '0',
    maxEquityOptionsShortsellQuantity: '20',
    minMcxOptionsShortsellQuantity: '0',
    maxMcxOptionsShortsellQuantity: '20',
    minEquityIndexOptionsShortsellQuantity: '0',
    maxEquityIndexOptionsShortsellQuantity: '5',
    maxActiveEquityOptionsShortsellQuantity: '20',
    maxActiveIndexOptionsShortsellQuantity: '10',
    maxActiveMcxOptionsShortsellQuantity: '20',
    maxSizeAllIndexOptionsShortsell: '50',
    maxSizeAllEquityOptionsShortsell: '50',
    maxSizeAllMcxOptionsShortsell: '50',
    intradayExposureMarginOptionsIndexShortsell: '1.000',
    holdingExposureMarginOptionsIndexShortsell: '0.800',
    intradayExposureMarginOptionsEquityShortsell: '7.000',
    holdingExposureMarginOptionsEquityShortsell: '8.000',
    intradayExposureMarginOptionsMcxShortsell: '7.000',
    holdingExposureMarginOptionsMcxShortsell: '8.000',
    // Other section
    notes: '',
    transactionPassword: '',
    broker: '',
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/trading-clients/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }
        const data = await response.json();
        setFormData({
          name: data.name || '',
          username: data.username || '',
          city: data.city || '',
          mobile: data.mobile || '',
          password: '', // Don't populate password field for security
          // Config section
          demoAccount: data.demoAccount || false,
          allowOrdersBetweenHighLow: data.allowOrdersBetweenHighLow || false,
          accountStatus: data.accountStatus || false,
          allowFreshEntryOrder: data.allowFreshEntryOrder || false,
          tradeEquityAsUnits: data.tradeEquityAsUnits || false,
          autoCloseTrades: data.autoCloseTrades || false,
          autoClosePercentage: data.autoClosePercentage || '90',
          notifyLossPercentage: data.notifyLossPercentage || '70',
          minTimeToBookProfit: data.minTimeToBookProfit || '120',
          // MCX Futures section
          mcxTrading: data.mcxTrading || false,
          maxMcxLotSize: data.maxMcxLotSize || '5',
          maxActiveMcxLotSize: data.maxActiveMcxLotSize || '10',
          mcxBrokerage: data.mcxBrokerage || '1500.0000',
          minMarginMcx: data.minMarginMcx || '500',
          minSizeAllCommodity: data.minSizeAllCommodity || '50',
          mcxBrokerageType: data.mcxBrokerageType || 'Per Crore Basis',
          exposureMarginType: data.exposureMarginType || 'Per Turnover Basis',
          marginGOLD: data.marginGOLD || '0.0000',
          marginSILVER: data.marginSILVER || '0.0000',
          marginCRUDEOIL: data.marginCRUDEOIL || '0.0000',
          marginCOPPER: data.marginCOPPER || '0.0000',
          marginZINC: data.marginZINC || '0.0000',
          marginNATURALGAS: data.marginNATURALGAS || '0.0000',
          marginALUMINIUM: data.marginALUMINIUM || '0.0000',
          marginCOTTON: data.marginCOTTON || '0.0000',
          marginLEAD: data.marginLEAD || '0.0000',
          marginNICKEL: data.marginNICKEL || '0.0000',
          marginMENTHAOIL: data.marginMENTHAOIL || '0.0000',
          marginSILVERMIC: data.marginSILVERMIC || '0.0000',
          // Equity Futures section
          equityTrading: data.equityTrading || false,
          equityBrokeragePerCrore: data.equityBrokeragePerCrore || '1500.0000',
          minEquityQuantity: data.minEquityQuantity || '0',
          maxEquityQuantity: data.maxEquityQuantity || '5',
          minEquityIndexQuantity: data.minEquityIndexQuantity || '0',
          maxEquityIndexQuantity: data.maxEquityIndexQuantity || '5',
          maxActiveEquityQuantity: data.maxActiveEquityQuantity || '20',
          maxActiveEquityIndexQuantity: data.maxActiveEquityIndexQuantity || '20',
          maxSizeAllEquity: data.maxSizeAllEquity || '100',
          maxSizeAllIndex: data.maxSizeAllIndex || '100',
          intradayExposureMarginEquity: data.intradayExposureMarginEquity || '500',
          holdingExposureMarginEquity: data.holdingExposureMarginEquity || '100',
          ordersAwayPercent: data.ordersAwayPercent || '0.00',
          // Options Config section
          indexOptionsTrading: data.indexOptionsTrading || false,
          mcxOptionsTrading: data.mcxOptionsTrading || false,
          equityOptionsTrading: data.equityOptionsTrading || false,
          optionsIndexBrokerage: data.optionsIndexBrokerage || '20.0000',
          optionsEquityBrokerage: data.optionsEquityBrokerage || '20.0000',
          optionsMcxBrokerage: data.optionsMcxBrokerage || '20.0000',
          optionsIndexBrokerageType: data.optionsIndexBrokerageType || 'Per Lot Basis',
          optionsEquityBrokerageType: data.optionsEquityBrokerageType || 'Per Lot Basis',
          optionsMcxBrokerageType: data.optionsMcxBrokerageType || 'Per Lot Basis',
          optionsMinProfitPrice: data.optionsMinProfitPrice || '0.0000',
          maxEquityOptionsQuantity: data.maxEquityOptionsQuantity || '5',
          maxEquityIndexOptionsQuantity: data.maxEquityIndexOptionsQuantity || '5',
          maxMcxOptionsQuantity: data.maxMcxOptionsQuantity || '5',
          maxActiveEquityOptionsQuantity: data.maxActiveEquityOptionsQuantity || '10',
          maxActiveIndexOptionsQuantity: data.maxActiveIndexOptionsQuantity || '10',
          maxSizeAllEquityOptions: data.maxSizeAllEquityOptions || '100',
          maxSizeAllIndexOptions: data.maxSizeAllIndexOptions || '100',
          maxSizeAllMcxOptions: data.maxSizeAllMcxOptions || '100',
          holdingExposureMarginOptionsIndex: data.holdingExposureMarginOptionsIndex || '15',
          holdingExposureMarginOptionsEquity: data.holdingExposureMarginOptionsEquity || '15',
          holdingExposureMarginOptionsMcx: data.holdingExposureMarginOptionsMcx || '15',
          // Options Shortselling Config section
          optionsIndexShortsellBrokerageType: data.optionsIndexShortsellBrokerageType || 'Per Lot Basis',
          optionsEquityShortsellBrokerageType: data.optionsEquityShortsellBrokerageType || 'Per Lot Basis',
          optionsMcxShortsellBrokerageType: data.optionsMcxShortsellBrokerageType || 'Per Lot Basis',
          optionsIndexShortsellBrokerage: data.optionsIndexShortsellBrokerage || '20.0000',
          optionsEquityShortsellBrokerage: data.optionsEquityShortsellBrokerage || '20.0000',
          optionsMcxShortsellBrokerage: data.optionsMcxShortsellBrokerage || '20.0000',
          minEquityOptionsShortsellQuantity: data.minEquityOptionsShortsellQuantity || '0',
          maxEquityOptionsShortsellQuantity: data.maxEquityOptionsShortsellQuantity || '20',
          minMcxOptionsShortsellQuantity: data.minMcxOptionsShortsellQuantity || '0',
          maxMcxOptionsShortsellQuantity: data.maxMcxOptionsShortsellQuantity || '20',
          minEquityIndexOptionsShortsellQuantity: data.minEquityIndexOptionsShortsellQuantity || '0',
          maxEquityIndexOptionsShortsellQuantity: data.maxEquityIndexOptionsShortsellQuantity || '5',
          maxActiveEquityOptionsShortsellQuantity: data.maxActiveEquityOptionsShortsellQuantity || '20',
          maxActiveIndexOptionsShortsellQuantity: data.maxActiveIndexOptionsShortsellQuantity || '10',
          maxActiveMcxOptionsShortsellQuantity: data.maxActiveMcxOptionsShortsellQuantity || '20',
          maxSizeAllIndexOptionsShortsell: data.maxSizeAllIndexOptionsShortsell || '50',
          maxSizeAllEquityOptionsShortsell: data.maxSizeAllEquityOptionsShortsell || '50',
          maxSizeAllMcxOptionsShortsell: data.maxSizeAllMcxOptionsShortsell || '50',
          intradayExposureMarginOptionsIndexShortsell: data.intradayExposureMarginOptionsIndexShortsell || '1.000',
          holdingExposureMarginOptionsIndexShortsell: data.holdingExposureMarginOptionsIndexShortsell || '0.800',
          intradayExposureMarginOptionsEquityShortsell: data.intradayExposureMarginOptionsEquityShortsell || '7.000',
          holdingExposureMarginOptionsEquityShortsell: data.holdingExposureMarginOptionsEquityShortsell || '8.000',
          intradayExposureMarginOptionsMcxShortsell: data.intradayExposureMarginOptionsMcxShortsell || '7.000',
          holdingExposureMarginOptionsMcxShortsell: data.holdingExposureMarginOptionsMcxShortsell || '8.000',
          // Other section
          notes: data.notes || '',
          transactionPassword: data.transactionPassword || '',
          broker: data.broker || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await fetch(`/api/trading-clients/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update client');
      }

      // Navigate back to the clients list
      window.history.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating client data');
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Update Trading Client: {formData.username}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (

        <form onSubmit={handleSubmit}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            {/* Personal Details Section */}
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Personal Details:
            </Typography>

            <Grid container spacing={3}>
              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Insert Real name of the trader. Will be visible in trading App"
                  InputProps={{
                    style: { fontWeight: 400, fontSize: 16 },
                  }}
                  helperText={
                    <span style={{ color: theme.palette.text.secondary, fontSize: 15 }}>
                      Insert Real name of the trader. Will be visible in trading App
                    </span>
                  }
                  required
                />
              </Grid>

              {/* Mobile Field */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Mobile</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Optional" 
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} 
                />
              </Grid>

              {/* Username Field */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Username</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols."
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: theme.palette.text.secondary, fontSize: 15 }}>
                      username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols.
                    </span>
                  }
                  required
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Password</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave Blank if you want password remain unchanged."
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: theme.palette.text.secondary, fontSize: 15 }}>
                      password for loggin-in with, is case sensitive
                    </span>
                  }
                />
              </Grid>

              {/* City Field */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>City</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Optional" 
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} 
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Config Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Config:
            </Typography>

            <Grid container spacing={3}>
              {/* Checkboxes */}
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.demoAccount || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, demoAccount: e.target.checked }))}
                      />
                    }
                    label="Demo Account?"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.allowOrdersBetweenHighLow || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, allowOrdersBetweenHighLow: e.target.checked }))}
                      />
                    }
                    label="Allow Orders between High - Low?"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.accountStatus || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, accountStatus: e.target.checked }))}
                      />
                    }
                    label="Account Status"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.allowFreshEntryOrder || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, allowFreshEntryOrder: e.target.checked }))}
                      />
                    }
                    label="Allow Fresh Entry Order above high & below low?"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.tradeEquityAsUnits || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, tradeEquityAsUnits: e.target.checked }))}
                      />
                    }
                    label="Trade equity as units instead of lots."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.autoCloseTrades || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, autoCloseTrades: e.target.checked }))}
                      />
                    }
                    label="Auto Close Trades if condition met"
                  />
                </FormGroup>
              </Grid>

              {/* Auto-Close Percentage */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Auto-Close all active trades when the losses reach % of Ledger-balance
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="autoClosePercentage"
                  value={formData.autoClosePercentage || '90'}
                  onChange={handleChange}
                  helperText="Example: 95, will close when losses reach 95% of ledger balance"
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Notification Percentage */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Notify client when the losses reach % of Ledger-balance
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="notifyLossPercentage"
                  value={formData.notifyLossPercentage || '70'}
                  onChange={handleChange}
                  helperText="Example: 70, will send notification to customer every 5-minutes until losses cross 70% of ledger balance"
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Minimum Time */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Min. Time to book profit (No. of Seconds)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minTimeToBookProfit"
                  value={formData.minTimeToBookProfit || '120'}
                  onChange={handleChange}
                  helperText="Example: 120, will hold the trade for 2 minutes before closing a trade in profit"
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* MCX Futures Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              MCX Futures:
            </Typography>

            <Grid container spacing={3}>
              {/* MCX Trading Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.mcxTrading || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, mcxTrading: e.target.checked }))}
                    />
                  }
                  label="MCX Trading"
                />
              </Grid>

              {/* Basic MCX Settings */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum lot size allowed per single trade of MCX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxMcxLotSize"
                  value={formData.maxMcxLotSize || '5'}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum lot size allowed per script of MCX to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxActiveMcxLotSize"
                  value={formData.maxActiveMcxLotSize || '10'}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  MCX Brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="mcxBrokerage"
                  value={formData.mcxBrokerage || '1500.0000'}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Minimum Exposure/Margin MCX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minMarginMcx"
                  value={formData.minMarginMcx || '500'}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Min Size All Commodity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minSizeAllCommodity"
                  value={formData.minSizeAllCommodity || '50'}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Dropdown fields */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>MCX Brokerage Type</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="mcxBrokerageType"
                  value={formData.mcxBrokerageType || 'Per Crore Basis'}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Crore Basis">Per Crore Basis</option>
                  <option value="Per Lot Basis">Per Lot Basis</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Exposure Margin Type</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="exposureMarginType"
                  value={formData.exposureMarginType || 'Per Turnover Basis'}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Turnover Basis">Per Turnover Basis</option>
                  <option value="Per Lot Basis">Per Lot Basis</option>
                </TextField>
              </Grid>

              {/* Commodity-specific margin fields */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 600, mb: 2, mt: 2 }}>Commodity-specific Margins:</Typography>
                <Grid container spacing={2}>
                  {[
                    'GOLD', 'SILVER', 'CRUDEOIL', 'COPPER', 'ZINC', 'NATURALGAS', 'ALUMINIUM',
                    'COTTON', 'LEAD', 'NICKEL', 'MENTHAOIL', 'SILVERMIC'
                  ].map((commodity) => (
                    <Grid item xs={12} sm={6} md={4} key={commodity}>
                      <TextField
                        fullWidth
                        size="small"
                        label={commodity}
                        name={`margin${commodity}`}
                        value={formData[`margin${commodity}`] || '0.0000'}
                        onChange={handleChange}
                        type="number"
                        InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* Equity Futures Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Equity Futures:
            </Typography>

            <Grid container spacing={3}>
              {/* Equity Trading Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={formData.equityTrading || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, equityTrading: e.target.checked }))}
                    />
                  }
                  label="Equity Trading"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Equity brokerage Per Crore
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="equityBrokeragePerCrore"
                  value={formData.equityBrokeragePerCrore}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Minimum quantity size required per single trade of Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minEquityQuantity"
                  value={formData.minEquityQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum quantity size allowed per single trade of Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxEquityQuantity"
                  value={formData.maxEquityQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Minimum quantity size required per single trade of Equity INDEX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minEquityIndexQuantity"
                  value={formData.minEquityIndexQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum quantity size allowed per single trade of Equity INDEX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxEquityIndexQuantity"
                  value={formData.maxEquityIndexQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum quantity size allowed per script of Equity to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxActiveEquityQuantity"
                  value={formData.maxActiveEquityQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Max Size All Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxSizeAllEquity"
                  value={formData.maxSizeAllEquity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Max Size All Index
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxSizeAllIndex"
                  value={formData.maxSizeAllIndex}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Intraday Exposure/Margin Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="intradayExposureMarginEquity"
                  value={formData.intradayExposureMarginEquity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText="Exposure auto calculates the margin money required for any new trade entry. Calculation: turnover of a trade divided by Exposure is required margin."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Holding Exposure/Margin Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="holdingExposureMarginEquity"
                  value={formData.holdingExposureMarginEquity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText="Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Orders to be away by % from current price Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="ordersAwayPercent"
                  value={formData.ordersAwayPercent}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Options Config Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Options Config:
            </Typography>

            <Grid container spacing={3}>
              {/* Options Trading Checkboxes */}
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.indexOptionsTrading || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, indexOptionsTrading: e.target.checked }))}
                      />
                    }
                    label="Index Options Trading"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.mcxOptionsTrading || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, mcxOptionsTrading: e.target.checked }))}
                      />
                    }
                    label="MCX Options Trading"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={formData.equityOptionsTrading || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, equityOptionsTrading: e.target.checked }))}
                      />
                    }
                    label="Equity Options Trading"
                  />
                </FormGroup>
              </Grid>

              {/* Brokerage Type Dropdowns */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Options Index Brokerage Type</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="optionsIndexBrokerageType"
                  value={formData.optionsIndexBrokerageType}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Lot Basis">Per Lot Basis</option>
                  <option value="Per Crore Basis">Per Crore Basis</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Options Equity Brokerage Type</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="optionsEquityBrokerageType"
                  value={formData.optionsEquityBrokerageType}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Lot Basis">Per Lot Basis</option>
                  <option value="Per Crore Basis">Per Crore Basis</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Options MCX Brokerage Type</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="optionsMcxBrokerageType"
                  value={formData.optionsMcxBrokerageType}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Lot Basis">Per Lot Basis</option>
                  <option value="Per Crore Basis">Per Crore Basis</option>
                </TextField>
              </Grid>

              {/* Brokerage Values */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Index Brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="optionsIndexBrokerage"
                  value={formData.optionsIndexBrokerage}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Min. Profit
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="optionsMinProfitPrice"
                  value={formData.optionsMinProfitPrice}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Quantity Fields */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum lot size allowed per single trade of Equity Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxEquityOptionsQuantity"
                  value={formData.maxEquityOptionsQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum lot size allowed per script of Equity Options to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxActiveEquityOptionsQuantity"
                  value={formData.maxActiveEquityOptionsQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Size Fields */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Max Size All Equity Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxSizeAllEquityOptions"
                  value={formData.maxSizeAllEquityOptions}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Max Size All Index Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxSizeAllIndexOptions"
                  value={formData.maxSizeAllIndexOptions}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Exposure Fields */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Holding Exposure/Margin Options Index
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="holdingExposureMarginOptionsIndex"
                  value={formData.holdingExposureMarginOptionsIndex}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Holding Exposure/Margin Options Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="holdingExposureMarginOptionsEquity"
                  value={formData.holdingExposureMarginOptionsEquity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Options Shortselling Config */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Options Shortselling Config:
            </Typography>

            <Grid container spacing={3}>
              {/* Brokerage Types */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Index Shortselling Brokerage Type
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="optionsIndexShortsellBrokerageType"
                  value={formData.optionsIndexShortsellBrokerageType}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Lot Basis">Per Lot Basis</option>
                  <option value="Per Crore Basis">Per Crore Basis</option>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Equity Shortselling Brokerage Type
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="optionsEquityShortsellBrokerageType"
                  value={formData.optionsEquityShortsellBrokerageType}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Per Lot Basis">Per Lot Basis</option>
                  <option value="Per Crore Basis">Per Crore Basis</option>
                </TextField>
              </Grid>

              {/* Brokerages */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Index Shortselling Brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="optionsIndexShortsellBrokerage"
                  value={formData.optionsIndexShortsellBrokerage}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Options Equity Shortselling Brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="optionsEquityShortsellBrokerage"
                  value={formData.optionsEquityShortsellBrokerage}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Quantity Limits */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Minimum lot size required per single trade of Equity Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="minEquityOptionsShortsellQuantity"
                  value={formData.minEquityOptionsShortsellQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Maximum lot size allowed per single trade of Equity Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="maxEquityOptionsShortsellQuantity"
                  value={formData.maxEquityOptionsShortsellQuantity}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Exposure/Margin Fields */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Intraday Exposure/Margin Options Index Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="intradayExposureMarginOptionsIndexShortsell"
                  value={formData.intradayExposureMarginOptionsIndexShortsell}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>
                  Holding Exposure/Margin Options Index Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="holdingExposureMarginOptionsIndexShortsell"
                  value={formData.holdingExposureMarginOptionsIndexShortsell}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Other Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                letterSpacing: 0.5, 
                fontSize: 24 
              }}
            >
              Other:
            </Typography>

            <Grid container spacing={3}>
              {/* Notes */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Notes</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size="small"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Transaction Password */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Transaction Password</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  name="transactionPassword"
                  value={formData.transactionPassword}
                  onChange={handleChange}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Grid>

              {/* Broker */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Broker</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="broker"
                  value={formData.broker}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="62:jain01">62:jain01</option>
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
            <Button 
              variant="outlined"
              color="inherit"
              sx={{ px: 4, py: 1 }}
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 4, py: 1 }}
            >
              Update Trading Client
            </Button>
          </Box>
        </form>
        )}
      </Box>
    </DashboardLayout>
  );
}
