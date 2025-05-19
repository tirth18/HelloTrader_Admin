'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface LiveM2MLayoutProps {
  children: React.ReactNode;
}

export default function LiveM2MLayout({ children }: LiveM2MLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 