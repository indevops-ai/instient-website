import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.instient.ai',
        pathname: '/uploads/**',
      },
    ],
  }
};

export default nextConfig;
