import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import MarketWatch from '../../components/MarketWatch';

const MarketWatchPage: React.FC = () => {
    return (
        <AdminLayout>
            <MarketWatch />
        </AdminLayout>
    );
};

export default MarketWatchPage; 