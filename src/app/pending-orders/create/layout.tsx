'use client';

import React from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

export default function CreatePendingOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
} 