'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  useTheme,
  alpha,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { 
  Close as CloseIcon,
  Payment as PaymentIcon,
  Badge as BadgeIcon,
  Key as KeyIcon,
} from '@mui/icons-material';

interface AddGatewayDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (gateway: { publicName: string; privateName: string; linkKeyToken: string }) => void;
}

export default function AddGatewayDialog({ open, onClose, onAdd }: AddGatewayDialogProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    publicName: '',
    privateName: '',
    linkKeyToken: '',
  });

  const [errors, setErrors] = useState({
    publicName: false,
    privateName: false,
    linkKeyToken: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      await onAdd(formData);
      
      setFormData({
        publicName: '',
        privateName: '',
        linkKeyToken: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      publicName: '',
      privateName: '',
      linkKeyToken: '',
    });
    setErrors({
      publicName: false,
      privateName: false,
      linkKeyToken: false,
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
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
                Add Payment Gateway
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.mode === 'dark' 
                    ? alpha('#fff', 0.7) 
                    : alpha('#1a1a1a', 0.7),
                }}
              >
                Configure a new payment gateway integration
              </Typography>
            </Box>
          </Box>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={handleClose} 
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
              value={formData.linkKeyToken}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.linkKeyToken}
              helperText={errors.linkKeyToken ? "Key is required" : "Unique API key identifier for this gateway"}
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
            onClick={handleClose} 
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Gateway'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 