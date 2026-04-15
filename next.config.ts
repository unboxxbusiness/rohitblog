import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true, // Speeds up 20k pages build
  },
  // Required for Vercel: Ensures the 20,000 JSON files are bundled into the serverless function
  // so that ISR can read them on-demand via fs.readFileSync
  outputFileTracingIncludes: {
    '/*': ['./data/**/*'],
  },
};

export default nextConfig;
