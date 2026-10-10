const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const SCREENSHOTS_DIR = path.join(__dirname, "..", "docs", "screenshots");
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE_URL = "http://localhost:3001";

async function run() {
  console.log("Launching Chrome via Playwright...");
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const viewports = [
    { name: "mobile-390", width: 390, height: 844 },
    { name: "tablet-768", width: 768, height: 1024 },
    { name: "desktop-1440", width: 1440, height: 900 },
  ];

  const themes = ["dark", "light"];

  for (const vp of viewports) {
    for (const theme of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme,
      });
      const page = await context.newPage();

      // Set localStorage theme if light
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      if (theme === "light") {
        await page.evaluate(() => {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        });
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        });
      }
      await page.waitForTimeout(300);

      // Check horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`[${vp.name}][${theme}] Horizontal overflow: ${hasHorizontalScroll}`);

      // Capture full homepage screenshot
      const filename = `home-${vp.name}-${theme}.png`;
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, filename),
        fullPage: true,
      });
      console.log(`Saved screenshot: ${filename}`);

      // If mobile, test and screenshot mobile menu open
      if (vp.width === 390 && theme === "dark") {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);
        const menuBtn = await page.$('button[aria-label="Open navigation menu"]');
        if (menuBtn) {
          await menuBtn.click({ force: true });
          await page.waitForTimeout(300);
          await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, `mobile-menu-open.png`),
          });
          console.log("Saved mobile menu screenshot");
          // Close menu
          const closeBtn = await page.$('button[aria-label="Close navigation menu"]');
          if (closeBtn) await closeBtn.click({ force: true });
          await page.waitForTimeout(200);
        }
      }

      await context.close();
    }
  }

  // Test other pages on desktop-1440 dark
  console.log("Capturing key detail pages...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
  });
  const page = await desktopContext.newPage();

  // Projects page
  await page.goto(`${BASE_URL}/projects`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, "projects-desktop-dark.png"),
    fullPage: true,
  });

  // Project detail page
  await page.goto(`${BASE_URL}/projects/docflow`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, "project-docflow-desktop-dark.png"),
    fullPage: true,
  });

  // Blog index page
  await page.goto(`${BASE_URL}/blog`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, "blog-desktop-dark.png"),
    fullPage: true,
  });

  // Blog detail page
  await page.goto(`${BASE_URL}/blog/why-my-4-workers-were-slower-than-1`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, "blog-post-desktop-dark.png"),
    fullPage: true,
  });

  // Resume page
  await page.goto(`${BASE_URL}/resume`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, "resume-desktop-dark.png"),
    fullPage: true,
  });

  await desktopContext.close();
  await browser.close();
  console.log("Screenshot verification complete!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
