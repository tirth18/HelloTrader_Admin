'use client';

import React from 'react';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';

interface UserActivePositionsLayoutProps {
  children: React.ReactNode;
}

export default function UserActivePositionsLayout({ children }: UserActivePositionsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 