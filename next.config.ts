import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'kinopoiskapiunofficial.tech',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
