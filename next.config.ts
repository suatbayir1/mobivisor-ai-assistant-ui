import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  serverExternalPackages: ['@react-pdf/renderer'],
  turbopack: {
    resolveAlias: {
      canvas: './empty-module.ts',
    },
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_CHAT_API_BASE_URL
  }
};

export default nextConfig;
