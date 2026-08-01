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
  githubUrl?: string;
};

const normalise = (value = "") => value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const unique = <T,>(items: T[]) => [...new Set(items)];
const absoluteUrl = (href: string | undefined, base: string) => {
  if (!href) return undefined;
  try { return new URL(href, base).toString(); } catch { return undefined; }
};

function projectKey(title: string) {
  return normalise(title)
    .toLowerCase()
    .replace(/\b(qa|automation|automated|project|professional|mini|application)\b/g, " ")
    .replace(/[^a-z0-9]+/g, "") || title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function isProjectHeading(text: string) {
  const value = normalise(text);
  return Boolean(value) && !/^(My Projects|Mini Projects|Skills Acquired|GitHub Contributions|Get in touch|Overview)$/i.test(value);
}

function inferCategory($: cheerio.CheerioAPI, heading: any, container: any): CrioProject["category"] {
  const priorHeadings = $(heading).prevAll("h1,h2,h3,h4").map((_, node) => normalise($(node).text())).get();
  if (priorHeadings.some((text) => /^Mini Projects$/i.test(text))) return "Mini Project";
  const nearby = normalise(container.parent().text().slice(0, 160));
  return /mini projects/i.test(nearby) ? "Mini Project" : "Professional Project";
}

function extractProjectFromContainer($: cheerio.CheerioAPI, heading: any, sourceUrl: string): CrioProject | null {
  const title = normalise($(heading).text());
  if (!isProjectHeading(title)) return null;

  let container = $(heading).closest("article, li, section, [class*='project-card'], [class*='ProjectCard'], [class*='projectItem'], [class*='project-item'], [class*='card']");
  if (!container.length) container = $(heading).parent();
  if (!container.length) return null;

  const links = container.find("a[href]").map((_, a) => ({
    text: normalise($(a).text()),
    href: absoluteUrl($(a).attr("href"), sourceUrl)
  })).get();

  const detailsUrl = links.find((link) => /project details|view details/i.test(link.text))?.href;
  const demoUrl = links.find((link) => /view demo|live demo/i.test(link.text))?.href;
  const githubUrl = links.find((link) => /github/i.test(link.text) || /github\.com/i.test(link.href || ""))?.href;

  const allText = normalise(container.text());
  const date = normalise(
    container.find("time, [class*='date'], [class*='duration']").first().text() ||
    allText.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(?:-|–|to)?\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?[a-z]*\s*\d{4}/i)?.[0] ||
    "Crio"
  );

  const altSkills = container.find("img[alt]").map((_, img) => normalise($(img).attr("alt") || "")).get();
  const chipSkills = container.find("[class*='skill'], [class*='tag'], [class*='chip'], [class*='badge']")
    .map((_, node) => normalise($(node).text())).get();
  const skills = unique([...altSkills, ...chipSkills])
    .filter((skill) => skill && skill.length <= 48 && !/image|project|view|details|demo|professional|mini/i.test(skill))
    .slice(0, 24);

  const paragraphs = container.find("p, li").map((_, node) => normalise($(node).text())).get()
    .filter((text) => text && text !== title && text !== date && !skills.includes(text) && !/view project details|view demo/i.test(text));
  let description = normalise(paragraphs.join(" "));
  if (!description) {
    description = allText.replace(title, "").replace(date, "")
      .replace(/View Project Details|View Details|View Demo|Live Demo/gi, "");
    skills.forEach((skill) => { description = description.replaceAll(skill, ""); });
    description = normalise(description);
  }

  return {
    title,
    description: description.slice(0, 1800),
    skills,
    date,
    category: inferCategory($, heading, container),
    detailsUrl,
    demoUrl,
    githubUrl
  };
}

function extractProjectsFromDom(html: string, sourceUrl: string): CrioProject[] {
  const $ = cheerio.load(html);
  const projects: CrioProject[] = [];
  const selectors = [
    "h2", "h3", "h4",
    "[class*='project'] h1", "[class*='project'] h2", "[class*='project'] h3", "[class*='project'] h4",
    "a[href*='/learn/portfolio/']"
  ].join(",");

  $(selectors).each((_, element) => {
    const candidate = $(element).is("a") ? $(element).find("h1,h2,h3,h4").first().get(0) || element : element;
    const project = extractProjectFromContainer($, candidate, sourceUrl);
    if (project) projects.push(project);
  });
  return projects;
}

function walkJson(value: unknown, sourceUrl: string, result: CrioProject[]) {
  if (Array.isArray(value)) { value.forEach((item) => walkJson(item, sourceUrl, result)); return; }
  if (!value || typeof value !== "object") return;

  const object = value as Record<string, unknown>;
  const title = normalise(String(object.title || object.name || object.projectName || ""));
  const description = normalise(String(object.description || object.summary || object.projectDescription || object.overview || ""));
  const rawSkills = object.skills || object.technologies || object.tags || object.skillList;
  const skills = Array.isArray(rawSkills)
    ? unique(rawSkills.map((item) => normalise(typeof item === "string" ? item : String((item as any)?.name || (item as any)?.title || ""))).filter(Boolean))
    : [];

  if (title && (description || skills.length) && !/portfolio|skills acquired|github contributions/i.test(title)) {
    result.push({
      title,
      description: description.slice(0, 1800),
      skills: skills.slice(0, 24),
      date: normalise(String(object.date || object.duration || object.timeline || object.completedAt || "Crio")),
      category: /mini/i.test(String(object.type || object.category || "")) ? "Mini Project" : "Professional Project",
      detailsUrl: absoluteUrl(String(object.detailsUrl || object.projectUrl || object.url || ""), sourceUrl),
      demoUrl: absoluteUrl(String(object.demoUrl || object.liveUrl || ""), sourceUrl),
      githubUrl: absoluteUrl(String(object.githubUrl || object.repositoryUrl || object.repoUrl || ""), sourceUrl)
    });
  }
  Object.values(object).forEach((item) => walkJson(item, sourceUrl, result));
}

function extractProjectsFromEmbeddedJson(html: string, sourceUrl: string): CrioProject[] {
  const $ = cheerio.load(html);
  const projects: CrioProject[] = [];
  $("script[type='application/ld+json'], script#__NEXT_DATA__, script[type='application/json']").each((_, script) => {
    try { walkJson(JSON.parse($(script).text()), sourceUrl, projects); } catch { /* Ignore invalid script data. */ }
  });
  return projects;
}

function mergeProjectRecords(primary: CrioProject, secondary: CrioProject): CrioProject {
  const descriptions = [primary.description, secondary.description].filter(Boolean).sort((a, b) => b.length - a.length);
  return {
    ...secondary,
    ...primary,
    title: primary.title || secondary.title,
    description: descriptions[0] || "Project details are available in the Crio portfolio.",
    skills: unique([...(primary.skills || []), ...(secondary.skills || [])]).slice(0, 24),
    date: [primary.date, secondary.date].find((value) => value && !/^crio$/i.test(value)) || "Crio",
    category: primary.category || secondary.category,
    detailsUrl: primary.detailsUrl || secondary.detailsUrl,
    demoUrl: primary.demoUrl || secondary.demoUrl,
    githubUrl: primary.githubUrl || secondary.githubUrl
  };
}

function parseConfiguredProjects(): CrioProject[] {
  const raw = process.env.CRIO_PROJECTS_JSON;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((project: any) => ({
      title: normalise(String(project.title || project.name || "")),
      description: normalise(String(project.description || project.summary || "")),
      skills: Array.isArray(project.skills) ? unique(project.skills.map((skill: unknown) => normalise(String(skill))).filter(Boolean)) : [],
      date: normalise(String(project.date || "Crio")),
      category: /mini/i.test(String(project.category || "")) ? "Mini Project" : "Professional Project",
      detailsUrl: project.detailsUrl,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl
    })).filter((project: CrioProject) => project.title);
  } catch { return []; }
}

function mergeAll(projectLists: CrioProject[][]) {
  const map = new Map<string, CrioProject>();
  projectLists.flat().forEach((project) => {
    const key = projectKey(project.title);
    const existing = map.get(key);
    map.set(key, existing ? mergeProjectRecords(project, existing) : project);
  });
  return [...map.values()];
}

function fallbackProjects(): CrioProject[] {
  return mergeAll([
    profile.crioFallbackProjects as CrioProject[],
    profile.fallbackProjects.map((project) => ({ ...project, category: "Professional Project" as const }))
  ]);
}

export async function GET() {
  const url = process.env.CRIO_PORTFOLIO_URL || profile.links.crio;
  const configured = parseConfiguredProjects();

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
    const extracted = mergeAll([
      extractProjectsFromEmbeddedJson(html, url),
      extractProjectsFromDom(html, url)
    ]);
    const projects = mergeAll([extracted, configured, fallbackProjects()]);

    return NextResponse.json({
      source: url,
      projects,
      projectCount: projects.length,
      crioProjectCount: extracted.length,
      live: extracted.length > 0,
      syncedAt: new Date().toISOString()
    });
  } catch {
    const projects = mergeAll([configured, fallbackProjects()]);
    return NextResponse.json({
      source: url,
      projects,
      projectCount: projects.length,
      crioProjectCount: 0,
      live: false,
      syncedAt: new Date().toISOString()
    });
  }
}
