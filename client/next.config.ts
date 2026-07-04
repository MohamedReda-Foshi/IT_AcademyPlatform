// import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
=======
  output: "standalone",

>>>>>>> fadeac95cddd5dafc8550b362a042a357e7515b7
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
<<<<<<< HEAD
      {protocol: "https" , hostname: "images.unsplash.com"}
=======
      { protocol: "https", hostname: "www.images.unsplash.com", pathname: "/**" },      
>>>>>>> fadeac95cddd5dafc8550b362a042a357e7515b7
    ],
  },
};

export default nextConfig;