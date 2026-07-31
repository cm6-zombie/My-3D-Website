import { NextResponse } from "next/server";

export const revalidate = 300;

const query = `query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile { ranking reputation }
    submitStatsGlobal {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty count submissions }
    }
  }
}`;

export async function GET() {
  const username = process.env.LEETCODE_USERNAME;
  if (!username || username.startsWith("REPLACE_")) {
    return NextResponse.json({ configured: false, message: "Set LEETCODE_USERNAME in environment variables." });
  }
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: `https://leetcode.com/${username}/` },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 300 }
    });
    if (!response.ok) throw new Error("LeetCode request failed");
    const json = await response.json();
    const user = json?.data?.matchedUser;
    if (!user) throw new Error("LeetCode user not found");
    const accepted = user.submitStatsGlobal.acSubmissionNum.find((x: any) => x.difficulty === "All")?.count || 0;
    const submissions = user.submitStatsGlobal.totalSubmissionNum.find((x: any) => x.difficulty === "All")?.submissions || 0;
    return NextResponse.json({
      configured: true, username: user.username, ranking: user.profile.ranking,
      reputation: user.profile.reputation, accepted, submissions,
      acceptanceRate: submissions ? Number(((accepted / submissions) * 100).toFixed(2)) : 0,
      breakdown: user.submitStatsGlobal.acSubmissionNum
    });
  } catch {
    return NextResponse.json({ configured: true, error: "LeetCode data is temporarily unavailable." }, { status: 502 });
  }
}
