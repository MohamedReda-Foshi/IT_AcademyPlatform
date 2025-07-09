// next.config.ts
import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tolustar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.amazon.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextVideo(nextConfig);
