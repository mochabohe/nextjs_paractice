/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '/plus-assets/**',
      },
    ],
  },
}

export default nextConfig
