import { NextResponse } from 'next/server';
import { SITE } from '../../../../lib/site-data';

export const runtime = 'nodejs';

/**
 * GET/POST /api/cron/followup
 * Vercel Cron hits this nightly at 16:00 UTC = 22:00 BD.
 * Currently a stub: returns ok and (with RESEND_API_KEY) emails the admin a
 * heartbeat. When subscribers are persisted (KV/Postgres), iterate that list
 * and send the daily follow-up here.
 */
export async function GET(req: Request) {
  // Authenticate the cron — Vercel sends 'Authorization: Bearer $CRON_SECRET'.
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = req.headers.get('authorization') ?? '';
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const heartbeat = {
    ranAt: new Date().toISOString(),
    sent: 0,
    note: apiKey ? 'Resend configured; subscriber list not persisted yet.' : 'No RESEND_API_KEY.',
  };
  console.log('[cron/followup] heartbeat', JSON.stringify(heartbeat));

  if (apiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: 'Creavix Cron <noreply@creavixit.com>',
          to: SITE.email1,
          subject: '⏱ Creavix nightly follow-up cron',
          html: `<p>Cron ran at ${heartbeat.ranAt}.</p><p>${heartbeat.note}</p>`,
        }),
      });
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ ok: true, ...heartbeat });
}

export const POST = GET;
