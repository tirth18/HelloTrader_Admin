'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface UserScriptDetailLayoutProps {
  children: React.ReactNode;
}

export default function UserScriptDetailLayout({ children }: UserScriptDetailLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 