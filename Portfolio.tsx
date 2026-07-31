"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, BriefcaseBusiness, ExternalLink, Download, RefreshCw } from "lucide-react";
import { profile } from "@/lib/profile";
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type GithubData = { user?: any; repos?: any[]; error?: string };
type LeetCodeData = { configured?: boolean; username?: string; acceptanceRate?: number; accepted?: number; ranking?: number; error?: string; message?: string };
type CrioData = { projects?: any[]; live?: boolean; warning?: string };

export default function Portfolio() {
  const [github, setGithub] = useState<GithubData>({});
  const [leetcode, setLeetcode] = useState<LeetCodeData>({});
  const [crio, setCrio] = useState<CrioData>({ projects: profile.fallbackProjects });
  const [updated, setUpdated] = useState<Date | null>(null);
  const refreshMs = Number(process.env.NEXT_PUBLIC_REFRESH_MS || 300000);

  async function load() {
    const [g, l, c] = await Promise.allSettled([
      fetch("/api/github").then(r => r.json()), fetch("/api/leetcode").then(r => r.json()), fetch("/api/crio").then(r => r.json())
    ]);
    if (g.status === "fulfilled") setGithub(g.value);
    if (l.status === "fulfilled") setLeetcode(l.value);
    if (c.status === "fulfilled") setCrio(c.value);
    setUpdated(new Date());
  }
  useEffect(() => { load(); const id = setInterval(load, refreshMs); return () => clearInterval(id); }, [refreshMs]);

  return <main>
    <nav className="nav"><strong>MC<span>.</span></strong><div><a href="#projects">Projects</a><a href="#experience">Experience</a><a href={profile.links.resume} target="_blank">Resume</a></div></nav>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">BUILD · TEST · SUPPORT · IMPROVE</p><h1>{profile.name}</h1><h2>{profile.title}</h2><p>{profile.summary}</p>
        <div className="actions"><a className="primary" href={profile.links.resume} target="_blank"><Download size={18}/> Resume</a><a href={profile.links.github} target="_blank"><Github size={18}/> GitHub</a><a href={profile.links.crio} target="_blank"><Code2 size={18}/> Crio</a></div>
        <button className="sync" onClick={load}><RefreshCw size={14}/> {updated ? `Synced ${updated.toLocaleTimeString()}` : "Syncing live profiles..."}</button>
      </div><div className="scene"><Scene /></div>
    </section>

    <section className="metrics">
      <article><Github/><small>GitHub</small><b>{github.user?.publicRepos ?? "—"}</b><span>public repositories</span></article>
      <article><Code2/><small>LeetCode</small><b>{leetcode.configured ? `${leetcode.acceptanceRate ?? "—"}%` : "Setup"}</b><span>{leetcode.configured ? `${leetcode.accepted ?? 0} accepted` : "Add public username"}</span></article>
      <article><BriefcaseBusiness/><small>Experience</small><b>7+</b><span>years in IT</span></article>
    </section>

    <section className="section"><p className="eyebrow">CAPABILITIES</p><h2>Skills that connect automation with operations.</h2><div className="skill-grid">
      <Skill title="Technical" items={profile.technicalSkills}/><Skill title="Soft skills" items={profile.softSkills}/><Skill title="Leadership" items={profile.leadershipSkills}/>
    </div></section>

    <section id="projects" className="section"><p className="eyebrow">SELECTED WORK</p><div className="section-head"><h2>Projects</h2><span>{crio.live ? "Live from Crio" : "Resume-backed fallback"}</span></div><div className="cards">
      {(crio.projects || profile.fallbackProjects).map((p, i) => <motion.article className="card" key={`${p.title}-${i}`} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <span className="number">0{i+1}</span><h3>{p.title}</h3><small>{p.date}</small><p>{p.description}</p><div className="tags">{(p.skills || []).slice(0,8).map((s:string)=><span key={s}>{s}</span>)}</div>
      </motion.article>)}
    </div></section>

    {github.repos?.length ? <section className="section"><p className="eyebrow">LIVE GITHUB</p><h2>Recently updated repositories</h2><div className="repo-list">{github.repos.slice(0,6).map(r=><a href={r.url} target="_blank" key={r.name}><div><b>{r.name}</b><p>{r.description || "No description provided."}</p></div><span>{r.language || "Code"} <ExternalLink size={14}/></span></a>)}</div></section> : null}

    <section id="experience" className="section"><p className="eyebrow">CAREER</p><h2>Experience</h2><div className="timeline">{profile.experience.map(e=><article key={e.company}><div className="dot"/><small>{e.period}</small><h3>{e.role}</h3><h4>{e.company}</h4>{e.points.map(p=><p key={p}>{p}</p>)}</article>)}</div></section>
    <footer><span>© {new Date().getFullYear()} Mainak Chandra</span><a href={`mailto:${profile.email}`}>{profile.email}</a></footer>
  </main>;
}
function Skill({title,items}:{title:string;items:string[]}) { return <article><h3>{title}</h3><div className="tags">{items.map(x=><span key={x}>{x}</span>)}</div></article> }
