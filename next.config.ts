import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/Porfolio",
  assetPrefix: "/Porfolio/",
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
// import type { NextConfig } from "next";
// import type { Configuration } from "webpack";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   output: "export",
//   basePath: "/my-portfolio",
//   assetPrefix: "/my-portfolio/",
//   experimental: {
//     optimizePackageImports: ["@heroicons/react"],
//   },
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
//   webpack(config: Configuration) {
//     config.module?.rules?.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
//   // Force correct HTML paths
//   exportPathMap: async function () {
//     return {
//       "/": { page: "/" },
//       "/archive": { page: "/archive" },
//       "/blog": { page: "/blog" },
//       "/projects": { page: "/projects" },
//     };
//   },
// };

// export default nextConfig;