'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

export default function UpdateTradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 