'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface GroupTradesLayoutProps {
  children: React.ReactNode;
}

export default function GroupTradesLayout({ children }: GroupTradesLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 