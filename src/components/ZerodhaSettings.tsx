import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, Container, Grid, Stack } from '@mui/material';

const ZerodhaSettings: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>('cy4qcnkinv4dtdwi');
    const [apiSecret, setApiSecret] = useState<string>('zz6eu7aqgwfjpr6wx5mbes4j0kp0mn86');
    const [accessToken, setAccessToken] = useState<string>('hjuMpjTbfsTtgRTg7VCWiehQGPvQj1m');
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
        <Container maxWidth={false} disableGutters sx={{ 
            backgroundColor: '#131722', 
            minHeight: '100vh',
            color: 'white',
            pt: 3,
            px: { xs: 2, sm: 4 }
        }}>
            {/* Market Status Toolbar */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mb: 3,
                gap: 2
            }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" width={{ xs: '100%', md: 'auto' }}>
                    <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500,
                        color: '#e0e0e0',
                        minWidth: 'max-content'
                    }}>
                        Platform Market Status (Comex): {isComexMarketOpen ? 'Open' : 'Closed'}
                    </Typography>
                    
                    <Button
                        variant="contained"
                        onClick={handleCloseComexMarket}
                        disabled={!isComexMarketOpen}
                        size="medium"
                        sx={{ 
                            backgroundColor: '#f44336',
                            color: 'white',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                    >
                        CLOSE COMEX MARKET
                    </Button>
                </Stack>
                
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" width={{ xs: '100%', md: 'auto' }}>
                    <Typography sx={{ 
                        fontSize: '16px', 
                        fontWeight: 500,
                        color: '#e0e0e0',
                        minWidth: 'max-content'
                    }}>
                        Platform Market Status: {isPlatformMarketOpen ? 'Open' : 'Closed'}
                    </Typography>
                    
                    <Button
                        variant="contained"
                        onClick={handleClosePlatformMarket}
                        disabled={!isPlatformMarketOpen}
                        size="medium"
                        sx={{ 
                            backgroundColor: '#f44336',
                            color: 'white',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                    >
                        CLOSE MARKET
                    </Button>
                    
                    <Button
                        variant="contained"
                        onClick={handleGenerateAccessToken}
                        size="medium"
                        sx={{ 
                            backgroundColor: '#9c27b0',
                            color: 'white',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#7b1fa2'
                            }
                        }}
                    >
                        GENERATE ACCESS TOKEN
                    </Button>
                </Stack>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ pb: 5 }}>
                {/* Zerodha Settings Header */}
                <Card sx={{ 
                    p: 0, 
                    mb: 4, 
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    overflow: 'visible',
                    width: 'max-content'
                }}>
                    <Button
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#4CAF50', 
                            color: 'white',
                            fontSize: '18px',
                            py: 1.5,
                            px: 4,
                            textTransform: 'none',
                            borderRadius: '4px',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#43a047'
                            }
                        }}
                    >
                        Zerodha Settings
                    </Button>
                </Card>

                {/* Form Fields */}
                <Card sx={{ 
                    p: 4, 
                    backgroundColor: '#1a202e',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    mb: 4,
                    maxWidth: '100%'
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography sx={{ 
                                fontSize: '16px', 
                                fontWeight: 500, 
                                mb: 1.5,
                                color: '#e0e0e0' 
                            }}>
                                API Key
                            </Typography>
                            <TextField
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                fullWidth
                                placeholder="Enter API Key"
                                variant="outlined"
                                InputProps={{
                                    style: { 
                                        backgroundColor: '#1e2a3a',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        height: '48px',
                                        borderRadius: '4px'
                                    }
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.15)',
                                            borderWidth: '1px'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255,255,255,0.3)'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4CAF50',
                                            borderWidth: '1px'
                                        }
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255,255,255,0.5)',
                                        opacity: 1
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ 
                                fontSize: '16px', 
                                fontWeight: 500, 
                                mb: 1.5,
                                color: '#e0e0e0' 
                            }}>
                                API Secret
                            </Typography>
                            <TextField
                                value={apiSecret}
                                onChange={(e) => setApiSecret(e.target.value)}
                                fullWidth
                                placeholder="Enter API Secret"
                                variant="outlined"
                                InputProps={{
                                    style: { 
                                        backgroundColor: '#1e2a3a',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        height: '48px',
                                        borderRadius: '4px'
                                    }
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.15)',
                                            borderWidth: '1px'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255,255,255,0.3)'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4CAF50',
                                            borderWidth: '1px'
                                        }
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255,255,255,0.5)',
                                        opacity: 1
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ 
                                fontSize: '16px', 
                                fontWeight: 500, 
                                mb: 1.5,
                                color: '#e0e0e0'
                            }}>
                                API Access Token
                            </Typography>
                            <TextField
                                value={accessToken}
                                onChange={(e) => setAccessToken(e.target.value)}
                                fullWidth
                                placeholder="Enter Access Token"
                                variant="outlined"
                                InputProps={{
                                    style: { 
                                        backgroundColor: '#1e2a3a',
                                        color: '#ffffff',
                                        fontSize: '16px',
                                        height: '48px',
                                        borderRadius: '4px'
                                    }
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,0.15)',
                                            borderWidth: '1px'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255,255,255,0.3)'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4CAF50',
                                            borderWidth: '1px'
                                        }
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'rgba(255,255,255,0.5)',
                                        opacity: 1
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                variant="contained"
                                onClick={handleUpdateDetails}
                                size="medium" 
                                sx={{ 
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderRadius: '4px',
                                    py: 1,
                                    px: 3,
                                    mt: 1,
                                    '&:hover': {
                                        backgroundColor: '#43a047'
                                    }
                                }}
                            >
                                UPDATE DETAILS
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Container>
    );
};

export default ZerodhaSettings; 