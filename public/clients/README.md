# Client logos

Drop **36 client logo files** in this folder named exactly:

```
Logo (1).png
Logo (2).png
Logo (3).png
…
Logo (36).png
```

The home-page client-logos slider reads these files automatically — no
code edits needed when you add or replace them.

## Format & size guidance

| Property | Recommendation |
| --- | --- |
| Format | **Transparent PNG** (preferred) or SVG. JPG also works but no transparency. |
| Background | Transparent — the site has a dark navy background, so the logo edges blend nicely. |
| Source size | Anything from 200 × 100 to 800 × 400 is fine. |
| Aspect ratio | Logos are displayed inside a 160 × 80 box with `object-fit: contain`, so any aspect ratio is safe — no cropping. |
| File size | Any size — Next.js Image will automatically optimize. |

## Automatic optimization — handled by Next.js

Every logo is rendered through `next/image`, which means **on the live
site** each browser will receive:

- **AVIF or WebP** format (instead of the original PNG/JPG, when the
  browser supports it — typically 30–60 % smaller).
- **The exact pixel size** the device needs (responsive `srcSet`),
  not the original full-size file.
- **Lazy loading** — only logos near the viewport download.
- **CDN caching** by Vercel for one year.

So you do NOT need to compress, resize, or convert the files yourself.
Just drop the originals here.

## Adding fewer or more than 36 later

If you ever need to change the count, edit only the constant in
`lib/site-data.ts`:

```ts
export const CLIENT_LOGO_COUNT = 36;
```

The slider regenerates itself from that number.
