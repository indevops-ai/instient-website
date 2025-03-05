import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-api.instient.ai',
        pathname: '/uploads/**',
      },
    ],
  }
};

export default nextConfig;
