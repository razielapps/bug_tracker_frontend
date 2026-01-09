import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // This allows the build to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
