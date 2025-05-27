'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Switch,
  FormControlLabel,
  useTheme,
  alpha,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { 
  Close as CloseIcon,
  Badge as BadgeIcon,
  Payment as PaymentIcon,
  Key as KeyIcon 
} from '@mui/icons-material';
import { PaymentGateway } from '@/types/paymentGateway';

interface EditGatewayDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (gateway: PaymentGateway) => void;
  gateway: PaymentGateway | null;
}

export default function EditGatewayDialog({ 
  open, 
  onClose, 
  onSave, 
  gateway 
}: EditGatewayDialogProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<PaymentGateway>({
    id: 0,
    publicName: '',
    privateName: '',
    linkKeyToken: '',
    isEnabled: true,
  });
  
  const [errors, setErrors] = useState({
    publicName: false,
    privateName: false,
    linkKeyToken: false,
  });

  const [loading, setLoading] = useState(false);

  // Update form data when gateway changes
  useEffect(() => {
    if (gateway) {
      setFormData({ ...gateway });
    }
  }, [gateway]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'isEnabled' ? checked : value 
    }));
    
    // Clear error on input change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      publicName: !formData.publicName.trim(),
      privateName: !formData.privateName.trim(),
      linkKeyToken: !formData.linkKeyToken.trim(),
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error updating payment gateway:', error);
    } finally {
      setLoading(false);
    }
  };

  // If gateway is null, don't render the dialog
  if (!gateway) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        elevation: 24,
        sx: {
          borderRadius: '20px',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(17, 25, 40, 0.8) 100%)' 
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.1)'}`,
          overflow: 'hidden',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle 
          sx={{ 
            py: 2,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(51, 102, 255, 0.1) 0%, rgba(51, 102, 255, 0.05) 100%)'
              : 'linear-gradient(180deg, rgba(51, 102, 255, 0.08) 0%, rgba(51, 102, 255, 0.03) 100%)',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3366FF 0%, #5B8DEF 100%)',
                boxShadow: '0 4px 14px rgba(51, 102, 255, 0.3)',
              }}
            >
              <PaymentIcon sx={{ color: '#fff' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Edit Payment Gateway
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.mode === 'dark' 
                    ? alpha('#fff', 0.7) 
                    : alpha('#1a1a1a', 0.7),
                }}
              >
                Update gateway configuration
              </Typography>
            </Box>
          </Box>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose} 
            disabled={loading}
            sx={{ 
              p: 1,
              backgroundColor: alpha(theme.palette.text.primary, 0.04),
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.primary, 0.08),
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent 
          sx={{ 
            py: 3,
            px: { xs: 2, sm: 3 },
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(17, 25, 40, 0.8) 0%, rgba(20, 29, 47, 0.8) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%)',
          }}
        >
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              name="publicName"
              label="Public Name"
              value={formData.publicName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.publicName}
              helperText={errors.publicName ? "Public name is required" : "The name that will be displayed to your customers"}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                sx: { 
                  height: '44px',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.divider, 0.2),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px',
                  },
                }
              }}
              sx={{
                mt: 1,
                '& .MuiFormHelperText-root': {
                  mt: 0.5,
                  fontSize: '0.75rem',
                  color: theme.palette.mode === 'dark' ? alpha('#fff', 0.5) : alpha('#1a1a1a', 0.5),
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.875rem',
                  color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                  transform: 'translate(14px, -8px) scale(0.75)',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.25,
                },
              }}
            />
            
            <TextField
              name="privateName"
              label="Private Name"
              value={formData.privateName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.privateName}
              helperText={errors.privateName ? "Private name is required" : "Internal reference name for this gateway"}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentIcon sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.divider, 0.2),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px',
                  },
                }
              }}
            />
            
            <TextField
              name="linkKeyToken"
              label="Key"
              value={formData.linkKeyToken || formData.key || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.linkKeyToken}
              helperText={errors.linkKeyToken ? "Key is required" : "Unique API key identifier for this gateway"}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon sx={{ color: theme.palette.primary.main }} />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(theme.palette.divider, 0.2),
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px',
                  },
                }
              }}
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={formData.isEnabled} 
                  onChange={handleChange} 
                  name="isEnabled"
                  color="success"
                  disabled={loading}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: formData.isEnabled 
                      ? '#2EA043' 
                      : theme.palette.text.secondary
                  }}
                >
                  {formData.isEnabled ? "Gateway is enabled" : "Gateway is disabled"}
                </Typography>
              }
              sx={{ mt: 1 }}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions 
          sx={{ 
            p: 3, 
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(20, 29, 47, 0.8) 0%, rgba(17, 25, 40, 0.8) 100%)'
              : 'linear-gradient(180deg, rgba(249, 250, 251, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            justifyContent: 'flex-end', 
            gap: 2
          }}
        >
          <Button 
            onClick={onClose} 
            variant="outlined"
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: alpha(theme.palette.divider, 0.2),
              color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3366FF 0%, #5B8DEF 100%)',
              boxShadow: '0 4px 14px rgba(51, 102, 255, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1939B7 0%, #3366FF 100%)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 