'use client';

import React from 'react';
import ClientProviders from '@/components/providers/ClientProviders';
import './globals.css';
import { LoadingProvider } from '../contexts/LoadingContext';
import { ThemeProvider } from '@mui/material/styles';
import { store } from '../store';
import { Provider } from 'react-redux';
import { QueryProvider } from '../providers/QueryProvider';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

// Force this layout to be dynamically rendered
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LoadingProvider>
                <ClientProviders>{children}</ClientProviders>
              </LoadingProvider>
            </ThemeProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
} 