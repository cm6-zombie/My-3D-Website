# Mainak Chandra - 3D Dynamic Portfolio

A production-ready Next.js portfolio using React Three Fiber, live GitHub data, configurable LeetCode statistics, Crio project extraction, and an embedded downloadable resume.

## Run locally

```bash
npm install
cp .env.example .env.local
# Set your public LeetCode username in .env.local
npm run dev
```

Open `http://localhost:3000`.

## Configure

- `GITHUB_USERNAME`: currently `cm6-zombie`.
- `GITHUB_TOKEN`: optional, but recommended to avoid low unauthenticated GitHub API limits.
- `LEETCODE_USERNAME`: set to `mainak000` for the public profile `https://leetcode.com/u/mainak000/`.
- `CRIO_PORTFOLIO_URL`: currently the supplied Crio portfolio URL.
- `NEXT_PUBLIC_REFRESH_MS`: browser refresh interval; default 300000 ms (5 minutes).

## How dynamic updates work

- GitHub: fetched server-side every 5 minutes from GitHub's API.
- LeetCode: fetched server-side every 5 minutes from LeetCode GraphQL; this endpoint is unofficial and may change.
- Crio: parsed server-side every 15 minutes. When Crio blocks scraping or changes markup, resume-backed projects are shown.
- Resume: replace `public/Mainak-Chandra-Resume.pdf` and redeploy. For fully automatic resume replacement, connect cloud storage or a CMS webhook in your deployment.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

## Important reality about “real time”

Public profile sites do not all provide stable webhooks. This implementation uses safe polling and server-side caching. GitHub can be made near-instant with a webhook and database; LeetCode and Crio generally require polling because they do not expose reliable public update webhooks for this use case.
