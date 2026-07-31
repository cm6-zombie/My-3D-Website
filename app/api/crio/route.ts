import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { profile } from "@/lib/profile";

export const revalidate = 900;

type CrioProject = {
  title: string;
  description: string;
  skills: string[];
  date: string;
  category: "Professional Project" | "Mini Project";
  detailsUrl?: string;
  demoUrl?: string;
};

const normalise = (value = "") => value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const unique = <T,>(items: T[]) => [...new Set(items)];
const absoluteUrl = (href: string | undefined, base: string) => {
  if (!href) return undefined;
  try { return new URL(href, base).toString(); } catch { return undefined; }
};

function isProjectHeading(text: string) {
  const value = normalise(text);
  return value && !/^(My Projects|Mini Projects|Skills Acquired|GitHub Contributions|Get in touch)$/i.test(value);
}

function extractProjectsFromDom(html: string, sourceUrl: string): CrioProject[] {
  const $ = cheerio.load(html);
  const projects: CrioProject[] = [];

  // Crio has changed its markup more than once. Search all likely project title headings,
  // then walk upward to the smallest useful card-like container.
  $("h2, h3, h4, [class*='project'] h1, [class*='project'] h2, [class*='project'] h3").each((_, heading) => {
    const title = normalise($(heading).text());
    if (!isProjectHeading(title)) return;

    let container = $(heading).closest("article, li, [class*='project-card'], [class*='ProjectCard'], [class*='projectItem'], [class*='project-item']");
    if (!container.length) container = $(heading).parent();
    if (!container.length) return;

    const allText = normalise(container.text());
    if (allText.length < title.length + 3) return;

    const links = container.find("a").map((_, a) => ({
      text: normalise($(a).text()),
      href: absoluteUrl($(a).attr("href"), sourceUrl)
    })).get();

    const detailsUrl = links.find(l => /project details/i.test(l.text))?.href;
    const demoUrl = links.find(l => /view demo/i.test(l.text))?.href;

    const dateCandidate = container.find("time, [class*='date'], [class*='duration']").first().text();
    const dateFromText = allText.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(?:-|–|to)?\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?[a-z]*\s*\d{4}/i)?.[0];
    const date = normalise(dateCandidate || dateFromText || "Crio");

    const altSkills = container.find("img[alt]").map((_, img) => normalise($(img).attr("alt") || "")).get();
    const chipSkills = container.find("[class*='skill'], [class*='tag'], [class*='chip'], [class*='badge']")
      .map((_, node) => normalise($(node).text())).get();
    const skills = unique([...altSkills, ...chipSkills])
      .filter(s => s && s.length <= 45 && !/image|project|view|details|demo/i.test(s))
      .slice(0, 20);

    // Prefer paragraph/list content and remove UI labels from the fallback text.
    const structuredDescription = container.find("p, li").map((_, node) => normalise($(node).text())).get()
      .filter(t => t && t !== title && !skills.includes(t));
    let description = normalise(structuredDescription.join(" "));
    if (!description) {
      description = allText
        .replace(title, "")
        .replace(date, "")
        .replace(/View Project Details/gi, "")
        .replace(/View Demo/gi, "");
      for (const skill of skills) description = description.replaceAll(skill, "");
      description = normalise(description);
    }

    const previousSection = $(heading).prevAll("h2, h3").first().text();
    const category = /mini projects/i.test(previousSection) || container.parents().filter((_, n) => /mini projects/i.test($(n).text().slice(0, 80))).length
      ? "Mini Project" : "Professional Project";

    projects.push({
      title,
      description: description.slice(0, 1600),
      skills,
      date,
      category,
      detailsUrl,
      demoUrl
    });
  });

  return projects;
}

function walkJson(value: unknown, sourceUrl: string, result: CrioProject[]) {
  if (Array.isArray(value)) {
    value.forEach(v => walkJson(v, sourceUrl, result));
    return;
  }
  if (!value || typeof value !== "object") return;

  const obj = value as Record<string, unknown>;
  const title = normalise(String(obj.title || obj.name || obj.projectName || ""));
  const description = normalise(String(obj.description || obj.summary || obj.projectDescription || ""));
  const rawSkills = obj.skills || obj.technologies || obj.tags || obj.skillList;
  const skills = Array.isArray(rawSkills)
    ? unique(rawSkills.map(v => normalise(typeof v === "string" ? v : String((v as any)?.name || ""))).filter(Boolean))
    : [];

  if (title && (description || skills.length) && !/portfolio|skills acquired|github contributions/i.test(title)) {
    result.push({
      title,
      description: description.slice(0, 1600),
      skills: skills.slice(0, 20),
      date: normalise(String(obj.date || obj.duration || obj.timeline || obj.completedAt || "Crio")),
      category: /mini/i.test(String(obj.type || obj.category || "")) ? "Mini Project" : "Professional Project",
      detailsUrl: absoluteUrl(String(obj.detailsUrl || obj.projectUrl || obj.url || ""), sourceUrl),
      demoUrl: absoluteUrl(String(obj.demoUrl || obj.liveUrl || ""), sourceUrl)
    });
  }

  Object.values(obj).forEach(v => walkJson(v, sourceUrl, result));
}

function extractProjectsFromEmbeddedJson(html: string, sourceUrl: string): CrioProject[] {
  const $ = cheerio.load(html);
  const projects: CrioProject[] = [];
  $("script[type='application/ld+json'], script#__NEXT_DATA__, script[type='application/json']").each((_, script) => {
    try { walkJson(JSON.parse($(script).text()), sourceUrl, projects); } catch { /* ignore malformed data */ }
  });
  return projects;
}

function deduplicate(projects: CrioProject[]) {
  const map = new Map<string, CrioProject>();
  for (const project of projects) {
    const key = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (!key || key.length < 3) continue;
    const existing = map.get(key);
    if (!existing || project.description.length > existing.description.length) map.set(key, project);
  }
  return [...map.values()];
}

export async function GET() {
  const url = process.env.CRIO_PORTFOLIO_URL || profile.links.crio;
  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/json",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });
    if (!response.ok) throw new Error(`Crio request failed with ${response.status}`);

    const html = await response.text();
    const projects = deduplicate([
      ...extractProjectsFromEmbeddedJson(html, url),
      ...extractProjectsFromDom(html, url)
    ]);

    return NextResponse.json({
      source: url,
      projects: projects.length ? projects : profile.fallbackProjects,
      projectCount: projects.length,
      live: projects.length > 0,
      syncedAt: new Date().toISOString(),
      warning: projects.length ? undefined : "Crio returned a page, but no project cards could be extracted. Showing resume-backed projects."
    });
  } catch (error) {
    return NextResponse.json({
      source: url,
      projects: profile.fallbackProjects,
      projectCount: 0,
      live: false,
      syncedAt: new Date().toISOString(),
      warning: "Showing resume-backed projects because Crio blocked or failed automated retrieval.",
      error: error instanceof Error ? error.message : "Unknown Crio sync error"
    });
  }
}
