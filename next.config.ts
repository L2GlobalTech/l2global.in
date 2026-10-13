import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/services/oracle-consulting-managed-servicesss', destination: '/services/oracle-consulting-managed-services', permanent: true },
      { source: '/services/oracle-managed-services', destination: '/services/oracle-consulting-managed-services', permanent: true },
      {
        source: '/blogs/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
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
