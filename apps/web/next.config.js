/** @type {import('next').NextConfig} */
const { version } = require("./package.json");
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  basePath: "/linkwarden",
  i18n,
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      // For profile pictures (Google OAuth)
      { hostname: "*.googleusercontent.com" },
      // Allow images from pomentorship.com domain
      { 
        protocol: 'https',
        hostname: 'pomentorship.com',
        pathname: '/linkwarden/**',
      },
      { 
        protocol: 'http',
        hostname: 'pomentorship.com',
        pathname: '/linkwarden/**',
      },
    ],

    minimumCacheTTL: 10,
  },
  transpilePackages: ["@linkwarden/prisma"],
  env: {
    version,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
