import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/verticals",
        destination: "/system",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
