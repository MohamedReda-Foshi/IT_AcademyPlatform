import type { MetadataRoute } from "next";
import { fetchAllCourseFromExpr } from "./lib/api/coures";
import { siteUrl } from "./lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/Courses", "/About", "/Book", "/Contact"];
  const courses = await fetchAllCourseFromExpr();

  return [
    ...pages.map((path) => ({ url: new URL(path, siteUrl).toString() })),
    ...courses.filter((course) => course.isPublished).map((course) => ({
      url: new URL(`/Courses/${course.id}`, siteUrl).toString(),
    })),
  ];
}
