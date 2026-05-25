// Generate Google-compliant favicons + WhatsApp-friendly icons from public/logo.png
//   - favicon.ico (multi-resolution 16/32/48) — Google fallback + WhatsApp link preview
//   - icon.png (96x96, Google recommended size for search results)
//   - icon-192.png (192x192, PWA + Android home screen)
//   - icon-512.png (512x512, PWA install)
//   - apple-icon.png (180x180, iOS home screen, padded brand bg)
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
const BRAND_BG = '#0A0A0F';

async function makeIcon({ size, outPath, padded = false }) {
  if (padded) {
    // Apple touch icon — needs background fill (iOS doesn't allow transparency)
    const padSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${Math.round(size * 0.18)}" ry="${Math.round(size * 0.18)}" fill="${BRAND_BG}"/>
    </svg>`;
    const innerSize = Math.round(size * 0.78);
    const inner = await sharp(SRC_LOGO)
      .resize({ width: innerSize, height: innerSize, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    const offset = Math.round((size - innerSize) / 2);
    await sharp(Buffer.from(padSvg))
      .composite([{ input: inner, top: offset, left: offset }])
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(outPath);
  } else {
    // Transparent favicon (Google + WhatsApp prefer this)
    await sharp(SRC_LOGO)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(outPath);
  }
  const sz = statSync(outPath).size;
  console.log(`✓ ${outPath.replace(ROOT + '/', '')}: ${size}x${size} · ${(sz / 1024).toFixed(1)} KB`);
}

async function makeIco() {
  // Generate 16, 32, 48 PNGs in memory, then bundle as multi-res .ico
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map((s) =>
      sharp(SRC_LOGO)
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
        .png()
        .toBuffer(),
    ),
  );
  const icoBuffer = await pngToIco(buffers);
  const out = resolve(ROOT, 'public/favicon.ico');
  writeFileSync(out, icoBuffer);
  const sz = statSync(out).size;
  console.log(`✓ public/favicon.ico: 16+32+48 multi-res · ${(sz / 1024).toFixed(1)} KB`);
}

// 1. Multi-resolution .ico (Google + WhatsApp legacy)
await makeIco();

// 2. 96x96 PNG (Google's preferred favicon size for search results)
await makeIcon({ size: 96, outPath: resolve(ROOT, 'public/icon.png') });

// 3. 192x192 (PWA + Android Chrome home screen)
await makeIcon({ size: 192, outPath: resolve(ROOT, 'public/icon-192.png') });

// 4. 512x512 (PWA install icon, splashscreen)
await makeIcon({ size: 512, outPath: resolve(ROOT, 'public/icon-512.png') });

// 5. 180x180 padded with brand bg (Apple home screen)
await makeIcon({ size: 180, outPath: resolve(ROOT, 'public/apple-icon.png'), padded: true });

console.log('\n✅ All favicons generated. Push to deploy.');
