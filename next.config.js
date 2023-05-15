/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
        port: '',
        pathname: '/thumb/**',
      },
    ],
  },
};

module.exports = nextConfig;
