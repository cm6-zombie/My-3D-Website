import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "cm6-zombie";
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 300 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 300 } })
    ]);
    if (!userRes.ok || !repoRes.ok) throw new Error("GitHub API request failed");
    const user = await userRes.json();
    const repos = await repoRes.json();
    return NextResponse.json({
      user: {
        login: user.login, avatarUrl: user.avatar_url, bio: user.bio,
        publicRepos: user.public_repos, followers: user.followers, profileUrl: user.html_url
      },
      repos: repos.filter((r: any) => !r.fork).map((r: any) => ({
        name: r.name, description: r.description, url: r.html_url, language: r.language,
        stars: r.stargazers_count, forks: r.forks_count, updatedAt: r.updated_at, topics: r.topics || []
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: "GitHub data is temporarily unavailable." }, { status: 502 });
  }
}
