'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
} 