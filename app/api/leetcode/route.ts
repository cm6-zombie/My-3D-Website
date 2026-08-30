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

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`LeetCode request failed with status ${response.status}`);
    }

    const json = await response.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      throw new Error("LeetCode user was not found");
    }

    const acceptedAll = user.submitStatsGlobal.acSubmissionNum.find(
      (item: SubmissionStat) => item.difficulty === "All",
    );
    const submittedAll = user.submitStatsGlobal.totalSubmissionNum.find(
      (item: SubmissionStat) => item.difficulty === "All",
    );

    // `count` is the number of unique problems solved (29 for this profile).
    // Acceptance rate must use accepted submission attempts, not solved problems.
    const solvedProblems = acceptedAll?.count ?? 0;
    const acceptedSubmissions = acceptedAll?.submissions ?? 0;
    const totalSubmissions = submittedAll?.submissions ?? 0;
    const acceptanceRate = totalSubmissions
      ? Number(((acceptedSubmissions / totalSubmissions) * 100).toFixed(1))
      : 0;

    return NextResponse.json({
      configured: true,
      username: user.username,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      accepted: solvedProblems,
      acceptedSubmissions,
      submissions: totalSubmissions,
      acceptanceRate,
      breakdown: user.submitStatsGlobal.acSubmissionNum,
      questionTotals: json.data.allQuestionsCount,
      topics: user.tagProblemCounts,
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { configured: true, error: "LeetCode data is temporarily unavailable." },
      { status: 502 },
    );
  }
}
