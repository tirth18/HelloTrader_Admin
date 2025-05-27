'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  FormHelperText,
  Alert,
  Snackbar,
  CircularProgress,
  Link,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  LockReset,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

// Define password strength validation rules
const passwordStrengthRegex = {
  minLength: /.{8,}/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasDigit: /\d/,
  hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
};

// Password validation schema with clear error messages
const validationSchema = yup.object({
  oldPassword: yup.string().required('Current transaction password is required'),
  newPassword: yup
    .string()
    .required('New transaction password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordStrengthRegex.hasUpperCase, 'Include at least one uppercase letter')
    .matches(passwordStrengthRegex.hasLowerCase, 'Include at least one lowercase letter')
    .matches(passwordStrengthRegex.hasDigit, 'Include at least one number')
    .matches(passwordStrengthRegex.hasSpecialChar, 'Include at least one special character'),
  repeatPassword: yup
    .string()
    .required('Confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default function ChangeTransactionPasswordPage() {
  // States for visibility toggles of password fields
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  
  // State for success message
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // State for error message
  const [apiError, setApiError] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Password update handler
  const handlePasswordUpdate = async (values: any) => {
    try {
      setApiError(null);
      
      const { changeTransactionPassword } = await import('../../services/auth-service');
      
      const result = await changeTransactionPassword({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.repeatPassword,
      });
      
      // Show success message
      setShowSuccessToast(true);
      
      // Reset form
      formik.resetForm();
    } catch (error: any) {
      console.error('Error updating transaction password:', error);
      setApiError(error.message || 'Failed to update transaction password. Please try again.');
      
      // If the error is about the old password being incorrect
      if (error.message?.includes('password is incorrect')) {
        formik.setFieldError('oldPassword', 'Current transaction password is incorrect');
      }
    }
  };
  
  // Navigate to forgot transaction password page
  const handleForgotPassword = () => {
    router.push('/forgot-txn-password');
  };
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: handlePasswordUpdate,
  });
  
  // Check password strength in real-time
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    
    if (passwordStrengthRegex.minLength.test(password)) strength += 20;
    if (passwordStrengthRegex.hasUpperCase.test(password)) strength += 20;
    if (passwordStrengthRegex.hasLowerCase.test(password)) strength += 20;
    if (passwordStrengthRegex.hasDigit.test(password)) strength += 20;
    if (passwordStrengthRegex.hasSpecialChar.test(password)) strength += 20;
    
    return strength;
  };
  
  const strength = getPasswordStrength(formik.values.newPassword);
  
  // Get color based on password strength
  const getStrengthColor = (strength: number) => {
    if (strength < 40) return 'error.main';
    if (strength < 80) return 'warning.main';
    return 'success.main';
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Change Transaction Password
        </Typography>
        
        {apiError && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError(null)}>
            {apiError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          {/* Old Password Field */}
          <TextField
            fullWidth
            margin="normal"
            id="oldPassword"
            name="oldPassword"
            label="Old Transaction Password"
            type={showOldPassword ? 'text' : 'password'}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && typeof formik.errors.oldPassword === 'string' ? formik.errors.oldPassword : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* New Password Field */}
          <TextField
            fullWidth
            margin="normal"
            id="newPassword"
            name="newPassword"
            label="New Transaction Password"
            type={showNewPassword ? 'text' : 'password'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && typeof formik.errors.newPassword === 'string' ? formik.errors.newPassword : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {formik.values.newPassword && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" gutterBottom>
                Password strength:
              </Typography>
              <Box sx={{ 
                height: 4, 
                width: '100%', 
                bgcolor: 'grey.200', 
                borderRadius: 1,
                overflow: 'hidden',
                mb: 1
              }}>
                <Box 
                  sx={{ 
                    height: '100%', 
                    width: `${strength}%`, 
                    bgcolor: getStrengthColor(strength),
                    transition: 'width 0.3s ease-in-out'
                  }} 
                />
              </Box>
              <FormHelperText>
                Password must contain at least 8 characters, including uppercase, lowercase, 
                numbers, and special characters.
              </FormHelperText>
            </Box>
          )}

          {/* Repeat Password Field */}
          <TextField
            fullWidth
            margin="normal"
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat New Password"
            type={showRepeatPassword ? 'text' : 'password'}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
            helperText={formik.touched.repeatPassword && typeof formik.errors.repeatPassword === 'string' ? formik.errors.repeatPassword : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.values.newPassword && formik.values.repeatPassword && 
            formik.values.newPassword === formik.values.repeatPassword && (
              <FormHelperText sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>
                <CheckCircle fontSize="small" sx={{ mr: 0.5 }} />
                Passwords match
              </FormHelperText>
            )
          }

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ 
              mt: 4, 
              py: 1.5, 
              fontSize: '1rem', 
              fontWeight: 'bold' 
            }}
            startIcon={<LockReset />}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Updating...
              </>
            ) : (
              'UPDATE'
            )}
          </Button>
          
          {/* Forgot Password Link */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              underline="hover"
              sx={{ cursor: 'pointer' }}
            >
              Forgot Transaction Password?
            </Link>
          </Box>
        </Box>

        {/* Success Toast */}
        <Snackbar
          open={showSuccessToast}
          autoHideDuration={5000}
          onClose={() => setShowSuccessToast(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
            Transaction password updated successfully.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
} 