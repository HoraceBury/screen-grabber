const { chromium } = require("playwright");
const path = require("path");
require("dotenv").config();

// Configuration
const CONFIG = {
  TARGET_URL: process.env.TARGET_URL || "https://example.com",
  SCREENSHOT_PATH: path.join(__dirname, "screenshot.png"),
  VIEWPORT_WIDTH: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
  VIEWPORT_HEIGHT: parseInt(process.env.VIEWPORT_HEIGHT) || 720,
};

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: CONFIG.VIEWPORT_WIDTH, height: CONFIG.VIEWPORT_HEIGHT },
  });
  const page = await context.newPage();

  try {
    console.log(`Navigating to ${CONFIG.TARGET_URL}...`);
    await page.goto(CONFIG.TARGET_URL, { waitUntil: "networkidle" });

    console.log("Capturing screenshot...");
    await page.screenshot({ path: CONFIG.SCREENSHOT_PATH, fullPage: true });
    console.log(`Screenshot saved to ${CONFIG.SCREENSHOT_PATH}`);
  } catch (error) {
    console.error("Error during execution:", error.message);
  } finally {
    await browser.close();
    console.log("Browser closed.");
  }
}

run();
