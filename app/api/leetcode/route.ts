import { NextResponse } from "next/server";

export const revalidate = 300;

const query = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
        realName
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      tagProblemCounts {
        advanced {
          tagName
          problemsSolved
        }
        intermediate {
          tagName
          problemsSolved
        }
        fundamental {
          tagName
          problemsSolved
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

type SubmissionStat = {
  difficulty: string;
  count: number;
  submissions: number;
};

export async function GET() {
  const username = process.env.LEETCODE_USERNAME || "mainak000";
  const fallback = {
    configured: true,
    username,
    ranking: 0,
    reputation: 0,
    accepted: 29,
    acceptedSubmissions: 33,
    submissions: 39,
    acceptanceRate: 84.6,
    breakdown: [
      { difficulty: "All", count: 29, submissions: 33 },
      { difficulty: "Easy", count: 27, submissions: 29 },
      { difficulty: "Medium", count: 2, submissions: 4 },
      { difficulty: "Hard", count: 0, submissions: 0 }
    ],
    questionTotals: [],
    topics: { advanced: [], intermediate: [], fundamental: [] },
    live: false
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 300 }
    });

    if (!response.ok) return NextResponse.json(fallback);

    const json = await response.json();
    const user = json?.data?.matchedUser;
    if (!user) return NextResponse.json(fallback);

    const acceptedAll = user.submitStatsGlobal.acSubmissionNum.find(
      (item: SubmissionStat) => item.difficulty === "All"
    );
    const submittedAll = user.submitStatsGlobal.totalSubmissionNum.find(
      (item: SubmissionStat) => item.difficulty === "All"
    );

    const solvedProblems = acceptedAll?.count ?? fallback.accepted;
    const acceptedSubmissions = acceptedAll?.submissions ?? fallback.acceptedSubmissions;
    const totalSubmissions = submittedAll?.submissions ?? fallback.submissions;
    const acceptanceRate = totalSubmissions
      ? Number(((acceptedSubmissions / totalSubmissions) * 100).toFixed(1))
      : fallback.acceptanceRate;

    return NextResponse.json({
      configured: true,
      username: user.username,
      ranking: user.profile?.ranking ?? 0,
      reputation: user.profile?.reputation ?? 0,
      accepted: solvedProblems,
      acceptedSubmissions,
      submissions: totalSubmissions,
      acceptanceRate,
      breakdown: user.submitStatsGlobal.acSubmissionNum,
      questionTotals: json.data.allQuestionsCount || [],
      topics: user.tagProblemCounts || fallback.topics,
      live: true
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
