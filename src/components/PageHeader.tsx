import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, action }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      mt={2}
    >
      <Typography variant="h5" component="h1" fontWeight="500">
        {title}
      </Typography>
      {action && (
        <Box>
          {action}
        </Box>
      )}
    </Box>
  );
}; 