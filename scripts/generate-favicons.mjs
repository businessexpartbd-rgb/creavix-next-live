// Generate Google + Facebook + WhatsApp + Messenger compliant favicons.
//
// Strategy: brand-coloured rounded-square BG behind the logo, so the
// favicon stays clearly visible against any background (Google Search
// results, Messenger chat list, browser tabs on light themes).  A
// transparent PNG looks great on dark themes but fades into white
// search result rows.
//
// Run any time logo.png changes:
//   node scripts/generate-favicons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_LOGO = resolve(ROOT, 'public/logo.png');

// Brand red background — ensures favicon is clearly identifiable in
// Google search rows (light) and Messenger chat list (light).
const BRAND_GRAD_TOP = '#E8173A';
const BRAND_GRAD_BOT = '#9A0F24';

// Build a rounded-square brand background with a subtle vertical
// gradient. Returns a PNG buffer ready to composite the logo onto.
function makeRoundedBgSvg(size) {
  const r = Math.round(size * 0.22);
  return Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${BRAND_GRAD_TOP}"/>
          <stop offset="100%" stop-color="${BRAND_GRAD_BOT}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="${r}" ry="${r}" fill="url(#g)"/>
    </svg>
  `);
}

// Composite the brand logo (white-tinted for max contrast) on top of
// the brand background. Returns a buffer in the requested size.
async function makeFaviconBuffer(size) {
  const bg = makeRoundedBgSvg(size);
  const innerSize = Math.round(size * 0.74);
  // Logo is recoloured to pure white via a luminance-only colour matrix,
  // so it stays sharp and readable against the brand-red background.
  const logo = await sharp(SRC_LOGO)
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3',
    })
    // Convert all visible pixels to pure white while keeping alpha.
    .ensureAlpha()
    .recomb([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
    .linear(255, 0)
    .sharpen({ sigma: 0.6 })
    .toBuffer();
  const offset = Math.round((size - innerSize) / 2);
  return await sharp(bg)
    .composite([{ input: logo, top: offset, left: offset }])
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
}

async function makeIcon({ size, outPath }) {
  const buf = await makeFaviconBuffer(size);
  writeFileSync(outPath, buf);
  const sz = statSync(outPath).size;
  console.log(`✓ ${outPath.replace(ROOT + '/', '')}: ${size}x${size} · ${(sz / 1024).toFixed(1)} KB`);
}

async function makeIco() {
  // Google requires multiples of 48px; ICO file bundles 16/32/48.
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(sizes.map(makeFaviconBuffer));
  const icoBuffer = await pngToIco(buffers);
  const out = resolve(ROOT, 'public/favicon.ico');
  writeFileSync(out, icoBuffer);
  console.log(`✓ public/favicon.ico: 16+32+48 multi-res · ${(icoBuffer.length / 1024).toFixed(1)} KB`);
}

await makeIco();
await makeIcon({ size: 96, outPath: resolve(ROOT, 'public/icon.png') });
await makeIcon({ size: 192, outPath: resolve(ROOT, 'public/icon-192.png') });
await makeIcon({ size: 512, outPath: resolve(ROOT, 'public/icon-512.png') });
await makeIcon({ size: 180, outPath: resolve(ROOT, 'public/apple-icon.png') });

console.log('\n✅ Favicons regenerated with brand-color rounded-square BG.');
console.log('   - Visible on white search result rows (Google)');
console.log('   - Visible in Messenger / WhatsApp chat list');
console.log('   - High-contrast white logo on brand red.');
