'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface ChangeTransactionPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ChangeTransactionPasswordLayout({ children }: ChangeTransactionPasswordLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 