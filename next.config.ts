import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        hostname: 'kinopoiskapiunofficial.tech',
        pathname: '/**',
      },
      { hostname: 'avatars.mds.yandex.net', pathname: '/**' },
    ],
  },
};

export default nextConfig;
