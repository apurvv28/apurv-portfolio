import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://apurvv.me";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin-login",
        "/admin/dashboard",
        "/api/"
      ]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
