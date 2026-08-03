import { NextResponse } from "next/server";

export const revalidate = 300;

const EMPTY_GITHUB = {
  user: {
    login: "cm6-zombie",
    avatarUrl: "",
    bio: "",
    publicRepos: 0,
    followers: 0,
    following: 0,
    profileUrl: "https://github.com/cm6-zombie"
  },
  repos: [],
  contributions: null,
  contributionsConfigured: false,
  live: false
};

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "cm6-zombie";
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 300 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 300 } })
    ]);

    if (!userRes.ok || !repoRes.ok) return NextResponse.json({ ...EMPTY_GITHUB, user: { ...EMPTY_GITHUB.user, login: username, profileUrl: `https://github.com/${username}` } });

    const user = await userRes.json();
    const raw = await repoRes.json();
    let contributions: any = null;

    if (token) {
      const now = new Date();
      const from = new Date(now);
      from.setFullYear(now.getFullYear() - 1);
      const query = `query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel color}}}}}}`;
      const graphResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query, variables: { login: username, from: from.toISOString(), to: now.toISOString() } }),
        next: { revalidate: 300 }
      });
      if (graphResponse.ok) {
        const graphJson = await graphResponse.json();
        contributions = graphJson?.data?.user?.contributionsCollection?.contributionCalendar || null;
      }
    }

    return NextResponse.json({
      user: {
        login: user.login,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        profileUrl: user.html_url
      },
      repos: Array.isArray(raw) ? raw.filter((repo: any) => !repo.fork).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        topics: repo.topics || []
      })) : [],
      contributions,
      contributionsConfigured: Boolean(token && contributions),
      live: true
    });
  } catch {
    return NextResponse.json({ ...EMPTY_GITHUB, user: { ...EMPTY_GITHUB.user, login: username, profileUrl: `https://github.com/${username}` } });
  }
}
