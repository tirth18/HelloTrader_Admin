'use client';

import React from 'react';
import ClientProviders from '@/components/providers/ClientProviders';
import './globals.css';
import { LoadingProvider } from '../contexts/LoadingContext';
import { ThemeProvider } from '../theme/ThemeProvider';
import { store } from '../store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <LoadingProvider>
              <ClientProviders>{children}</ClientProviders>
            </LoadingProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
} 