'use client';

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface ManageScripLayoutProps {
  children: React.ReactNode;
}

export default function ManageScripLayout({ children }: ManageScripLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 