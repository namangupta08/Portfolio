# Data To Fill (Pending Author Assets & Information)

This document tracks all external assets, configuration tokens, project details, and architectural decisions required to finalize the portfolio for **Naman Gupta**.

---

## 1. Static Assets to Place in `/public`

| Asset | Expected Path | Current Fallback in Code | Action Needed |
| :--- | :--- | :--- | :--- |
| **Resume PDF** | `/public/Naman-Gupta-Resume.pdf` | Clean "Resume coming soon" card with direct Email CTA button | Place your final resume PDF at this path. The viewer and download buttons will immediately activate automatically. |
| **Profile Photo** | `/public/about/me.jpg` | Monogram frame (`NG`) with hover straighten | Place your headshot photo at `/public/about/me.jpg`. |
| **Epigee Inc. Logo** | `/public/logos/epigee.png` | Lucide `Building2` on soft tinted rounded square | Place company logo (PNG or SVG) at `/public/logos/epigee.png`. |
| **Zevise Logo** | `/public/logos/zevise.png` | Lucide `Building2` on soft tinted rounded square | Place company logo (PNG or SVG) at `/public/logos/zevise.png`. |
| **DocFlow Screenshot** | `/public/projects/docflow.png` | Minimal browser frame with project category, title & tech chips | Save product screenshot at `/public/projects/docflow.png`. |
| **SpendWise Screenshot** | `/public/projects/spendwise.png` | Minimal browser frame with project category, title & tech chips | Save dashboard screenshot at `/public/projects/spendwise.png`. |
| **VistaVoyage Screenshot** | `/public/projects/vistavoyage.png` | *Present* (`/public/projects/vistavoyage.png`) | Already rendering in live browser frame. |

---

## 2. Project Details & Links (`src/data/projects.ts`)

Per instructions, projects with missing summaries or links are hidden or have buttons omitted to prevent empty shells:

1. **DocFlow**:
   - `githubUrl`: Provide your repository link when ready to enable the "GitHub" button.
2. **Zevise**:
   - `link`: Provide your live demo or repository link.
3. **SwiftCabs**:
   - Summary, tech stack, and links (`summary`, `stack`, `liveUrl`, `githubUrl`). (Currently hidden from More Work).
4. **StudyNothing**:
   - Summary, tech stack, and links (`summary`, `stack`, `liveUrl`, `githubUrl`). (Currently hidden from More Work).
5. **ChatApp**:
   - Summary, tech stack, and links (`summary`, `stack`, `liveUrl`, `githubUrl`). (Currently hidden from More Work).

---

## 3. About Section Interests (`src/data/` or `About.tsx`)

1. **Sports**:
   - Favorite sport (`[FILL IN favorite sport]`). The line is currently hidden beneath the "Sports" card until provided.
2. **Formula 1**:
   - Favorite team (`[FILL IN favorite team]`). The line is currently hidden beneath the "Formula 1" card until provided.

---

## 4. GitHub Contribution Activity (`npm run activity`)

- **Environment Variable**: `GITHUB_TOKEN`
- **Current Behavior**: `npm run activity` fetched **894** real submissions from your public LeetCode profile (`namangupta032`). Because `GITHUB_TOKEN` was not set in the environment, GitHub contributions were set to 0.
- **Action Needed**: Add your GitHub personal access token to your shell or `.env.local`:
  ```bash
  export GITHUB_TOKEN="ghp_your_personal_access_token"
  npm run activity
  ```
  This will query the GitHub GraphQL API, merge your GitHub commits and LeetCode submissions day-by-day, and update `data/activity.json`.

---

## 5. Git History Decision (Phase 0 Audit Findings)

During the Phase 0 audit, the following earlier commits were found to contain legacy/template references (e.g. references to previous template names):
- `c3eb820`: `feat: redesign portfolio with calm single-column layout, blog, projects, and resume`
- `f963637`: `Fresh portfolio codebase`

Per strict safety constraints, history was **not** rewritten. You have two options:

1. **Option A (Recommended for new personal repo - Squash and Recreate)**:
   Create a clean initial commit with the current state of the repository:
   ```bash
   git checkout --orphan clean-main
   git add -A
   git commit -m "feat: initial commit for Naman Gupta developer portfolio"
   git branch -D main
   git branch -m main
   git push -f origin main
   ```
2. **Option B (Preserve recent commits using `git-filter-repo`)**:
   Use `git-filter-repo` to scrub previous references from history:
   ```bash
   git-filter-repo --replace-text <(echo "himanshu==>naman")
   ```
