import React from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  InputAdornment,
  Grid,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Broker } from './BrokerForm';

interface FundOperationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, notes: string) => void;
  broker: Broker | null;
  operation: 'deposit' | 'withdraw';
  isSubmitting?: boolean;
}

export default function FundOperationForm({
  open,
  onClose,
  onSubmit,
  broker,
  operation,
  isSubmitting = false
}: FundOperationFormProps) {
  // Fund operation validation schema
  const fundOperationSchema = yup.object({
    amount: yup
      .number()
      .positive('Amount must be positive')
      .required('Amount is required')
      .test(
        'is-valid-amount',
        'Insufficient balance for withdrawal',
        function(value) {
          if (operation === 'withdraw' && broker?.balance !== undefined) {
            return value <= broker.balance;
          }
          return true;
        }
      ),
    notes: yup.string().max(500, 'Notes must be less than 500 characters'),
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      notes: '',
    },
    validationSchema: fundOperationSchema,
    onSubmit: (values) => {
      onSubmit(values.amount, values.notes);
    },
  });

  const operationTitle = operation === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds';
  const buttonText = operation === 'deposit' ? 'Deposit' : 'Withdraw';
  const buttonColor = operation === 'deposit' ? 'primary' : 'secondary';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{operationTitle}</Typography>
      </DialogTitle>
      
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          {broker && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  User: <strong>{broker.username}</strong>
                </Typography>
                {broker.balance !== undefined && (
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Current Balance: <strong>${broker.balance.toLocaleString()}</strong>
                  </Typography>
                )}
              </Grid>
              
              {operation === 'withdraw' && broker.balance !== undefined && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    Maximum amount available for withdrawal: ${broker.balance.toLocaleString()}
                  </Alert>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="notes"
                  label="Notes (Optional)"
                  multiline
                  rows={4}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color={buttonColor}
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? 'Processing...' : buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 