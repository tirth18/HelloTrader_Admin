'use client';

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface ClosedPositionsLayoutProps {
  children: React.ReactNode;
}

export default function ClosedPositionsLayout({ children }: ClosedPositionsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 