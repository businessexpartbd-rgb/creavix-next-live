import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
export const runtime = 'nodejs';

const DB_PATH = path.join(process.cwd(), 'data', 'reviews.json');

export interface DbReview {
  id: string;
  name: string;
  email_masked: string;
  rating: number;
  review_en: string;
  review_bn?: string;
  verified: boolean;
  created_at: string;
  avatar_color: string;
}

async function readDb(): Promise<DbReview[]> {
  try {
    const raw = await readFile(DB_PATH, 'utf8');
    return JSON.parse(raw) as DbReview[];
  } catch {
    return [];
  }
}

async function writeDb(data: DbReview[]): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// GET /api/reviews — returns all reviews sorted newest-first
export async function GET() {
  const reviews = await readDb();
  const sorted = [...reviews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return NextResponse.json(sorted);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AVATAR_COLORS = [
  '#7C3AED', '#A855F7', '#8B5CF6', '#6D28D9', '#9333EA', '#C084FC',
];

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  const head = user.length <= 2 ? user[0] : user.slice(0, 2);
  return `${head}***@${domain}`;
}

// POST /api/reviews — submit new review (wraps existing /api/review Turnstile logic)
export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    rating?: number;
    review_en?: string;
    review_bn?: string;
    turnstileToken?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // Validate required fields
  const name = (body.name ?? '').toString().trim().slice(0, 80);
  const email = (body.email ?? '').toString().trim().toLowerCase();
  const rating = Math.max(1, Math.min(5, Math.round(Number(body.rating) || 0)));
  const review_en = (body.review_en ?? '').toString().trim().slice(0, 2000);
  const review_bn = (body.review_bn ?? '').toString().trim().slice(0, 2000);

  if (!name || !review_en || !rating) {
    return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  // Cloudflare Turnstile verification (skip if no secret configured)
  const secretKey = process.env.TURNSTILE_SECRET_KEY ?? '';
  const token = (body.turnstileToken ?? '').toString().trim();

  if (secretKey) {
    if (!token) {
      return NextResponse.json({ error: 'human verification required' }, { status: 400 });
    }
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
  }

  const reviews = await readDb();
  const avatarColor = AVATAR_COLORS[reviews.length % AVATAR_COLORS.length];

  const newReview: DbReview = {
    id: `r${Date.now()}`,
    name,
    email_masked: maskEmail(email),
    rating,
    review_en,
    review_bn: review_bn || undefined,
    verified: true,
    created_at: new Date().toISOString(),
    avatar_color: avatarColor,
  };

  reviews.unshift(newReview);
  await writeDb(reviews);

  return NextResponse.json({ ok: true, review: newReview });
}
