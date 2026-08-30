"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Award, BarChart3, BriefcaseBusiness, CheckCircle2, ChevronRight,
  Cloud, Code2, Database, Download, ExternalLink, Github, Globe2, Layers3,
  Mail, Menu, MessageCircle, Moon, Search, Send, Server, ShieldCheck,
  Sparkles, Sun, Terminal, TestTube2, Users, X, Zap
} from "lucide-react";
import { profile } from "@/lib/profile";
import ConstellationBackground from "./ConstellationBackground";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
type AnyData = Record<string, any>;

function isSafeProjectRecord(project: AnyData): boolean {
  const title = String(project?.title || "").trim();
  const description = String(project?.description || "").trim();
  const combined = `${title} ${description}`.toLowerCase();

  if (title.length < 2 || title.length > 120) return false;

  const cssSignals = [
    ".css-", "--chakra-", "-webkit-", "-moz-", "display:",
    "background:", "border-radius:", "font-size:", "align-items:",
    "justify-content:", "transition-property:", "padding-inline",
    "appearance:"
  ];

  const signalCount = cssSignals.reduce(
    (count, signal) => count + (combined.includes(signal) ? 1 : 0),
    0
  );

  if ((combined.includes("{") && combined.includes("}")) || signalCount >= 2) return false;
  if (/^(about|skills|experience|projects|certifications|contact|portfolio)$/i.test(title)) return false;

  return true;
}

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: 0.55 } };

const STARRED_PROJECT: AnyData = {
  title: "Semantic Job Matcher",
  date: "Aug 2026",
  category: "Featured AI Project",
  featured: true,
  starred: true,
  description: "Production multi-source semantic job-matching pipeline that builds a reusable resume profile, collects live jobs from public and official sources, normalizes them into one schema, calculates explainable semantic match scores, and sends batched email alerts for qualifying opportunities while suppressing duplicate notifications.",
  scope: [
    "Aggregates jobs from Remote OK, ATS APIs, official company career portals, and LinkedIn/Naukri job-alert emails.",
    "Ranks opportunities using sentence-transformer embeddings, cosine similarity, skill coverage, title alignment, and experience fit.",
    "Runs automatically with GitHub Actions, isolates source failures, and persists notification state to prevent duplicate alerts.",
    "Sends one Gmail notification batch for new jobs meeting the configurable match threshold, with an 80% production default."
  ],
  skills: [
    "Python", "Sentence Transformers", "Semantic Search", "Cosine Similarity", "GitHub Actions",
    "Greenhouse API", "Lever API", "Ashby API", "SmartRecruiters", "Workday", "IMAP", "SMTP"
  ],
  githubUrl: "https://github.com/cm6-zombie/semantic-job-matcher"
};

const SKILL_ALIASES: Record<string, string> = {
  "selenium": "Selenium WebDriver",
  "selenium webdriver": "Selenium WebDriver",
  "pom": "Page Object Model",
  "page object model (pom)": "Page Object Model",
  "oop": "Object-Oriented Programming",
  "object oriented programming": "Object-Oriented Programming",
  "object-oriented programming (oop)": "Object-Oriented Programming",
  "xpath": "XPath",
  "dynamic xpath": "Dynamic XPath",
  "explicit wait": "Explicit Waits",
  "implicit wait": "Implicit Waits",
  "fluent wait": "Fluent Waits",
  "waits": "Wait Strategies",
  "javascript executor": "JavaScript Executor",
  "js executor": "JavaScript Executor",
  "webdrivermanager": "WebDriverManager",
  "data driven testing": "Data-Driven Testing",
  "data-driven testing": "Data-Driven Testing",
  "end to end testing": "End-to-End Testing",
  "end-to-end testing": "End-to-End Testing",
  "ui automation": "UI Testing",
  "ms sql server": "Microsoft SQL Server",
  "sql server": "Microsoft SQL Server"
};

function cleanSkill(value: unknown): string | null {
  const raw = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!raw || raw.length > 60) return null;
  const lower = raw.toLowerCase();
  if ([".css-", "--chakra-", "-webkit-", "display:", "background:", "{" , "}"].some(signal => lower.includes(signal))) return null;
  return SKILL_ALIASES[lower] || raw;
}

function mergeUniqueSkills(base: string[], discovered: string[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  for (const value of [...base, ...discovered]) {
    const skill = cleanSkill(value);
    if (!skill) continue;
    const key = skill.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(skill);
    }
  }
  return result;
}

function classifyCrioSkills(projects: AnyData[]) {
  const categories: Record<string, string[]> = {
    programming: [], qa: [], apiBackend: [], machineLearning: [], databases: [], cloudReliability: [], webAi: [], engineering: [], webAutomation: [], softwareEngineering: []
  };
  const push = (category: keyof typeof categories, skill: string) => categories[category].push(skill);
  for (const project of projects) {
    for (const rawSkill of Array.isArray(project?.skills) ? project.skills : []) {
      const skill = cleanSkill(rawSkill); if (!skill) continue;
      const lower = skill.toLowerCase();
      if (/window handling|frame|alert|actions class|javascript executor|dynamic date|dynamic time/.test(lower)) {
        push("webAutomation", skill);
      } else if (/sentence transformer|embedding|semantic|cosine|ranking|scoring|resume parsing/.test(lower)) {
        push("machineLearning", skill);
      } else if (/rest api|api integration|next\.js api|json|normalization|caching|fallback|validation|error handling|gmail integration/.test(lower)) {
        push("apiBackend", skill);
      } else if (/selenium|testng|pytest|junit|page object|page factory|data-driven|functional testing|regression|smoke testing|ui testing|end-to-end|cross-browser|assertion|extent report|webdriver|apache poi|test listener|xpath|wait|dynamic element/.test(lower)) {
        push("qa", skill);
      } else if (/mysql|microsoft sql|sql server/.test(lower)) {
        push("databases", skill);
      } else if (/aws|ec2|iam|cloudwatch|cloudformation|terraform|ansible|s3|vpc|linux|rca|production monitoring|release validation/.test(lower)) {
        push("cloudReliability", skill);
        push("cloud", skill);
      } else if (/next\.js|react|three|framer|copilot|vercel|seo|analytics/.test(lower)) {
        push("webAi", skill);
      } else if (/object-oriented|unit testing|debugging|exception handling|collections|file handling/.test(lower)) {
        push("softwareEngineering", skill);
      } else if (/git|github actions|github|gradle|docker|oop|agile|scrum|stlc/.test(lower)) {
        push("engineering", skill);
      } else if (/java|python|typescript|javascript|sql|maven|json|rest api/.test(lower)) {
        push("programming", skill);
      } else if (/servicenow|incident|problem management|rca|sla|release|lms|hrms|data migration|audit|sop/.test(lower)) {
        push("operations", skill);
      }
    }
  }
  return Object.fromEntries(Object.entries(categories).map(([key, values]) => [key, mergeUniqueSkills([], values)])) as Record<keyof typeof categories, string[]>;
}

export default function Portfolio() {
  const [github, setGithub] = useState<AnyData>({});
  const [leetcode, setLeetcode] = useState<AnyData>({});
  const [crio, setCrio] = useState<AnyData>({ projects: [...profile.crioFallbackProjects, ...profile.fallbackProjects] });
  const [config, setConfig] = useState<AnyData>({ resumeUrl: profile.links.resume });
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileNav, setMobileNav] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: "Ask about Mainak's test automation, Python/Java projects, APIs, semantic search, AWS/Linux background, or experience." }]);
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const refreshMs = Number(process.env.NEXT_PUBLIC_REFRESH_MS || 300000);

  async function load() {
    const results = await Promise.allSettled([
      fetch("/api/github").then(r => r.json()),
      fetch("/api/leetcode").then(r => r.json()),
      fetch("/api/crio").then(r => r.json()),
      fetch("/api/config").then(r => r.json())
    ]);
    if (results[0].status === "fulfilled") setGithub(results[0].value);
    if (results[1].status === "fulfilled") setLeetcode(results[1].value);
    if (results[2].status === "fulfilled") setCrio(results[2].value);
    if (results[3].status === "fulfilled") setConfig(results[3].value);
  }

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const initial = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    load();
    const id = window.setInterval(load, refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  }

  async function ask() {
    if (!question.trim() || thinking) return;
    const q = question.trim();
    setMessages(m => [...m, { role: "user", text: q }]);
    setQuestion(""); setThinking(true);
    try {
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) });
      const j = await r.json();
      setMessages(m => [...m, { role: "assistant", text: j.answer || "I could not answer that from the portfolio data." }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "The assistant is temporarily unavailable." }]);
    } finally { setThinking(false); }
  }

  const totals = useMemo(() => Object.fromEntries((leetcode.breakdown || []).map((x: any) => [x.difficulty, x.count])), [leetcode]);
  const allProjects = useMemo(() => {
    const syncedProjects = Array.isArray(crio.projects) ? crio.projects : [...profile.crioFallbackProjects, ...profile.fallbackProjects];
    const source = [STARRED_PROJECT, ...syncedProjects.filter((project: any) => String(project?.title || "").trim().toLowerCase() !== "semantic job matcher")];
    return source.filter(isSafeProjectRecord).sort((a: any, b: any) =>
      Number(Boolean(b.starred)) - Number(Boolean(a.starred)) ||
      Number(isFeaturedProject(b.title)) - Number(isFeaturedProject(a.title))
    );
  }, [crio.projects]);
  const crioSkillCategories = useMemo(() => classifyCrioSkills(allProjects), [allProjects]);
  const displayedSkills = useMemo(() => ({
    programming: mergeUniqueSkills(["Java","Python","TypeScript","SQL / T-SQL"], crioSkillCategories.programming),
    qa: mergeUniqueSkills(["Selenium WebDriver","TestNG","pytest","Page Object Model (POM)","Apache POI","Data-Driven Testing","XPath","Assertions","Explicit Waits","Test Listeners"], crioSkillCategories.qa),
    apiBackend: mergeUniqueSkills(["REST APIs","Next.js API Routes","JSON","API Integration","Data Validation","Error Handling","Data Normalization","Caching","Fallback Strategies"], crioSkillCategories.apiBackend),
    machineLearning: mergeUniqueSkills(["Sentence Transformers","Text Embeddings","Semantic Search","Cosine Similarity","Ranking & Scoring Algorithms","Resume Parsing"], crioSkillCategories.machineLearning),
    databases: mergeUniqueSkills(["MySQL","Microsoft SQL Server"], crioSkillCategories.databases),
    cloudReliability: mergeUniqueSkills(["AWS EC2","IAM","CloudWatch","S3","VPC","Linux","Debugging","Root Cause Analysis (RCA)","Production Monitoring","Release Validation"], crioSkillCategories.cloudReliability),
    webAi: mergeUniqueSkills(["Next.js","React","Microsoft Copilot Studio"], crioSkillCategories.webAi),
    engineering: mergeUniqueSkills(["Git","GitHub Actions","Gradle","OOP","Agile / Scrum","STLC"], crioSkillCategories.engineering),
    webAutomation: crioSkillCategories.webAutomation,
    softwareEngineering: crioSkillCategories.softwareEngineering
  }), [crioSkillCategories]);
  const projectFilters = ["All", "Featured", "Python", "Java", "Selenium", "API", "Semantic Search", "AWS", "AI"];
  const filteredProjects = useMemo(() => allProjects.filter((p: any) => {
    const haystack = [p.title, p.description, p.category, ...(p.skills || [])].filter(Boolean).join(" ").toLowerCase();
    const matchesSearch = !projectSearch.trim() || haystack.includes(projectSearch.trim().toLowerCase());
    const filter = projectFilter.toLowerCase();
    const matchesFilter = projectFilter === "All" ||
      (projectFilter === "Featured" && (p.starred || isFeaturedProject(p.title))) ||
      (projectFilter === "Professional" && /professional/i.test(p.category || "")) ||
      (projectFilter === "Mini" && /mini/i.test(p.category || "")) || haystack.includes(filter);
    return matchesSearch && matchesFilter;
  }), [allProjects, projectSearch, projectFilter]);

  const navItems = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

  return <main>
    <ConstellationBackground/>
    <nav className="nav glass">
      <a className="brand" href="#top" aria-label="Mainak Chandra home">MC<span>.</span></a>
      <div className="navlinks">{navItems.map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div>
      <div className="nav-actions">
        <a className="nav-email" href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail size={16}/><span>{profile.email}</span></a>
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle colour theme">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <a className="nav-resume" href={config.resumeUrl} target="_blank" rel="noreferrer">Resume <ArrowRight size={15}/></a>
        <button className="icon-button mobile-menu" onClick={() => setMobileNav(v => !v)} aria-label="Open navigation"><Menu size={20}/></button>
      </div>
    </nav>
    <AnimatePresence>{mobileNav && <motion.div className="mobile-nav glass" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{navItems.map(x => <a key={x} onClick={() => setMobileNav(false)} href={`#${x.toLowerCase()}`}>{x}<ChevronRight size={16}/></a>)}<a className="mobile-email" onClick={() => setMobileNav(false)} href={`mailto:${profile.email}`}><span><Mail size={16}/> {profile.email}</span><ChevronRight size={16}/></a></motion.div>}</AnimatePresence>

    <section id="top" className="hero">
      <motion.div className="hero-copy" initial={{opacity:0,x:-42}} animate={{opacity:1,x:0}} transition={{duration:.8}}>
        <div className="availability"><span/> Open to SDET, Software Test Engineer and QA Automation opportunities</div>
        <p className="eyebrow">BUILD · TEST · AUTOMATE · RELIABILITY</p>
        <h1>Engineering quality.<br/><span>Owning reliability.</span></h1>
        <h2>{profile.name} — {profile.title}</h2>
        <p className="hero-summary">{profile.summary}</p>
        <div className="actions">
          <a className="primary" href="#projects">Explore my work <ArrowRight size={18}/></a>
          <a href={config.resumeUrl} target="_blank" rel="noreferrer"><Download size={18}/> Download résumé</a>
        </div>
        <div className="social-row">
          <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer"><Code2 size={17}/> LeetCode</a>
          <a href={profile.links.crio} target="_blank" rel="noreferrer"><Globe2 size={17}/> Crio</a>
        </div>
      </motion.div>
      <motion.div className="scene-wrap" initial={{opacity:0,scale:.86}} animate={{opacity:1,scale:1}} transition={{duration:1}}>
        <div className="scene"><Scene/></div>
        <div className="floating-card fc-one"><TestTube2 size={18}/><div><b>Test Automation</b><span>Java · Python · Selenium · pytest</span></div></div>
        <div className="floating-card fc-two"><Cloud size={18}/><div><b>Software & Reliability</b><span>APIs · Semantic Search · AWS · Linux</span></div></div>
        <div className="scene-hint">Drag to explore the 3D skills world</div>
      </motion.div>
    </section>

    <section className="trust-strip">
      <div><b>7</b><span>Years engineering experience</span></div><div><b>95%</b><span>Reporting effort reduced</span></div><div><b>350,000+</b><span>Learner accounts validated</span></div><div><b>3</b><span>Production-grade portfolio projects</span></div>
    </section>

    <section id="about" className="section split-section">
      <motion.div {...reveal}><p className="eyebrow">ABOUT ME</p><h2>Engineering across test automation, software delivery, and production reliability.</h2></motion.div>
      <motion.div className="about-copy" {...reveal}><p>{profile.summary}</p><div className="about-points"><span><CheckCircle2/> Java, Python and Selenium automation</span><span><CheckCircle2/> APIs, semantic search and software projects</span><span><CheckCircle2/> AWS/Linux production reliability</span><span><CheckCircle2/> Release validation and structured RCA</span></div></motion.div>
    </section>

    <section id="stats" className="metrics">
      <Metric icon={<Github/>} label="GitHub repositories" value={github.user?.publicRepos ?? "—"} sub={`${github.user?.followers ?? 0} followers`}/>
      <Metric icon={<Code2/>} label="LeetCode solved" value={leetcode.accepted ?? "—"} sub={`${leetcode.acceptanceRate ?? "—"}% acceptance`}/>
      <Metric icon={<BriefcaseBusiness/>} label="Professional experience" value="7+" sub="years across automation & reliability"/>
      <Metric icon={<BarChart3/>} label="Annual contributions" value={github.contributions?.totalContributions ?? "—"} sub={github.contributionsConfigured ? "Live GitHub activity" : "Contribution data available when connected"}/>
    </section>

    <section id="skills" className="section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">CORE CAPABILITIES</p><h2>Skills aligned to software testing, backend integration and reliability engineering.</h2></div><p>Resume-aligned capabilities across programming, automation, APIs, semantic search, cloud reliability, and modern web engineering—with Crio skills merged dynamically.</p></motion.div>
      <div className="skill-category-grid">
        <SkillCard icon={<Terminal/>} title="Programming Languages" items={displayedSkills.programming}/>
        <SkillCard icon={<TestTube2/>} title="Test Automation" items={displayedSkills.qa}/>
        <SkillCard icon={<Server/>} title="API & Backend" items={displayedSkills.apiBackend}/>
        <SkillCard icon={<Sparkles/>} title="Machine Learning & Semantic Search" items={displayedSkills.machineLearning}/>
        <SkillCard icon={<Database/>} title="Databases" items={displayedSkills.databases}/>
        <SkillCard icon={<Cloud/>} title="Cloud, Systems & Reliability" items={displayedSkills.cloudReliability}/>
        <SkillCard icon={<Globe2/>} title="Web Engineering & AI Platforms" items={displayedSkills.webAi}/>
        <SkillCard icon={<Layers3/>} title="Build, CI/CD & Engineering Practices" items={displayedSkills.engineering}/>
        {displayedSkills.webAutomation.length > 0 && <SkillCard icon={<Zap/>} title="Additional Web Automation" items={displayedSkills.webAutomation}/>} 
        {displayedSkills.softwareEngineering.length > 0 && <SkillCard icon={<Code2/>} title="Additional Software Engineering" items={displayedSkills.softwareEngineering}/>}
      </div>
    </section>

    <section id="experience" className="section experience-section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">CAREER JOURNEY</p><h2>Experience shaped by ownership.</h2></div><p>From AWS/Linux systems engineering at TCS to large-scale validation, release assurance, RCA and AI automation at PwC.</p></motion.div>
      <div className="timeline">{profile.experience.map((e, i) => <motion.article className="timeline-item" key={e.company} {...reveal}>
        <div className="timeline-marker"><span>{String(i+1).padStart(2,"0")}</span></div>
        <div className="timeline-card glass">
          <div className="timeline-top"><div><p className="role">{e.role}</p><h3>{e.company}</h3></div><span className="period">{e.period}</span></div>
          <ul>{e.points.map(p => <li key={p}><CheckCircle2 size={17}/><span>{p}</span></li>)}</ul>
        </div>
      </motion.article>)}</div>
    </section>

    <section id="projects" className="section projects-section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">SELECTED WORK</p><h2>Projects</h2></div><p>Google-resume projects are highlighted first; Crio projects remain synchronized dynamically and duplicate records are merged automatically.</p></motion.div>
      <div className="project-toolbar">
        <label className="project-search"><Search size={17}/><input value={projectSearch} onChange={e => setProjectSearch(e.target.value)} placeholder="Search projects or technologies" aria-label="Search projects"/></label>
        <div className="project-filters">{projectFilters.map(filter => <button key={filter} className={projectFilter === filter ? "active" : ""} onClick={() => setProjectFilter(filter)}>{filter}</button>)}</div>
      </div>
      <div className="project-grid">{filteredProjects.map((p: any, i: number) => {
        const primaryUrl = p.detailsUrl || p.githubUrl || p.demoUrl;
        return <motion.article className={`project-card glass${primaryUrl ? " clickable" : ""}`} key={`${p.title}-${i}`} {...reveal} onClick={() => primaryUrl && window.open(primaryUrl, "_blank", "noopener,noreferrer")}> 
          <div className="project-card-head"><span className="number">{String(i+1).padStart(2,"0")}</span><span className="project-type">{p.category || "Professional Project"}</span></div>
          {p.starred ? <span className="featured-ribbon"><Sparkles size={13}/> ★ Starred Featured Project</span> : isFeaturedProject(p.title) && <span className="featured-ribbon"><Sparkles size={13}/> Featured Project</span>}
          <h3>{p.title}</h3>{p.date && <p className="project-date">{p.date}</p>}
          <p className="project-description">{p.description || "Project details are available in the portfolio."}</p>
          {Array.isArray(p.scope) && p.scope.length > 0 && <div className="project-scope"><h4>Scope of work</h4><ul>{p.scope.map((item: string) => <li key={item}><CheckCircle2 size={14}/><span>{item}</span></li>)}</ul></div>}
          <div className="project-technologies"><h4>Technologies used</h4><div className="tags">{(p.skills || []).slice(0,14).map((skill: string) => <span key={skill}>{skill}</span>)}</div></div>
          <div className="project-links">
            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><Github size={15}/> GitHub</a>}
            {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><Globe2 size={15}/> Live demo</a>}
            {p.detailsUrl && <a href={p.detailsUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>View details <ArrowRight size={15}/></a>}
          </div>
        </motion.article>})}</div>
        {filteredProjects.length === 0 && <div className="empty-state">No projects match the current search or filter.</div>}
    </section>

    <section className="section data-section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">LIVE DEVELOPMENT DATA</p><h2>GitHub and LeetCode.</h2></div><p>Live GitHub and LeetCode signals remain synchronized to demonstrate ongoing engineering and problem-solving activity.</p></motion.div>
      <div className="data-grid">
        <div className="data-card glass"><div className="data-card-title"><Github/><div><h3>GitHub activity</h3><span>{github.contributionsConfigured ? "Live 12-month contribution data" : "GitHub activity"}</span></div></div><ContributionGraph data={github.contributions}/></div>
        <div className="data-card glass"><div className="data-card-title"><Code2/><div><h3>LeetCode progress</h3><span>Live solved-problem tracking</span></div></div><div className="leetcode-panel"><div className="donut" style={{"--p":`${Math.min(100, leetcode.acceptanceRate || 0) * 3.6}deg`} as any}><div><b>{leetcode.acceptanceRate ?? "—"}%</b><span>Acceptance</span></div></div><div className="difficulty"><Progress label="Easy" value={totals.Easy || 0} max={Math.max(1,...Object.values(totals).map(Number))}/><Progress label="Medium" value={totals.Medium || 0} max={Math.max(1,...Object.values(totals).map(Number))}/><Progress label="Hard" value={totals.Hard || 0} max={Math.max(1,...Object.values(totals).map(Number))}/></div><div className="rank"><small>Global ranking</small><b>{leetcode.ranking?.toLocaleString?.() ?? "—"}</b><span>{leetcode.submissions ?? 0} submissions</span></div></div></div>
      </div>
    </section>

    <section id="education" className="section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">EDUCATION</p><h2>Academic foundation.</h2></div><p>B.Tech in Electronics and Communication Engineering from the National Institute of Technology, Arunachal Pradesh.</p></motion.div>
      <div className="credential-grid">{profile.certifications.map((c, i) => <motion.article className="credential glass" key={c.title} {...reveal}><div className="credential-icon">{i===0?<Sparkles/>:i===1?<TestTube2/>:<Award/>}</div><div><span>{c.type}</span><h3>{c.title}</h3><p>{c.issuer}</p><small>{c.period}</small></div></motion.article>)}</div>
    </section>

    <section id="contact" className="section contact-section">
      <motion.div className="contact-card" {...reveal}>
        <div><p className="eyebrow">LET'S WORK TOGETHER</p><h2>Looking for an engineer who combines test automation with software and production reliability?</h2><p>Reach out for SDET, Software Test Engineer, QA Automation, test infrastructure, or reliability-focused opportunities.</p></div>
        <div className="contact-actions"><a className="primary" href={`mailto:${profile.email}`}><Mail size={18}/> Email Mainak</a><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={18}/> View GitHub</a></div>
      </motion.div>
    </section>

    <footer><div><a className="brand" href="#top">MC<span>.</span></a><a className="footer-email" href={`mailto:${profile.email}`}><Mail size={16}/><span>{profile.email}</span></a><p>© 2026 Mainak Chandra. All Rights Reserved.</p></div><div><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a><a href={profile.links.crio} target="_blank" rel="noreferrer">Crio</a></div></footer>

    <button className="chat-launch" onClick={() => setChat(v => !v)} aria-label="Open portfolio assistant">{chat ? <X/> : <MessageCircle/>}<span>Ask AI</span></button>
    <AnimatePresence>{chat && <motion.aside className="chat glass" initial={{opacity:0,y:18,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18,scale:.96}}><div className="chat-head"><div><Sparkles size={18}/><span>Portfolio assistant</span></div><button onClick={() => setChat(false)}><X size={18}/></button></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={m.role}>{m.text}</div>)}{thinking&&<div className="assistant">Thinking…</div>}</div><div className="chat-input"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask about experience or skills"/><button onClick={ask}><Send size={17}/></button></div></motion.aside>}</AnimatePresence>
  </main>;
}

function Metric({icon,label,value,sub}:{icon:React.ReactNode,label:string,value:any,sub:string}){return <motion.div className="metric glass" {...reveal}><div className="metric-icon">{icon}</div><div><small>{label}</small><b>{value}</b><span>{sub}</span></div></motion.div>}
function SkillCard({icon,title,items}:{icon:React.ReactNode,title:string,items:string[]}){return <motion.article className="skill-card glass" {...reveal}><div className="skill-icon">{icon}</div><h3>{title}</h3><div className="skill-list">{items.map(x=><span key={x}>{x}</span>)}</div></motion.article>}
function Progress({label,value,max}:{label:string,value:number,max:number}){return <div className="progress"><div><span>{label}</span><b>{value}</b></div><div className="track"><span style={{width:`${Math.max(4,(value/max)*100)}%`}}/></div></div>}
function ContributionGraph({data}:{data:any}){const weeks=data?.weeks||[];if(!weeks.length)return <div className="graph-empty"><Github size={28}/><p>Contribution data will appear here after the GitHub token is configured.</p></div>;return <div className="contribution-wrap"><div className="contribution-grid">{weeks.flatMap((w:any)=>w.days||[]).map((d:any,i:number)=><span key={i} title={`${d.date}: ${d.contributionCount}`} className={`level-${({ NONE:0, FIRST_QUARTILE:1, SECOND_QUARTILE:2, THIRD_QUARTILE:3, FOURTH_QUARTILE:4 } as Record<string, number>)[String(d.contributionLevel)] ?? Math.min(4, Number(d.contributionCount || 0) > 0 ? 1 : 0)}`}/>)}</div><div className="graph-caption"><span>{data.totalContributions} contributions in the last year</span><span>Less <i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/> More</span></div></div>}
function isFeaturedProject(title:string){return /^(semantic job matcher|3d dynamic portfolio platform|qkart qa automation|qtrip qa|qcalc|amazon store automation|flipkart automation|leetcode automation|youtube automation)$/i.test((title||"").trim())}
