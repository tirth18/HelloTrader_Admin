'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { Box, Typography, Paper, Grid, TextField, InputAdornment, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function CreateTradingClientPage() {
  const theme = useTheme();
  const router = useRouter();
  const secondaryTextColor = theme.palette.text.secondary;
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    user_id: '',
    transaction_password: '',
    notes: '',
    broker_id: '',
    demoAccount: false,
    accountStatus: true,
    allowOrderBetweenHighLow: true,
    allowFreshAboveHighBelowLow: false,
    creditLimit: 50000,
    funds: 0,
    autoClosePercentageBalance: 90,
    notifyPercentageBalance: 70,
    minTimeBookProfit: 120,
    tradeEquityAsUnits: false,
    autoCloseTrades: true,
    mcxTrading: true,
    EQTrading: true,
    indexOptionsTrading: true,
    mcxOptionsTrading: true,
    equityOptionsTrading: true,
    // MCX Futures fields
    maxLotSizeAllowedPerSingleTradeMCX: 20,
    minLotSizeRequiredPerSingleTradeMCX: 0,
    maxLotSizeAllowedPerScriptActivelyOpenMCX: 50,
    maxSizeAllCommodity: 100,
    mcxBrokerage: 800,
    mcxBrokerageType: "Per Crore Basis",
    exposureMcxType: "Per Turnover Basis", 
    intradayExposureMarginMCX: 500,
    holdingExposureMarginMCX: 100,
    // Commodity points fields
    goldm: 0,
    bulldex: 0,
    silver: 0,
    copper: 0,
    zinc: 0,
    naturalgas: 0,
    aluminium: 0,
    cotton: 0,
    zincmini: 0,
    leadmini: 0,
    silverm: 0,
    gold: 0,
    crudeoil: 0,
    nickel: 0,
    lead: 0,
    naturalgasmini: 0,
    menthaoil: 0,
    silvermic: 0,
    alumini: 0,
    crudeoilmini: 0,
    // Equity Futures fields
    equityBrokeragePer: 800,
    minLotSizeRequiredPerSingleTradeEQ: 0,
    maxLotSizeAllowedPerSingleTradeEQ: 50,
    minLotSizeRequiredPerSingleTradeEQINDEX: 0,
    maxLotSizeAllowedPerSingleTradeEQINDEX: 20,
    maxLotSizeAllowedPerScriptActivelyOpenEQ: 100,
    maxLotSizeAllowedPerScriptActivelyOpenEQINDEX: 100,
    maxSizeAllEquity: 100,
    maxSizeAllIndex: 100,
    intradayExposureMarginEQ: 500,
    holdingExposureMarginEQ: 100,
    ordersAwayByPercentEQ: 0,
    // Options Config fields
    optionsIndexBrokerage: 25,
    optionsEquityBrokerage: 40,
    optionsMCXBrokerage: 50,
    optionsIndexBrokerageType: "Per Lot Basis",
    optionsEquityBrokerageType: "Per Lot Basis",
    optionsMCXBrokerageType: "Per Lot Basis",
    optionsMinBidPrice: 2,
    optionsIndexShortSellingAllowed: "Yes",
    optionsEquityShortSellingAllowed: "No",
    optionsMCXShortSellingAllowed: "No",
    minLotSizeRequiredPerSingleTradeEqOptions: 1,
    minLotSizeRequiredPerSingleTradeEqIndexOptions: 1,
    minLotSizeRequiredPerSingleTradeMCXOptions: 1,
    maxLotSizeAllowedPerSingleTradeEqOptions: 10,
    maxLotSizeAllowedPerSingleTradeEqIndexOptions: 20,
    maxLotSizeAllowedPerSingleTradeMCXOptions: 20,
    maxLotSizeAllowedPerScriptActivelyOpenEqOptions: 10,
    maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptions: 20,
    maxLotSizeAllowedPerScriptActivelyOpenMCXOptions: 10,
    maxSizeAllEquityOptions: 10,
    maxSizeAllIndexOptions: 10,
    maxSizeAllMCXOptions: 10,
    intradayExposureMarginOptionsIndex: 7,
    holdingExposureMarginOptionsIndex: 3,
    intradayExposureMarginOptionsEquity: 10,
    holdingExposureMarginOptionsEquity: 3,
    intradayExposureMarginOptionsMCX: 10,
    holdingExposureMarginOptionsMCX: 3,
    ordersAwayByPercentOptions: 0,
    // Options Shortselling Config fields
    optionsIndexShortsellBrokerageType: "Per Lot Basis",
    optionsEquityShortsellBrokerageType: "Per Lot Basis",
    optionsMCXShortsellBrokerageType: "Per Lot Basis",
    optionsIndexShortsellBrokerage: 50,
    optionsEquityShortsellBrokerage: 20,
    optionsMCXShortsellBrokerage: 20,
    minLotSizeRequiredPerSingleTradeEqOptionsShortsell: 0,
    minLotSizeRequiredPerSingleTradeMCXOptionsShortsell: 1,
    minLotSizeRequiredPerSingleTradeEqIndexOptionsShortsell: 0,
    maxLotSizeAllowedPerSingleTradeEqOptionsShortsell: 2,
    maxLotSizeAllowedPerSingleTradeMCXOptionsShortsell: 3,
    maxLotSizeAllowedPerSingleTradeEqIndexOptionsShortsell: 10,
    maxLotSizeAllowedPerScriptActivelyOpenEqOptionsShortsell: 5,
    maxLotSizeAllowedPerScriptActivelyOpenMCXOptionsShortsell: 7,
    maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptionsShortsell: 10,
    maxSizeAllEquityOptionsShortsell: 10,
    maxSizeAllIndexOptionsShortsell: 10,
    maxSizeAllMCXOptionsShortsell: 30,
    intradayExposureMarginOptionsIndexShortsell: 2,
    intradayExposureMarginOptionsEquityShortsell: 3,
    intradayExposureMarginOptionsMCXShortsell: 5,
    holdingExposureMarginOptionsIndexShortsell: 1,
    holdingExposureMarginOptionsEquityShortsell: 2,
    holdingExposureMarginOptionsMCXShortsell: 3,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a unique user_id if not provided
      const userId = formData.user_id || `user${Date.now().toString().slice(-8)}`;
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Prepare payload for API
      const payload = {
        user_id: userId,
        phone: formData.phone,
        email: formData.email || `${userId}@example.com`,
        name: formData.name,
        username: formData.username,
        last_name: formData.last_name || '',
        password: formData.password,
        permissions: ["user"],
        code_verification: "123456", // Default code verification
        creditLimit: Number(formData.creditLimit),
        funds: Number(formData.funds),
        broker_id: formData.broker_id || "60f9b4f2e7c2a7453bb0bb42", // Default broker_id
        maxTradesAllowed: 10,
        accountStatus: formData.accountStatus,
        demoAccount: formData.demoAccount,
        allowOrderAtCurrentBidAsk: true,
        allowFreshAboveHighBelowLow: formData.allowFreshAboveHighBelowLow,
        allowOrderBetweenHighLow: formData.allowOrderBetweenHighLow,
        autoClosePercentageBalance: Number(formData.autoClosePercentageBalance),
        notifyPercentageBalance: Number(formData.notifyPercentageBalance),
        minTimeBookProfit: Number(formData.minTimeBookProfit),
        tradeEquityAsUnits: formData.tradeEquityAsUnits,
        autoCloseTrades: formData.autoCloseTrades,
        mcxTrading: formData.mcxTrading,
        maxLotSizeRequiredPerSingleTradeMCX: Number(formData.minLotSizeRequiredPerSingleTradeMCX),
        maxLotSizeAllowedPerSingleTradeMCX: Number(formData.maxLotSizeAllowedPerSingleTradeMCX),
        maxLotSizeAllowedPerScriptActivelyOpenMCX: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenMCX),
        maxLotSizeAllowedOverallActivelyOpenMCX: Number(formData.maxSizeAllCommodity),
        mcxBrokerageType: formData.mcxBrokerageType,
        mcxBrokeragePerCrore: Number(formData.mcxBrokerage),
        intradayExposureMarginMCX: Number(formData.intradayExposureMarginMCX),
        holdingExposureMarginMCX: Number(formData.holdingExposureMarginMCX),
        
        // Required commodity margin fields
        MGOLD_intraday: 1,
        MGOLD_holding: 2,
        MSILVER_intraday: 1.5,
        MSILVER_holding: 3,
        BULLDEX_intraday: 5,
        BULLDEX_holding: 10,
        GOLD_intraday: 2,
        GOLD_holding: 4,
        SILVER_intraday: 2.5,
        SILVER_holding: 5,
        CRUDEOIL_intraday: 3,
        CRUDEOIL_holding: 6,
        COPPER_intraday: 2,
        COPPER_holding: 4,
        
        EQTrading: formData.EQTrading,
        EQBrokragePerCrore: Number(formData.equityBrokeragePer),
        intradayExposureMarginEQ: Number(formData.intradayExposureMarginEQ),
        holdingExposureMarginEQ: Number(formData.holdingExposureMarginEQ),
        EQOrderAwayByPercentFromCurrentPrice: Number(formData.ordersAwayByPercentEQ),
        minLotSizeRequiredPerSingleTradeEQFUT: Number(formData.minLotSizeRequiredPerSingleTradeEQ),
        minLotSizeRequiredPerSingleTradeEQFUTINDEX: Number(formData.minLotSizeRequiredPerSingleTradeEQINDEX),
        maxLotSizeAllowedPerScriptActivelyOpenEQ: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenEQ),
        maxLotSizeAllowedOverallActivelyOpenEQ: Number(formData.maxSizeAllEquity),
        maxLotSizeRequiredPerSingleTradeEQFUT: Number(formData.maxLotSizeAllowedPerSingleTradeEQ),
        maxLotSizeRequiredPerSingleTradeEQFUTINDEX: Number(formData.maxLotSizeAllowedPerSingleTradeEQINDEX),
        maxLotSizeAllowedPerScriptActivelyOpenEQINDEX: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenEQINDEX),
        maxLotSizeAllowedOverallActivelyOpenEQINDEX: Number(formData.maxSizeAllIndex),
        
        // Options config fields
        indexOptionsTrading: formData.indexOptionsTrading,
        mcxOptionsTrading: formData.mcxOptionsTrading,
        equityOptionsTrading: formData.equityOptionsTrading,
        optionsIndexBrokerage: Number(formData.optionsIndexBrokerage),
        optionsEquityBrokerage: Number(formData.optionsEquityBrokerage),
        optionsMCXBrokerage: Number(formData.optionsMCXBrokerage),
        optionsIndexBrokerageType: formData.optionsIndexBrokerageType,
        optionsEquityBrokerageType: formData.optionsEquityBrokerageType,
        optionsMCXBrokerageType: formData.optionsMCXBrokerageType,
        optionsMinBidPrice: Number(formData.optionsMinBidPrice),
        optionsIndexShortSellingAllowed: formData.optionsIndexShortSellingAllowed === "Yes",
        optionsEquityShortSellingAllowed: formData.optionsEquityShortSellingAllowed === "Yes",
        optionsMCXShortSellingAllowed: formData.optionsMCXShortSellingAllowed === "Yes",
        minLotSizeEquity: Number(formData.minLotSizeRequiredPerSingleTradeEqOptions),
        minLotSizeIndex: Number(formData.minLotSizeRequiredPerSingleTradeEqIndexOptions),
        minLotSizeMCX: Number(formData.minLotSizeRequiredPerSingleTradeMCXOptions),
        maxLotSizeEquity: Number(formData.maxLotSizeAllowedPerSingleTradeEqOptions),
        maxLotSizeIndex: Number(formData.maxLotSizeAllowedPerSingleTradeEqIndexOptions),
        maxLotSizeMCX: Number(formData.maxLotSizeAllowedPerSingleTradeMCXOptions),
        maxSizeAllEquity: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenEqOptions),
        maxSizeAllIndex: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptions),
        maxSizeAllMCX: Number(formData.maxLotSizeAllowedPerScriptActivelyOpenMCXOptions),
        holdingExposureMarginIndex: Number(formData.holdingExposureMarginOptionsIndex),
        holdingExposureMarginEquity: Number(formData.holdingExposureMarginOptionsEquity),
        intradayExposureMarginIndex: Number(formData.intradayExposureMarginOptionsIndex),
        intradayExposureMarginEquity: Number(formData.intradayExposureMarginOptionsEquity),
        orderAwayPercentage: Number(formData.ordersAwayByPercentOptions),
        is_active: true,
        equityTradeType: "lots",
        is_new: true,
        transaction_password: formData.transaction_password || "123456",
        isAdmin: false,
        notes: formData.notes || "",
        exposureMcxType: formData.exposureMcxType,
        goldm: Number(formData.goldm),
        bulldex: Number(formData.bulldex),
        silver: Number(formData.silver),
        copper: Number(formData.copper),
        zinc: Number(formData.zinc),
        naturalgas: Number(formData.naturalgas),
        aluminium: Number(formData.aluminium),
        cotton: Number(formData.cotton),
        zincmini: Number(formData.zincmini),
        leadmini: Number(formData.leadmini),
        silverm: Number(formData.silverm),
        gold: Number(formData.gold),
        crudeoil: Number(formData.crudeoil),
        nickel: Number(formData.nickel),
        lead: Number(formData.lead),
        naturalgasmini: Number(formData.naturalgasmini),
        menthaoil: Number(formData.menthaoil),
        silvermic: Number(formData.silvermic),
        alumini: Number(formData.alumini),
        crudeoilmini: Number(formData.crudeoilmini),
      };

      // Call the API
      const response = await axios.post('http://13.233.225.7:8000/api/user/register', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      console.log('API Response:', response.data);
      
      setAlert({
        open: true,
        message: 'Trading client created successfully!',
        severity: 'success'
      });

      // Navigate back to trading clients list after success
      setTimeout(() => {
        router.push('/trading-clients');
      }, 2000);

    } catch (error) {
      console.error('Error creating trading client:', error);
      setAlert({
        open: true,
        message: `Error: ${error.response?.data?.message || error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Personal Details:
            </Typography>
            <Grid container spacing={3}>
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
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Insert Real name of the trader. Will be visible in trading App
                    </span>
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Last Name</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name" 
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Mobile</Typography>
                <TextField 
                  fullWidth 
                  size="small" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number" 
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} 
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Email</Typography>
                <TextField 
                  fullWidth 
                  size="small"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address" 
                  type="email"
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} 
                />
              </Grid>
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
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols.
                    </span>
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Password</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="password for loggin-in with, is case sensitive."
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      password for loggin-in with, is case sensitive.
                    </span>
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Initial Funds</Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="funds"
                  type="number"
                  value={formData.funds}
                  onChange={handleChange}
                  InputProps={{
                    style: { fontWeight: 700, fontSize: 16 },
                  }}
                />
              </Grid>
            </Grid>

            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Config:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="demoAccount" checked={formData.demoAccount} onChange={handleChange} />} 
                  label="demo account?" 
                />
                <FormControlLabel 
                  control={<Checkbox name="allowOrderBetweenHighLow" checked={formData.allowOrderBetweenHighLow} onChange={handleChange} defaultChecked />} 
                  label="Allow Orders between High - Low?" 
                />
                <FormControlLabel 
                  control={<Checkbox name="accountStatus" checked={formData.accountStatus} onChange={handleChange} defaultChecked />} 
                  label="Account Status" 
                />
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                    auto-Close all active trades when the losses reach % of Ledger-balance
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="autoClosePercentageBalance"
                    type="number"
                    value={formData.autoClosePercentageBalance}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                    Example: 95, will close when losses reach 95% of ledger balance
                  </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                    Min. Time to book profit (No. of Seconds)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minTimeBookProfit"
                    type="number"
                    value={formData.minTimeBookProfit}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                    Example: 120, will hold the trade for 2 minutes before closing a trade in profit
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="allowFreshAboveHighBelowLow" checked={formData.allowFreshAboveHighBelowLow} onChange={handleChange} />} 
                  label="Allow Fresh Entry Order above high & below low?" 
                />
                <FormControlLabel 
                  control={<Checkbox name="tradeEquityAsUnits" checked={formData.tradeEquityAsUnits} onChange={handleChange} />} 
                  label="Trade equity as units instead of lots." 
                />
                <FormControlLabel 
                  control={<Checkbox name="autoCloseTrades" checked={formData.autoCloseTrades} onChange={handleChange} defaultChecked />} 
                  label="Auto Close Trades if condition met" 
                />
                <FormControlLabel 
                  control={<Checkbox name="mcxTrading" checked={formData.mcxTrading} onChange={handleChange} defaultChecked />} 
                  label="MCX Trading" 
                />
                <FormControlLabel 
                  control={<Checkbox name="EQTrading" checked={formData.EQTrading} onChange={handleChange} defaultChecked />} 
                  label="EQ Trading" 
                />
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                    Notify client when the losses reach % of Ledger-balance
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="notifyPercentageBalance"
                    type="number"
                    value={formData.notifyPercentageBalance}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                    Example: 70, will send notification to customer every 5-minutes until losses cross 70% of ledger balance
                  </Typography>
                </Box>
              </Grid>
            </Grid>



            {/* MCX Futures Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              MCX Futures:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="mcxTrading" checked={formData.mcxTrading} onChange={handleChange} defaultChecked />} 
                  label="MCX Trading" 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lot size allowed per single trade of MCX" 
                  name="maxLotSizeAllowedPerSingleTradeMCX"
                  type="number"
                  value={formData.maxLotSizeAllowedPerSingleTradeMCX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Max Size All Commodity" 
                  name="maxSizeAllCommodity"
                  type="number"
                  value={formData.maxSizeAllCommodity}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="MCX brokerage" 
                  name="mcxBrokerage"
                  type="number"
                  value={formData.mcxBrokerage}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Intraday Exposure/Margin MCX" 
                  name="intradayExposureMarginMCX"
                  type="number"
                  value={formData.intradayExposureMarginMCX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Orders to be away by points in each scrip MCX:</Typography>
                  {[
                    { label: 'GOLDM', field: 'goldm' },
                    { label: 'BULLDEX', field: 'bulldex' },
                    { label: 'SILVER', field: 'silver' },
                    { label: 'COPPER', field: 'copper' },
                    { label: 'ZINC', field: 'zinc' },
                    { label: 'NATURALGAS', field: 'naturalgas' },
                    { label: 'ALUMINIUM', field: 'aluminium' },
                    { label: 'COTTON', field: 'cotton' },
                    { label: 'ZINCMINI', field: 'zincmini' },
                    { label: 'LEADMINI', field: 'leadmini' }
                  ].map(item => (
                    <Box key={item.field} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography sx={{ width: 110, fontSize: 18 }}>{item.label}:</Typography>
                      <TextField 
                        size="small" 
                        name={item.field}
                        type="number"
                        value={formData[item.field]}
                        onChange={handleChange}
                        sx={{ width: 100, fontSize: 16 }} 
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Minimum lot size required per single trade of MCX" 
                  name="minLotSizeRequiredPerSingleTradeMCX"
                  type="number"
                  value={formData.minLotSizeRequiredPerSingleTradeMCX}
                  onChange={handleChange}
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lot size allowed per script of MCX to be actively open at a time" 
                  name="maxLotSizeAllowedPerScriptActivelyOpenMCX"
                  type="number"
                  value={formData.maxLotSizeAllowedPerScriptActivelyOpenMCX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Mcx Brokerage Type</InputLabel>
                  <Select 
                    label="Mcx Brokerage Type" 
                    name="mcxBrokerageType"
                    value={formData.mcxBrokerageType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Exposure Mcx Type</InputLabel>
                  <Select 
                    label="Exposure Mcx Type" 
                    name="exposureMcxType"
                    value={formData.exposureMcxType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Holding Exposure/Margin MCX" 
                  name="holdingExposureMarginMCX"
                  type="number"
                  value={formData.holdingExposureMarginMCX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
                
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: 'SILVERM', field: 'silverm' },
                    { label: 'GOLD', field: 'gold' },
                    { label: 'CRUDEOIL', field: 'crudeoil' },
                    { label: 'NICKEL', field: 'nickel' },
                    { label: 'LEAD', field: 'lead' },
                    { label: 'NATURALGAS MINI', field: 'naturalgasmini' },
                    { label: 'MENTHAOIL', field: 'menthaoil' },
                    { label: 'SILVERMIC', field: 'silvermic' },
                    { label: 'ALUMINI', field: 'alumini' },
                    { label: 'CRUDEOIL MINI', field: 'crudeoilmini' }
                  ].map(item => (
                    <Box key={item.field} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography sx={{ width: 110, fontSize: 18 }}>{item.label}:</Typography>
                      <TextField 
                        size="small" 
                        name={item.field}
                        type="number"
                        value={formData[item.field]}
                        onChange={handleChange}
                        sx={{ width: 100, fontSize: 16 }} 
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Equity Futures Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Equity Futures:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="EQTrading" checked={formData.EQTrading} onChange={handleChange} defaultChecked />} 
                  label="Equity Trading" 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Minimum lots size required per single trade of Equity" 
                  name="minLotSizeRequiredPerSingleTradeEQ"
                  type="number"
                  value={formData.minLotSizeRequiredPerSingleTradeEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Minimum lots size required per single trade of Equity INDEX" 
                  name="minLotSizeRequiredPerSingleTradeEQINDEX"
                  type="number"
                  value={formData.minLotSizeRequiredPerSingleTradeEQINDEX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lots size allowed per scrip of Equity to be actively open at a time" 
                  name="maxLotSizeAllowedPerScriptActivelyOpenEQ"
                  type="number"
                  value={formData.maxLotSizeAllowedPerScriptActivelyOpenEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Max Size All Equity" 
                  name="maxSizeAllEquity"
                  type="number"
                  value={formData.maxSizeAllEquity}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Intraday Exposure/Margin Equity" 
                  name="intradayExposureMarginEQ"
                  type="number"
                  value={formData.intradayExposureMarginEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Orders to be away by % from current price Equity" 
                  name="ordersAwayByPercentEQ"
                  type="number"
                  value={formData.ordersAwayByPercentEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Equity brokerage Per Crore" 
                  name="equityBrokeragePer"
                  type="number"
                  value={formData.equityBrokeragePer}
                  onChange={handleChange}
                  sx={{ mt: 0 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lots size allowed per single trade of Equity" 
                  name="maxLotSizeAllowedPerSingleTradeEQ"
                  type="number"
                  value={formData.maxLotSizeAllowedPerSingleTradeEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lots size allowed per single trade of Equity INDEX" 
                  name="maxLotSizeAllowedPerSingleTradeEQINDEX"
                  type="number"
                  value={formData.maxLotSizeAllowedPerSingleTradeEQINDEX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Maximum lots size allowed per scrip of Equity INDEX to be actively open at a time" 
                  name="maxLotSizeAllowedPerScriptActivelyOpenEQINDEX"
                  type="number"
                  value={formData.maxLotSizeAllowedPerScriptActivelyOpenEQINDEX}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Max Size All Index" 
                  name="maxSizeAllIndex"
                  type="number"
                  value={formData.maxSizeAllIndex}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                />
                
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Holding Exposure/Margin Equity" 
                  name="holdingExposureMarginEQ"
                  type="number"
                  value={formData.holdingExposureMarginEQ}
                  onChange={handleChange}
                  sx={{ mt: 2 }} 
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Grid>
            </Grid>

            {/* Options Config Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Options Config:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="indexOptionsTrading" checked={formData.indexOptionsTrading} onChange={handleChange} defaultChecked />} 
                  label="Index Options Trading" 
                />
                
                <FormControlLabel 
                  control={<Checkbox name="mcxOptionsTrading" checked={formData.mcxOptionsTrading} onChange={handleChange} defaultChecked />} 
                  label="MCX Options Trading" 
                  sx={{ display: 'block', mt: 1 }} 
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Index brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsIndexBrokerage"
                    type="number"
                    value={formData.optionsIndexBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Equity brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsEquityBrokerage"
                    type="number"
                    value={formData.optionsEquityBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options MCX brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsMCXBrokerage"
                    type="number"
                    value={formData.optionsMCXBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Index Short Selling Allowed (Sell First and Buy later)
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsIndexShortSellingAllowed"
                      value={formData.optionsIndexShortSellingAllowed}
                      onChange={handleChange}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    MCX Options Short Selling Allowed (Sell First and Buy later)
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsMCXShortSellingAllowed"
                      value={formData.optionsMCXShortSellingAllowed}
                      onChange={handleChange}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of Equity Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeEqOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeEqOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of Equity INDEX Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeEqIndexOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeEqIndexOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of MCX Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeMCXOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeMCXOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of Equity INDEX Options to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All Equity Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllEquityOptions"
                    type="number"
                    value={formData.maxSizeAllEquityOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All MCX Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllMCXOptions"
                    type="number"
                    value={formData.maxSizeAllMCXOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel 
                  control={<Checkbox name="equityOptionsTrading" checked={formData.equityOptionsTrading} onChange={handleChange} defaultChecked />} 
                  label="Equity Options Trading" 
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Index Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsIndexBrokerageType"
                      value={formData.optionsIndexBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Equity Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsEquityBrokerageType"
                      value={formData.optionsEquityBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options MCX Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsMCXBrokerageType"
                      value={formData.optionsMCXBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Min. Bid Price
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsMinBidPrice"
                    type="number"
                    value={formData.optionsMinBidPrice}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Equity Short Selling Allowed (Sell First and Buy later)
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsEquityShortSellingAllowed"
                      value={formData.optionsEquityShortSellingAllowed}
                      onChange={handleChange}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of Equity Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeEqOptions"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeEqOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of Equity INDEX Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeEqIndexOptions"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeEqIndexOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of MCX Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeMCXOptions"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeMCXOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of Equity Options to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenEqOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenEqOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of MCX Options to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenMCXOptions"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenMCXOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All Index Options
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllIndexOptions"
                    type="number"
                    value={formData.maxSizeAllIndexOptions}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Options Shortselling Config Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Options Shortselling Config:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Index Shortselling Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsIndexShortsellBrokerageType"
                      value={formData.optionsIndexShortsellBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Equity Shortselling Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsEquityShortsellBrokerageType"
                      value={formData.optionsEquityShortsellBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options MCX Shortselling Brokerage Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      name="optionsMCXShortsellBrokerageType"
                      value={formData.optionsMCXShortsellBrokerageType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of Equity Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeEqOptionsShortsell"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeEqOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of MCX Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeMCXOptionsShortsell"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeMCXOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Minimum lot size required per single trade of Equity INDEX Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="minLotSizeRequiredPerSingleTradeEqIndexOptionsShortsell"
                    type="number"
                    value={formData.minLotSizeRequiredPerSingleTradeEqIndexOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of Equity Options Shortselling to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenEqOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenEqOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of MCX Options Shortselling to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenMCXOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenMCXOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All Index Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllIndexOptionsShortsell"
                    type="number"
                    value={formData.maxSizeAllIndexOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Intraday Exposure/Margin Options Index Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="intradayExposureMarginOptionsIndexShortsell"
                    type="number"
                    value={formData.intradayExposureMarginOptionsIndexShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                      </span>
                    }
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Intraday Exposure/Margin Options Equity Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="intradayExposureMarginOptionsEquityShortsell"
                    type="number"
                    value={formData.intradayExposureMarginOptionsEquityShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                      </span>
                    }
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Intraday Exposure/Margin Options MCX Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="intradayExposureMarginOptionsMCXShortsell"
                    type="number"
                    value={formData.intradayExposureMarginOptionsMCXShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                      </span>
                    }
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Index Shortselling brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsIndexShortsellBrokerage"
                    type="number"
                    value={formData.optionsIndexShortsellBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options Equity Shortselling brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsEquityShortsellBrokerage"
                    type="number"
                    value={formData.optionsEquityShortsellBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Options MCX Shortselling brokerage
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="optionsMCXShortsellBrokerage"
                    type="number"
                    value={formData.optionsMCXShortsellBrokerage}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of Equity Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeEqOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeEqOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of MCX Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeMCXOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeMCXOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per single trade of Equity INDEX Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerSingleTradeEqIndexOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerSingleTradeEqIndexOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Maximum lot size allowed per scrip of Equity INDEX Options Shortselling to be actively open at a time
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptionsShortsell"
                    type="number"
                    value={formData.maxLotSizeAllowedPerScriptActivelyOpenEqIndexOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All Equity Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllEquityOptionsShortsell"
                    type="number"
                    value={formData.maxSizeAllEquityOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Max Size All MCX Options Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="maxSizeAllMCXOptionsShortsell"
                    type="number"
                    value={formData.maxSizeAllMCXOptionsShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Holding Exposure/Margin Options Index Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="holdingExposureMarginOptionsIndexShortsell"
                    type="number"
                    value={formData.holdingExposureMarginOptionsIndexShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                      </span>
                    }
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Holding Exposure/Margin Options Equity Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="holdingExposureMarginOptionsEquityShortsell"
                    type="number"
                    value={formData.holdingExposureMarginOptionsEquityShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                      </span>
                    }
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Holding Exposure/Margin Options MCX Shortselling
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="holdingExposureMarginOptionsMCXShortsell"
                    type="number"
                    value={formData.holdingExposureMarginOptionsMCXShortsell}
                    onChange={handleChange}
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                    helperText={
                      <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                        Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                      </span>
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Other Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
              Other:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Notes
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    placeholder="Add notes here..."
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Transaction Password
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="transaction_password"
                    value={formData.transaction_password}
                    onChange={handleChange}
                    type="password"
                    InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                    Broker
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      displayEmpty
                      name="broker_id"
                      value={formData.broker_id}
                      onChange={handleChange}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span>Select Broker</span>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Broker</em>
                      </MenuItem>
                      <MenuItem value="60f9b4f2e7c2a7453bb0bb42">Broker 1</MenuItem>
                      <MenuItem value="broker2">Broker 2</MenuItem>
                      <MenuItem value="broker3">Broker 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
              <Button 
                variant="outlined" 
                color="inherit" 
                sx={{ px: 4, py: 1 }}
                onClick={() => router.push('/trading-clients')}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ px: 4, py: 1 }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Trading Client'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
} 