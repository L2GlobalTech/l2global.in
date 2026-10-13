import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
    unoptimized: false,
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL ? [{
        protocol: "https" as const,
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
        pathname: "/storage/v1/object/public/**",
      }] : []),
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
