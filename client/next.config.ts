import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const API_URL = process.env.SERVER_API_URL || (process.env.VERCEL ? "" : process.env.NEXT_PUBLIC_EXPRESS_URL || "http://api:8000");
if (API_URL && process.env.VERCEL && !API_URL.startsWith("https://")) {
  throw new Error("SERVER_API_URL must be an HTTPS backend URL on Vercel");
}

const nextConfig: NextConfig = {
  output: "standalone",

  async headers() {
    const privatePaths = [
      "/Adminpage/:path*", "/Instructor/:path*", "/Profile",
      "/Payment/:path*", "/auth/:path*", "/Courses/:courseId/Lesson/:lessonId",
    ];
    return [
      ...privatePaths.map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] })),
      ...(process.env.VERCEL_ENV === "preview"
        ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]
        : []),
    ];
  },

  async rewrites() {
    if (!API_URL) return [];
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
