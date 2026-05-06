import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/verticals",
        destination: "/system",
        permanent: true,
      },
      {
        source: "/media",
        destination: "/education",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
