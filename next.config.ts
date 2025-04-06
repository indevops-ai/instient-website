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
        hostname: 'api.instient.ai', // Development API
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Allow Cloudinary images
        pathname: '/dsb2l71rb/image/upload/**', // Adjust this if needed
      },
    ],
  },
};

export default nextConfig;
