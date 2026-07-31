import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { profile } from "@/lib/profile";

export const revalidate = 900;

export async function GET() {
  const url = process.env.CRIO_PORTFOLIO_URL || profile.links.crio;
  try {
    const response = await fetch(url, { next: { revalidate: 900 }, headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error("Crio request failed");
    const html = await response.text();
    const $ = cheerio.load(html);
    const projects: Array<{title: string; description: string; skills: string[]; date: string}> = [];

    $("h3").each((_, element) => {
      const title = $(element).text().trim();
      if (!title || /My Projects|Mini Projects/i.test(title)) return;
      const container = $(element).closest("div");
      const text = container.text().replace(/\s+/g, " ").trim();
      const skills = container.find("img").map((_, img) => $(img).attr("alt") || "").get().filter(Boolean);
      projects.push({ title, description: text.slice(title.length).trim().slice(0, 420), skills: [...new Set(skills)].slice(0, 12), date: "Crio" });
    });

    return NextResponse.json({ source: url, projects: projects.length ? projects : profile.fallbackProjects, live: projects.length > 0 });
  } catch {
    return NextResponse.json({ source: url, projects: profile.fallbackProjects, live: false, warning: "Showing resume-backed projects because Crio blocked automated retrieval." });
  }
}
