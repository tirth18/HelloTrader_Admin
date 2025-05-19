'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface UserM2MLayoutProps {
  children: React.ReactNode;
}

export default function UserM2MLayout({ children }: UserM2MLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 