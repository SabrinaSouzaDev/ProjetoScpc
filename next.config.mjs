/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_PATH,
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: '*.defensoria.pa.def.br',
      },
    ],
  },
}

export default nextConfig
