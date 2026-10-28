import type { NextConfig } from "next";

const isGithubActions =
  process.env.GITHUB_ACTIONS?.trim() === "true" ||
  process.env.GITHUB_PAGES?.trim() === "true";

const repoName = "/smart-career-";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? repoName : "",
  assetPrefix: isGithubActions ? `${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
