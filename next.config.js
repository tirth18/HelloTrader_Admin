/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
};

module.exports = nextConfig; 