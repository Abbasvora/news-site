import { notFound } from 'next/navigation';
import Link from 'next/link';
import RichMedia from '@/components/RichMedia';
import { getNewsBySlug, getRelatedNews } from '@/lib/data';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) {
    return { title: 'News Not Found | PurplePulse News' };
  }
  return {
    title: `${item.title} | PurplePulse News`,
    description: item.excerpt
  };
}

export default async function NewsDetailPage({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) notFound();

  const related = await getRelatedNews(item.category, item.slug);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_300px]">
      <article className="rounded-xl border border-brand-700/60 bg-brand-900/50 p-6">
        <p className="mb-4 text-xs uppercase tracking-widest text-brand-400">{item.category}</p>
        <h1 className="text-4xl font-extrabold text-white">{item.title}</h1>
        <p className="mt-2 text-sm text-brand-300">Published {new Date(item.createdAt).toLocaleString()}</p>
        <p className="mt-5 rounded-lg border border-brand-700/50 bg-brand-950/60 p-4 text-lg text-purple-100">{item.excerpt}</p>
        <div className="prose-news mt-6">
          <p>{item.body}</p>
        </div>
        <div className="mt-6">
          <RichMedia media={item.media} embeds={item.embeds} />
        </div>
      </article>

      <aside className="space-y-3 rounded-xl border border-brand-700/60 bg-brand-900/60 p-4">
        <h2 className="text-lg font-semibold text-brand-300">Relevant News</h2>
        {related.length ? (
          related.map((news) => (
            <Link key={news._id} href={`/news/${news.slug}`} className="block rounded-lg border border-brand-700/50 p-3 hover:bg-brand-800/60">
              <p className="text-xs uppercase tracking-wide text-brand-400">{news.category}</p>
              <p className="mt-1 font-semibold text-white">{news.title}</p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-purple-200">No related stories yet.</p>
        )}
      </aside>
    </main>
  );
}
