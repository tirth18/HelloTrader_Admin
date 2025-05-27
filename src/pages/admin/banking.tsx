import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Box, Typography } from '@mui/material';

const BankingPage: React.FC = () => {
    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Banking Management
                </Typography>
                {/* Add your banking management content here */}
            </Box>
        </AdminLayout>
    );
};

export default BankingPage; 