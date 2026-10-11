import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: process.env.VERCEL_ENV === "preview"
        ? "/"
        : ["/Adminpage", "/Instructor", "/Profile", "/Payment", "/auth", "/api/", "/chapter/", "/course/", "/dashboard/", "/instructor/", "/quiz/", "/user/", "/Courses/*/Lesson/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
