import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Grid, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  Switch
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Custom Required Label component
const RequiredLabel = ({ text }) => (
  <span>
    {text} <span style={{ color: 'red' }}>*</span>
  </span>
);

const CreateUserForm = ({ onSubmitForm }) => {
  // Form state
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  
  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string()
      .required('Username is required')
      .matches(
        /^[a-zA-Z0-9()-]+$/,
        'Username can only contain alphanumeric characters, hyphens and parentheses'
      ),
    password: Yup.string()
      .required('Password is required'),
    transactionPassword: Yup.string()
      .required('Transaction Password is required'),
    refCode: Yup.string(),
    type: Yup.string()
      .required('User type is required')
      .oneOf(['Broker', 'Admin'], 'Type must be either Broker or Admin'),
    accountStatus: Yup.boolean(),
    autoCloseThreshold: Yup.number()
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    notifyLossThreshold: Yup.number()
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    brokerageShare: Yup.number()
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    profitLossShare: Yup.number()
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    tradingClientsLimit: Yup.number()
      .integer('Must be an integer')
      .min(0, 'Must be at least 0'),
    subBrokersLimit: Yup.number()
      .integer('Must be an integer')
      .min(0, 'Must be at least 0'),
    maxSubBrokers: Yup.number()
      .integer('Must be an integer')
      .min(0, 'Must be at least 0'),
    // Permissions
    subBrokersAccess: Yup.boolean(),
    payrollAllowed: Yup.boolean(),
    payinAllowed: Yup.boolean(),
    createClientsAllowed: Yup.boolean(),
    clientTasksAllowed: Yup.boolean(),
    tradeActivityAllowed: Yup.boolean(),
    notificationsAllowed: Yup.boolean(),
    // MCX Futures
    enableMCXTrading: Yup.boolean(),
    mcxBrokerage: Yup.number()
      .min(0, 'Must be at least 0'),
    intradayExposureMCX: Yup.number()
      .min(0, 'Must be at least 0'),
    holdingExposureMCX: Yup.number()
      .min(0, 'Must be at least 0'),
    exposureMXType: Yup.string()
      .oneOf(['Per Crore Basis', 'Per Turnover Basis', 'Per Lot Basis']),
    maxBrokerageType: Yup.string()
      .oneOf(['Per Crore Basis', 'Per Turnover Basis']),
    // Equity Futures
    enableEquityTrading: Yup.boolean(),
    equityBrokerage: Yup.number()
      .min(0, 'Must be at least 0'),
    equityBrokerageType: Yup.string()
      .oneOf(['Per Core Basis', 'Per Turnover Basis']),
    intradayExposureEquity: Yup.number()
      .min(0, 'Must be at least 0'),
    holdingExposureEquity: Yup.number()
      .min(0, 'Must be at least 0'),
    equityTransactionPassword: Yup.string()
      .when('enableEquityTrading', {
        is: true,
        then: () => Yup.string().required('Transaction Password is required when Equity Trading is enabled'),
        otherwise: () => Yup.string()
      })
  });
  
  // Generate a random reference code
  const generateRefCode = () => {
    return `REF${Math.floor(1000 + Math.random() * 9000)}`;
  };
  
  // Initial values
  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    transactionPassword: '',
    refCode: generateRefCode(),
    type: 'Broker',
    accountStatus: true,
    autoCloseThreshold: 90,
    notifyLossThreshold: 50,
    brokerageShare: 0,
    profitLossShare: 0,
    tradingClientsLimit: 10,
    subBrokersLimit: 5,
    maxSubBrokers: 5,
    // Permissions
    subBrokersAccess: false,
    payrollAllowed: false,
    payinAllowed: false,
    createClientsAllowed: false,
    clientTasksAllowed: false,
    tradeActivityAllowed: false,
    notificationsAllowed: false,
    // MCX Futures
    enableMCXTrading: false,
    mcxBrokerage: 800,
    intradayExposureMCX: 500,
    holdingExposureMCX: 100,
    exposureMXType: 'Per Crore Basis',
    maxBrokerageType: 'Per Crore Basis',
    // Equity Futures
    enableEquityTrading: false,
    equityBrokerage: 800,
    equityBrokerageType: 'Per Turnover Basis',
    intradayExposureEquity: 500,
    holdingExposureEquity: 100,
    equityTransactionPassword: ''
  };
  
  // Form setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log('Form submitted', values);
      setLoading(true);
      try {
        console.log('User data submitted:', values);
        
        // If onSubmitForm prop is provided, call it with the form values
        if (onSubmitForm) {
          console.log('Calling onSubmitForm prop with values');
          onSubmitForm(values);
        } else {
          // For backward compatibility - show an alert if no callback provided
          console.log('No onSubmitForm prop provided, showing alert');
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('✅ Broker Created Successfully');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        setLoading(false);
      }
    },
  });
  
  // For debugging
  console.log('Form errors:', formik.errors);
  console.log('Form touched:', formik.touched);
  
  // Handle enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
  
  return (
    <Box component={Paper} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create User
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit} 
        noValidate 
        ref={formRef}
        onKeyDown={handleKeyDown}
      >
        {/* Personal Details Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Personal Details:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label={<RequiredLabel text="First Name" />}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                placeholder="Insert Real name of the broker. Will be visible in website"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label={<RequiredLabel text="Last Name" />}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                placeholder="Insert Real name of the broker. Will be visible in website"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label={<RequiredLabel text="Username" />}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={
                  (formik.touched.username && formik.errors.username) || 
                  "username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols."
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label={<RequiredLabel text="Password" />}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder="password for loggin-in with, is case sensitive."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="transactionPassword"
                name="transactionPassword"
                label={<RequiredLabel text="Transaction Password" />}
                type="password"
                value={formik.values.transactionPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.transactionPassword && Boolean(formik.errors.transactionPassword)}
                helperText={formik.touched.transactionPassword && formik.errors.transactionPassword}
                placeholder="Transaction Password to set"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="refCode"
                name="refCode"
                label="Ref Code"
                value={formik.values.refCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.refCode && Boolean(formik.errors.refCode)}
                helperText={formik.touched.refCode && formik.errors.refCode}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button 
                        size="small" 
                        onClick={() => formik.setFieldValue('refCode', generateRefCode())}
                      >
                        Generate
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                <InputLabel id="type-label">
                  <RequiredLabel text="Type" />
                </InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={<RequiredLabel text="Type" />}
                >
                  <MenuItem value="Broker">Broker</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <FormHelperText>{formik.errors.type}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Config Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Config:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="accountStatus"
                    name="accountStatus"
                    checked={formik.values.accountStatus}
                    onChange={formik.handleChange}
                  />
                }
                label="Account Status (Active)"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="autoCloseThreshold"
                name="autoCloseThreshold"
                label="Auto-Close Trade Threshold (%)"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={formik.values.autoCloseThreshold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.autoCloseThreshold && Boolean(formik.errors.autoCloseThreshold)}
                helperText={
                  (formik.touched.autoCloseThreshold && formik.errors.autoCloseThreshold) ||
                  "Auto-Close all active trades when the losses reach % of Ledger-Balance."
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="notifyLossThreshold"
                name="notifyLossThreshold"
                label="Notify User at Loss Threshold (%)"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={formik.values.notifyLossThreshold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notifyLossThreshold && Boolean(formik.errors.notifyLossThreshold)}
                helperText={
                  (formik.touched.notifyLossThreshold && formik.errors.notifyLossThreshold) ||
                  "Notify client when the losses reach % of Ledger-balance."
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="brokerageShare"
                name="brokerageShare"
                label="Brokerage Share (%)"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={formik.values.brokerageShare}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brokerageShare && Boolean(formik.errors.brokerageShare)}
                helperText={
                  (formik.touched.brokerageShare && formik.errors.brokerageShare) ||
                  "Example: 50, will give broker 30% of total brokerage collected from clients"
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="profitLossShare"
                name="profitLossShare"
                label="Profit/Loss Share (%)"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                value={formik.values.profitLossShare}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.profitLossShare && Boolean(formik.errors.profitLossShare)}
                helperText={formik.touched.profitLossShare && formik.errors.profitLossShare}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="tradingClientsLimit"
                name="tradingClientsLimit"
                label="Trading Clients Limit"
                type="number"
                value={formik.values.tradingClientsLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tradingClientsLimit && Boolean(formik.errors.tradingClientsLimit)}
                helperText={
                  (formik.touched.tradingClientsLimit && formik.errors.tradingClientsLimit) ||
                  "Max. no. of Trading Clients"
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="subBrokersLimit"
                name="subBrokersLimit"
                label="Sub Brokers Limit"
                type="number"
                value={formik.values.subBrokersLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subBrokersLimit && Boolean(formik.errors.subBrokersLimit)}
                helperText={
                  (formik.touched.subBrokersLimit && formik.errors.subBrokersLimit) ||
                  "Max. no. of Sub-brokers"
                }
              />
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Permissions Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Permissions:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Sub Brokers Access</InputLabel>
                <Select
                  id="subBrokersAccess"
                  name="subBrokersAccess"
                  value={formik.values.subBrokersAccess ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('subBrokersAccess', e.target.value === "Yes")}
                  label="Sub Brokers Access"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Create, Edit permissions</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payroll Allowed</InputLabel>
                <Select
                  id="payrollAllowed"
                  name="payrollAllowed"
                  value={formik.values.payrollAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('payrollAllowed', e.target.value === "Yes")}
                  label="Payroll Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payin Allowed</InputLabel>
                <Select
                  id="payinAllowed"
                  name="payinAllowed"
                  value={formik.values.payinAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('payinAllowed', e.target.value === "Yes")}
                  label="Payin Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Create Clients Allowed</InputLabel>
                <Select
                  id="createClientsAllowed"
                  name="createClientsAllowed"
                  value={formik.values.createClientsAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('createClientsAllowed', e.target.value === "Yes")}
                  label="Create Clients Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Create, Update, Reset Password</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client Tasks Allowed</InputLabel>
                <Select
                  id="clientTasksAllowed"
                  name="clientTasksAllowed"
                  value={formik.values.clientTasksAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('clientTasksAllowed', e.target.value === "Yes")}
                  label="Client Tasks Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Account Reset, Re-calculate brokerage</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trade Activity Allowed</InputLabel>
                <Select
                  id="tradeActivityAllowed"
                  name="tradeActivityAllowed"
                  value={formik.values.tradeActivityAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('tradeActivityAllowed', e.target.value === "Yes")}
                  label="Trade Activity Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
                <FormHelperText>Create, Update, Delete, Restore</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Notifications Allowed</InputLabel>
                <Select
                  id="notificationsAllowed"
                  name="notificationsAllowed"
                  value={formik.values.notificationsAllowed ? "Yes" : "No"}
                  onChange={(e) => formik.setFieldValue('notificationsAllowed', e.target.value === "Yes")}
                  label="Notifications Allowed"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* MCX Futures Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            MCX Futures:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="enableMCXTrading"
                    name="enableMCXTrading"
                    checked={formik.values.enableMCXTrading}
                    onChange={formik.handleChange}
                  />
                }
                label="MCX Trading"
              />
            </Grid>
            
            {formik.values.enableMCXTrading && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="mcxBrokerage"
                    name="mcxBrokerage"
                    label="MCX Brokerage"
                    type="number"
                    value={formik.values.mcxBrokerage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mcxBrokerage && Boolean(formik.errors.mcxBrokerage)}
                    helperText={formik.touched.mcxBrokerage && formik.errors.mcxBrokerage}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>MCX Brokerage Type</InputLabel>
                    <Select
                      id="exposureMXType"
                      name="exposureMXType"
                      value={formik.values.exposureMXType}
                      onChange={formik.handleChange}
                      label="MCX Brokerage Type"
                    >
                      <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                      <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="intradayExposureMCX"
                    name="intradayExposureMCX"
                    label="Intraday Exposure/Margin MCX"
                    type="number"
                    value={formik.values.intradayExposureMCX}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.intradayExposureMCX && Boolean(formik.errors.intradayExposureMCX)}
                    helperText={formik.touched.intradayExposureMCX && formik.errors.intradayExposureMCX}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="holdingExposureMCX"
                    name="holdingExposureMCX"
                    label="Holding Exposure/Margin MCX"
                    type="number"
                    value={formik.values.holdingExposureMCX}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.holdingExposureMCX && Boolean(formik.errors.holdingExposureMCX)}
                    helperText={formik.touched.holdingExposureMCX && formik.errors.holdingExposureMCX}
                  />
                </Grid>
                <>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1, mb: 2 }}>
                    <strong>Intraday Exposure/Margin MCX:</strong> Exposure auto calculates the margin money required for any new trade entry. Calculation: turnover of a trade divided by Exposure is required margin, eg. if right having interest of 100 is trading @ 22000 and exposure is 200, (22000 X 100) / 200 = ₹11000 is required to initiate the trade.
                  </Typography>
                  </Grid>
                <Grid item xs={12} md={6}>
                  
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    <strong>Holding Exposure/Margin MCX:</strong> Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation: turnover of a trade divided by Exposure is required margin, eg. if right having interest of 100 is trading @ 22000 and exposure is 100, (22000 X 100) / 50 = ₹44000 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin/CASH insufficient.
                  </Typography>
                </Grid>
                </>
               
              </>
            )}
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Equity Futures Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Equity Futures:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="enableEquityTrading"
                    name="enableEquityTrading"
                    checked={formik.values.enableEquityTrading}
                    onChange={formik.handleChange}
                  />
                }
                label="Equity Trading"
              />
            </Grid>
            
            {formik.values.enableEquityTrading && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="equityBrokerage"
                    name="equityBrokerage"
                    label="Equity Brokerage"
                    type="number"
                    value={formik.values.equityBrokerage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.equityBrokerage && Boolean(formik.errors.equityBrokerage)}
                    helperText={formik.touched.equityBrokerage && formik.errors.equityBrokerage}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Equity Brokerage Type</InputLabel>
                    <Select
                      id="equityBrokerageType"
                      name="equityBrokerageType"
                      value={formik.values.equityBrokerageType}
                      onChange={formik.handleChange}
                      label="Equity Brokerage Type"
                    >
                      <MenuItem value="Per Core Basis">Per Core Basis</MenuItem>
                      <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="intradayExposureEquity"
                    name="intradayExposureEquity"
                    label="Intraday Exposure/Margin Equity"
                    type="number"
                    value={formik.values.intradayExposureEquity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.intradayExposureEquity && Boolean(formik.errors.intradayExposureEquity)}
                    helperText={formik.touched.intradayExposureEquity && formik.errors.intradayExposureEquity}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="holdingExposureEquity"
                    name="holdingExposureEquity"
                    label="Holding Exposure/Margin Equity"
                    type="number"
                    value={formik.values.holdingExposureEquity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.holdingExposureEquity && Boolean(formik.errors.holdingExposureEquity)}
                    helperText={formik.touched.holdingExposureEquity && formik.errors.holdingExposureEquity}
                  />
                </Grid>
                <>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1, mb: 2 }}>
                    <strong>Intraday Exposure/Margin Equity:</strong> Exposure auto calculates the margin money required for any new trade entry. Calculation: turnover of a trade divided by Exposure is required margin, eg. if right having interest of 100 is trading @ 22000 and exposure is 200, (22000 X 100) / 200 = ₹11000 is required to initiate the trade.
                  </Typography>
                  
                </Grid>
                <Grid item xs={12} md={6}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    <strong>Holding Exposure/Margin Equity:</strong> Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation: turnover of a trade divided by Exposure is required margin, eg. if right having interest of 100 is trading @ 22000 and exposure is 100, (22000 X 100) / 50 = ₹44000 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin/CASH insufficient.
                  </Typography>
                </Grid>
                </>
              
                
                <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    id="equityTransactionPassword"
                    name="equityTransactionPassword"
                    label={formik.values.enableEquityTrading ? 
                      <RequiredLabel text="Transaction Password to set" /> : 
                      "Transaction Password to set"}
                    type="password"
                    value={formik.values.equityTransactionPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.equityTransactionPassword && Boolean(formik.errors.equityTransactionPassword)}
                    helperText={formik.touched.equityTransactionPassword && formik.errors.equityTransactionPassword}
                    required={formik.values.enableEquityTrading}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
        {/* Submit Button at the end */}
        <Box sx={{ mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
            sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {loading ? 'Creating...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateUserForm; 