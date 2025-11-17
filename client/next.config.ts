import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    'API': "http://localhost:8080/api/v1"
  }
};

export default nextConfig;
