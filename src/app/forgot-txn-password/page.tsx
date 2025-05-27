'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { LockReset, Email, Sms } from '@mui/icons-material';

// Step 1: Request reset schema
const requestResetSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

// Step 2: Verify OTP schema
const verifyOtpSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be 6 digits'),
});

// Step 3: New password schema
const newPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Include at least one uppercase letter')
    .matches(/[a-z]/, 'Include at least one lowercase letter')
    .matches(/[0-9]/, 'Include at least one number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Include at least one special character'),
  confirmPassword: yup
    .string()
    .required('Confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default function ForgotTransactionPasswordPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Step 1: Request password reset
  const requestFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: requestResetSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        
        const response = await fetch('/api/transaction-password/request-reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to request password reset');
        }
        
        // Set user ID for future steps
        setUserId(data.userId);
        
        // Move to next step
        setActiveStep(1);
      } catch (error: any) {
        console.error('Error requesting password reset:', error);
        setError(error.message);
      }
    },
  });

  // Step 2: Verify OTP
  const otpFormik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        
        const response = await fetch('/api/transaction-password/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            otp: values.otp,
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify OTP');
        }
        
        // Store reset token for final step
        setResetToken(data.resetToken);
        
        // Move to next step
        setActiveStep(2);
      } catch (error: any) {
        console.error('Error verifying OTP:', error);
        setError(error.message);
      }
    },
  });

  // Step 3: Set new password
  const passwordFormik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        
        const response = await fetch('/api/transaction-password/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            resetToken,
            newPassword: values.newPassword,
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to reset password');
        }
        
        // Show success message
        setSuccess(true);
        
        // Clear steps data
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error: any) {
        console.error('Error resetting password:', error);
        setError(error.message);
      }
    },
  });

  // Steps content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={requestFormik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              value={requestFormik.values.email}
              onChange={requestFormik.handleChange}
              onBlur={requestFormik.handleBlur}
              error={requestFormik.touched.email && Boolean(requestFormik.errors.email)}
              helperText={requestFormik.touched.email && requestFormik.errors.email}
            />
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
              We'll send a verification code to your registered email address.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<Email />}
              disabled={requestFormik.isSubmitting}
            >
              {requestFormik.isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Sending...
                </>
              ) : (
                'Send Verification Code'
              )}
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box component="form" onSubmit={otpFormik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              id="otp"
              name="otp"
              label="Verification Code (OTP)"
              autoComplete="off"
              value={otpFormik.values.otp}
              onChange={otpFormik.handleChange}
              onBlur={otpFormik.handleBlur}
              error={otpFormik.touched.otp && Boolean(otpFormik.errors.otp)}
              helperText={otpFormik.touched.otp && otpFormik.errors.otp}
              inputProps={{ maxLength: 6 }}
            />
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
              Enter the 6-digit verification code sent to your email.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<Sms />}
              disabled={otpFormik.isSubmitting}
            >
              {otpFormik.isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box component="form" onSubmit={passwordFormik.handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              id="newPassword"
              name="newPassword"
              label="New Transaction Password"
              type="password"
              autoComplete="new-password"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
              helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
            />
            <TextField
              fullWidth
              margin="normal"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              autoComplete="new-password"
              value={passwordFormik.values.confirmPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
              error={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
              helperText={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<LockReset />}
              disabled={passwordFormik.isSubmitting}
            >
              {passwordFormik.isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Resetting...
                </>
              ) : (
                'Reset Transaction Password'
              )}
            </Button>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Reset Transaction Password
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          <Step>
            <StepLabel>Email</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verification</StepLabel>
          </Step>
          <Step>
            <StepLabel>Reset</StepLabel>
          </Step>
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {getStepContent(activeStep)}
        
        <Snackbar
          open={success}
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Transaction password has been reset successfully! Redirecting to login...
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
} 