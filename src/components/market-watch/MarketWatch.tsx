import { 
  Box, 
  Card, 
  Grid, 
  Typography, 
  TextField, 
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  alpha,
  Divider,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const MarketWatch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const marketCards = [
    { 
      title: 'GOLD', 
      value: '₹90,205.00', 
      change: '+1.14%',
      isPositive: true 
    },
    { 
      title: 'CRUDE OIL', 
      value: '$74.30', 
      change: '+0.44%',
      isPositive: true 
    },
    { 
      title: 'SILVER', 
      value: '₹83,745.50', 
      change: '-0.83%',
      isPositive: false 
    },
    { 
      title: 'NIFTY', 
      value: '22,347.80', 
      change: '+0.67%',
      isPositive: true 
    },
  ];

  return (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'dark' 
          ? 'background.default'
          : 'grey.50',
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          p: { xs: 2, sm: 3 },
          pb: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600 }}>
          Market Watch
        </Typography>

        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: { xs: 2, sm: 3 } }}>
          {marketCards.map((card) => (
            <Grid item xs={6} sm={6} md={3} key={card.title}>
              <Card 
                sx={{ 
                  p: { xs: 1.5, sm: 2 },
                  height: '100%',
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 'none',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                  },
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  color="textSecondary" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 0.5, 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  {card.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: card.isPositive ? 'success.main' : 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {card.change}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 3 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 1, sm: 2 }
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Active Clients: 
              <Typography 
                component="span" 
                sx={{ 
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  px: { xs: 1, sm: 1.5 },
                  py: 0.5,
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                71
              </Typography>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Showing 7 of 1,343 scrips
            </Typography>
          </Box>
          <TextField
            placeholder="Search scrips..."
            size="small"
            fullWidth
            sx={{
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': {
                bgcolor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius * 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  }
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 1,
                  }
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      transition: 'all 0.2s ease-in-out',
                    }} 
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer 
          component={Paper}
          sx={{ 
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            boxShadow: 'none',
            overflow: 'auto'
          }}
        >
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell 
                  padding="checkbox" 
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.common.white, 0.03)
                      : alpha(theme.palette.common.black, 0.02),
                  }}
                />
                <TableCell sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  Scrip
                </TableCell>
                <TableCell sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  Type
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  LTP
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  Change
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  %Change
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  High
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  Low
                </TableCell>
                <TableCell align="right" sx={{ 
                  bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.common.white, 0.03)
                    : alpha(theme.palette.common.black, 0.02),
                  fontWeight: 600
                }}>
                  Bid
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow 
                hover 
                sx={{
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.primary.main, 0.08)
                      : alpha(theme.palette.primary.main, 0.04),
                  }
                }}
              >
                <TableCell padding="checkbox">
                  <StarIcon sx={{ color: theme.palette.warning.main }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>COPPER25APR880CE</TableCell>
                <TableCell>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      color: theme.palette.warning.main,
                      fontWeight: 600
                    }}
                  >
                    OPTIONS
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>125.60</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+2.35</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+1.95%</TableCell>
                <TableCell align="right">128.40</TableCell>
                <TableCell align="right">122.70</TableCell>
                <TableCell align="right">125.55</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MarketWatch; 