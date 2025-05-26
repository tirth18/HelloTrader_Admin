'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  TablePagination,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Send as SendIcon,
  Refresh as RefreshIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  delivered_at: string;
}

const NotificationsPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'Please download new application',
      message: 'G',
      delivered_at: '2025-05-16 12:11:07',
    },
    {
      id: 2,
      title: 'Deposit Details Updated -',
      message: '-',
      delivered_at: '2025-05-12 09:05:01',
    },
    {
      id: 3,
      title: 'New Update is available',
      message: '-',
      delivered_at: '2025-05-12 00:27:49',
    },
    {
      id: 4,
      title: 'Deposit Details Updated',
      message: '-',
      delivered_at: '2025-05-05 07:50:15',
    },
    {
      id: 5,
      title: 'Download App',
      message: '-',
      delivered_at: '2025-05-04 22:07:21',
    },
    {
      id: 6,
      title: 'Mcx open at 5 Pm',
      message: '-',
      delivered_at: '2025-05-01 16:31:02',
    },
    {
      id: 7,
      title: '10% bonus stopped from today',
      message: '-',
      delivered_at: '2025-05-01 14:23:09',
    },
    {
      id: 8,
      title: 'services resumed',
      message: '-',
      delivered_at: '2025-04-30 11:02:06',
    },
    {
      id: 9,
      title: 'Started -',
      message: '-',
      delivered_at: '2025-04-29 11:18:08',
    },
    {
      id: 10,
      title: 'Share our link for referral earnings',
      message: '-',
      delivered_at: '2025-04-28 11:49:58',
    },
    {
      id: 11,
      title: 'Deposit details updated in app',
      message: '-',
      delivered_at: '2025-04-28 07:49:58',
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSendNotification = () => {
    // Handle send notification logic here
    console.log('Send notification clicked');
  };

  const handleRefresh = () => {
    // Handle refresh logic here
    console.log('Refresh clicked');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ 
      minWidth: 0, // Allow shrinking
      minHeight: 0, // Allow shrinking
    }}>
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 3,
        gap: 2,
        minWidth: 0, // Allow shrinking
      }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <NotificationsIcon 
            sx={{ 
              fontSize: 28, 
              color: theme.palette.primary.main,
              flexShrink: 0,
            }} 
          />
          <Typography variant="h4" sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            Notifications
          </Typography>
          <Chip 
            label={`${notifications.length} Total`}
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              flexShrink: 0,
            }}
          />
        </Stack>
        
        <Stack direction="row" spacing={2} sx={{ flexShrink: 0 }}>
          <Tooltip title="Refresh notifications">
            <IconButton 
              onClick={handleRefresh}
              sx={{ 
                color: theme.palette.text.primary,
                bgcolor: alpha(theme.palette.action.hover, 0.1),
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': { 
                  bgcolor: alpha(theme.palette.action.hover, 0.2)
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSendNotification}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Send Notification
          </Button>
        </Stack>
      </Box>

      {/* Notifications Table */}
      <Card sx={{ 
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        border: `1px solid ${theme.palette.divider}`,
        minWidth: 0, // Allow shrinking
      }}>
        <TableContainer sx={{ 
          maxHeight: 'calc(100vh - 300px)',
          minWidth: 0, // Allow shrinking
        }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow 
                sx={{ 
                  backgroundColor: isDark 
                    ? alpha(theme.palette.common.white, 0.05)
                    : alpha(theme.palette.common.black, 0.02)
                }}
              >
                <TableCell 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    width: '40%',
                    minWidth: 120,
                  }}
                >
                  Title
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    width: '35%',
                    minWidth: 100,
                  }}
                >
                  Message
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    width: '25%',
                    minWidth: 150,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <span>Delivered At</span>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((notification, index) => (
                <TableRow 
                  key={notification.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.04),
                    },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.08),
                      cursor: 'pointer',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      wordBreak: 'break-word',
                      maxWidth: 0,
                    }}
                  >
                    {notification.title}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      wordBreak: 'break-word',
                      maxWidth: 0,
                    }}
                  >
                    {notification.message === '-' ? (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: alpha(theme.palette.text.secondary, 0.7),
                          fontStyle: 'italic',
                        }}
                      >
                        No message
                      </Typography>
                    ) : (
                      notification.message
                    )}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: theme.palette.text.primary,
                      fontFamily: 'monospace',
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatDateTime(notification.delivered_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={notifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: isDark 
              ? alpha(theme.palette.common.white, 0.05)
              : alpha(theme.palette.common.black, 0.02),
            color: theme.palette.text.primary,
            borderTop: `1px solid ${theme.palette.divider}`,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: theme.palette.text.primary,
            },
            '& .MuiTablePagination-select': {
              color: theme.palette.text.primary,
            },
            '& .MuiTablePagination-actions': {
              color: theme.palette.text.primary,
            },
            '& .MuiIconButton-root': {
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.1),
              },
            },
          }}
        />
        
        {notifications.length === 0 && (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 8,
            color: theme.palette.text.secondary,
          }}>
            <NotificationsIcon 
              sx={{ 
                fontSize: 48, 
                mb: 2, 
                opacity: 0.5,
                color: theme.palette.text.secondary
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 1, 
                color: theme.palette.text.primary,
              }}
            >
              No notifications found
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.text.secondary,
              }}
            >
              Notifications will appear here when they are sent
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default NotificationsPage; 