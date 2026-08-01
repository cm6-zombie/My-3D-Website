# Mainak Chandra — 3D Dynamic Portfolio v2

Features: interactive React Three Fiber world, resume-grounded AI assistant, live GitHub repository data, optional GitHub contribution graph, LeetCode solved statistics, Crio project synchronization with fallback, cloud resume URL, Vercel Analytics, animations, responsive UI, SEO metadata, sitemap, robots.txt and custom-domain readiness.

## Environment variables

Copy `.env.example` to `.env.local` for local development. In Vercel, add:

- `GITHUB_USERNAME=cm6-zombie`
- `GITHUB_TOKEN=` optional but required for the contribution calendar
- `LEETCODE_USERNAME=mainak000`
- `CRIO_PORTFOLIO_URL=https://www.crio.do/learn/portfolio/subham-cm6/`
- `RESUME_URL=/Mainak-Chandra-Resume.pdf` or a public cloud PDF URL
- `NEXT_PUBLIC_SITE_URL=https://mainak-portfolio-chi.vercel.app`
- `OPENAI_API_KEY=` optional; without it the assistant uses the built-in resume-grounded retrieval mode
- `OPENAI_MODEL=` required only when `OPENAI_API_KEY` is set

## Update the existing GitHub repository

Copy all project files into your cloned `My-3D-Website` folder, commit in GitHub Desktop, and push to the `my-projects` branch. Vercel will redeploy automatically.

## Custom domain

In Vercel, open Project → Settings → Domains, add the purchased domain, then apply the DNS records Vercel shows. Update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy.

## Crio full-project synchronization

`/api/crio` now extracts all available Professional Projects and Mini Projects from the configured Crio portfolio. It reads both rendered HTML and embedded JSON data, deduplicates projects, and returns title, date, category, complete description, skills, project-detail URL, and demo URL when available. The endpoint refreshes every 15 minutes.

Required Vercel variable:

```env
CRIO_PORTFOLIO_URL=https://www.crio.do/learn/portfolio/subham-cm6/
```

After deploying, open `/api/crio` on the deployed site to verify `live: true` and inspect `projectCount`. If Crio blocks server-side retrieval, the website will show the resume-backed fallback and a visible warning.

## Phase 1 premium UI upgrade

This version includes a redesigned landing page, interactive 3D hero, Framer Motion animations, responsive navigation and layouts, an experience timeline, premium project cards, skill icon groups, certifications and education, contact section, persistent dark/light theme, Vercel Analytics, expanded SEO metadata, sitemap, robots rules and Person JSON-LD structured data.
