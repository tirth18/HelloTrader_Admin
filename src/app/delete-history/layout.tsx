'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface DeleteHistoryLayoutProps {
  children: React.ReactNode;
}

export default function DeleteHistoryLayout({ children }: DeleteHistoryLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 