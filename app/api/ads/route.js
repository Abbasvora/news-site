import { NextResponse } from 'next/server';
import { createAd, getAds } from '@/lib/data';

export async function GET() {
  const ads = await getAds();
  return NextResponse.json(ads);
}

export async function POST(req) {
  const payload = await req.json();
  if (!payload?.brand || !payload?.image || !payload?.link) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await createAd(payload);
  return NextResponse.json({ ok: true }, { status: 201 });
}
