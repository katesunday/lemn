import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/lemn',
  assetPrefix: '/lemn/',
  exportTrailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
