import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

// Define API base URL - remove the /api/v1 since it's already in the env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://192.168.1.6:8003';

export interface Broker {
  // Personal Details
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  transaction_password: string;
  reference_code: string;
  description: string;
  broker_type: string;
  parent_id: number | null;
  balance?: number;  // Added for fund operations
  
  // Additional fields used in ViewBrokerProfile
  id?: string | number;
  creditLimit?: number;
  totalClients?: number;

  // Config
  account_status: string;
  is_active: boolean;
  auto_close_trade_threshold: number;
  notify_loss_threshold: number;
  brokerage_share: number;
  profit_loss_share: number;
  trading_clients_limit: number;
  sub_brokers_limit: number;

  // Permissions
  sub_brokers_access: boolean;
  payin_allowed: boolean;
  payout_allowed: boolean;
  create_clients_allowed: boolean;
  client_tasks_allowed: boolean;
  trade_activity_allowed: boolean;
  notifications_allowed: boolean;

  // MCX Trading
  mcx_trading_enabled: boolean;
  mcx_brokerage: number;
  mcx_brokerage_type: string;
  intraday_exposure_mcx: number;
  holding_exposure_mcx: number;

  // Equity Features
  equity_trading_enabled: boolean;
  equity_brokerage: number;
  equity_brokerage_type: string;
  intraday_exposure_equity: number;
  holding_exposure_equity: number;
}

const validationSchema = yup.object({
  // Personal Details
  name: yup.string().required('Name is required'),
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/, 'Password must contain at least one uppercase letter, one special character, and one number'),
  transaction_password: yup.string()
    .required('Transaction Password is required')
    .min(6, 'Transaction password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/, 'Transaction password must contain at least one uppercase letter, one special character, and one number'),
  reference_code: yup.string().required('Reference Code is required'),
  description: yup.string(),
  broker_type: yup.string().required('Type is required'),
  account_status: yup.string().required('Account Status is required'),
  is_active: yup.boolean(),

  // Trading Limits
  auto_close_trade_threshold: yup.number().required().min(0).max(100),
  notify_loss_threshold: yup.number().required().min(0).max(100),
  brokerage_share: yup.number().required().min(0).max(100),
  profit_loss_share: yup.number().required().min(0).max(100),
  trading_clients_limit: yup.number().required().min(0),
  sub_brokers_limit: yup.number().required().min(0),

  // Permissions
  sub_brokers_access: yup.boolean(),
  payin_allowed: yup.boolean(),
  payout_allowed: yup.boolean(),
  create_clients_allowed: yup.boolean(),
  client_tasks_allowed: yup.boolean(),
  notifications_allowed: yup.boolean(),
  trade_activity_allowed: yup.boolean(),

  // MCX Trading
  mcx_trading_enabled: yup.boolean(),
  mcx_brokerage: yup.number().required().min(0),
  mcx_brokerage_type: yup.string().required(),
  intraday_exposure_mcx: yup.number().required().min(0),
  holding_exposure_mcx: yup.number().required().min(0),

  // Equity Trading
  equity_trading_enabled: yup.boolean(),
  equity_brokerage: yup.number().required().min(0),
  equity_brokerage_type: yup.string().required(),
  intraday_exposure_equity: yup.number().required().min(0),
  holding_exposure_equity: yup.number().required().min(0)
});

type FormValues = {
  // Personal Details
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  transaction_password: string;
  reference_code: string;
  description: string;
  broker_type: string;
  parent_id: number | null;

  // Config
  account_status: string;
  is_active: boolean;
  auto_close_trade_threshold: number;
  notify_loss_threshold: number;
  brokerage_share: number;
  profit_loss_share: number;
  trading_clients_limit: number;
  sub_brokers_limit: number;

  // Permissions
  sub_brokers_access: boolean;
  payin_allowed: boolean;
  payout_allowed: boolean;
  create_clients_allowed: boolean;
  client_tasks_allowed: boolean;
  notifications_allowed: boolean;
  trade_activity_allowed: boolean;

  // MCX Trading
  mcx_trading_enabled: boolean;
  mcx_brokerage: number;
  mcx_brokerage_type: string;
  intraday_exposure_mcx: number;
  holding_exposure_mcx: number;

  // Equity Features
  equity_trading_enabled: boolean;
  equity_brokerage: number;
  equity_brokerage_type: string;
  intraday_exposure_equity: number;
  holding_exposure_equity: number;
};

interface BrokerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Broker) => Promise<void>;
  isSubmitting: boolean;
  existingBrokers: Array<{ id: string; name: string }>;
}

// API service function
const createBroker = async (brokerData: Broker, getToken: () => Promise<string>) => {
  let payload: any;
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Ensure all numeric values are sent as numbers
    payload = {
      first_name: brokerData.first_name,
      last_name: brokerData.last_name,
      name: brokerData.name || `${brokerData.first_name} ${brokerData.last_name}`,
      username: brokerData.username,
      password: brokerData.password,
      transaction_password: brokerData.transaction_password,
      reference_code: brokerData.reference_code,
      description: brokerData.description || "",
      broker_type: brokerData.broker_type,
      parent_id: null,
      account_status: brokerData.account_status,
      is_active: Boolean(brokerData.is_active),
      auto_close_trade_threshold: Number(brokerData.auto_close_trade_threshold),
      notify_loss_threshold: Number(brokerData.notify_loss_threshold),
      brokerage_share: Number(brokerData.brokerage_share),
      profit_loss_share: Number(brokerData.profit_loss_share),
      trading_clients_limit: Number(brokerData.trading_clients_limit),
      sub_brokers_limit: Number(brokerData.sub_brokers_limit),
      sub_brokers_access: Boolean(brokerData.sub_brokers_access),
      payin_allowed: Boolean(brokerData.payin_allowed),
      payout_allowed: Boolean(brokerData.payout_allowed),
      create_clients_allowed: Boolean(brokerData.create_clients_allowed),
      client_tasks_allowed: Boolean(brokerData.client_tasks_allowed),
      notifications_allowed: Boolean(brokerData.notifications_allowed),
      trade_activity_allowed: Boolean(brokerData.trade_activity_allowed),
      mcx_trading_enabled: Boolean(brokerData.mcx_trading_enabled),
      mcx_brokerage: Number(brokerData.mcx_brokerage),
      mcx_brokerage_type: brokerData.mcx_brokerage_type,
      intraday_exposure_mcx: Number(brokerData.intraday_exposure_mcx),
      holding_exposure_mcx: Number(brokerData.holding_exposure_mcx),
      equity_trading_enabled: Boolean(brokerData.equity_trading_enabled),
      equity_brokerage: Number(brokerData.equity_brokerage),
      equity_brokerage_type: brokerData.equity_brokerage_type,
      intraday_exposure_equity: Number(brokerData.intraday_exposure_equity),
      holding_exposure_equity: Number(brokerData.holding_exposure_equity)
    };

    console.log('Token:', token);
    console.log('API URL:', `${API_BASE_URL}/api/v1/brokers/`);
    console.log('Sending to API:', payload);

    const response = await axios.post(`${API_BASE_URL}/api/v1/brokers/`, payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.trim()}`
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data);
    console.error('Full error:', error);
    
    // Extract the specific error message from the SQL error if available
    const sqlError = error.response?.data?.detail?.match(/\(pymysql\.err\.[^)]+\) ([^[]+)/)?.[1];
    if (sqlError) {
      throw new Error(`Database error: ${sqlError}`);
    }

    if (error.response?.status === 401 && payload) {
      try {
        const newToken = await getToken();
        if (newToken) {
          const response = await axios.post(`${API_BASE_URL}/api/v1/brokers/`, payload, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken.trim()}`
            }
          });
          return response.data;
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('Session expired. Please login again.');
      }
    }

    const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Failed to create broker';
    if (error.response?.data?.validation_error) {
      throw new Error(JSON.stringify(error.response.data.validation_error));
    }
    throw new Error(errorMessage);
  }
};

export default function BrokerForm({ 
  open, 
  onClose, 
  onSubmit, 
  isSubmitting,
  existingBrokers 
}: BrokerFormProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isGeneratingRef, setIsGeneratingRef] = React.useState(false);
  const auth = useAuth();

  // Check authentication on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await auth.getToken();
        if (!token) {
          setError('No authentication token found. Please login again.');
        }
      } catch (error) {
        setError('Authentication error. Please login again.');
      }
    };
    checkAuth();
  }, [auth]);

  const formik = useFormik<FormValues>({
    initialValues: {
      // Personal Details
      name: '',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      transaction_password: '',
      reference_code: '',
      description: '',
      broker_type: 'Broker',
      parent_id: null,

      // Config
      account_status: 'Active',
      is_active: true,
      auto_close_trade_threshold: 90,
      notify_loss_threshold: 50,
      brokerage_share: 0,
      profit_loss_share: 0,
      trading_clients_limit: 10,
      sub_brokers_limit: 5,

      // Permissions
      sub_brokers_access: true,
      payin_allowed: true,
      payout_allowed: true,
      create_clients_allowed: true,
      client_tasks_allowed: true,
      notifications_allowed: true,
      trade_activity_allowed: true,

      // MCX Trading
      mcx_trading_enabled: true,
      mcx_brokerage: 800,
      mcx_brokerage_type: 'Per Crore Basis',
      intraday_exposure_mcx: 500,
      holding_exposure_mcx: 100,

      // Equity Features
      equity_trading_enabled: true,
      equity_brokerage: 800,
      equity_brokerage_type: 'Per Turnover Basis',
      intraday_exposure_equity: 500,
      holding_exposure_equity: 100,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        setValidationErrors({});
        
        // Prepare the data ensuring all fields are properly typed
        const brokerData = {
          ...values,
          first_name: values.first_name.trim(),
          last_name: values.last_name.trim(),
          name: values.name.trim() || `${values.first_name.trim()} ${values.last_name.trim()}`,
          username: values.username.trim(),
          description: values.description?.trim() || '',
          parent_id: null,
          is_active: true,
          // Ensure all numeric fields are numbers
          auto_close_trade_threshold: Number(values.auto_close_trade_threshold),
          notify_loss_threshold: Number(values.notify_loss_threshold),
          brokerage_share: Number(values.brokerage_share),
          profit_loss_share: Number(values.profit_loss_share),
          trading_clients_limit: Number(values.trading_clients_limit),
          sub_brokers_limit: Number(values.sub_brokers_limit),
          mcx_brokerage: Number(values.mcx_brokerage),
          intraday_exposure_mcx: Number(values.intraday_exposure_mcx),
          holding_exposure_mcx: Number(values.holding_exposure_mcx),
          equity_brokerage: Number(values.equity_brokerage),
          intraday_exposure_equity: Number(values.intraday_exposure_equity),
          holding_exposure_equity: Number(values.holding_exposure_equity),
        };

        console.log('Submitting broker data:', brokerData);
        
        const createdBroker = await createBroker(brokerData, auth.getToken);
        console.log('Broker created successfully:', createdBroker);
        
        await onSubmit(createdBroker);
        
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 2000);
      } catch (error: any) {
        console.error('Form submission error:', error);
        if (error.message === 'Unauthorized. Please login again.') {
          setError('Your session has expired. Please login again.');
          return;
        }
        
        try {
          const validationErrors = JSON.parse(error.message);
          setValidationErrors(validationErrors);
        } catch {
          setError(error.message);
        }
      }
    },
  });

  const generateRefCode = async () => {
    try {
      setIsGeneratingRef(true);
      const token = await auth.getToken();
      const response = await axios.get(`${API_BASE_URL}/brokers/generate-ref-code`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      formik.setFieldValue('reference_code', response.data.ref_code);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError('Failed to generate reference code');
      }
    } finally {
      setIsGeneratingRef(false);
    }
  };

  const getFieldError = (fieldName: keyof FormValues) => {
    return formik.touched[fieldName] && (formik.errors[fieldName] || validationErrors[fieldName]);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Create Broker</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {/* Personal Details */}
            <Typography variant="subtitle2" gutterBottom>Personal Details:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="first_name"
                  label="First Name"
                  value={formik.values.first_name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    formik.setFieldValue('first_name', value);
                    formik.setFieldValue('name', `${value} ${formik.values.last_name}`.trim());
                    formik.setFieldValue('username', `${value} ${formik.values.last_name}`.trim().toLowerCase());
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    const value = e.target.value.trim();
                    formik.setFieldValue('first_name', value);
                  }}
                  error={!!getFieldError('first_name')}
                  helperText={getFieldError('first_name') || "Enter your legal first name"}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="last_name"
                  label="Last Name"
                  value={formik.values.last_name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    formik.setFieldValue('last_name', value);
                    formik.setFieldValue('name', `${formik.values.first_name} ${value}`.trim());
                    formik.setFieldValue('username', `${formik.values.first_name} ${value}`.trim().toLowerCase());
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    const value = e.target.value.trim();
                    formik.setFieldValue('last_name', value);
                  }}
                  error={!!getFieldError('last_name')}
                  helperText={getFieldError('last_name') || "Enter your legal last name"}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('username')}
                  helperText={getFieldError('username') || "Username for logging in with, is not case sensitive, must be unique for every trader, should not contain symbols."}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  type="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('password')}
                  helperText={getFieldError('password')}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  type="password"
                  name="transaction_password"
                  label="Transaction Password"
                  value={formik.values.transaction_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('transaction_password')}
                  helperText={getFieldError('transaction_password')}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="reference_code"
                  label="Ref Code"
                  value={formik.values.reference_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('reference_code')}
                  helperText={getFieldError('reference_code')}
                  disabled={isSubmitting || isGeneratingRef}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button 
                          onClick={generateRefCode} 
                          sx={{ color: 'primary.main' }}
                          disabled={isSubmitting || isGeneratingRef}
                        >
                          {isGeneratingRef ? <CircularProgress size={20} /> : 'Generate'}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!getFieldError('broker_type')}>
                  <Select
                    name="broker_type"
                    value={formik.values.broker_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="Broker">Broker</MenuItem>
                  </Select>
                  {getFieldError('broker_type') && (
                    <FormHelperText>{getFieldError('broker_type')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('parent_id')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Parent Broker</Typography>
                  <Select
                    name="parent_id"
                    value={formik.values.parent_id || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="">None</MenuItem>
                    {existingBrokers.map((broker) => (
                      <MenuItem key={broker.id} value={broker.id}>
                        {broker.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {getFieldError('parent_id') && (
                    <FormHelperText>{getFieldError('parent_id')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Config Section */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Config:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.account_status === 'Active'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="account_status"
                    />
                  }
                  label="Account Status (Active)"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="auto_close_trade_threshold"
                  label="Auto-Close Trade Threshold (%)"
                  value={formik.values.auto_close_trade_threshold}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('auto_close_trade_threshold')}
                  helperText={
                    getFieldError('auto_close_trade_threshold') ||
                    "Auto-Close all active trades when the losses reach % of Ledger-Balance."
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="notify_loss_threshold"
                  label="Notify User at Loss Threshold (%)"
                  value={formik.values.notify_loss_threshold}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('notify_loss_threshold')}
                  helperText={
                    getFieldError('notify_loss_threshold') ||
                    "Notify client when the losses reach % of Ledger-balance."
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="brokerage_share"
                  label="Brokerage Share (%)"
                  value={formik.values.brokerage_share}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('brokerage_share')}
                  helperText={
                    getFieldError('brokerage_share') ||
                    "Example: 50, will give broker 50% of total brokerage collected from clients"
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="profit_loss_share"
                  label="Profit/Loss Share (%)"
                  value={formik.values.profit_loss_share}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('profit_loss_share')}
                  helperText={getFieldError('profit_loss_share')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="trading_clients_limit"
                  label="Trading Clients Limit"
                  value={formik.values.trading_clients_limit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('trading_clients_limit')}
                  helperText={
                    getFieldError('trading_clients_limit') ||
                    "Max. no. of Trading Clients"
                  }
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="sub_brokers_limit"
                  label="Sub Brokers Limit"
                  value={formik.values.sub_brokers_limit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!getFieldError('sub_brokers_limit')}
                  helperText={
                    getFieldError('sub_brokers_limit') ||
                    "Max. no. of Sub-brokers"
                  }
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>

            {/* Permissions Section */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Permissions:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('sub_brokers_access')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Sub Brokers Access</Typography>
                  <Select
                    name="sub_brokers_access"
                    value={formik.values.sub_brokers_access ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('sub_brokers_access', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('sub_brokers_access') && (
                    <FormHelperText>{getFieldError('sub_brokers_access')}</FormHelperText>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                    Create, Edit permissions
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('payin_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Payin Allowed</Typography>
                  <Select
                    name="payin_allowed"
                    value={formik.values.payin_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('payin_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('payin_allowed') && (
                    <FormHelperText>{getFieldError('payin_allowed')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('payout_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Payout Allowed</Typography>
                  <Select
                    name="payout_allowed"
                    value={formik.values.payout_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('payout_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('payout_allowed') && (
                    <FormHelperText>{getFieldError('payout_allowed')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('create_clients_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Create Clients Allowed</Typography>
                  <Select
                    name="create_clients_allowed"
                    value={formik.values.create_clients_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('create_clients_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('create_clients_allowed') && (
                    <FormHelperText>{getFieldError('create_clients_allowed')}</FormHelperText>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                    Create, Update, Reset Password
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('client_tasks_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Client Tasks Allowed</Typography>
                  <Select
                    name="client_tasks_allowed"
                    value={formik.values.client_tasks_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('client_tasks_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('client_tasks_allowed') && (
                    <FormHelperText>{getFieldError('client_tasks_allowed')}</FormHelperText>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                    Account Reset, Re-calculate brokerage
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('trade_activity_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Trade Activity Allowed</Typography>
                  <Select
                    name="trade_activity_allowed"
                    value={formik.values.trade_activity_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('trade_activity_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('trade_activity_allowed') && (
                    <FormHelperText>{getFieldError('trade_activity_allowed')}</FormHelperText>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                    Create, Update, Delete, Restore
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!getFieldError('notifications_allowed')}>
                  <Typography variant="caption" sx={{ mb: 1 }}>Notifications Allowed</Typography>
                  <Select
                    name="notifications_allowed"
                    value={formik.values.notifications_allowed ? 'Yes' : 'No'}
                    onChange={(e) => formik.setFieldValue('notifications_allowed', e.target.value === 'Yes')}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                  {getFieldError('notifications_allowed') && (
                    <FormHelperText>{getFieldError('notifications_allowed')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* MCX Trading Section */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>MCX Trading</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.mcx_trading_enabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="mcx_trading_enabled"
                    />
                  }
                  label="MCX Trading"
                />
              </Grid>
              {formik.values.mcx_trading_enabled && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="mcx_brokerage"
                      label="MCX Brokerage"
                      value={formik.values.mcx_brokerage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('mcx_brokerage')}
                      helperText={getFieldError('mcx_brokerage')}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!getFieldError('mcx_brokerage_type')}>
                      <Select
                        name="mcx_brokerage_type"
                        value={formik.values.mcx_brokerage_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                      >
                        <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                      </Select>
                      {getFieldError('mcx_brokerage_type') && (
                        <FormHelperText>{getFieldError('mcx_brokerage_type')}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="intraday_exposure_mcx"
                      label="Intraday Exposure/Margin MCX"
                      value={formik.values.intraday_exposure_mcx}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('intraday_exposure_mcx')}
                      helperText={
                        getFieldError('intraday_exposure_mcx') ||
                        "Exposure auto calculates the margin money required for any new trade entry. Calculation: turnover of a trade divided by Exposure is required margin."
                      }
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="holding_exposure_mcx"
                      label="Holding Exposure/Margin MCX"
                      value={formik.values.holding_exposure_mcx}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('holding_exposure_mcx')}
                      helperText={getFieldError('holding_exposure_mcx') || "Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day."}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {/* Equity Features Section */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>Equity Features</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.equity_trading_enabled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="equity_trading_enabled"
                    />
                  }
                  label="Equity Trading"
                />
              </Grid>
              {formik.values.equity_trading_enabled && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="equity_brokerage"
                      label="Equity Brokerage"
                      value={formik.values.equity_brokerage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('equity_brokerage')}
                      helperText={getFieldError('equity_brokerage')}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!getFieldError('equity_brokerage_type')}>
                      <Select
                        name="equity_brokerage_type"
                        value={formik.values.equity_brokerage_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                      >
                        <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                      </Select>
                      {getFieldError('equity_brokerage_type') && (
                        <FormHelperText>{getFieldError('equity_brokerage_type')}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="intraday_exposure_equity"
                      label="Intraday Exposure/Margin Equity"
                      value={formik.values.intraday_exposure_equity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('intraday_exposure_equity')}
                      helperText={
                        getFieldError('intraday_exposure_equity') ||
                        "Exposure auto calculates the margin money required for any new trade entry."
                      }
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="holding_exposure_equity"
                      label="Holding Exposure/Margin Equity"
                      value={formik.values.holding_exposure_equity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={!!getFieldError('holding_exposure_equity')}
                      helperText={
                        getFieldError('holding_exposure_equity') ||
                        "Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day."
                      }
                      disabled={isSubmitting}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? 'Creating...' : 'Create Broker'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Broker created successfully!
        </Alert>
      </Snackbar>
    </>
  );
} 