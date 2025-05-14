import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  MenuItem,
  Tabs,
  Tab,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { 
  CustomerData, 
  getDefaultCustomerData,
  createCustomer,
  updateCustomer
} from '../../services/customerService';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

interface CustomerFormProps {
  initialData?: CustomerData;
  isEditing?: boolean;
}

const validationSchema = Yup.object().shape({
  personal_details: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    initial_funds: Yup.number()
      .required('Initial funds are required')
      .min(0, 'Initial funds cannot be negative'),
    city: Yup.string().required('City is required'),
  }),
  config: Yup.object().shape({
    account_status: Yup.string().required('Account status is required'),
    autoCloseTrades: Yup.boolean(),
    auto_close_trades_loss_percent: Yup.number()
      .test(
        'conditional-required',
        'Auto close trades loss percent is required when auto close trades is enabled',
        function (value) {
          return !this.parent.autoCloseTrades || (value !== undefined && value !== null);
        }
      )
      .min(0, 'Cannot be negative')
      .max(100, 'Cannot be more than 100%'),
    notify_client_loss_percent: Yup.number()
      .required('Notify client loss percent is required')
      .min(0, 'Cannot be negative')
      .max(100, 'Cannot be more than 100%'),
  }),
  mcx_futures: Yup.object().shape({
    brokerage_type: Yup.string().required('Brokerage type is required'),
    brokerage: Yup.number().required('Brokerage is required').min(0, 'Cannot be negative'),
    exposure_type: Yup.string().required('Exposure type is required'),
  }),
  equity_futures: Yup.object().shape({
    equity_brokerage_per_crore: Yup.number()
      .required('Equity brokerage per crore is required')
      .min(0, 'Cannot be negative'),
  }),
  options_config: Yup.object().shape({
    index_brokerage_type: Yup.string().required('Index brokerage type is required'),
    equity_brokerage_type: Yup.string().required('Equity brokerage type is required'),
    mcx_brokerage_type: Yup.string().required('MCX brokerage type is required'),
  }),
  options_shortselling_config: Yup.object().shape({
    index_brokerage_type_short: Yup.string().required('Index brokerage type is required'),
    equity_brokerage_type_short: Yup.string().required('Equity brokerage type is required'),
    mcx_brokerage_type_short: Yup.string().required('MCX brokerage type is required'),
  }),
});

const CustomerForm: React.FC<CustomerFormProps> = ({ initialData, isEditing = false }) => {
  const [tabValue, setTabValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // Normalize customer data to expected format
  const normalizeCustomerData = (data: any): CustomerData => {
    console.log('Raw form data:', data);
    
    // If the data already matches our expected format
    if (data?.personal_details && data?.config && data?.mcx_futures) {
      // Still need to normalize some field names
      const normalizedData = { ...data };
      
      // Handle options fields with _options suffix in backend
      if (normalizedData.options_config) {
        if (normalizedData.options_config.max_size_all_equity_options) 
          normalizedData.options_config.max_size_all_equity = normalizedData.options_config.max_size_all_equity_options;
        
        if (normalizedData.options_config.max_size_all_index_options)
          normalizedData.options_config.max_size_all_index = normalizedData.options_config.max_size_all_index_options;
        
        if (normalizedData.options_config.max_size_all_mcx_options)
          normalizedData.options_config.max_size_all_mcx = normalizedData.options_config.max_size_all_mcx_options;
        
        if (normalizedData.options_config.intraday_exposure_index_options)
          normalizedData.options_config.intraday_exposure_index = normalizedData.options_config.intraday_exposure_index_options;
        
        if (normalizedData.options_config.holding_exposure_index_options)
          normalizedData.options_config.holding_exposure_index = normalizedData.options_config.holding_exposure_index_options;
        
        if (normalizedData.options_config.intraday_exposure_equity_options)
          normalizedData.options_config.intraday_exposure_equity = normalizedData.options_config.intraday_exposure_equity_options;
        
        if (normalizedData.options_config.holding_exposure_equity_options)
          normalizedData.options_config.holding_exposure_equity = normalizedData.options_config.holding_exposure_equity_options;
        
        if (normalizedData.options_config.intraday_exposure_mcx_options)
          normalizedData.options_config.intraday_exposure_mcx = normalizedData.options_config.intraday_exposure_mcx_options;
        
        if (normalizedData.options_config.holding_exposure_mcx_options)
          normalizedData.options_config.holding_exposure_mcx = normalizedData.options_config.holding_exposure_mcx_options;
        
        if (normalizedData.options_config.order_percentage_distance_options)
          normalizedData.options_config.order_percentage_distance = normalizedData.options_config.order_percentage_distance_options;
      }
      
      // Handle equity_futures fields with _equity suffix in backend
      if (normalizedData.equity_futures) {
        if (normalizedData.equity_futures.intraday_exposure_equity)
          normalizedData.equity_futures.intraday_exposure = normalizedData.equity_futures.intraday_exposure_equity;
        
        if (normalizedData.equity_futures.holding_exposure_equity)
          normalizedData.equity_futures.holding_exposure = normalizedData.equity_futures.holding_exposure_equity;
        
        if (normalizedData.equity_futures.order_percentage_distance_equity)
          normalizedData.equity_futures.order_percentage_distance = normalizedData.equity_futures.order_percentage_distance_equity;
      }
      
      // Handle autoCloseTrades field
      if (normalizedData.config && normalizedData.config.auto_close_trades_loss_percent !== undefined) {
        normalizedData.config.autoCloseTrades = normalizedData.config.auto_close_trades_loss_percent > 0;
      }
      
      return normalizedData;
    }
    
    // Otherwise, try to map fields from the API response format to our expected format
    const defaultData = getDefaultCustomerData();
    
    const normalized: CustomerData = {
      ...defaultData,
      id: data?.id,
      personal_details: {
        ...defaultData.personal_details,
        name: data?.personal_details?.name || data?.name || data?.personalDetails?.name || defaultData.personal_details.name,
        username: data?.personal_details?.username || data?.username || data?.personalDetails?.username || defaultData.personal_details.username,
        mobile: data?.personal_details?.mobile || data?.mobile || data?.personalDetails?.mobile || data?.phone || defaultData.personal_details.mobile,
        password: data?.personal_details?.password || data?.password || defaultData.personal_details.password,
        initial_funds: data?.personal_details?.initial_funds || data?.initialFunds || defaultData.personal_details.initial_funds,
        city: data?.personal_details?.city || data?.city || defaultData.personal_details.city,
      },
      config: {
        ...defaultData.config,
        account_status: data?.config?.account_status || data?.status || data?.accountStatus || defaultData.config.account_status,
        autoCloseTrades: data?.auto_close_trades_loss_percent > 0,
        auto_close_trades_loss_percent: data?.auto_close_trades_loss_percent || defaultData.config.auto_close_trades_loss_percent,
        notify_client_loss_percent: data?.notify_client_loss_percent || defaultData.config.notify_client_loss_percent,
      },
      other: {
        ...defaultData.other,
        broker: data?.other?.broker || data?.broker || defaultData.other.broker,
        notes: data?.other?.notes || data?.notes || defaultData.other.notes,
        select_user: data?.other?.select_user || data?.select_user || defaultData.other.select_user,
        transaction_password: data?.other?.transaction_password || data?.transaction_password || defaultData.other.transaction_password,
      }
    };
    
    console.log('Normalized form data:', normalized);
    return normalized;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (values: CustomerData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      if (isEditing && initialData?.id) {
        await updateCustomer(initialData.id, values);
        enqueueSnackbar('Customer updated successfully', { variant: 'success' });
      } else {
        await createCustomer(values);
        enqueueSnackbar('Customer created successfully', { variant: 'success' });
      }
      router.push('/customer-management');
    } catch (error) {
      console.error('Error saving customer:', error);
      enqueueSnackbar('Failed to save customer', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'Edit Customer' : 'Create Customer'}
      </Typography>
      
      <Formik
        initialValues={initialData ? normalizeCustomerData(initialData) : getDefaultCustomerData()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', mt: 3 }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
              >
                <Tab label="Personal Details" />
                <Tab label="Configuration" />
                <Tab label="MCX Futures" />
                <Tab label="Equity Futures" />
                <Tab label="Options" />
                <Tab label="Options Shortselling" />
                <Tab label="Other Settings" />
              </Tabs>

              <Card sx={{ flex: 1 }}>
                <CardContent>
                  {/* Personal Details Tab */}
                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" gutterBottom>
                      Personal Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.name"
                          label="Name"
                          error={touched.personal_details?.name && Boolean(errors.personal_details?.name)}
                          helperText={touched.personal_details?.name && errors.personal_details?.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.mobile"
                          label="Mobile"
                          error={touched.personal_details?.mobile && Boolean(errors.personal_details?.mobile)}
                          helperText={touched.personal_details?.mobile && errors.personal_details?.mobile}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.username"
                          label="Username"
                          disabled={isEditing}
                          error={touched.personal_details?.username && Boolean(errors.personal_details?.username)}
                          helperText={touched.personal_details?.username && errors.personal_details?.username}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.password"
                          label="Password"
                          type="password"
                          error={touched.personal_details?.password && Boolean(errors.personal_details?.password)}
                          helperText={touched.personal_details?.password && errors.personal_details?.password}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.initial_funds"
                          label="Initial Funds"
                          type="number"
                          error={touched.personal_details?.initial_funds && Boolean(errors.personal_details?.initial_funds)}
                          helperText={touched.personal_details?.initial_funds && errors.personal_details?.initial_funds}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="personal_details.city"
                          label="City"
                          error={touched.personal_details?.city && Boolean(errors.personal_details?.city)}
                          helperText={touched.personal_details?.city && errors.personal_details?.city}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* Configuration Tab */}
                  <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" gutterBottom>
                      Configuration
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="config.demo_account"
                              color="primary"
                              checked={values.config?.demo_account}
                            />
                          }
                          label="Demo Account"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="config.allow_fresh_entry_order_above_high_below_low"
                              color="primary"
                              checked={values.config?.allow_fresh_entry_order_above_high_below_low}
                            />
                          }
                          label="Allow Fresh Entry Order Above High Below Low"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="config.allow_orders_between_high_low"
                              color="primary"
                              checked={values.config?.allow_orders_between_high_low}
                            />
                          }
                          label="Allow Orders Between High Low"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="config.trade_equity_as_units"
                              color="primary"
                              checked={values.config?.trade_equity_as_units}
                            />
                          }
                          label="Trade Equity as Units"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          select
                          fullWidth
                          name="config.account_status"
                          label="Account Status"
                          value={values.config?.account_status}
                          onChange={handleChange}
                          error={touched.config?.account_status && Boolean(errors.config?.account_status)}
                          helperText={touched.config?.account_status && errors.config?.account_status}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="config.notify_client_loss_percent"
                          label="Notify Client Loss Percent"
                          type="number"
                          error={touched.config?.notify_client_loss_percent && Boolean(errors.config?.notify_client_loss_percent)}
                          helperText={touched.config?.notify_client_loss_percent && errors.config?.notify_client_loss_percent}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="config.autoCloseTrades"
                              color="primary"
                              checked={values.config?.autoCloseTrades}
                            />
                          }
                          label="Auto Close Trades"
                        />
                      </Grid>
                     
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="config.auto_close_trades_loss_percent"
                          label="Auto Close Trades Loss Percent"
                          type="number"
                          disabled={!values.config?.autoCloseTrades}
                          error={touched.config?.auto_close_trades_loss_percent && Boolean(errors.config?.auto_close_trades_loss_percent)}
                          helperText={touched.config?.auto_close_trades_loss_percent && errors.config?.auto_close_trades_loss_percent}
                        />
                      </Grid>
                     
                    </Grid>
                  </TabPanel>

                  {/* MCX Futures Tab */}
                  <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" gutterBottom>
                      MCX Futures
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="mcx_futures.mcx_trading"
                              color="primary"
                              checked={values.mcx_futures?.mcx_trading}
                            />
                          }
                          label="Enable MCX Trading"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          select
                          fullWidth
                          name="mcx_futures.brokerage_type"
                          label="Brokerage Type"
                          value={values.mcx_futures?.brokerage_type}
                          onChange={handleChange}
                          error={touched.mcx_futures?.brokerage_type && Boolean(errors.mcx_futures?.brokerage_type)}
                          helperText={touched.mcx_futures?.brokerage_type && errors.mcx_futures?.brokerage_type}
                        >
                          <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                          <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.brokerage"
                          label="Brokerage"
                          type="number"
                          error={touched.mcx_futures?.brokerage && Boolean(errors.mcx_futures?.brokerage)}
                          helperText={touched.mcx_futures?.brokerage && errors.mcx_futures?.brokerage}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          select
                          fullWidth
                          name="mcx_futures.exposure_type"
                          label="Exposure Type"
                          value={values.mcx_futures?.exposure_type}
                          onChange={handleChange}
                          error={touched.mcx_futures?.exposure_type && Boolean(errors.mcx_futures?.exposure_type)}
                          helperText={touched.mcx_futures?.exposure_type && errors.mcx_futures?.exposure_type}
                        >
                          <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                          <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.min_lot_size"
                          label="Min Lot Size"
                          type="number"
                          error={touched.mcx_futures?.min_lot_size && Boolean(errors.mcx_futures?.min_lot_size)}
                          helperText={touched.mcx_futures?.min_lot_size && errors.mcx_futures?.min_lot_size}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.max_lot_size"
                          label="Max Lot Size"
                          type="number"
                          error={touched.mcx_futures?.max_lot_size && Boolean(errors.mcx_futures?.max_lot_size)}
                          helperText={touched.mcx_futures?.max_lot_size && errors.mcx_futures?.max_lot_size}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.max_lot_size_per_script"
                          label="Max Lot Size Per Script"
                          type="number"
                          error={touched.mcx_futures?.max_lot_size_per_script && Boolean(errors.mcx_futures?.max_lot_size_per_script)}
                          helperText={touched.mcx_futures?.max_lot_size_per_script && errors.mcx_futures?.max_lot_size_per_script}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.max_size_all_commodity"
                          label="Max Size All Commodity"
                          type="number"
                          error={touched.mcx_futures?.max_size_all_commodity && Boolean(errors.mcx_futures?.max_size_all_commodity)}
                          helperText={touched.mcx_futures?.max_size_all_commodity && errors.mcx_futures?.max_size_all_commodity}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.intraday_exposure"
                          label="Intraday Exposure"
                          type="number"
                          error={touched.mcx_futures?.intraday_exposure && Boolean(errors.mcx_futures?.intraday_exposure)}
                          helperText={touched.mcx_futures?.intraday_exposure && errors.mcx_futures?.intraday_exposure}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.holding_exposure"
                          label="Holding Exposure"
                          type="number"
                          error={touched.mcx_futures?.holding_exposure && Boolean(errors.mcx_futures?.holding_exposure)}
                          helperText={touched.mcx_futures?.holding_exposure && errors.mcx_futures?.holding_exposure}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                          Order Point Distance
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.order_point_distance.GOLD"
                          label="GOLD"
                          type="number"
                          error={touched.mcx_futures?.order_point_distance?.GOLD && Boolean(errors.mcx_futures?.order_point_distance?.GOLD)}
                          helperText={touched.mcx_futures?.order_point_distance?.GOLD && errors.mcx_futures?.order_point_distance?.GOLD}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.order_point_distance.SILVER"
                          label="SILVER"
                          type="number"
                          error={touched.mcx_futures?.order_point_distance?.SILVER && Boolean(errors.mcx_futures?.order_point_distance?.SILVER)}
                          helperText={touched.mcx_futures?.order_point_distance?.SILVER && errors.mcx_futures?.order_point_distance?.SILVER}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.order_point_distance.CRUDEOIL"
                          label="CRUDEOIL"
                          type="number"
                          error={touched.mcx_futures?.order_point_distance?.CRUDEOIL && Boolean(errors.mcx_futures?.order_point_distance?.CRUDEOIL)}
                          helperText={touched.mcx_futures?.order_point_distance?.CRUDEOIL && errors.mcx_futures?.order_point_distance?.CRUDEOIL}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="mcx_futures.order_point_distance.COPPER"
                          label="COPPER"
                          type="number"
                          error={touched.mcx_futures?.order_point_distance?.COPPER && Boolean(errors.mcx_futures?.order_point_distance?.COPPER)}
                          helperText={touched.mcx_futures?.order_point_distance?.COPPER && errors.mcx_futures?.order_point_distance?.COPPER}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  
                  {/* Equity Futures Tab */}
                  <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>
                      Equity Futures
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="equity_futures.equity_trading"
                              color="primary"
                              checked={values.equity_futures?.equity_trading}
                            />
                          }
                          label="Enable Equity Trading"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.equity_brokerage_per_crore"
                          label="Equity Brokerage Per Crore"
                          type="number"
                          error={touched.equity_futures?.equity_brokerage_per_crore && Boolean(errors.equity_futures?.equity_brokerage_per_crore)}
                          helperText={touched.equity_futures?.equity_brokerage_per_crore && errors.equity_futures?.equity_brokerage_per_crore}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.min_lot_size"
                          label="Min Lot Size"
                          type="number"
                          error={touched.equity_futures?.min_lot_size && Boolean(errors.equity_futures?.min_lot_size)}
                          helperText={touched.equity_futures?.min_lot_size && errors.equity_futures?.min_lot_size}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_lot_size"
                          label="Max Lot Size"
                          type="number"
                          error={touched.equity_futures?.max_lot_size && Boolean(errors.equity_futures?.max_lot_size)}
                          helperText={touched.equity_futures?.max_lot_size && errors.equity_futures?.max_lot_size}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.min_lot_size_index"
                          label="Min Lot Size Index"
                          type="number"
                          error={touched.equity_futures?.min_lot_size_index && Boolean(errors.equity_futures?.min_lot_size_index)}
                          helperText={touched.equity_futures?.min_lot_size_index && errors.equity_futures?.min_lot_size_index}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_lot_size_index"
                          label="Max Lot Size Index"
                          type="number"
                          error={touched.equity_futures?.max_lot_size_index && Boolean(errors.equity_futures?.max_lot_size_index)}
                          helperText={touched.equity_futures?.max_lot_size_index && errors.equity_futures?.max_lot_size_index}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_lot_size_per_script"
                          label="Max Lot Size Per Script"
                          type="number"
                          error={touched.equity_futures?.max_lot_size_per_script && Boolean(errors.equity_futures?.max_lot_size_per_script)}
                          helperText={touched.equity_futures?.max_lot_size_per_script && errors.equity_futures?.max_lot_size_per_script}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_lot_size_per_script_index"
                          label="Max Lot Size Per Script Index"
                          type="number"
                          error={touched.equity_futures?.max_lot_size_per_script_index && Boolean(errors.equity_futures?.max_lot_size_per_script_index)}
                          helperText={touched.equity_futures?.max_lot_size_per_script_index && errors.equity_futures?.max_lot_size_per_script_index}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_size_all_equity"
                          label="Max Size All Equity"
                          type="number"
                          error={touched.equity_futures?.max_size_all_equity && Boolean(errors.equity_futures?.max_size_all_equity)}
                          helperText={touched.equity_futures?.max_size_all_equity && errors.equity_futures?.max_size_all_equity}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.max_size_all_index"
                          label="Max Size All Index"
                          type="number"
                          error={touched.equity_futures?.max_size_all_index && Boolean(errors.equity_futures?.max_size_all_index)}
                          helperText={touched.equity_futures?.max_size_all_index && errors.equity_futures?.max_size_all_index}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.intraday_exposure"
                          label="Intraday Exposure"
                          type="number"
                          error={touched.equity_futures?.intraday_exposure && Boolean(errors.equity_futures?.intraday_exposure)}
                          helperText={touched.equity_futures?.intraday_exposure && errors.equity_futures?.intraday_exposure}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.holding_exposure"
                          label="Holding Exposure"
                          type="number"
                          error={touched.equity_futures?.holding_exposure && Boolean(errors.equity_futures?.holding_exposure)}
                          helperText={touched.equity_futures?.holding_exposure && errors.equity_futures?.holding_exposure}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="equity_futures.order_percentage_distance"
                          label="Order Percentage Distance"
                          type="number"
                          error={touched.equity_futures?.order_percentage_distance && Boolean(errors.equity_futures?.order_percentage_distance)}
                          helperText={touched.equity_futures?.order_percentage_distance && errors.equity_futures?.order_percentage_distance}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  
                  {/* Options Tab */}
                  <TabPanel value={tabValue} index={4}>
                    <Typography variant="h6" gutterBottom>
                      Options
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.index_options_trading"
                              color="primary"
                              checked={values.options_config?.index_options_trading}
                            />
                          }
                          label="Enable Index Options Trading"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.equity_options_trading"
                              color="primary"
                              checked={values.options_config?.equity_options_trading}
                            />
                          }
                          label="Enable Equity Options Trading"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.mcx_options_trading"
                              color="primary"
                              checked={values.options_config?.mcx_options_trading}
                            />
                          }
                          label="Enable MCX Options Trading"
                        />
                      </Grid>
                      
                      {values.options_config?.index_options_trading && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              Index Options
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_config.index_brokerage_type"
                              label="Index Brokerage Type"
                              value={values.options_config?.index_brokerage_type}
                              onChange={handleChange}
                              error={touched.options_config?.index_brokerage_type && Boolean(errors.options_config?.index_brokerage_type)}
                              helperText={touched.options_config?.index_brokerage_type && errors.options_config?.index_brokerage_type}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.index_brokerage"
                              label="Index Brokerage"
                              type="number"
                              error={touched.options_config?.index_brokerage && Boolean(errors.options_config?.index_brokerage)}
                              helperText={touched.options_config?.index_brokerage && errors.options_config?.index_brokerage}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.min_lot_index"
                              label="Min Lot Index"
                              type="number"
                              error={touched.options_config?.min_lot_index && Boolean(errors.options_config?.min_lot_index)}
                              helperText={touched.options_config?.min_lot_index && errors.options_config?.min_lot_index}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_lot_index"
                              label="Max Lot Index"
                              type="number"
                              error={touched.options_config?.max_lot_index && Boolean(errors.options_config?.max_lot_index)}
                              helperText={touched.options_config?.max_lot_index && errors.options_config?.max_lot_index}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_open_lot_index"
                              label="Max Open Lot Index"
                              type="number"
                              error={touched.options_config?.max_open_lot_index && Boolean(errors.options_config?.max_open_lot_index)}
                              helperText={touched.options_config?.max_open_lot_index && errors.options_config?.max_open_lot_index}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.intraday_exposure_index"
                              label="Intraday Exposure Index"
                              type="number"
                              error={touched.options_config?.intraday_exposure_index && Boolean(errors.options_config?.intraday_exposure_index)}
                              helperText={touched.options_config?.intraday_exposure_index && errors.options_config?.intraday_exposure_index}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.holding_exposure_index"
                              label="Holding Exposure Index"
                              type="number"
                              error={touched.options_config?.holding_exposure_index && Boolean(errors.options_config?.holding_exposure_index)}
                              helperText={touched.options_config?.holding_exposure_index && errors.options_config?.holding_exposure_index}
                            />
                          </Grid>
                        </>
                      )}
                      
                      {values.options_config?.equity_options_trading && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              Equity Options
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_config.equity_brokerage_type"
                              label="Equity Brokerage Type"
                              value={values.options_config?.equity_brokerage_type}
                              onChange={handleChange}
                              error={touched.options_config?.equity_brokerage_type && Boolean(errors.options_config?.equity_brokerage_type)}
                              helperText={touched.options_config?.equity_brokerage_type && errors.options_config?.equity_brokerage_type}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.equity_brokerage"
                              label="Equity Brokerage"
                              type="number"
                              error={touched.options_config?.equity_brokerage && Boolean(errors.options_config?.equity_brokerage)}
                              helperText={touched.options_config?.equity_brokerage && errors.options_config?.equity_brokerage}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.min_lot_equity"
                              label="Min Lot Equity"
                              type="number"
                              error={touched.options_config?.min_lot_equity && Boolean(errors.options_config?.min_lot_equity)}
                              helperText={touched.options_config?.min_lot_equity && errors.options_config?.min_lot_equity}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_lot_equity"
                              label="Max Lot Equity"
                              type="number"
                              error={touched.options_config?.max_lot_equity && Boolean(errors.options_config?.max_lot_equity)}
                              helperText={touched.options_config?.max_lot_equity && errors.options_config?.max_lot_equity}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_open_lot_equity"
                              label="Max Open Lot Equity"
                              type="number"
                              error={touched.options_config?.max_open_lot_equity && Boolean(errors.options_config?.max_open_lot_equity)}
                              helperText={touched.options_config?.max_open_lot_equity && errors.options_config?.max_open_lot_equity}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.intraday_exposure_equity"
                              label="Intraday Exposure Equity"
                              type="number"
                              error={touched.options_config?.intraday_exposure_equity && Boolean(errors.options_config?.intraday_exposure_equity)}
                              helperText={touched.options_config?.intraday_exposure_equity && errors.options_config?.intraday_exposure_equity}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.holding_exposure_equity"
                              label="Holding Exposure Equity"
                              type="number"
                              error={touched.options_config?.holding_exposure_equity && Boolean(errors.options_config?.holding_exposure_equity)}
                              helperText={touched.options_config?.holding_exposure_equity && errors.options_config?.holding_exposure_equity}
                            />
                          </Grid>
                        </>
                      )}

                      {values.options_config?.mcx_options_trading && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              MCX Options
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_config.mcx_brokerage_type"
                              label="MCX Brokerage Type"
                              value={values.options_config?.mcx_brokerage_type}
                              onChange={handleChange}
                              error={touched.options_config?.mcx_brokerage_type && Boolean(errors.options_config?.mcx_brokerage_type)}
                              helperText={touched.options_config?.mcx_brokerage_type && errors.options_config?.mcx_brokerage_type}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.mcx_brokerage"
                              label="MCX Brokerage"
                              type="number"
                              error={touched.options_config?.mcx_brokerage && Boolean(errors.options_config?.mcx_brokerage)}
                              helperText={touched.options_config?.mcx_brokerage && errors.options_config?.mcx_brokerage}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.min_lot_mcx"
                              label="Min Lot MCX"
                              type="number"
                              error={touched.options_config?.min_lot_mcx && Boolean(errors.options_config?.min_lot_mcx)}
                              helperText={touched.options_config?.min_lot_mcx && errors.options_config?.min_lot_mcx}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_lot_mcx"
                              label="Max Lot MCX"
                              type="number"
                              error={touched.options_config?.max_lot_mcx && Boolean(errors.options_config?.max_lot_mcx)}
                              helperText={touched.options_config?.max_lot_mcx && errors.options_config?.max_lot_mcx}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.max_open_lot_mcx"
                              label="Max Open Lot MCX"
                              type="number"
                              error={touched.options_config?.max_open_lot_mcx && Boolean(errors.options_config?.max_open_lot_mcx)}
                              helperText={touched.options_config?.max_open_lot_mcx && errors.options_config?.max_open_lot_mcx}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.intraday_exposure_mcx"
                              label="Intraday Exposure MCX"
                              type="number"
                              error={touched.options_config?.intraday_exposure_mcx && Boolean(errors.options_config?.intraday_exposure_mcx)}
                              helperText={touched.options_config?.intraday_exposure_mcx && errors.options_config?.intraday_exposure_mcx}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_config.holding_exposure_mcx"
                              label="Holding Exposure MCX"
                              type="number"
                              error={touched.options_config?.holding_exposure_mcx && Boolean(errors.options_config?.holding_exposure_mcx)}
                              helperText={touched.options_config?.holding_exposure_mcx && errors.options_config?.holding_exposure_mcx}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                          Common Options Settings
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="options_config.min_bid_price"
                          label="Min Bid Price"
                          type="number"
                          error={touched.options_config?.min_bid_price && Boolean(errors.options_config?.min_bid_price)}
                          helperText={touched.options_config?.min_bid_price && errors.options_config?.min_bid_price}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="options_config.order_percentage_distance"
                          label="Order Percentage Distance"
                          type="number"
                          error={touched.options_config?.order_percentage_distance && Boolean(errors.options_config?.order_percentage_distance)}
                          helperText={touched.options_config?.order_percentage_distance && errors.options_config?.order_percentage_distance}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  
                  {/* Options Shortselling Tab */}
                  <TabPanel value={tabValue} index={5}>
                    <Typography variant="h6" gutterBottom>
                      Options Shortselling
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.index_short_selling"
                              color="primary"
                              checked={values.options_config?.index_short_selling}
                            />
                          }
                          label="Enable Index Short Selling"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.equity_short_selling"
                              color="primary"
                              checked={values.options_config?.equity_short_selling}
                            />
                          }
                          label="Enable Equity Short Selling"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Switch}
                              name="options_config.mcx_short_selling"
                              color="primary"
                              checked={values.options_config?.mcx_short_selling}
                            />
                          }
                          label="Enable MCX Short Selling"
                        />
                      </Grid>
                      
                      {values.options_config?.index_short_selling && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              Index Short Selling
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_shortselling_config.index_brokerage_type_short"
                              label="Index Brokerage Type"
                              value={values.options_shortselling_config?.index_brokerage_type_short}
                              onChange={handleChange}
                              error={touched.options_shortselling_config?.index_brokerage_type_short && Boolean(errors.options_shortselling_config?.index_brokerage_type_short)}
                              helperText={touched.options_shortselling_config?.index_brokerage_type_short && errors.options_shortselling_config?.index_brokerage_type_short}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.index_brokerage_short"
                              label="Index Brokerage"
                              type="number"
                              error={touched.options_shortselling_config?.index_brokerage_short && Boolean(errors.options_shortselling_config?.index_brokerage_short)}
                              helperText={touched.options_shortselling_config?.index_brokerage_short && errors.options_shortselling_config?.index_brokerage_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.min_lot_index_short"
                              label="Min Lot Single Trade Index"
                              type="number"
                              error={touched.options_shortselling_config?.min_lot_index_short && Boolean(errors.options_shortselling_config?.min_lot_index_short)}
                              helperText={touched.options_shortselling_config?.min_lot_index_short && errors.options_shortselling_config?.min_lot_index_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_lot_index_short"
                              label="Max Lot Single Trade Index"
                              type="number"
                              error={touched.options_shortselling_config?.max_lot_index_short && Boolean(errors.options_shortselling_config?.max_lot_index_short)}
                              helperText={touched.options_shortselling_config?.max_lot_index_short && errors.options_shortselling_config?.max_lot_index_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_open_lot_index_short"
                              label="Max Open Lot Index"
                              type="number"
                              error={touched.options_shortselling_config?.max_open_lot_index_short && Boolean(errors.options_shortselling_config?.max_open_lot_index_short)}
                              helperText={touched.options_shortselling_config?.max_open_lot_index_short && errors.options_shortselling_config?.max_open_lot_index_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_size_all_index_short"
                              label="Max Size All Index"
                              type="number"
                              error={touched.options_shortselling_config?.max_size_all_index_short && Boolean(errors.options_shortselling_config?.max_size_all_index_short)}
                              helperText={touched.options_shortselling_config?.max_size_all_index_short && errors.options_shortselling_config?.max_size_all_index_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.intraday_exposure_index_short"
                              label="Intraday Exposure Index"
                              type="number"
                              error={touched.options_shortselling_config?.intraday_exposure_index_short && Boolean(errors.options_shortselling_config?.intraday_exposure_index_short)}
                              helperText={touched.options_shortselling_config?.intraday_exposure_index_short && errors.options_shortselling_config?.intraday_exposure_index_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.holding_exposure_index_short"
                              label="Holding Exposure Index"
                              type="number"
                              error={touched.options_shortselling_config?.holding_exposure_index_short && Boolean(errors.options_shortselling_config?.holding_exposure_index_short)}
                              helperText={touched.options_shortselling_config?.holding_exposure_index_short && errors.options_shortselling_config?.holding_exposure_index_short}
                            />
                          </Grid>
                        </>
                      )}

                      {values.options_config?.equity_short_selling && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              Equity Short Selling
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_shortselling_config.equity_brokerage_type_short"
                              label="Equity Brokerage Type"
                              value={values.options_shortselling_config?.equity_brokerage_type_short}
                              onChange={handleChange}
                              error={touched.options_shortselling_config?.equity_brokerage_type_short && Boolean(errors.options_shortselling_config?.equity_brokerage_type_short)}
                              helperText={touched.options_shortselling_config?.equity_brokerage_type_short && errors.options_shortselling_config?.equity_brokerage_type_short}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.equity_brokerage_short"
                              label="Equity Brokerage"
                              type="number"
                              error={touched.options_shortselling_config?.equity_brokerage_short && Boolean(errors.options_shortselling_config?.equity_brokerage_short)}
                              helperText={touched.options_shortselling_config?.equity_brokerage_short && errors.options_shortselling_config?.equity_brokerage_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.min_lot_equity_short"
                              label="Min Lot Single Trade Equity"
                              type="number"
                              error={touched.options_shortselling_config?.min_lot_equity_short && Boolean(errors.options_shortselling_config?.min_lot_equity_short)}
                              helperText={touched.options_shortselling_config?.min_lot_equity_short && errors.options_shortselling_config?.min_lot_equity_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_lot_equity_short"
                              label="Max Lot Single Trade Equity"
                              type="number"
                              error={touched.options_shortselling_config?.max_lot_equity_short && Boolean(errors.options_shortselling_config?.max_lot_equity_short)}
                              helperText={touched.options_shortselling_config?.max_lot_equity_short && errors.options_shortselling_config?.max_lot_equity_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_open_lot_equity_short"
                              label="Max Open Lot Equity"
                              type="number"
                              error={touched.options_shortselling_config?.max_open_lot_equity_short && Boolean(errors.options_shortselling_config?.max_open_lot_equity_short)}
                              helperText={touched.options_shortselling_config?.max_open_lot_equity_short && errors.options_shortselling_config?.max_open_lot_equity_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_size_all_equity_short"
                              label="Max Size All Equity"
                              type="number"
                              error={touched.options_shortselling_config?.max_size_all_equity_short && Boolean(errors.options_shortselling_config?.max_size_all_equity_short)}
                              helperText={touched.options_shortselling_config?.max_size_all_equity_short && errors.options_shortselling_config?.max_size_all_equity_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.intraday_exposure_equity_short"
                              label="Intraday Exposure Equity"
                              type="number"
                              error={touched.options_shortselling_config?.intraday_exposure_equity_short && Boolean(errors.options_shortselling_config?.intraday_exposure_equity_short)}
                              helperText={touched.options_shortselling_config?.intraday_exposure_equity_short && errors.options_shortselling_config?.intraday_exposure_equity_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.holding_exposure_equity_short"
                              label="Holding Exposure Equity"
                              type="number"
                              error={touched.options_shortselling_config?.holding_exposure_equity_short && Boolean(errors.options_shortselling_config?.holding_exposure_equity_short)}
                              helperText={touched.options_shortselling_config?.holding_exposure_equity_short && errors.options_shortselling_config?.holding_exposure_equity_short}
                            />
                          </Grid>
                        </>
                      )}

                      {values.options_config?.mcx_short_selling && (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                              MCX Short Selling
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              select
                              fullWidth
                              name="options_shortselling_config.mcx_brokerage_type_short"
                              label="MCX Brokerage Type"
                              value={values.options_shortselling_config?.mcx_brokerage_type_short}
                              onChange={handleChange}
                              error={touched.options_shortselling_config?.mcx_brokerage_type_short && Boolean(errors.options_shortselling_config?.mcx_brokerage_type_short)}
                              helperText={touched.options_shortselling_config?.mcx_brokerage_type_short && errors.options_shortselling_config?.mcx_brokerage_type_short}
                            >
                              <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                              <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            </Field>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.mcx_brokerage_short"
                              label="MCX Brokerage"
                              type="number"
                              error={touched.options_shortselling_config?.mcx_brokerage_short && Boolean(errors.options_shortselling_config?.mcx_brokerage_short)}
                              helperText={touched.options_shortselling_config?.mcx_brokerage_short && errors.options_shortselling_config?.mcx_brokerage_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.min_lot_mcx_short"
                              label="Min Lot Single Trade MCX"
                              type="number"
                              error={touched.options_shortselling_config?.min_lot_mcx_short && Boolean(errors.options_shortselling_config?.min_lot_mcx_short)}
                              helperText={touched.options_shortselling_config?.min_lot_mcx_short && errors.options_shortselling_config?.min_lot_mcx_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_lot_mcx_short"
                              label="Max Lot Single Trade MCX"
                              type="number"
                              error={touched.options_shortselling_config?.max_lot_mcx_short && Boolean(errors.options_shortselling_config?.max_lot_mcx_short)}
                              helperText={touched.options_shortselling_config?.max_lot_mcx_short && errors.options_shortselling_config?.max_lot_mcx_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_open_lot_mcx_short"
                              label="Max Open Lot MCX"
                              type="number"
                              error={touched.options_shortselling_config?.max_open_lot_mcx_short && Boolean(errors.options_shortselling_config?.max_open_lot_mcx_short)}
                              helperText={touched.options_shortselling_config?.max_open_lot_mcx_short && errors.options_shortselling_config?.max_open_lot_mcx_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.max_size_all_mcx_short"
                              label="Max Size All MCX"
                              type="number"
                              error={touched.options_shortselling_config?.max_size_all_mcx_short && Boolean(errors.options_shortselling_config?.max_size_all_mcx_short)}
                              helperText={touched.options_shortselling_config?.max_size_all_mcx_short && errors.options_shortselling_config?.max_size_all_mcx_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.intraday_exposure_mcx_short"
                              label="Intraday Exposure MCX"
                              type="number"
                              error={touched.options_shortselling_config?.intraday_exposure_mcx_short && Boolean(errors.options_shortselling_config?.intraday_exposure_mcx_short)}
                              helperText={touched.options_shortselling_config?.intraday_exposure_mcx_short && errors.options_shortselling_config?.intraday_exposure_mcx_short}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="options_shortselling_config.holding_exposure_mcx_short"
                              label="Holding Exposure MCX"
                              type="number"
                              error={touched.options_shortselling_config?.holding_exposure_mcx_short && Boolean(errors.options_shortselling_config?.holding_exposure_mcx_short)}
                              helperText={touched.options_shortselling_config?.holding_exposure_mcx_short && errors.options_shortselling_config?.holding_exposure_mcx_short}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </TabPanel>

                  {/* Other Settings Tab */}
                  <TabPanel value={tabValue} index={6}>
                    <Typography variant="h6" gutterBottom>
                      Other Settings
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="other.notes"
                          label="Notes"
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="other.broker"
                          label="Broker"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="other.select_user"
                          label="Select User"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="other.transaction_password"
                          label="Transaction Password"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={() => router.push('/customer-management')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerForm; 