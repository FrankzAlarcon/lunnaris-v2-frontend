/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lunnarisv2-dev-nmmm.1.us-1.fl0.io',
        port: '',
        pathname: '/api/file/**',
      }
    ]
  }
}

module.exports = nextConfig
