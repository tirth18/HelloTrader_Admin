'use client';

import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

interface PaymentGatewaysLayoutProps {
  children: React.ReactNode;
}

export default function PaymentGatewaysLayout({ children }: PaymentGatewaysLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 