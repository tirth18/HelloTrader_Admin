'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface ScriptDetailLayoutProps {
  children: React.ReactNode;
}

export default function ScriptDetailLayout({ children }: ScriptDetailLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 