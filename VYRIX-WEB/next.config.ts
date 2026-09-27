import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongodb"],
  async rewrites() {
    return [
      {
        source: '/upes',
        destination: '/downloads-upes',
      },
    ]
  },
};

export default nextConfig;
