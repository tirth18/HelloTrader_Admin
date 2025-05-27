'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface MarketWatchLayoutProps {
  children: React.ReactNode;
}

export default function MarketWatchLayout({ children }: MarketWatchLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 