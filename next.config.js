/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 's4.anilist.co',
            protocol: 'https',
          },
        ],
      },
};

module.exports = nextConfig;
