'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
  useTheme,
  alpha,
  Typography,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { PaymentGateway } from '@/types/paymentGateway';

interface Props {
  gateways: PaymentGateway[];
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
  loading?: boolean;
}

export default function PaymentGatewayTable({ gateways, onEdit, onToggleStatus, loading = false }: Props) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' });
  };

  // Determine which key field to display (key or linkKeyToken)
  const getKeyValue = (gateway: PaymentGateway): string => {
    return gateway.key || gateway.linkKeyToken || '';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (gateways.length === 0) {
    return (
      <Box sx={{ 
        py: 4, 
        textAlign: 'center',
        color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7)
      }}>
        <Typography variant="body1">No payment gateways found. Add your first gateway using the button above.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : '#fff',
        borderRadius: '16px',
        border: `1px solid ${theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.05)'}`,
        mx: 'auto',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(30, 41, 59, 0.5)'
                : 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <TableCell 
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              ID #
            </TableCell>
            <TableCell 
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              Public Name
            </TableCell>
            <TableCell 
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              Private Name
            </TableCell>
            <TableCell 
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              Key
            </TableCell>
            <TableCell 
              align="center"
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              Status
            </TableCell>
            <TableCell 
              align="right"
              sx={{ 
                color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                fontSize: '13px',
                fontWeight: 600,
                py: 2,
                px: 3,
                borderBottom: 'none',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gateways.map((gateway) => (
            <TableRow
              key={gateway.id}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(0, 0, 0, 0.02)',
                },
                transition: 'background-color 0.2s ease-in-out',
                borderBottom: `1px solid ${theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)'}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <TableCell
                sx={{
                  py: 2.5,
                  px: 3,
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
                  borderBottom: 'none',
                }}
              >
                <Tooltip title={gateway._id ? `MongoDB ID: ${gateway._id}` : ''} arrow placement="top-start">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {gateway.id}
                  </Box>
                </Tooltip>
              </TableCell>
              <TableCell
                sx={{
                  py: 2.5,
                  px: 3,
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
                  borderBottom: 'none',
                }}
              >
                {gateway.publicName}
              </TableCell>
              <TableCell
                sx={{
                  py: 2.5,
                  px: 3,
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
                  borderBottom: 'none',
                }}
              >
                {gateway.privateName}
              </TableCell>
              <TableCell
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#fff' : '#1a1a1a',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {getKeyValue(gateway)}
                  </Typography>
                  <Tooltip title="Copy to clipboard" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleCopyClick(getKeyValue(gateway))}
                      sx={{
                        color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: 'none',
                }}
              >
                <Chip
                  label={gateway.isEnabled ? 'Active' : 'Inactive'}
                  size="small"
                  sx={{
                    backgroundColor: gateway.isEnabled
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(46, 160, 67, 0.15)'
                        : 'rgba(46, 160, 67, 0.1)'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(218, 54, 51, 0.15)'
                        : 'rgba(218, 54, 51, 0.1)',
                    color: gateway.isEnabled ? '#2EA043' : '#DA3633',
                    fontWeight: 600,
                    fontSize: '12px',
                    height: '24px',
                    border: `1px solid ${gateway.isEnabled 
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(46, 160, 67, 0.25)'
                        : 'rgba(46, 160, 67, 0.2)'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(218, 54, 51, 0.25)'
                        : 'rgba(218, 54, 51, 0.2)'}`,
                    '&:hover': {
                      backgroundColor: gateway.isEnabled
                        ? theme.palette.mode === 'dark'
                          ? 'rgba(46, 160, 67, 0.25)'
                          : 'rgba(46, 160, 67, 0.15)'
                        : theme.palette.mode === 'dark'
                          ? 'rgba(218, 54, 51, 0.25)'
                          : 'rgba(218, 54, 51, 0.15)',
                    },
                  }}
                />
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: 'none',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Tooltip title={gateway.isEnabled ? 'Disable' : 'Enable'} arrow>
                    <IconButton
                      size="small"
                      onClick={() => onToggleStatus(gateway.id)}
                      sx={{
                        color: gateway.isEnabled ? '#2EA043' : '#DA3633',
                        backgroundColor: gateway.isEnabled
                          ? theme.palette.mode === 'dark'
                            ? 'rgba(46, 160, 67, 0.15)'
                            : 'rgba(46, 160, 67, 0.1)'
                          : theme.palette.mode === 'dark'
                            ? 'rgba(218, 54, 51, 0.15)'
                            : 'rgba(218, 54, 51, 0.1)',
                        '&:hover': {
                          backgroundColor: gateway.isEnabled
                            ? theme.palette.mode === 'dark'
                              ? 'rgba(46, 160, 67, 0.25)'
                              : 'rgba(46, 160, 67, 0.15)'
                            : theme.palette.mode === 'dark'
                              ? 'rgba(218, 54, 51, 0.25)'
                              : 'rgba(218, 54, 51, 0.15)',
                        },
                      }}
                    >
                      {gateway.isEnabled ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(gateway.id)}
                      sx={{
                        color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#1a1a1a', 0.7),
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 
