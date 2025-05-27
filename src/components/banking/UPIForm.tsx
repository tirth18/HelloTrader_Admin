'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UPIDetail {
  id?: number;
  upi_id: string;
  is_primary: boolean;
  is_verified?: boolean;
  verification_date?: string;
}

interface UPIFormProps {
  onClose: () => void;
  onSave: (data: Partial<UPIDetail>) => void;
  title: string;
  initialData?: UPIDetail;
}

export default function UPIForm({ onClose, onSave, title, initialData }: UPIFormProps) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<UPIDetail>({
    initialValues: initialData ? {
      ...initialData
    } : {
      upi_id: '',
      is_primary: false
    },
    validationSchema: Yup.object({
      upi_id: Yup.string()
        .required('UPI ID is required')
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/,
          'Invalid UPI ID format. Should be like username@provider'
        )
        .min(5, 'UPI ID must be at least 5 characters')
        .max(50, 'UPI ID must be less than 50 characters')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onSave(values);
        onClose();
      } catch (error) {
        console.error('Error saving UPI ID:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="upi_id"
            label="UPI ID"
            name="upi_id"
            autoComplete="off"
            value={formik.values.upi_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.upi_id && Boolean(formik.errors.upi_id)}
            helperText={formik.touched.upi_id && formik.errors.upi_id || "Format: username@provider (e.g., johndoe@okicici)"}
          />

          <FormControl margin="normal" fullWidth>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.is_primary}
                  onChange={formik.handleChange}
                  name="is_primary"
                  color="primary"
                />
              }
              label="Set as primary UPI ID"
            />
            <FormHelperText>
              Primary UPI IDs are used as default for fund deposits
            </FormHelperText>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          type="submit" 
          variant="contained" 
          onClick={() => formik.handleSubmit()}
          disabled={loading || !formik.isValid || formik.isSubmitting}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </>
  );
} 