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
      {
        protocol: 'https',
        hostname: 'rbeycnmjjpllhhovunup.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
