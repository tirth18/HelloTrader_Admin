'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface ClosedTradesLayoutProps {
  children: React.ReactNode;
}

export default function ClosedTradesLayout({ children }: ClosedTradesLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 