'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface AccountsLayoutProps {
  children: React.ReactNode;
}

export default function AccountsLayout({ children }: AccountsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 