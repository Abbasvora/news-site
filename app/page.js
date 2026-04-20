import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import AdSidebar from '@/components/AdSidebar';
import { getAds, getLatestNews } from '@/lib/data';

export const revalidate = 120;

export default async function HomePage() {
  const [news, ads] = await Promise.all([getLatestNews(6), getAds()]);
  const [headline, ...moreNews] = news;

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <section className="rounded-2xl border border-brand-700/60 bg-gradient-to-r from-brand-900 to-brand-800 p-8">
        <p className="mb-3 inline-flex rounded-full border border-brand-400/50 px-3 py-1 text-xs uppercase tracking-wide text-brand-300">Breaking focus</p>
        <h1 className="max-w-3xl text-4xl font-black text-white">Modern News Platform: SSR, Cached Articles, Admin Publishing, and Sponsored Content</h1>
        <p className="mt-4 max-w-2xl text-purple-100">PurplePulse is built as a fullstack newsroom experience with landing pages, routed article pages, sidebar relevance, and ad management.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/news" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500">Browse all news</Link>
          <Link href="/admin" className="rounded-md border border-brand-500/70 px-4 py-2 text-sm font-semibold text-brand-200 hover:bg-brand-800">Open admin panel</Link>
        </div>
      </section>

      {headline && (
        <section className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <NewsCard item={headline} />
          <AdSidebar ads={ads.slice(0, 2)} />
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Coverage</h2>
          <Link href="/news" className="text-brand-300 hover:text-brand-200">See all →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moreNews.map((item) => <NewsCard key={item._id} item={item} />)}
        </div>
      </section>
    </main>
  );
}
