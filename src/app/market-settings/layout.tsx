'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface MarketSettingsLayoutProps {
  children: React.ReactNode;
}

export default function MarketSettingsLayout({ children }: MarketSettingsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 