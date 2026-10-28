import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/smart-career-",
  assetPrefix: "/smart-career-/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
