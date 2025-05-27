'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';

const FivePaisaSettingsPage = () => {
  const theme = useTheme();
  const [apiKey, setApiKey] = useState<string>('9693695824');
  const [apiSecret, setApiSecret] = useState<string>('******');
  const [accessToken, setAccessToken] = useState<string>('');
  const [clientCode, setClientCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isComexMarketOpen, setIsComexMarketOpen] = useState<boolean>(true);
  const [isPlatformMarketOpen, setIsPlatformMarketOpen] = useState<boolean>(true);

  // M2M Data
  const m2mData = [
    { id: 'Total', profit: '59480020.54', trades: '1350', margin: '20680152.69' },
    { id: '0 : Self', profit: '-1333985.6', trades: '162', margin: '1234928.15' },
    { id: '62 : jain01', profit: '866209.5', trades: '85', margin: '2504589.48' },
    { id: '64 : jain02', profit: '1360', trades: '3', margin: '311.86' },
    { id: '67 : jain05', profit: '-11080.5', trades: '10', margin: '34656.16' },
    { id: '70 : jain06', profit: '65698.3', trades: '115', margin: '72189.31' },
    { id: '72 : jain08', profit: '16825', trades: '15', margin: '37941.09' },
    { id: '73 : jain09', profit: '3892170', trades: '106', margin: '1884622.65' },
    { id: '75 : jain11', profit: '3899.54', trades: '27', margin: '350.09' },
  ];

  const handleUpdateDetails = async () => {
    // Implementation for updating details
  };

  const handleCloseComexMarket = () => {
    setIsComexMarketOpen(false);
  };

  const handleOpenComexMarket = () => {
    setIsComexMarketOpen(true);
  };

  const handleClosePlatformMarket = () => {
    setIsPlatformMarketOpen(false);
  };

  const handleOpenPlatformMarket = () => {
    setIsPlatformMarketOpen(true);
  };

  const handleGenerateAccessToken = () => {
    // Implementation for generating access token
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* M2M Table Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          bgcolor: '#1a2035',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            fontWeight="bold" 
            sx={{ 
              mb: 2,
              p: 1.5,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            Live M2M under: HELLO TRADER
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ bgcolor: '#1a2035', boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#0f1729' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>User ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Active Profit/Loss</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Active Trades</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Margin Used</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {m2mData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>
                    {row.id === 'Total' ? (
                      <Typography fontWeight="bold">{row.id}</Typography>
                    ) : (
                      <Box 
                        sx={{ 
                          display: 'inline-block', 
                          bgcolor: theme.palette.primary.main, 
                          color: 'white', 
                          px: 2, 
                          py: 0.5, 
                          borderRadius: 4,
                          fontWeight: 'medium'
                        }}
                      >
                        {row.id}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ 
                    color: row.profit.startsWith('-') ? '#ff5252' : theme.palette.success.main,
                    fontWeight: row.id === 'Total' ? 'bold' : 'normal'
                  }}>
                    {row.profit}
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white',
                    fontWeight: row.id === 'Total' ? 'bold' : 'normal'
                  }}>
                    {row.trades}
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white',
                    fontWeight: row.id === 'Total' ? 'bold' : 'normal'
                  }}>
                    {row.margin}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Trading Dashboard Cards */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* First row of cards */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Buy Turnover
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">6608.21 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">10953.55 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">169.15 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">47739.4 Lakhs</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Sell Turnover
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">21879.11 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">7135.53 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">249.91 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">79668.65 Lakhs</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Total Turnover
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">28487.32 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">18089.08 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">419.06 Lakhs</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">127408.05 Lakhs</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Second row of cards */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Active Users
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">6626</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">6623</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">6515</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">830</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Profit / Loss
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">3332412</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">6105312.48</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">439344</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">3320160</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Brokerage
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">29265.35</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">49352.53</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">13790</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">15786.93</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Third row of cards */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Active Buy
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">204</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">420</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">65</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">16</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#1a2035', color: 'white', borderRadius: 1, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: 'white', 
                  p: 1, 
                  borderRadius: 1,
                  textAlign: 'center',
                  mb: 2
                }}>
                  Active Sell
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Mcx</Typography>
                    <Typography variant="body1">202</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Equity</Typography>
                    <Typography variant="body1">216</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">Options</Typography>
                    <Typography variant="body1">112</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">COMEX</Typography>
                    <Typography variant="body1">76</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      
    </Container>
  );
};

export default FivePaisaSettingsPage; 