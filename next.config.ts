import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "@react-pdf/font", "yoga-layout"],
  async redirects() {
    return [{ source: "/writing/devwibar-tls", destination: "/work/devwifi", permanent: true }];
  },
};

export default nextConfig;
