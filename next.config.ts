import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/industries/healthcare',
        destination: '/industries/health-care',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    unoptimized: true,   // <<— important
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
