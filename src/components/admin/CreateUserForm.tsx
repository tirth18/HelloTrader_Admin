import React from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  InputAdornment,
  Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Broker } from '@/types';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required'),
  first_name: yup
    .string()
    .required('First name is required'),
  last_name: yup
    .string()
    .required('Last name is required'),
  parent_id: yup
    .string()
    .optional(),
  brokerage_share: yup
    .number()
    .min(0, 'Brokerage Share must be at least 0')
    .max(100, 'Brokerage Share cannot exceed 100')
    .required('Brokerage Share is required'),
  profit_loss_share: yup
    .number()
    .min(0, 'Profit Share must be at least 0')
    .max(100, 'Profit Share cannot exceed 100')
    .required('Profit Share is required'),
  type: yup
    .mixed<'Broker' | 'Sub-Broker'>()
    .oneOf(['Broker', 'Sub-Broker'], 'Type must be either Broker or Sub-Broker')
    .required('Type is required'),
  reference_code: yup
    .string()
    .required('Reference Code is required'),
  account_status: yup
    .mixed<'Active' | 'Inactive'>()
    .oneOf(['Active', 'Inactive'], 'Invalid account status')
    .required('Account Status is required'),
  enable_mcx_trading: yup.boolean(),
  enable_equity_trading: yup.boolean()
});

export type FormValues = {
  username: string;
  first_name: string;
  last_name: string;
  parent_id: string;
  brokerage_share: number;
  profit_loss_share: number;
  type: 'Broker' | 'Sub-Broker';
  reference_code: string;
  account_status: 'Active' | 'Inactive';
  enable_mcx_trading: boolean;
  enable_equity_trading: boolean;
};

interface CreateUserFormProps {
  onSubmit: (values: FormValues) => void;
  onGenerateReferenceCode: () => Promise<string>;
  existingBrokers: Broker[];
}

export default function CreateUserForm({ onSubmit, onGenerateReferenceCode, existingBrokers }: CreateUserFormProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      parent_id: '',
      brokerage_share: 0,
      profit_loss_share: 0,
      type: 'Broker',
      reference_code: '',
      account_status: 'Active',
      enable_mcx_trading: false,
      enable_equity_trading: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleGenerateRefCode = async () => {
    try {
      const code = await onGenerateReferenceCode();
      formik.setFieldValue('reference_code', code);
    } catch (error) {
      console.error('Error generating reference code:', error);
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="parent_id"
            name="parent_id"
            label="Parent ID"
            value={formik.values.parent_id}
            onChange={formik.handleChange}
            error={formik.touched.parent_id && Boolean(formik.errors.parent_id)}
            helperText={formik.touched.parent_id && formik.errors.parent_id}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="subtitle2">Business Settings</Typography>
          </Divider>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="brokerage_share"
            name="brokerage_share"
            label="Brokerage Share"
            type="number"
            value={formik.values.brokerage_share}
            onChange={formik.handleChange}
            error={formik.touched.brokerage_share && Boolean(formik.errors.brokerage_share)}
            helperText={formik.touched.brokerage_share && formik.errors.brokerage_share}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="profit_loss_share"
            name="profit_loss_share"
            label="Profit/Loss Share"
            type="number"
            value={formik.values.profit_loss_share}
            onChange={formik.handleChange}
            error={formik.touched.profit_loss_share && Boolean(formik.errors.profit_loss_share)}
            helperText={formik.touched.profit_loss_share && formik.errors.profit_loss_share}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formik.values.type}
              label="Type"
              onChange={formik.handleChange}
            >
              <MenuItem value="Broker">Broker</MenuItem>
              <MenuItem value="Sub-Broker">Sub-Broker</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="account-status-label">Account Status</InputLabel>
            <Select
              labelId="account-status-label"
              id="account_status"
              name="account_status"
              value={formik.values.account_status}
              label="Account Status"
              onChange={formik.handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="reference_code"
            name="reference_code"
            label="Reference Code"
            value={formik.values.reference_code}
            onChange={formik.handleChange}
            error={formik.touched.reference_code && Boolean(formik.errors.reference_code)}
            helperText={formik.touched.reference_code && formik.errors.reference_code}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleGenerateRefCode}
                  variant="text"
                  size="small"
                  sx={{ mr: -1.5 }}
                >
                  Generate
                </Button>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.enable_mcx_trading}
                onChange={formik.handleChange}
                name="enable_mcx_trading"
              />
            }
            label="Enable MCX Trading"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.enable_equity_trading}
                onChange={formik.handleChange}
                name="enable_equity_trading"
              />
            }
            label="Enable Equity Trading"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Broker
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 