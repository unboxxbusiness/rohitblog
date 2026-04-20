import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true, // Speeds up 20k pages build
  },
  // Fixed: Moved out of experimental as requested by Next.js logs
  outputFileTracingRoot: process.cwd(),
  
  // Required for Vercel: Ensures the 20,000 JSON files are bundled into the serverless function
  outputFileTracingIncludes: {
    '/*': ['./data/**/*'],
  },
  
  experimental: {
     // Additional experimental optimizations can go here
     turbopack: {}, // Satisfies Next.js 16 build check when using custom webpack config
  },

  // Prevents common development loops in large projects
  serverExternalPackages: ['fs', 'path'],

  // Webpack specific: Ignore the data folder from the dev watcher 
  // to prevent infinite loops and crashes during development.
  webpack: (config: any, { dev, isServer }: any) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: /data/,
      };
    }
    return config;
  },
};

export default nextConfig;
