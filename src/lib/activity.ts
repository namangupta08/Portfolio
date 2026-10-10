import fs from "fs";
import path from "path";

export interface ActivityDay {
  date: string;
  count: number;
  level: number;
  breakdown?: {
    github: number;
    leetcode: number;
  };
}

export interface ActivityWeek {
  days: ActivityDay[];
}

export interface ActivityData {
  isReal: boolean;
  totalContributions: number;
  gitHubTotal: number;
  leetCodeTotal: number;
  generatedAt: string;
  sources: {
    github: boolean;
    leetcode: boolean;
  };
  weeks: ActivityWeek[];
}

export function getActivityData(): ActivityData {
  const filePath = path.join(process.cwd(), "data", "activity.json");

  try {
    if (!fs.existsSync(filePath)) {
      return getDecorativeFallback();
    }

    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) {
      return getDecorativeFallback();
    }

    const json = JSON.parse(raw);
    if (!json.days || !Array.isArray(json.days) || json.days.length === 0) {
      return getDecorativeFallback();
    }

    // Chunk 371 days into 53 weeks of 7 days
    const weeks: ActivityWeek[] = [];
    const days: ActivityDay[] = json.days;

    for (let i = 0; i < days.length; i += 7) {
      weeks.push({
        days: days.slice(i, i + 7),
      });
    }

    return {
      isReal: true,
      totalContributions: json.totalContributions || 0,
      gitHubTotal: json.gitHubTotal || 0,
      leetCodeTotal: json.leetCodeTotal || 0,
      generatedAt: json.generatedAt || "",
      sources: json.sources || { github: false, leetcode: false },
      weeks,
    };
  } catch (err) {
    console.warn("Failed to load activity.json, falling back to decorative pattern:", err);
    return getDecorativeFallback();
  }
}

function getDecorativeFallback(): ActivityData {
  // 53 weeks x 7 days illustrative geometric pattern without invented counts
  const weeks: ActivityWeek[] = [];
  const now = new Date();

  for (let w = 0; w < 53; w++) {
    const days: ActivityDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(now);
      dayDate.setDate(now.getDate() - (53 * 7 - (w * 7 + d)));
      const dateStr = dayDate.toISOString().split("T")[0];

      // Clean repeating subtle wave pattern
      const level = (w + d) % 9 === 0 ? 2 : (w * 2 + d) % 5 === 0 ? 1 : 0;
      days.push({
        date: dateStr,
        count: 0,
        level,
      });
    }
    weeks.push({ days });
  }

  return {
    isReal: false,
    totalContributions: 0,
    gitHubTotal: 0,
    leetCodeTotal: 0,
    generatedAt: "",
    sources: { github: false, leetcode: false },
    weeks,
  };
}
