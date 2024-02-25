/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/new',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
