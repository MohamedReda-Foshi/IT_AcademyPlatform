import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tolustar.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.amazon.com',
        pathname: '**',
      }
    ],
    // Optional: only needed if using older image config
    domains: ['m.media-amazon.com', 'lh3.googleusercontent.com','amazon.com'],
  },
};

export default withNextVideo(nextConfig);
