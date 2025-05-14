import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Grid, 
  Typography, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface WithdrawalRequestFormProps {
  onSubmit: (data: WithdrawalFormData) => Promise<void>;
  availableBalance: number;
  ledgerBalance: number;
}

export interface WithdrawalFormData {
  amount: number;
  paymentMethod: string;
  broker?: string;
  brokerCode?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  upiId?: string;
  mobile?: string;
  document?: File | null;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const WithdrawalRequestForm = ({ 
  onSubmit, 
  availableBalance, 
  ledgerBalance 
}: WithdrawalRequestFormProps) => {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    amount: 0,
    paymentMethod: 'Bank Transfer',
    broker: '',
    brokerCode: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    mobile: '',
    document: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (formData.amount > availableBalance) {
      newErrors.amount = 'Amount exceeds available balance';
    }
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    if (!formData.broker) {
      newErrors.broker = 'Broker name is required';
    }
    
    if (!formData.brokerCode) {
      newErrors.brokerCode = 'Broker code is required';
    }
    
    if (formData.paymentMethod === 'Bank Transfer') {
      if (!formData.accountHolder) {
        newErrors.accountHolder = 'Account holder name is required';
      }
      
      if (!formData.accountNumber) {
        newErrors.accountNumber = 'Account number is required';
      }
      
      if (!formData.ifsc) {
        newErrors.ifsc = 'IFSC code is required';
      }
    } else if (formData.paymentMethod === 'UPI') {
      if (!formData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      }
      
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      }
    }
    
    if (!formData.document) {
      newErrors.document = 'Please upload a supporting document';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        document: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setDocumentPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.document) {
        setErrors(prev => {
          const { document: _, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await onSubmit(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        amount: 0,
        paymentMethod: 'Bank Transfer',
        broker: '',
        brokerCode: '',
        accountHolder: '',
        accountNumber: '',
        ifsc: '',
        upiId: '',
        mobile: '',
        document: null
      });
      setDocumentPreview(null);
    } catch (err) {
      setError('Failed to submit withdrawal request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Request Withdrawal
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Withdrawal request submitted successfully!
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Available Balance: ₹{availableBalance.toFixed(2)}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Ledger Balance: ₹{ledgerBalance.toFixed(2)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              name="amount"
              label="Withdrawal Amount"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              value={formData.amount || ''}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.paymentMethod}>
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleSelectChange}
                label="Payment Method"
                required
              >
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </Select>
              {errors.paymentMethod && <FormHelperText>{errors.paymentMethod}</FormHelperText>}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              name="broker"
              label="Broker Name"
              fullWidth
              value={formData.broker || ''}
              onChange={handleChange}
              error={!!errors.broker}
              helperText={errors.broker}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              name="brokerCode"
              label="Broker Code"
              fullWidth
              value={formData.brokerCode || ''}
              onChange={handleChange}
              error={!!errors.brokerCode}
              helperText={errors.brokerCode}
              required
            />
          </Grid>
          
          {formData.paymentMethod === 'Bank Transfer' && (
            <>
              <Grid item xs={12}>
                <TextField
                  name="accountHolder"
                  label="Account Holder Name"
                  fullWidth
                  value={formData.accountHolder || ''}
                  onChange={handleChange}
                  error={!!errors.accountHolder}
                  helperText={errors.accountHolder}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  name="accountNumber"
                  label="Account Number"
                  fullWidth
                  value={formData.accountNumber || ''}
                  onChange={handleChange}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  name="ifsc"
                  label="IFSC Code"
                  fullWidth
                  value={formData.ifsc || ''}
                  onChange={handleChange}
                  error={!!errors.ifsc}
                  helperText={errors.ifsc}
                  required
                />
              </Grid>
            </>
          )}
          
          {formData.paymentMethod === 'UPI' && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  name="upiId"
                  label="UPI ID"
                  fullWidth
                  value={formData.upiId || ''}
                  onChange={handleChange}
                  error={!!errors.upiId}
                  helperText={errors.upiId}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  name="mobile"
                  label="Mobile Number"
                  fullWidth
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  required
                />
              </Grid>
            </>
          )}
          
          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
              fullWidth
            >
              Upload Document
              <VisuallyHiddenInput 
                type="file" 
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
            </Button>
            {errors.document && (
              <FormHelperText error>{errors.document}</FormHelperText>
            )}
            
            {documentPreview && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Box
                  component="img"
                  src={documentPreview}
                  alt="Document Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                  }}
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Withdrawal Request'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default WithdrawalRequestForm; 