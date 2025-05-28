# Environment Variables Setup Guide

This guide explains how to set up environment variables for the HelloTrader Admin Frontend application.

## Overview

The application has been updated to use environment variables instead of hardcoded API URLs. This makes it easier to switch between different environments (development, staging, production) and keeps sensitive configuration separate from the code.

## Environment Variables

### Required Variables

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for your API server
- `NEXT_PUBLIC_APP_URL`: The URL where your frontend application is hosted
- `NEXT_PUBLIC_WS_URL`: The WebSocket URL for real-time connections
- `JWT_SECRET`: Secret key for JWT token signing

## Setup Instructions

### Step 1: Create Environment File

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Or create a new `.env.local` file manually with the following content:

   ```
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://namotrader.live

   # Other environment variables (add as needed)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_WS_URL=ws://localhost:3000/ws
   JWT_SECRET=your-secret-key
   ```

### Step 2: Update Values

Update the values in your `.env.local` file according to your environment:

#### For Production:

```
NEXT_PUBLIC_API_BASE_URL=https://namotrader.live
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_WS_URL=wss://your-websocket-domain.com/ws
JWT_SECRET=your-production-secret-key
```

#### For Development:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000/ws
JWT_SECRET=your-development-secret-key
```

### Step 3: Restart Development Server

After creating or updating your environment file, restart your development server:

```bash
npm run dev
# or
yarn dev
```

## Important Notes

1. **File Naming**: Use `.env.local` for local development. This file is automatically ignored by Git.

2. **NEXT*PUBLIC* Prefix**: Variables that need to be accessible in the browser must have the `NEXT_PUBLIC_` prefix.

3. **Security**: Never commit `.env.local` or any file containing real secrets to version control.

4. **Environment Priority**: Next.js loads environment variables in this order:
   - `.env.local` (always loaded, ignored by Git)
   - `.env.production` or `.env.development` (depending on NODE_ENV)
   - `.env`

## Files Updated

The following files have been updated to use environment variables:

- `src/config.ts` - Central configuration file
- `src/services/paymentGatewayService.ts` - Payment gateway API calls
- `src/utils/api.ts` - General API utilities
- `src/app/trading-clients/create/page.tsx` - Trading client creation
- `src/app/pending-orders/create/page.tsx` - Pending orders creation
- `src/app/market-watch/page.tsx` - Market watch functionality
- `src/app/market-settings/page.tsx` - Market settings
- `src/app/(dashboard)/banking/page.tsx` - Banking page
- `src/app/(dashboard)/banking/withdrawal-requests/page.tsx` - Withdrawal requests

## Configuration Details

### API_BASE_URL Usage

The `API_BASE_URL` is now imported from `src/config.ts` in all files:

```typescript
import { API_BASE_URL } from "@/config";

// Usage in API calls
const response = await fetch(`${API_BASE_URL}/api/endpoint`);
```

### Config File Structure

The `src/config.ts` file now looks like:

```typescript
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://namotrader.live";
```

This provides a fallback URL if the environment variable is not set.

## Troubleshooting

1. **Environment variables not loading**: Make sure your `.env.local` file is in the root directory of your project.

2. **Variables undefined in browser**: Ensure browser-accessible variables have the `NEXT_PUBLIC_` prefix.

3. **Changes not reflecting**: Restart your development server after modifying environment variables.

4. **API calls failing**: Verify that your `NEXT_PUBLIC_API_BASE_URL` is correct and the API server is running.

## Migration Summary

✅ **Completed Changes:**

- Created centralized configuration in `src/config.ts`
- Replaced all hardcoded `http://13.233.225.7:8000` URLs with environment variables
- Updated all API service files to use the new configuration
- Created `.env.example` template file
- Updated all pages that make API calls

✅ **New API URL:** `https://namotrader.live`

✅ **Environment Variable:** `NEXT_PUBLIC_API_BASE_URL=https://namotrader.live`
