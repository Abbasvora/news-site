import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ item }) {
  return (
    <article className="overflow-hidden rounded-xl border border-brand-700/60 bg-brand-900/50">
      <div className="relative h-52 w-full">
        <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs text-brand-400">
          <span className="rounded-full border border-brand-600/70 px-2 py-1">{item.category}</span>
          <time>{new Date(item.createdAt).toLocaleDateString()}</time>
        </div>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="text-sm leading-6 text-purple-200/90">{item.excerpt}</p>
        <Link href={`/news/${item.slug}`} className="inline-flex rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-500">
          Read full article
        </Link>
      </div>
    </article>
  );
}
