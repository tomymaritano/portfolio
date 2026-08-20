import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "@react-pdf/font", "yoga-layout"],
};

export default nextConfig;
