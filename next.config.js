/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
    missingSuspenseWithCSRBailout: false,
  },
  skipTrailingSlashRedirect: true,
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
  // Disable WebSocket connections by adding these headers
  async headers() {
    return [
      {
        source: '/api/ws/:path*',
        headers: [
          { key: 'Connection', value: 'close' },
        ],
      },
    ];
  },
  // Configure page generation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable static optimization where possible
  poweredByHeader: false,
  // Configure build output
  distDir: '.next',
  // Configure webpack
  webpack: (config, { dev, isServer }) => {
    // Add any webpack customizations here
    return config;
  },
  // Disable static generation for pages that need client-side features
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
  },
};

module.exports = nextConfig; 
