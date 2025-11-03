/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/3d-model/:path*',
        destination: 'http://localhost:3003/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
