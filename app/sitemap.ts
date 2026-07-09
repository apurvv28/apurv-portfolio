import { MetadataRoute } from "next";
import { listBlogs } from "@/lib/blog-storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://apurvv.me";

  // Static routes
  const routes = [
    "",
    "/resume",
    "/blogs"
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Dynamic blog routes
  try {
    const blogs = await listBlogs({ includeDrafts: false });
    const blogRoutes = blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    return routes;
  }
}
