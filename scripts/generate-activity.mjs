import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "data", "activity.json");

const GITHUB_USERNAME = "namangupta08";
const LEETCODE_USERNAME = "namangupta032";

async function fetchGitHubContributions() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[Activity] GITHUB_TOKEN not found in environment. Skipping GitHub GraphQL fetch.");
    return { success: false, data: {}, total: 0, reason: "Missing GITHUB_TOKEN" };
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "NamanGupta-Portfolio-ActivityGenerator",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    if (!res.ok) {
      console.warn(`[Activity] GitHub API responded with status ${res.status}`);
      return { success: false, data: {}, total: 0, reason: `HTTP ${res.status}` };
    }

    const json = await res.json();
    if (json.errors || !json.data?.user?.contributionsCollection) {
      console.warn("[Activity] GitHub GraphQL errors:", json.errors);
      return { success: false, data: {}, total: 0, reason: "GraphQL errors" };
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    const dailyMap = {};
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        dailyMap[day.date] = day.contributionCount;
      }
    }

    return {
      success: true,
      data: dailyMap,
      total: calendar.totalContributions,
    };
  } catch (err) {
    console.warn("[Activity] GitHub fetch failed:", err.message);
    return { success: false, data: {}, total: 0, reason: err.message };
  }
}

async function fetchLeetCodeSubmissions() {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submissionCalendar
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!res.ok) {
      console.warn(`[Activity] LeetCode API responded with status ${res.status}`);
      return { success: false, data: {}, total: 0, reason: `HTTP ${res.status}` };
    }

    const json = await res.json();
    const rawCalendar = json.data?.matchedUser?.submissionCalendar;
    if (!rawCalendar) {
      return { success: false, data: {}, total: 0, reason: "No submissionCalendar found" };
    }

    const parsed = JSON.parse(rawCalendar);
    const dailyMap = {};
    let total = 0;

    for (const [timestampStr, count] of Object.entries(parsed)) {
      const ts = parseInt(timestampStr, 10) * 1000;
      const date = new Date(ts).toISOString().split("T")[0];
      dailyMap[date] = (dailyMap[date] || 0) + count;
      total += count;
    }

    return {
      success: true,
      data: dailyMap,
      total,
    };
  } catch (err) {
    console.warn("[Activity] LeetCode fetch failed:", err.message);
    return { success: false, data: {}, total: 0, reason: err.message };
  }
}

function calculateLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

async function generateActivity() {
  console.log("[Activity] Fetching data for activity grid...");
  const [github, leetcode] = await Promise.all([
    fetchGitHubContributions(),
    fetchLeetCodeSubmissions(),
  ]);

  if (!github.success && !leetcode.success) {
    console.error("[Activity] Both sources failed. Refusing to write random or invented data.");
    process.exit(1);
  }

  // Generate date list for 53 weeks (371 days) ending today
  const today = new Date();
  // Align so the last day is today or end of week
  const days = [];
  const totalDays = 53 * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (totalDays - 1));

  let totalContributions = 0;
  let gitHubTotal = 0;
  let leetCodeTotal = 0;

  for (let i = 0; i < totalDays; i++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + i);
    const dateStr = current.toISOString().split("T")[0];

    const ghCount = github.success ? (github.data[dateStr] || 0) : 0;
    const lcCount = leetcode.success ? (leetcode.data[dateStr] || 0) : 0;
    const dayTotal = ghCount + lcCount;

    totalContributions += dayTotal;
    gitHubTotal += ghCount;
    leetCodeTotal += lcCount;

    days.push({
      date: dateStr,
      count: dayTotal,
      level: calculateLevel(dayTotal),
      breakdown: {
        github: ghCount,
        leetcode: lcCount,
      },
    });
  }

  const generatedDateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const activityData = {
    totalContributions,
    gitHubTotal,
    leetCodeTotal,
    generatedAt: generatedDateFormatted,
    sources: {
      github: github.success,
      leetcode: leetcode.success,
    },
    days,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(activityData, null, 2), "utf8");
  console.log(`[Activity] Successfully wrote activity data to ${outputPath}`);
  console.log(`[Activity] Total: ${totalContributions} (GitHub: ${gitHubTotal}, LeetCode: ${leetCodeTotal})`);
}

generateActivity();
