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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface PaymentGateway {
  id: number;
  publicName: string;
  privateName: string;
  linkKeyToken: string;
  isEnabled: boolean;
}

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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    onSave(formData);
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
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle 
          sx={{ 
            py: 2.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Payment Gateway
          </Typography>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose} 
            sx={{ 
              p: 1,
              backgroundColor: alpha(theme.palette.text.primary, 0.04),
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.primary, 0.08),
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3, px: 3 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              name="publicName"
              label="Public Name"
              value={formData.publicName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.publicName}
              helperText={errors.publicName ? "Public name is required" : ""}
              InputProps={{
                sx: { borderRadius: 2 }
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
              helperText={errors.privateName ? "Private name is required" : ""}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            
            <TextField
              name="linkKeyToken"
              label="Link / Key / Token"
              value={formData.linkKeyToken}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={errors.linkKeyToken}
              helperText={errors.linkKeyToken ? "Link/Key/Token is required" : ""}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={formData.isEnabled} 
                  onChange={handleChange} 
                  name="isEnabled"
                  color="success"
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: formData.isEnabled 
                      ? theme.palette.success.main 
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
        
        <DialogActions sx={{ 
          p: 3, 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          justifyContent: 'flex-end', 
          gap: 1
        }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 