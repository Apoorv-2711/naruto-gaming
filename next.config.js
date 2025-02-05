/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", // Match all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },

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
        hostname: "hianime.to",
        protocol: "https",
      },
      {
        hostname: "cdn.noitatnemucod.net",
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
