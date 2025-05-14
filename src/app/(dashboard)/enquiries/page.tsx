'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
  Card,
  Stack,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

// Mock data based on the image
const mockEnquiries = [
  {
    id: 522,
    fullName: 'Anil',
    mobile: '9896255253',
    message: 'Use kesa Kara hello traders app ko',
    ipAddress: '152.58.119.17',
    time: '2025-05-08 12:43 pm',
  },
  {
    id: 521,
    fullName: 'Ashwani kumar',
    mobile: '9905812418',
    message: 'I just created account but not able to login',
    ipAddress: '42.104.248.13',
    time: '2025-05-08 08:55 am',
  },
  {
    id: 520,
    fullName: 'Mukesh',
    mobile: '9969264340',
    message: 'How to open the account to trade',
    ipAddress: '152.58.46.81',
    time: '2025-05-01 03:27 pm',
  },
  {
    id: 519,
    fullName: 'HimaBindu',
    mobile: '9502441558',
    message: 'My app not working.its asking for password.i forgot.trying to login with phonenumber.not working',
    ipAddress: '175.101.108.235',
    time: '2025-04-30 10:09 am',
  },
  {
    id: 518,
    fullName: 'Praveen bairagi',
    mobile: '9575929011',
    message: 'Forget password I\'m forgetting my password please help',
    ipAddress: '27.97.111.6',
    time: '2025-04-30 10:01 am',
  },
  {
    id: 517,
    fullName: 'Laxmi Bhagat',
    mobile: '8655690127',
    message: 'I am unable to login it. Please help',
    ipAddress: '103.163.98.62',
    time: '2025-04-30 10:00 am',
  },
];

export default function EnquiriesPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // Theme-aware colors
  const colors = {
    background: isDark ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)',
    cardBg: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
    border: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
    textPrimary: isDark ? 'rgb(209, 213, 219)' : 'rgb(17, 24, 39)',
    textSecondary: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
    hoverBg: isDark ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)',
    inputBg: isDark ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
    inputBorder: isDark ? 'rgb(55, 65, 81)' : 'rgb(209, 213, 219)',
    inputHoverBorder: isDark ? 'rgb(75, 85, 99)' : 'rgb(156, 163, 175)',
    focusBorder: 'rgb(59, 130, 246)',
    status: {
      new: {
        text: 'rgb(59, 130, 246)',
        bg: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
      },
      pending: {
        text: 'rgb(245, 158, 11)',
        bg: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
      },
      resolved: {
        text: 'rgb(34, 197, 94)',
        bg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
      },
    },
  };

  // Memoize the query to prevent unnecessary re-renders
  const { data: enquiries = mockEnquiries, isLoading, refetch } = useQuery({
    queryKey: ['enquiries', searchQuery],
    queryFn: async () => {
      try {
        // For development, use mock data if no API is available
        if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL) {
          console.log('Using mock data for enquiries');
          return mockEnquiries.filter(
            (enquiry) =>
              enquiry.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              enquiry.mobile?.includes(searchQuery) ||
              enquiry.message?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // In production or when API is available, make API call
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await fetch(`${apiUrl}/api/enquiries?search=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch enquiries');
        }
        
        const data = await response.json();
        return data.enquiries || [];
      } catch (error) {
        console.error('Error fetching enquiries:', error);
        return mockEnquiries; // Fallback to mock data on error
      }
    },
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Memoize stats calculation
  const stats = useMemo(() => ({
    total: enquiries.length,
  }), [enquiries]);

  // Memoize columns configuration
  const columns: GridColDef[] = useMemo(() => [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>ID</Typography> 
          <ArrowUpwardIcon sx={{ fontSize: 20 }} />
        </Box>
      ),
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: 'fullName', 
      headerName: 'Full Name', 
      width: 200,
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: 'mobile', 
      headerName: 'Mobile', 
      width: 180,
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: 'message', 
      headerName: 'Message', 
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: 'ipAddress', 
      headerName: 'IP Address', 
      width: 180,
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
    { 
      field: 'time', 
      headerName: 'Time', 
      width: 220,
      renderCell: (params) => (
        <Typography sx={{ color: 'rgb(209, 213, 219)', fontSize: '1.2rem' }}>
          {params.value}
        </Typography>
      ),
    },
  ], []);

  return (
    <Box sx={{ 
      p: 3,
      bgcolor: 'rgb(17, 24, 39)',
      minHeight: '100vh',
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'rgb(209, 213, 219)', 
          fontWeight: 600, 
          mb: 3,
          fontSize: '1.8rem'
        }}
      >
        Enquiries
      </Typography>
      
      <Box sx={{
        bgcolor: 'rgb(17, 24, 39)',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '1.2rem', color: 'rgb(209, 213, 219)' }}>
            Showing {Math.min(paginationModel.pageSize, enquiries.length)} of {enquiries.length} items.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDark ? 'rgb(17, 24, 39)' : 'rgb(22, 32, 49)',
                  borderRadius: '6px',
                  color: 'rgb(209, 213, 219)',
                  fontSize: '1.2rem',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgb(107, 114, 128)',
                  opacity: 1,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgb(107, 114, 128)' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <IconButton 
              onClick={() => refetch()}
              sx={{ 
                bgcolor: isDark ? 'rgb(31, 41, 55)' : 'rgb(31, 41, 55)',
                borderRadius: '6px',
                '&:hover': { bgcolor: 'rgb(55, 65, 81)' }
              }}
            >
              <RefreshIcon sx={{ color: 'rgb(107, 114, 128)' }} />
            </IconButton>
          </Box>
        </Box>
        
        <DataGrid
          rows={enquiries}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          autoHeight
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
          }}
          density="standard"
          sx={{
            border: 'none',
            borderRadius: 0,
            bgcolor: 'rgb(17, 24, 39)',
            '& .MuiDataGrid-main': { color: 'rgb(209, 213, 219)' },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'rgb(17, 24, 39)',
              color: 'rgb(209, 213, 219)',
              borderBottom: '1px solid rgb(55, 65, 81)',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 500,
                fontSize: '1.2rem',
              },
            },
            '& .MuiDataGrid-cell': {
              color: 'rgb(209, 213, 219)',
              borderBottom: '1px solid rgb(55, 65, 81)',
              padding: '12px 16px',
            },
            '& .MuiDataGrid-row': {
              bgcolor: 'rgb(17, 24, 39)',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: 'rgb(31, 41, 55)',
            },
            '& .MuiDataGrid-footerContainer': {
              bgcolor: 'rgb(17, 24, 39)',
              borderTop: '1px solid rgb(55, 65, 81)',
            },
            '& .MuiTablePagination-root': {
              color: 'rgb(156, 163, 175)',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'rgb(156, 163, 175)',
              fontSize: '1.2rem',
            },
            '& .MuiTablePagination-actions': {
              color: 'rgb(156, 163, 175)',
            },
            '& .MuiIconButton-root.Mui-disabled': {
              color: 'rgba(156, 163, 175, 0.3)',
            },
          }}
        />
      </Box>
    </Box>
  );
} 