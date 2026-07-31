import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{const url=process.env.NEXT_PUBLIC_SITE_URL||"https://mainak-portfolio-chi.vercel.app";return {rules:{userAgent:"*",allow:"/"},sitemap:`${url}/sitemap.xml`}}
