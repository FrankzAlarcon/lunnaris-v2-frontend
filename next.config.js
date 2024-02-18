/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lunnarisv2-dev-nmmm.1.us-1.fl0.io',
        port: '',
        pathname: '/api/file/**',
      }, {
        protocol: 'https',
        hostname: 'd2yozbyifqo19k.cloudfront.net',
      }
    ]
  }
}

module.exports = nextConfig
