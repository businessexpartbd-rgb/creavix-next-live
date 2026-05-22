# Deploying Creavix to Vercel

This file documents the **only** non-code thing required to ship: granting
the Creavix It Vercel team permission to deploy commits authored by the
GitHub user who pushed them.

## TL;DR

The site builds and runs cleanly:

```bash
npm install       # 245 packages, no warnings
npm run typecheck # strict TS, exit 0
npm run build     # 20 routes static/dynamic, exit 0
npm run start     # all pages 200, all APIs respond, no errors
```

If a Vercel deployment shows status **"Blocked"**, it's not a code problem.
It's a [Vercel Hobby plan policy](https://vercel.com/docs/deployments/git#using-hobby-teams)
that auto-blocks deployments triggered by GitHub authors who are not
members of the Vercel team. The Vercel bot posts a comment on the
PR/commit explaining this with three fix options.

## How to unblock

Pick **one** of these:

### A. Merge the PR through GitHub's UI (recommended — 10 seconds)

When you click **Merge pull request** or **Squash and merge** in GitHub,
the resulting merge commit on `main` is authored by **you**, not by the
PR author. Since you're the Vercel team owner, your commit deploys with
no permission check. This is the fastest, cleanest path.

### B. Grant access via the Vercel bot's link

The Vercel bot leaves a comment on every blocked commit/PR with a link
labelled *"If you're the user who initiated this build request, click
here to request access"*. Clicking it adds the deploying author to your
team and unblocks all currently-pending deployments at once.

### C. Make the repository public

Public repos on the Hobby plan allow anyone-deploys by design.
`Settings → General → Change visibility → Make public`. Choose this
only if you're OK with the source being public.

## What's already configured

- `vercel.json` — `framework: "nextjs"`, plus a daily cron at 16:00 UTC
  (= 22:00 BD) hitting `/api/cron/followup`.
- `.env.example` — all environment variables you'd want to set on Vercel
  (none of them are required for a successful deploy).
- `next.config.mjs` — strict CSP, security headers, image optimization
  with AVIF/WebP and a remote allowlist for YouTube thumbnails.

## Optional environment variables

These all degrade gracefully when missing. Set them on Vercel only when
you want to enable the corresponding feature.

| Variable | Effect when set |
| --- | --- |
| `ANTHROPIC_API_KEY` | ChatBot uses Claude (claude-3-5-haiku-latest). Without it, it answers from a small bilingual offline knowledge base. |
| `RESEND_API_KEY` | Subscribe form sends a real welcome email + admin notification. Reviews submissions are forwarded to `info@creavixit.com`. The nightly cron emits a heartbeat. Without it, the subscribe modal falls back to a `mailto:` link. |
| `CRON_SECRET` | Required Authorization for the cron endpoint. Vercel automatically sends this header to scheduled functions; set it on Vercel only. |

## Custom domain

If `www.creavixit.com` should serve this project:

1. Vercel Project → **Domains** → add `www.creavixit.com`.
2. Update DNS at your registrar:
   - `CNAME www → cname.vercel-dns.com`
   - or follow the A/AAAA records Vercel shows.
3. Wait ~minutes for DNS propagation.

The site already emits absolute OG image URLs and JSON-LD pinned to
`https://www.creavixit.com`, so once the domain is live, social link
previews (WhatsApp, Facebook, Twitter, LinkedIn) will resolve to the
correct logo and branding without any code changes.
