import { NextResponse } from 'next/server';
import { SITE } from '../../../lib/site-data';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/subscribe
 *   Body: { email: string }
 *   - With RESEND_API_KEY  → sends admin notification + welcome email.
 *   - Without              → returns { fallback: true } so the UI offers mailto.
 */
export async function POST(req: Request) {
  let email = '';
  try {
    const body: { email?: string } = await req.json();
    email = (body.email ?? '').toString().trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Soft-fallback path — UI shows the mailto button.
    console.log(`[subscribe] (no RESEND_API_KEY) would subscribe: ${email}`);
    return NextResponse.json({ ok: false, fallback: true });
  }

  const adminSubject = `🔔 New Creavix subscriber: ${email}`;
  const welcomeHtml =
    `<div style="font-family:DM Sans,sans-serif;line-height:1.6;color:#0a0a0f">` +
    `<h2 style="color:#E8173A;margin:0 0 12px">🎬 Welcome to Creavix!</h2>` +
    `<p>Thanks for subscribing — you'll be the first to hear about new packages, offers and behind-the-scenes work.</p>` +
    `<p style="font-family:Hind Siliguri,sans-serif;color:#444">নতুন অফার, প্যাকেজ ও ভিডিও আপডেট সবার আগে আপনার ইনবক্সে।</p>` +
    `<p>📞 ${SITE.whatsapp}<br>📧 ${SITE.email1}<br>📍 ${SITE.address_en}</p>` +
    `<p style="margin-top:24px;font-size:12px;color:#888">— Creavix IT Solution</p>` +
    `</div>`;

  try {
    // Admin notification
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: 'Creavix <noreply@creavixit.com>',
        to: SITE.email1,
        subject: adminSubject,
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      }),
    });
    // Welcome to subscriber
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: 'Creavix <hello@creavixit.com>',
        to: email,
        subject: '🎬 Creavix-এ স্বাগতম! · Welcome to Creavix',
        html: welcomeHtml,
      }),
    });
    if (!r.ok) {
      return NextResponse.json({ ok: false, fallback: true });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, fallback: true });
  }
}
