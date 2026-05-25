import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Diagnostic-only endpoint. Reports whether each expected environment
 * variable is present, **without leaking the value**. Designed to make
 * Vercel env-var misconfiguration debuggable from the public web.
 *
 *   GET /api/debug-env
 *   → { vars: { NEXT_PUBLIC_TURNSTILE_SITE_KEY: { set: true, length: 32, prefix: '0x4AAA' }, ... } }
 *
 * Remove this file once Turnstile is verified working.
 */
const KEYS = [
  'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
  'TURNSTILE_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'ANTHROPIC_API_KEY',
  'CRON_SECRET',
] as const;

export async function GET() {
  const report: Record<
    string,
    { set: boolean; length?: number; prefix?: string; isPublic: boolean }
  > = {};
  for (const k of KEYS) {
    const v = process.env[k];
    const isPublic = k.startsWith('NEXT_PUBLIC_');
    if (!v || v.length === 0) {
      report[k] = { set: false, isPublic };
    } else {
      report[k] = {
        set: true,
        length: v.length,
        // Only show first 6 chars so we can confirm it looks like a real key
        prefix: v.slice(0, 6),
        isPublic,
      };
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    runtime: 'server',
    vars: report,
    hint:
      'If NEXT_PUBLIC_TURNSTILE_SITE_KEY shows set:false, add it in ' +
      'Vercel → Settings → Environment Variables → Production scope, ' +
      'then redeploy.',
  });
}
