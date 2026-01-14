/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow builds to proceed locally even if there are ESLint/type errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        // All HTML routes should not be cached during local development
        source: '/((?!_next/static|_next/image|favicon|public).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
