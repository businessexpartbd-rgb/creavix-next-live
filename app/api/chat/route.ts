import { NextResponse } from 'next/server';
import { CHATBOT_SYSTEM_PROMPT, offlineReply } from '../../../lib/chatbot';

export const runtime = 'nodejs';

interface ChatBody {
  message?: string;
  history?: Array<{ role: 'user' | 'bot'; text: string }>;
}

/**
 * POST /api/chat
 *  - If ANTHROPIC_API_KEY is set, calls Claude directly via fetch
 *    (no SDK import — keeps the optional dep truly optional).
 *  - Else returns a curated bilingual reply from the offline KB.
 */
export async function POST(req: Request) {
  let body: ChatBody = {};
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const message = (body.message ?? '').toString().slice(0, 1000).trim();
  if (!message) {
    return NextResponse.json({ error: 'empty message' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: offlineReply(message),
      provider: 'offline',
    });
  }

  // Real Anthropic call — uses the public messages API directly.
  // Keeps the dep optional so builds don't fail when @anthropic-ai/sdk isn't installed.
  try {
    const messages = [
      ...((body.history ?? [])
        .filter((h) => h && h.text)
        .slice(-6)
        .map((h) => ({
          role: h.role === 'bot' ? ('assistant' as const) : ('user' as const),
          content: h.text.toString().slice(0, 1000),
        }))),
      { role: 'user' as const, content: message },
    ];

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 12_000);
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 512,
        system: CHATBOT_SYSTEM_PROMPT,
        messages,
      }),
      signal: ac.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      return NextResponse.json({
        reply: offlineReply(message),
        provider: 'offline-fallback',
      });
    }
    const data: { content?: Array<{ type: string; text?: string }> } = await res.json();
    const reply = data.content
      ?.filter((b) => b.type === 'text' && b.text)
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!reply) {
      return NextResponse.json({
        reply: offlineReply(message),
        provider: 'offline-empty',
      });
    }
    return NextResponse.json({ reply, provider: 'anthropic' });
  } catch {
    return NextResponse.json({
      reply: offlineReply(message),
      provider: 'offline-error',
    });
  }
}
