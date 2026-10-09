import snapshotData from "@/data/github-contributions-snapshot.json";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubContributionsResult {
  totalContributions: number;
  weeks: ContributionWeek[];
  isStaticSnapshot: boolean;
  username: string;
}

function calculateLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function getGitHubContributions(
  username: string = "namangupta08"
): Promise<GitHubContributionsResult> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "namangupta-portfolio",
        },
        body: JSON.stringify({
          query,
          variables: { login: username },
        }),
        next: { revalidate: 43200 }, // 12 hours ISR cache
      });

      if (response.ok) {
        const json = await response.json();
        const calendar =
          json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar && Array.isArray(calendar.weeks)) {
          const weeks: ContributionWeek[] = calendar.weeks.map(
            (w: { contributionDays: Array<{ date: string; contributionCount: number }> }) => ({
              days: w.contributionDays.map((d) => ({
                date: d.date,
                count: d.contributionCount,
                level: calculateLevel(d.contributionCount),
              })),
            })
          );

          return {
            totalContributions: calendar.totalContributions,
            weeks,
            isStaticSnapshot: false,
            username,
          };
        }
      }
    } catch {
      // Fall through to static snapshot fallback
    }
  }

  // Fallback to real static snapshot
  try {
    const rawContributions = (snapshotData as { contributions?: Array<{ date: string; count: number }> })
      .contributions || [];

    // Slice last 53 weeks (53 * 7 = 371 days)
    const recent = rawContributions.slice(-371);
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    let total = 0;
    for (const item of recent) {
      total += item.count;
      currentWeek.push({
        date: item.date,
        count: item.count,
        level: calculateLevel(item.count),
      });

      if (currentWeek.length === 7) {
        weeks.push({ days: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
    }

    return {
      totalContributions: total,
      weeks,
      isStaticSnapshot: true,
      username,
    };
  } catch {
    return {
      totalContributions: 0,
      weeks: [],
      isStaticSnapshot: true,
      username,
    };
  }
}
