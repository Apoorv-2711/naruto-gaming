/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    remotePatterns: [
      {
        hostname: "s4.anilist.co",
        protocol: "https",
      },
      {
        hostname: "gogocdn.net",
        protocol: "https",
      },
      {
        hostname: "img.flawlessfiles.com",
        protocol: "https",
      },
      {
        hostname: "aniwatch.to",
        protocol: "https",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
