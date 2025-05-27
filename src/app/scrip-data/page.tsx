'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import ScriptData from '@/components/script-data/ScriptData';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ScriptDataPage() {
  return (
    <DashboardLayout>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 500, 
            mt: 2, 
            ml: 3, 
            mb: 3,
            display: 'inline-block'
          }}
        >
          Script Data
        </Typography>
        <Box sx={{ flex: 1 }}>
          <ScriptData />
        </Box>
      </Box>
    </DashboardLayout>
  );
} 