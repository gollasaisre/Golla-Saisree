import type { NextConfig } from "next";

const isGithubActions =
  process.env.GITHUB_ACTIONS?.trim() === "true" ||
  process.env.GITHUB_PAGES?.trim() === "true";

// Automatically detect the repository name on GitHub Pages, or use empty string for Local / Vercel
const repoName = (isGithubActions && process.env.GITHUB_REPOSITORY)
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
  : "";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  basePath: repoName,
  assetPrefix: repoName ? `${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
