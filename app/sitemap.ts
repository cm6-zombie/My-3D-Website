import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const url=process.env.NEXT_PUBLIC_SITE_URL||"https://mainak-portfolio-chi.vercel.app";return [{url,lastModified:new Date(),changeFrequency:"weekly",priority:1}]}
