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
  FormControl,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  LockReset,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordStrengthRegex.hasUpperCase, 'Include at least one uppercase letter')
    .matches(passwordStrengthRegex.hasLowerCase, 'Include at least one lowercase letter')
    .matches(passwordStrengthRegex.hasDigit, 'Include at least one number')
    .matches(passwordStrengthRegex.hasSpecialChar, 'Include at least one special character'),
  confirmPassword: yup
    .string()
    .required('Confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default function ChangePasswordPage() {
  // States for visibility toggles of password fields
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State for success message
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // State for logout confirmation dialog
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // State for checkbox
  const [logoutAllDevices, setLogoutAllDevices] = useState(false);
  
  // State for error message
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Password update handler
  const handlePasswordUpdate = async (values: any) => {
    try {
      setApiError(null);
      
      // Call the password change API
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          logoutAllDevices: logoutAllDevices
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }
      
      // Show success message
      setShowSuccessToast(true);
      
      // If user chose to logout, show confirmation dialog
      if (logoutAllDevices) {
        setShowLogoutDialog(true);
      }
      
      // Reset form
      formik.resetForm();
    } catch (error: any) {
      console.error('Error updating password:', error);
      setApiError(error.message || 'Failed to update password. Please try again.');
      
      // If the error is about the current password being incorrect
      if (error.message?.includes('Current password is incorrect')) {
        formik.setFieldError('currentPassword', 'Current password is incorrect');
      }
    }
  };
  
  // Handle logout from all devices
  const handleLogoutFromAllDevices = async () => {
    try {
      // Call the logout-all-devices API
      const response = await fetch('/api/logout-all-devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to logout from all devices');
      }
      
      // Close dialog
      setShowLogoutDialog(false);
      
      // Show a temporary success message before redirecting
      setShowSuccessToast(true);
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      console.error('Error logging out from all devices:', error);
      setApiError('Failed to logout from all devices. Please try again.');
      setShowLogoutDialog(false);
    }
  };
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
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
          Change Password
        </Typography>
        
        {apiError && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError(null)}>
            {apiError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
          {/* Current Password Field */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword ? String(formik.errors.currentPassword) : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* New Password Field */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword ? String(formik.errors.newPassword) : ''}
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
          </FormControl>

          {/* Confirm Password Field */}
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? String(formik.errors.confirmPassword) : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.values.newPassword && formik.values.confirmPassword && 
              formik.values.newPassword === formik.values.confirmPassword && (
                <FormHelperText sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle fontSize="small" sx={{ mr: 0.5 }} />
                  Passwords match
                </FormHelperText>
              )
            }
          </FormControl>

          {/* Security Options */}
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={logoutAllDevices}
                  onChange={(e) => setLogoutAllDevices(e.target.checked)}
                  color="primary"
                />
              }
              label="Log me out from all devices after password change"
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ 
              mt: 4, 
              mb: 2, 
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
              'UPDATE PASSWORD'
            )}
          </Button>
        </Box>

        {/* Success Toast */}
        <Snackbar
          open={showSuccessToast}
          autoHideDuration={5000}
          onClose={() => setShowSuccessToast(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
            Password successfully updated!
          </Alert>
        </Snackbar>

        {/* Logout Dialog */}
        <Dialog
          open={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
        >
          <DialogTitle>Logout from all devices?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your password has been updated successfully. Would you like to logout from all devices now?
              This will invalidate all current sessions.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLogoutDialog(false)}>
              Not now
            </Button>
            <Button onClick={handleLogoutFromAllDevices} variant="contained" autoFocus>
              Logout everywhere
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
} 