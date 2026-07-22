/**
 * Renders scripts/resume/resume.html to public/resume/sedjro-tovihouande-resume.pdf
 * using headless Chromium. Run: node scripts/generate-resume.mjs
 */
import { chromium } from "playwright-core";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const root = path.resolve(import.meta.dirname, "..");
await mkdir(path.join(root, "public/resume"), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto("file://" + path.join(root, "scripts/resume/resume.html"), { waitUntil: "networkidle" });
await page.pdf({
  path: path.join(root, "public/resume/sedjro-tovihouande-resume.pdf"),
  format: "Letter",
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});
await browser.close();
console.log("Wrote public/resume/sedjro-tovihouande-resume.pdf");
