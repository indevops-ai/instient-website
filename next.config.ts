import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.instient.ai', // Production API
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-api.instient.ai', // Development API
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
