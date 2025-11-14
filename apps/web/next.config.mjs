import { withNx } from '@nx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@schema-ui/shared',
    '@schema-ui/sanity',
    '@schema-ui/ui',
    '@schema-ui/blocks',
    '@schema-ui/layout',
  ],
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
    qualities: [100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default withNx(nextConfig);