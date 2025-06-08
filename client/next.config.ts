import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'tolustar.com',

      },
    ],
    domains: [
      'lh3.googleusercontent.com',
    ]
  },
};

export default withNextVideo(nextConfig);