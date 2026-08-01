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
  const [messages, setMessages] = useState([{ role: "assistant", text: "Ask about Mainak's QA automation, AWS/Linux background, projects, or leadership experience." }]);
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
    const source = Array.isArray(crio.projects) ? crio.projects : [...profile.crioFallbackProjects, ...profile.fallbackProjects];
    return source.filter(isSafeProjectRecord).sort((a: any, b: any) => Number(isFeaturedProject(b.title)) - Number(isFeaturedProject(a.title)));
  }, [crio.projects]);
  const projectFilters = ["All", "Featured", "Professional", "Mini", "Java", "Selenium", "AWS", "AI"];
  const filteredProjects = useMemo(() => allProjects.filter((p: any) => {
    const haystack = [p.title, p.description, p.category, ...(p.skills || [])].filter(Boolean).join(" ").toLowerCase();
    const matchesSearch = !projectSearch.trim() || haystack.includes(projectSearch.trim().toLowerCase());
    const filter = projectFilter.toLowerCase();
    const matchesFilter = projectFilter === "All" ||
      (projectFilter === "Featured" && isFeaturedProject(p.title)) ||
      (projectFilter === "Professional" && /professional/i.test(p.category || "")) ||
      (projectFilter === "Mini" && /mini/i.test(p.category || "")) || haystack.includes(filter);
    return matchesSearch && matchesFilter;
  }), [allProjects, projectSearch, projectFilter]);

  const navItems = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

  return <main>
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
        <div className="availability"><span/> Open to QA Automation, SDET and Software Test Engineer opportunities</div>
        <p className="eyebrow">BUILD · TEST · SUPPORT · IMPROVE</p>
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
        <div className="floating-card fc-one"><TestTube2 size={18}/><div><b>QA Automation</b><span>Selenium · TestNG · POM</span></div></div>
        <div className="floating-card fc-two"><Cloud size={18}/><div><b>Cloud & Linux</b><span>AWS · Terraform · Ansible</span></div></div>
        <div className="scene-hint">Drag to explore the 3D skills world</div>
      </motion.div>
    </section>

    <section className="trust-strip">
      <div><b>7+</b><span>Years in IT</span></div><div><b>90%</b><span>Reporting effort reduced</span></div><div><b>2,500+</b><span>Learner accounts reconciled</span></div><div><b>4</b><span>Core career domains</span></div>
    </section>

    <section id="about" className="section split-section">
      <motion.div {...reveal}><p className="eyebrow">ABOUT ME</p><h2>A production-minded engineer who connects testing with operational reality.</h2></motion.div>
      <motion.div className="about-copy" {...reveal}><p>{profile.summary}</p><div className="about-points"><span><CheckCircle2/> Automation framework development</span><span><CheckCircle2/> Enterprise incident and problem ownership</span><span><CheckCircle2/> AWS/Linux infrastructure support</span><span><CheckCircle2/> Stakeholder and audit communication</span></div></motion.div>
    </section>

    <section id="stats" className="metrics">
      <Metric icon={<Github/>} label="GitHub repositories" value={github.user?.publicRepos ?? "—"} sub={`${github.user?.followers ?? 0} followers`}/>
      <Metric icon={<Code2/>} label="LeetCode solved" value={leetcode.accepted ?? "—"} sub={`${leetcode.acceptanceRate ?? "—"}% acceptance`}/>
      <Metric icon={<BriefcaseBusiness/>} label="Professional experience" value="7+" sub="years across support and QA"/>
      <Metric icon={<BarChart3/>} label="Annual contributions" value={github.contributions?.totalContributions ?? "—"} sub={github.contributionsConfigured ? "Live GitHub activity" : "Connect GITHUB_TOKEN"}/>
    </section>

    <section id="skills" className="section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">CORE CAPABILITIES</p><h2>Skills built for reliable software delivery.</h2></div><p>Hands-on automation, infrastructure and support expertise—combined with the communication and ownership needed in enterprise environments.</p></motion.div>
      <div className="skill-category-grid">
        <SkillCard icon={<TestTube2/>} title="QA Automation" items={["Selenium WebDriver","TestNG","Page Object Model","Data-driven testing","XPath","Apache POI"]}/>
        <SkillCard icon={<Terminal/>} title="Programming & Data" items={["Core Java","SQL / T-SQL","MySQL","Microsoft SQL Server","Git","Gradle"]}/>
        <SkillCard icon={<Cloud/>} title="Cloud & Infrastructure" items={["AWS EC2","IAM","CloudWatch","CloudFormation","Ansible","Terraform"]}/>
        <SkillCard icon={<ShieldCheck/>} title="Operations & ITSM" items={["ServiceNow","Incident Management","RCA","SLA Management","Release Validation","Linux"]}/>
        <SkillCard icon={<Users/>} title="Leadership" items={profile.leadershipSkills}/>
        <SkillCard icon={<Sparkles/>} title="Professional strengths" items={profile.softSkills}/>
      </div>
    </section>

    <section id="experience" className="section experience-section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">CAREER JOURNEY</p><h2>Experience shaped by ownership.</h2></div><p>From cloud infrastructure at TCS to enterprise LMS operations, automation and AI-led reporting at PwC.</p></motion.div>
      <div className="timeline">{profile.experience.map((e, i) => <motion.article className="timeline-item" key={e.company} {...reveal}>
        <div className="timeline-marker"><span>{String(i+1).padStart(2,"0")}</span></div>
        <div className="timeline-card glass">
          <div className="timeline-top"><div><p className="role">{e.role}</p><h3>{e.company}</h3></div><span className="period">{e.period}</span></div>
          <ul>{e.points.map(p => <li key={p}><CheckCircle2 size={17}/><span>{p}</span></li>)}</ul>
        </div>
      </motion.article>)}</div>
    </section>

    <section id="projects" className="section projects-section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">SELECTED WORK</p><h2>Projects</h2></div><p>Projects synchronized from Crio and the résumé, with duplicates merged into one clean record.</p></motion.div>
      <div className="project-toolbar">
        <label className="project-search"><Search size={17}/><input value={projectSearch} onChange={e => setProjectSearch(e.target.value)} placeholder="Search projects or technologies" aria-label="Search projects"/></label>
        <div className="project-filters">{projectFilters.map(filter => <button key={filter} className={projectFilter === filter ? "active" : ""} onClick={() => setProjectFilter(filter)}>{filter}</button>)}</div>
      </div>
      <div className="project-grid">{filteredProjects.map((p: any, i: number) => {
        const primaryUrl = p.detailsUrl || p.githubUrl || p.demoUrl;
        return <motion.article className={`project-card glass${primaryUrl ? " clickable" : ""}`} key={`${p.title}-${i}`} {...reveal} onClick={() => primaryUrl && window.open(primaryUrl, "_blank", "noopener,noreferrer")}> 
          <div className="project-card-head"><span className="number">{String(i+1).padStart(2,"0")}</span><span className="project-type">{p.category || "Professional Project"}</span></div>
          {isFeaturedProject(p.title) && <span className="featured-ribbon"><Sparkles size={13}/> Featured Project</span>}
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
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">LIVE DEVELOPMENT DATA</p><h2>GitHub and LeetCode.</h2></div><p>Automatically refreshed activity that demonstrates consistent development and problem-solving practice.</p></motion.div>
      <div className="data-grid">
        <div className="data-card glass"><div className="data-card-title"><Github/><div><h3>GitHub activity</h3><span>{github.contributionsConfigured ? "Live 12-month contribution data" : "Add GITHUB_TOKEN for graph data"}</span></div></div><ContributionGraph data={github.contributions}/></div>
        <div className="data-card glass"><div className="data-card-title"><Code2/><div><h3>LeetCode progress</h3><span>Live solved-problem tracking</span></div></div><div className="leetcode-panel"><div className="donut" style={{"--p":`${Math.min(100, leetcode.acceptanceRate || 0) * 3.6}deg`} as any}><div><b>{leetcode.acceptanceRate ?? "—"}%</b><span>Acceptance</span></div></div><div className="difficulty"><Progress label="Easy" value={totals.Easy || 0} max={Math.max(1,...Object.values(totals).map(Number))}/><Progress label="Medium" value={totals.Medium || 0} max={Math.max(1,...Object.values(totals).map(Number))}/><Progress label="Hard" value={totals.Hard || 0} max={Math.max(1,...Object.values(totals).map(Number))}/></div><div className="rank"><small>Global ranking</small><b>{leetcode.ranking?.toLocaleString?.() ?? "—"}</b><span>{leetcode.submissions ?? 0} submissions</span></div></div></div>
      </div>
    </section>

    <section id="certifications" className="section">
      <motion.div className="section-heading" {...reveal}><div><p className="eyebrow">LEARNING & CREDENTIALS</p><h2>Certifications and education.</h2></div><p>A foundation in Electronics and Communication Engineering, strengthened through cloud, AI and QA automation learning.</p></motion.div>
      <div className="credential-grid">{profile.certifications.map((c, i) => <motion.article className="credential glass" key={c.title} {...reveal}><div className="credential-icon">{i===0?<Sparkles/>:i===1?<TestTube2/>:<Award/>}</div><div><span>{c.type}</span><h3>{c.title}</h3><p>{c.issuer}</p><small>{c.period}</small></div></motion.article>)}</div>
    </section>

    <section id="contact" className="section contact-section">
      <motion.div className="contact-card" {...reveal}>
        <div><p className="eyebrow">LET'S WORK TOGETHER</p><h2>Looking for an engineer who understands both quality and production?</h2><p>Reach out for QA Automation, SDET, Software Testing, Application Support or operations-focused opportunities.</p></div>
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
function ContributionGraph({data}:{data:any}){const weeks=data?.weeks||[];if(!weeks.length)return <div className="graph-empty"><Github size={28}/><p>Contribution data will appear here after the GitHub token is configured.</p></div>;return <div className="contribution-wrap"><div className="contribution-grid">{weeks.flatMap((w:any)=>w.days||[]).map((d:any,i:number)=><span key={i} title={`${d.date}: ${d.contributionCount}`} className={`level-${Math.min(4,d.contributionLevel||0)}`}/>)}</div><div className="graph-caption"><span>{data.totalContributions} contributions in the last year</span><span>Less <i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/> More</span></div></div>}
function isFeaturedProject(title:string){return /^(qtrip qa|qcalc|amazon store automation|flipkart automation|leetcode automation|youtube automation)$/i.test((title||"").trim())}
