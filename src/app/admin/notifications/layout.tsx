'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface NotificationsLayoutProps {
  children: React.ReactNode;
}

export default function NotificationsLayout({ children }: NotificationsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 