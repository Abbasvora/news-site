'use client';

import { useState } from 'react';

function splitLines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminPage() {
  const [message, setMessage] = useState('');

  async function submitNews(event) {
    event.preventDefault();
    setMessage('Publishing story...');
    const form = new FormData(event.currentTarget);

    const payload = {
      title: form.get('title'),
      category: form.get('category'),
      excerpt: form.get('excerpt'),
      body: form.get('body'),
      heroImage: form.get('heroImage'),
      media: splitLines(String(form.get('media') || '')),
      embeds: splitLines(String(form.get('embeds') || ''))
    };

    const response = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMessage(response.ok ? 'Story published successfully.' : 'Failed to publish story.');
    if (response.ok) event.currentTarget.reset();
  }

  async function submitAd(event) {
    event.preventDefault();
    setMessage('Adding advertisement...');
    const form = new FormData(event.currentTarget);

    const payload = {
      brand: form.get('brand'),
      image: form.get('image'),
      link: form.get('link')
    };

    const response = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMessage(response.ok ? 'Advertisement added.' : 'Failed to add advertisement.');
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2">
      <section className="rounded-xl border border-brand-700/60 bg-brand-900/60 p-5">
        <h1 className="mb-4 text-2xl font-bold">Admin: Publish News</h1>
        <form onSubmit={submitNews} className="space-y-3">
          <input name="title" required placeholder="Headline" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <input name="category" required placeholder="Category" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <input name="excerpt" required placeholder="Short excerpt" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <input name="heroImage" required placeholder="Hero image URL" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <textarea name="body" required rows={6} placeholder="Full story body" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <textarea name="media" rows={4} placeholder="Media URLs (one per line)" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <textarea name="embeds" rows={4} placeholder="Instagram / X / Facebook URLs" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <button className="rounded-md bg-brand-600 px-4 py-2 font-semibold hover:bg-brand-500">Publish News</button>
        </form>
      </section>

      <section className="rounded-xl border border-brand-700/60 bg-brand-900/60 p-5">
        <h2 className="mb-4 text-2xl font-bold">Admin: Advertisement Banners</h2>
        <form onSubmit={submitAd} className="space-y-3">
          <input name="brand" required placeholder="Advertiser name" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <input name="image" required placeholder="Banner image URL" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <input name="link" required placeholder="Destination URL" className="w-full rounded-md border border-brand-700 bg-brand-950 p-2" />
          <button className="rounded-md bg-brand-600 px-4 py-2 font-semibold hover:bg-brand-500">Attach Banner</button>
        </form>
        <p className="mt-4 text-sm text-brand-300">{message}</p>
      </section>
    </main>
  );
}
