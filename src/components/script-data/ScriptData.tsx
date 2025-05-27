import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  alpha,
  CircularProgress,
  Alert
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { scriptDataService, ScriptDataItem } from '@/services/script-data';

const ScriptData: React.FC = () => {
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const [hour, setHour] = useState<string>('16');
  const [minute, setMinute] = useState<string>('58');
  const [selectedScript, setSelectedScript] = useState<string>('');
  const [data, setData] = useState<ScriptDataItem[]>([]);
  const [scripts, setScripts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generate hours options (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Generate minutes options (0-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Fetch available scripts on component mount
  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const availableScripts = await scriptDataService.getScripts();
        setScripts(availableScripts);
      } catch (err) {
        console.error('Failed to fetch scripts:', err);
        setScripts(['NIFTY', 'BANKNIFTY', 'FINNIFTY', 'SENSEX']); // Fallback
      }
    };

    fetchScripts();
  }, []);

  const handleShowData = async () => {
    if (!date || !selectedScript) {
      setError('Please select date and script');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const scriptData = await scriptDataService.getScriptData(
        date,
        hour,
        minute,
        selectedScript
      );
      setData(scriptData);
    } catch (err) {
      console.error('Error fetching script data:', err);
      setError('Failed to fetch script data. Please try again.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: theme.palette.mode === 'dark' 
        ? 'background.default'
        : 'grey.50',
      p: { xs: 2, sm: 3 }
    }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    size: 'small'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={6} sm={3} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="hour-label">Hour</InputLabel>
              <Select
                labelId="hour-label"
                value={hour}
                label="Hour"
                onChange={(e) => setHour(e.target.value)}
              >
                {hours.map((h) => (
                  <MenuItem key={h} value={h}>{h}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={3} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="minute-label">Minute</InputLabel>
              <Select
                labelId="minute-label"
                value={minute}
                label="Minute"
                onChange={(e) => setMinute(e.target.value)}
              >
                {minutes.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="script-label">Select Script</InputLabel>
              <Select
                labelId="script-label"
                value={selectedScript}
                label="Select Script"
                onChange={(e) => setSelectedScript(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Script</em>
                </MenuItem>
                {scripts.map((script) => (
                  <MenuItem key={script} value={script}>{script}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Button 
              variant="contained" 
              fullWidth
              onClick={handleShowData}
              disabled={loading}
              sx={{
                py: 1,
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.9),
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SHOW DATA'}
            </Button>
          </Grid>
        </Grid>
        
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Note: Time is in 24 hours format. For example, For 8 PM, Select 20 in hours.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
      
      <TableContainer 
        component={Paper}
        elevation={0}
        sx={{ 
          flex: 1,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" color="textSecondary">
            Showing {data.length} of items.
          </Typography>
        </Box>
        
        <Table>
          <TableHead sx={{ 
            bgcolor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.common.white, 0.05)
              : alpha(theme.palette.common.black, 0.05)
          }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Scrip ID</TableCell>
              <TableCell>Exchange Time</TableCell>
              <TableCell>System Time</TableCell>
              <TableCell>Bid</TableCell>
              <TableCell>Ask</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>LTP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    No data available. Please select criteria and click 'Show Data'.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.scripId}</TableCell>
                  <TableCell>{row.exchangeTime}</TableCell>
                  <TableCell>{row.systemTime}</TableCell>
                  <TableCell>{row.bid}</TableCell>
                  <TableCell>{row.ask}</TableCell>
                  <TableCell>{row.high}</TableCell>
                  <TableCell>{row.low}</TableCell>
                  <TableCell>{row.ltp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScriptData; 