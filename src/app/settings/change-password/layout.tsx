'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface ChangePasswordLayoutProps {
  children: React.ReactNode;
}

export default function ChangePasswordLayout({ children }: ChangePasswordLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 