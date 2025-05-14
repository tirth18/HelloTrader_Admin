import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  TextField, 
  Card, 
  Container, 
  Grid, 
  Paper,
  useTheme,
  alpha,
  CardContent,
  CardHeader
} from '@mui/material';

const FivePaisaSettings: React.FC = () => {
    const theme = useTheme();
    const [apiKey, setApiKey] = useState<string>('');
    const [apiSecret, setApiSecret] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [clientCode, setClientCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isComexMarketOpen, setIsComexMarketOpen] = useState<boolean>(true);
    const [isPlatformMarketOpen, setIsPlatformMarketOpen] = useState<boolean>(true);

    const handleUpdateDetails = async () => {
        // Implementation for updating details
    };

    const handleCloseComexMarket = () => {
        setIsComexMarketOpen(false);
    };

    const handleClosePlatformMarket = () => {
        setIsPlatformMarketOpen(false);
    };

    const handleGenerateAccessToken = () => {
        // Implementation for generating access token
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            5Paisa Settings
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                            Configure your 5Paisa API credentials and market settings
                        </Typography>
                    </Grid>

                    {/* API Configuration Card */}
                    <Grid item xs={12}>
                        <Card
                            elevation={0}
                            sx={{
                                background: alpha(theme.palette.background.paper, 0.6),
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                mb: 3
                            }}
                        >
                            <CardHeader title="API Configuration" />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ 
                                            fontSize: '16px', 
                                            fontWeight: 500, 
                                            mb: 1.5
                                        }}>
                                            API Key
                                        </Typography>
                                        <TextField
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            fullWidth
                                            placeholder="Enter API Key"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography sx={{ 
                                            fontSize: '16px', 
                                            fontWeight: 500, 
                                            mb: 1.5
                                        }}>
                                            API Secret
                                        </Typography>
                                        <TextField
                                            value={apiSecret}
                                            onChange={(e) => setApiSecret(e.target.value)}
                                            fullWidth
                                            placeholder="Enter API Secret"
                                            variant="outlined"
                                            type="password"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography sx={{ 
                                            fontSize: '16px', 
                                            fontWeight: 500, 
                                            mb: 1.5
                                        }}>
                                            Client Code
                                        </Typography>
                                        <TextField
                                            value={clientCode}
                                            onChange={(e) => setClientCode(e.target.value)}
                                            fullWidth
                                            placeholder="Enter Client Code"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography sx={{ 
                                            fontSize: '16px', 
                                            fontWeight: 500, 
                                            mb: 1.5
                                        }}>
                                            Password
                                        </Typography>
                                        <TextField
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            fullWidth
                                            placeholder="Enter Password"
                                            variant="outlined"
                                            type="password"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography sx={{ 
                                            fontSize: '16px', 
                                            fontWeight: 500, 
                                            mb: 1.5
                                        }}>
                                            API Access Token
                                        </Typography>
                                        <TextField
                                            value={accessToken}
                                            onChange={(e) => setAccessToken(e.target.value)}
                                            fullWidth
                                            placeholder="Enter Access Token"
                                            variant="outlined"
                                        />
                                        <Button 
                                            variant="contained" 
                                            onClick={handleGenerateAccessToken}
                                            sx={{ 
                                                mt: 2,
                                                textTransform: 'none',
                                            }}
                                        >
                                            Generate Access Token
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button 
                                            variant="contained" 
                                            onClick={handleUpdateDetails}
                                            sx={{ 
                                                textTransform: 'none',
                                            }}
                                        >
                                            Update Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Market Status Card */}
                    <Grid item xs={12}>
                        <Card
                            elevation={0}
                            sx={{
                                background: alpha(theme.palette.background.paper, 0.6),
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            }}
                        >
                            <CardHeader title="Market Status" />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Card
                                            elevation={1}
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                                Comex Market
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        color: isComexMarketOpen ? 'success.main' : 'error.main',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {isComexMarketOpen ? 'Open' : 'Closed'}
                                                </Typography>
                                                
                                                <Button 
                                                    variant="contained" 
                                                    color={isComexMarketOpen ? "error" : "success"}
                                                    onClick={handleCloseComexMarket}
                                                    sx={{ 
                                                        textTransform: 'none', 
                                                    }}
                                                >
                                                    {isComexMarketOpen ? 'Close Market' : 'Open Market'}
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <Card
                                            elevation={1}
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                                Platform Market
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography 
                                                    variant="body1" 
                                                    sx={{ 
                                                        color: isPlatformMarketOpen ? 'success.main' : 'error.main',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {isPlatformMarketOpen ? 'Open' : 'Closed'}
                                                </Typography>
                                                
                                                <Button 
                                                    variant="contained" 
                                                    color={isPlatformMarketOpen ? "error" : "success"}
                                                    onClick={handleClosePlatformMarket}
                                                    sx={{ 
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    {isPlatformMarketOpen ? 'Close Market' : 'Open Market'}
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default FivePaisaSettings; 