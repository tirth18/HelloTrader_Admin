'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  alpha,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns';
import { actionLedgerService, ActionMessage } from '@/services/actionLedger';
import { useSnackbar } from 'notistack';

const ActionLedger = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ActionMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Function to fetch messages
  const fetchMessages = async (search?: string) => {
    setLoading(true);
    try {
      const response = await actionLedgerService.getMessages(search, page, rowsPerPage);
      setMessages(response.messages);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching messages:', error);
      enqueueSnackbar('Failed to fetch messages', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchMessages();
  }, [page, rowsPerPage]);

  // Function to handle search
  const handleSearch = () => {
    setPage(0); // Reset to first page when searching
    fetchMessages(searchQuery);
  };

  // Function to handle reset
  const handleReset = () => {
    setSearchQuery('');
    setPage(0);
    fetchMessages();
  };

  // Handle enter key press in search field
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '100%' }}>
      {/* Header */}
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: theme.palette.text.primary, // Dynamic color based on theme
        }}
      >
        Action Ledger
      </Typography>

      {/* Search Section */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{
            minWidth: 100,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'SEARCH'}
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          disabled={loading}
          startIcon={<RefreshIcon />}
          sx={{
            minWidth: 100,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
        >
          RESET
        </Button>
      </Paper>

      {/* Messages Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                }}
              >
                Message
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                }}
              >
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 8 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <TableRow
                  key={message.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.1),
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: theme.palette.text.primary,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    {message.message}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    {format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No messages found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            color: theme.palette.text.primary,
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default ActionLedger; 