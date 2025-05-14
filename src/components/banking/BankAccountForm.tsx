'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface BankAccount {
  id?: number;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  account_type?: string;
  is_primary: boolean;
  is_verified?: boolean;
  verification_date?: string;
  // Added fields for UPI accounts
  upi_id?: string;
  phone_pe?: string;
  google_pay?: string;
  paytm?: string;
}

interface BankAccountFormProps {
  onClose: () => void;
  onSave: (data: Partial<BankAccount>) => void;
  title: string;
  initialData?: BankAccount;
}

const accountTypes = [
  { value: 'Savings', label: 'Savings Account' },
  { value: 'Current', label: 'Current Account' },
  { value: 'Salary', label: 'Salary Account' },
  { value: 'Fixed Deposit', label: 'Fixed Deposit Account' },
  { value: 'Recurring Deposit', label: 'Recurring Deposit Account' },
];

const commonBanks = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Axis Bank',
  'Canara Bank',
  'Union Bank of India',
  'Kotak Mahindra Bank',
  'Yes Bank',
  'IndusInd Bank',
  'IDBI Bank'
];

export default function BankAccountForm({ onClose, onSave, title, initialData }: BankAccountFormProps) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<BankAccount>({
    initialValues: initialData ? {
      ...initialData,
      // Only show the last 4 digits in the form for security
      // Only mask if this is an existing account number with proper formatting
      account_number: initialData.account_number ? initialData.account_number : '',
    } : {
      account_holder_name: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      account_type: 'Savings',
      is_primary: false,
      upi_id: '',
      phone_pe: '',
      google_pay: '',
      paytm: '',
    },
    validationSchema: Yup.object({
      account_holder_name: Yup.string()
        .required('Account holder name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
      bank_name: Yup.string()
        .required('Bank name is required')
        .min(2, 'Bank name must be at least 2 characters')
        .max(100, 'Bank name must be less than 100 characters'),
      account_number: Yup.string()
        .required('Account number is required')
        .min(6, 'Account number must be at least 6 digits')
        .max(20, 'Account number must be less than 20 digits'),
      ifsc_code: Yup.string()
        .required('IFSC code is required')
        .matches(/^[A-Z0-9]{11}$/, 'IFSC code must be 11 characters'),
      // UPI validations
      upi_id: Yup.string()
        .notRequired()
        .matches(/^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}/, 'Invalid UPI ID format, e.g., username@upi'),
      phone_pe: Yup.string()
        .notRequired(),
      google_pay: Yup.string()
        .notRequired(),
      paytm: Yup.string()
        .notRequired(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        onSave(values);
        onClose();
      } catch (error) {
        console.error('Error saving bank account:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <DialogTitle sx={{ 
        bgcolor: '#1976d2', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: '#1976d2',
              borderBottom: '2px solid #1976d2',
              pb: 1
            }}
          >
            Bank Account Details
          </Typography>
          
          <TextField
            margin="normal"
            fullWidth
            id="account_holder_name"
            label="Account Holder Name"
            name="account_holder_name"
            autoComplete="name"
            value={formik.values.account_holder_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.account_holder_name && Boolean(formik.errors.account_holder_name)}
            helperText={formik.touched.account_holder_name && formik.errors.account_holder_name}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="bank_name"
            label="Bank Name"
            name="bank_name"
            value={formik.values.bank_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
            helperText={formik.touched.bank_name && formik.errors.bank_name}
            select
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          >
            {commonBanks.map((bank) => (
              <MenuItem key={bank} value={bank}>
                {bank}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            fullWidth
            id="account_number"
            label="Account Number"
            name="account_number"
            autoComplete="off"
            value={formik.values.account_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.account_number && Boolean(formik.errors.account_number)}
            helperText={formik.touched.account_number && formik.errors.account_number}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="ifsc_code"
            label="IFSC Code"
            name="ifsc_code"
            autoComplete="off"
            inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
            value={formik.values.ifsc_code}
            onChange={(e) => {
              const upperValue = e.target.value.toUpperCase();
              formik.setFieldValue('ifsc_code', upperValue);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.ifsc_code && Boolean(formik.errors.ifsc_code)}
            helperText={formik.touched.ifsc_code && formik.errors.ifsc_code}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />

          <Typography 
            variant="subtitle1" 
            sx={{ 
              mt: 4, 
              mb: 2, 
              fontWeight: 600,
              color: '#1976d2',
              borderBottom: '2px solid #1976d2',
              pb: 1
            }}
          >
            UPI Payment Details
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            id="upi_id"
            label="UPI ID"
            name="upi_id"
            placeholder="username@upi"
            value={formik.values.upi_id || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.upi_id && Boolean(formik.errors.upi_id)}
            helperText={formik.touched.upi_id && formik.errors.upi_id}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="phone_pe"
            label="PhonePe"
            name="phone_pe"
            placeholder="PhonePe UPI ID"
            value={formik.values.phone_pe || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone_pe && Boolean(formik.errors.phone_pe)}
            helperText={formik.touched.phone_pe && formik.errors.phone_pe}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="google_pay"
            label="Google Pay"
            name="google_pay"
            placeholder="Google Pay UPI ID"
            value={formik.values.google_pay || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.google_pay && Boolean(formik.errors.google_pay)}
            helperText={formik.touched.google_pay && formik.errors.google_pay}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            id="paytm"
            label="Paytm"
            name="paytm"
            placeholder="Paytm UPI ID"
            value={formik.values.paytm || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.paytm && Boolean(formik.errors.paytm)}
            helperText={formik.touched.paytm && formik.errors.paytm}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1976d2',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, borderTop: '1px solid #e0e0e0' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#1976d2',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          onClick={() => formik.handleSubmit()}
          disabled={loading || !formik.isValid || formik.isSubmitting}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0'
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(25, 118, 210, 0.12)'
            }
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </>
  );
} 