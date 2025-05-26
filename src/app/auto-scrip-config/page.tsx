'use client';

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
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { optionScriptService, OptionScript } from '@/services/optionScriptService';

export default function AutoScripConfigPage() {
  const [scripSettings, setScripSettings] = useState<OptionScript[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch option scripts on component mount
  useEffect(() => {
    fetchOptionScripts();
  }, []);

  const fetchOptionScripts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await optionScriptService.getOptionScripts();
      setScripSettings(data);
    } catch (error) {
      console.error('Error fetching option scripts:', error);
      setError('Failed to fetch option scripts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleValueChange = (index: number, field: 'aboveLtp' | 'belowLtp', value: string) => {
    const newSettings = [...scripSettings];
    newSettings[index] = {
      ...newSettings[index],
      [field]: parseInt(value) || 0
    };
    setScripSettings(newSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update each modified script
      const updatePromises = scripSettings.map(script => 
        optionScriptService.updateOptionScript(script._id, {
          aboveLtp: script.aboveLtp,
          belowLtp: script.belowLtp
        })
      );
      
      await Promise.all(updatePromises);
      
      // Refresh data after save
      await fetchOptionScripts();
      
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    fetchOptionScripts();
  };

  const filteredSettings = scripSettings.filter(setting =>
    setting.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px',
          bgcolor: 'transparent'
        }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ 
        p: 3, 
        height: '100%', 
        overflow: 'auto',
        bgcolor: 'transparent',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Auto Scrip Configuration
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search scrips..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isSaving || isLoading}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Scrips
                </Typography>
                <Typography variant="h4">
                  {scripSettings.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Active Above LTP
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.aboveLtp > 0).length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Active Below LTP
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.belowLtp > 0).length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Inactive Scrips
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.aboveLtp === 0 && s.belowLtp === 0).length}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TableContainer 
          component={Paper}
          sx={{ 
            maxHeight: '600px', 
            overflow: 'auto',
            flex: 1,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#a8a8a8',
              },
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider'
                }}>
                  Symbol
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider'
                }}>
                  Above LTP
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider'
                }}>
                  Below LTP
                </TableCell>
                <TableCell align="center" sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider'
                }}>
                  Segment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSettings.map((setting, index) => (
                <TableRow key={setting._id} hover>
                  <TableCell sx={{ fontWeight: 'medium' }}>{setting.symbol}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={setting.aboveLtp}
                      onChange={(e) => handleValueChange(index, 'aboveLtp', e.target.value)}
                      inputProps={{ min: 0, max: 8 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={setting.belowLtp}
                      onChange={(e) => handleValueChange(index, 'belowLtp', e.target.value)}
                      inputProps={{ min: 0, max: 8 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {setting.segment}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredSettings.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {searchQuery ? 'No scrips found matching your search.' : 'No scrips available.'}
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
} 