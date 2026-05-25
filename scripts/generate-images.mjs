// One-time generator: produces correctly-sized OG, Twitter, favicon and PWA
// icons from the existing 500x500 logo. Re-run any time the logo changes:
//   node scripts/generate-images.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_LOGO = resolve(ROOT, 'public/logo.png');

const BRAND_BG = '#0A0A0F';
const BRAND_RED = '#E8173A';

async function makeSocialCard({ width, height, outPath, tagline }) {
  // Background: dark + subtle radial brand glow at top-center
  const bgSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stop-color="${BRAND_RED}" stop-opacity="0.32"/>
          <stop offset="60%" stop-color="${BRAND_RED}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="t" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF4B6E"/>
          <stop offset="100%" stop-color="#E8173A"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="${BRAND_BG}"/>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="${width / 2}" y="${height * 0.78}" font-family="Impact, Arial Black, sans-serif"
        font-size="${Math.round(height * 0.07)}" letter-spacing="6" fill="url(#t)"
        text-anchor="middle" font-weight="900">CREAVIX</text>
      <text x="${width / 2}" y="${height * 0.86}" font-family="Arial, sans-serif"
        font-size="${Math.round(height * 0.034)}" fill="#A0A0B0" text-anchor="middle"
        letter-spacing="3">${tagline}</text>
      <rect x="${width * 0.35}" y="${height * 0.91}" width="${width * 0.3}" height="3" fill="${BRAND_RED}" rx="2"/>
    </svg>
  `;
  const bg = Buffer.from(bgSvg);

  // Logo at ~30% of the height, centered above the wordmark
  const logoH = Math.round(height * 0.36);
  const logo = await sharp(SRC_LOGO).resize({ height: logoH, fit: 'contain' }).toBuffer();

  await sharp(bg)
    .composite([{ input: logo, gravity: 'north', top: Math.round(height * 0.14), left: 0 }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(outPath);
  console.log('✓', outPath);
}

async function makeIcon({ size, outPath, padded = false }) {
  if (padded) {
    // Add a brand-tinted square background so apple-touch-icon looks good
    const padSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${Math.round(size * 0.18)}" ry="${Math.round(size * 0.18)}" fill="${BRAND_BG}"/>
    </svg>`;
    const innerSize = Math.round(size * 0.78);
    const inner = await sharp(SRC_LOGO).resize({ width: innerSize, height: innerSize, fit: 'contain' }).toBuffer();
    const offset = Math.round((size - innerSize) / 2);
    await sharp(Buffer.from(padSvg))
      .composite([{ input: inner, top: offset, left: offset }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);
  } else {
    await sharp(SRC_LOGO)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
  }
  console.log('✓', outPath);
}

await makeSocialCard({
  width: 1200,
  height: 630,
  outPath: resolve(ROOT, 'public/og-image.png'),
  tagline: 'AI VIDEO MARKETING AGENCY · BANGLADESH',
});
await makeSocialCard({
  width: 1200,
  height: 675,
  outPath: resolve(ROOT, 'public/twitter-image.png'),
  tagline: 'AI VIDEO MARKETING AGENCY · BANGLADESH',
});

// Public icons (consumed via Metadata.icons in app/layout.tsx)
await makeIcon({ size: 32, outPath: resolve(ROOT, 'public/icon.png') });
await makeIcon({ size: 192, outPath: resolve(ROOT, 'public/icon-192.png') });
await makeIcon({ size: 512, outPath: resolve(ROOT, 'public/icon-512.png') });
await makeIcon({ size: 180, outPath: resolve(ROOT, 'public/apple-icon.png'), padded: true });

// Print final sizes
const files = [
  'public/og-image.png',
  'public/twitter-image.png',
  'public/icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/apple-icon.png',
];
for (const f of files) {
  const buf = readFileSync(resolve(ROOT, f));
  const meta = await sharp(buf).metadata();
  console.log(`  ${f}: ${meta.width}x${meta.height} · ${(buf.length / 1024).toFixed(1)} KB`);
}
