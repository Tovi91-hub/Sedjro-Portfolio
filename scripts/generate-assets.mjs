/**
 * One-off asset generator: renders the OG share image and PWA icons from
 * SVG sources using sharp. Outputs are committed to /public, so this only
 * needs to run when the branding changes:
 *
 *   npm run generate:assets
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");

const NAVY = "#0a1120";
const BORDER = "#223050";
const BLUE = "#6a9bf4";
const INK = "#e9eef7";
const MUTED = "#a6b2c8";

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <circle cx="220" cy="-40" r="420" fill="${BLUE}" opacity="0.08"/>
  <circle cx="1120" cy="680" r="380" fill="#d9b163" opacity="0.05"/>
  <rect x="80" y="88" width="88" height="88" rx="20" fill="${BLUE}"/>
  <text x="124" y="146" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="${NAVY}" text-anchor="middle">ST</text>
  <text x="80" y="286" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="${INK}">Sedjro Tovihouande</text>
  <text x="80" y="352" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="500" fill="${BLUE}">Software Developer &amp; Cloud Computing Professional</text>
  <text x="80" y="412" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${MUTED}">Technology Founder · U.S. Army NCO · Product Builder</text>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="${BORDER}" stroke-width="2"/>
  <text x="80" y="528" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${MUTED}">Secure, practical platforms for healthcare, operations &amp; business</text>
  <text x="80" y="576" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${INK}">sedjrotovihouande.com</text>
</svg>`;

const iconSvg = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${NAVY}"/>
  <rect x="1" y="1" width="62" height="62" rx="${radius - 1}" fill="none" stroke="${BORDER}" stroke-width="2"/>
  <text x="32" y="41" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${BLUE}" text-anchor="middle">ST</text>
</svg>`;

await mkdir(path.join(root, "public/og"), { recursive: true });
await mkdir(path.join(root, "public/icons"), { recursive: true });

await sharp(Buffer.from(ogSvg))
  .png()
  .toFile(path.join(root, "public/og/og-default.png"));
await sharp(Buffer.from(iconSvg(192, 14)))
  .resize(192, 192)
  .png()
  .toFile(path.join(root, "public/icons/icon-192.png"));
await sharp(Buffer.from(iconSvg(512, 14)))
  .resize(512, 512)
  .png()
  .toFile(path.join(root, "public/icons/icon-512.png"));
await sharp(Buffer.from(iconSvg(180, 14)))
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "src/app/apple-icon.png"));

console.log(
  "Generated: public/og/og-default.png, public/icons/icon-{192,512}.png, src/app/apple-icon.png",
);
