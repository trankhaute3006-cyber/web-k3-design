import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { flatNav } from "@/data/nav";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Dung flatNav chu KHONG dung mainNav.
   * mainNav la cau truc menu nhieu cap — trang nao nam trong bang xo xuong
   * (vi du Quy trinh) se khong co mat o cap dau, va tung bi rot khoi sitemap.
   * flatNav liet ke phang toan bo trang, khong phu thuoc cach sap xep menu.
   */
  const pages: MetadataRoute.Sitemap = [
    { label: "Trang chủ", href: "/" },
    ...flatNav,
  ].map((item) => ({
    url: `${site.url}${item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/du-an/${p.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/tin-tuc/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projectPages, ...postPages];
}
