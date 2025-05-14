'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface ActivePositionsLayoutProps {
  children: React.ReactNode;
}

export default function ActivePositionsLayout({ children }: ActivePositionsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 