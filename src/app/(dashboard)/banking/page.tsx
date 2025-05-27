'use client';

import { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Container,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface BankDetails {
  account_Holder: string;
  account_Number: string | number;
  bank_Name: string;
  ifsc: string;
  phonePe: string;
  google_Pay: string;
  paytm: string;
  upi_id: string;
  qr_code: string;
}

export default function BankingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    account_Holder: '',
    account_Number: '',
    bank_Name: '',
    ifsc: '',
    phonePe: '',
    google_Pay: '',
    paytm: '',
    upi_id: '',
    qr_code: ''
  });

  // Fetch bank details on component mount
  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      const response = await fetch('http://13.233.225.7:8000/api/getBank', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setBankDetails(data);
    } catch (err) {
      console.error('Error fetching bank details:', err);
      setError('Failed to load bank details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const target = event.target as FileReader;
        if (target && target.result) {
          setBankDetails(prev => ({
            ...prev,
            qr_code: target.result as string
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }
      const response = await fetch('http://13.233.225.7:8000/api/createBank', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankDetails)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setBankDetails(data);
      setSuccess('Bank details updated successfully!');
    } catch (err) {
      console.error('Error updating bank details:', err);
      setError('Failed to update bank details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" component="h1" sx={{ 
            color: 'white',
            bgcolor: '#1976d2',
            p: 2,
            borderRadius: 1,
            mb: 3
          }}>
            Bank Account Details
          </Typography>

          {loading && bankDetails.account_Holder === '' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Account Holder
                </Typography>
                <TextField
                  fullWidth
                  id="account_Holder"
                  name="account_Holder"
                  value={bankDetails.account_Holder}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Account Number
                </Typography>
                <TextField
                  fullWidth
                  id="account_Number"
                  name="account_Number"
                  value={bankDetails.account_Number}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Bank Name
                </Typography>
                <TextField
                  fullWidth
                  id="bank_Name"
                  name="bank_Name"
                  value={bankDetails.bank_Name}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  IFSC
                </Typography>
                <TextField
                  fullWidth
                  id="ifsc"
                  name="ifsc"
                  value={bankDetails.ifsc}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                  inputProps={{ maxLength: 11, style: { textTransform: 'uppercase' } }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  PhonePe
                </Typography>
                <TextField
                  fullWidth
                  id="phonePe"
                  name="phonePe"
                  value={bankDetails.phonePe}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Google Pay
                </Typography>
                <TextField
                  fullWidth
                  id="google_Pay"
                  name="google_Pay"
                  value={bankDetails.google_Pay}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Paytm
                </Typography>
                <TextField
                  fullWidth
                  id="paytm"
                  name="paytm"
                  value={bankDetails.paytm}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  UPI ID
                </Typography>
                <TextField
                  fullWidth
                  id="upi_id"
                  name="upi_id"
                  value={bankDetails.upi_id}
                  onChange={handleChange}
                  size="small"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  QR Code
                </Typography>
                <Box sx={{ 
                  p: 3, 
                  border: '1px dashed #1976d2',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  {bankDetails.qr_code ? (
                    <>
                      <img 
                        src={bankDetails.qr_code} 
                        alt="QR Code" 
                        style={{ 
                          maxWidth: '200px', 
                          maxHeight: '200px',
                          borderRadius: '4px'
                        }} 
                      />
                      <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => setBankDetails(prev => ({ ...prev, qr_code: '' }))}
                      >
                        Remove QR Code
                      </Button>
                    </>
                  ) : (
                    <>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="qr-code-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="qr-code-upload">
                        <Button 
                          component="span" 
                          variant="outlined"
                          sx={{ 
                            color: '#1976d2',
                            borderColor: '#1976d2',
                          }}
                        >
                          Upload QR Code
                        </Button>
                      </label>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Update Details'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}