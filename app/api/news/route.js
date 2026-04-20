import { NextResponse } from 'next/server';
import { createNews, getLatestNews } from '@/lib/data';

export async function GET() {
  const news = await getLatestNews(30);
  return NextResponse.json(news);
}

export async function POST(req) {
  const payload = await req.json();
  if (!payload?.title || !payload?.category || !payload?.body || !payload?.excerpt || !payload?.heroImage) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await createNews(payload);
  return NextResponse.json({ ok: true }, { status: 201 });
}
