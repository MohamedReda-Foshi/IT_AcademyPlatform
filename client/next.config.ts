import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_URL || "http://api:8000";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${API_URL}/api/auth/:path*`,
      },
      {
        source: "/course/:path*",
        destination: `${API_URL}/course/:path*`,
      },
      {
        source: "/chapter/:path*",
        destination: `${API_URL}/chapter/:path*`,
      },
      {
        source: "/user/:path*",
        destination: `${API_URL}/user/:path*`,
      },
      {
        source: "/instructor/:path*",
        destination: `${API_URL}/instructor/:path*`,
      },
      {
        source: "/dashboard/:path*",
        destination: `${API_URL}/dashboard/:path*`,
      },
      {
        source: "/quiz/:path*",
        destination: `${API_URL}/quiz/:path*`,
      },
    ];
  },

  experimental: {
    turbo: {},
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tolustar.com", pathname: "/**" },
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "www.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "www.images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;