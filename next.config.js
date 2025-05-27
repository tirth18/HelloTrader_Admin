/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
    skipTrailingSlashRedirect: true,
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  // Add redirects
  async redirects() {
    return [
      {
        source: '/bank-details',
        destination: '/banking',
        permanent: false,
      },
      {
        source: '/withdrawal-requests',
        destination: '/banking/withdrawal-requests',
        permanent: false,
      },
      {
        source: '/create-withdrawal',
        destination: '/banking/create-withdrawal',
        permanent: false,
      },
    ];
  },
  // Configure build output
  output: 'standalone',
  // Skip failed page errors for production build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Handle static generation errors gracefully
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;