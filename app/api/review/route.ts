import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { maskEmail } from '@/lib/reviews';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    rating?: number;
    text?: string;
    turnstileToken?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // ✅ Cloudflare Turnstile Verification
  const token = (body.turnstileToken ?? '').toString().trim();
  if (!token) {
    return NextResponse.json({ error: 'human verification required' }, { status: 400 });
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY ?? '';
  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    },
  );
  const verifyData = (await verifyRes.json()) as { success: boolean };
  if (!verifyData.success) {
    return NextResponse.json({ error: 'human verification failed' }, { status: 403 });
  }

  // Fields validate
  const name = (body.name ?? '').toString().trim().slice(0, 80);
  const email = (body.email ?? '').toString().trim().toLowerCase();
  const phone = (body.phone ?? '').toString().trim().slice(0, 30);
  const rating = Math.max(1, Math.min(5, Math.round(Number(body.rating) || 0)));
  const text = (body.text ?? '').toString().trim().slice(0, 2000);

  if (!name || !text || !rating) {
    return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const submission = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: phone || null,
    rating,
    text,
  };

  // ✅ Save review to Supabase
  try {
    // Initialize Supabase client only at runtime
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: dbError } = await supabase
      .from('reviews')
      .insert({
        name,
        email,
        email_masked: maskEmail(email),
        phone: phone || null,
        rating,
        comment: text,
        approved: true, // Auto-approve reviews
      });

    if (dbError) {
      console.error('[review] database error:', dbError);
      return NextResponse.json({ error: 'failed to save review' }, { status: 500 });
    }
  } catch (error) {
    console.error('[review] unexpected error:', error);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }

  // ✅ Privacy: don't log PII; only log a sanitized event marker
  if (process.env.NODE_ENV !== 'production') {
    console.log('[review] new submission received', { rating, hasPhone: !!phone });
  }

  // Optional: Resend email notification
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Creavix Reviews <reviews@creavixit.com>',
          to: 'info@creavixit.com',
          subject: `⭐️ ${rating}-star review from ${name}`,
          html:
            `<p><strong>${name}</strong> — ${maskEmail(email)}${phone ? ` · ${phone}` : ''}</p>` +
            `<p>Rating: ${rating}/5</p><blockquote>${text.replace(/</g, '&lt;')}</blockquote>` +
            `<p style="color:#888;font-size:12px">Received ${submission.receivedAt}</p>`,
        }),
      });
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ ok: true });
}
