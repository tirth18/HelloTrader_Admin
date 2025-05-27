'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface ActionLedgerLayoutProps {
  children: React.ReactNode;
}

export default function ActionLedgerLayout({ children }: ActionLedgerLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 