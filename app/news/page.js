import NewsCard from '@/components/NewsCard';
import AdSidebar from '@/components/AdSidebar';
import { getAds, getLatestNews } from '@/lib/data';

export const revalidate = 120;

export const metadata = {
  title: 'Latest News | PurplePulse News'
};

export default async function NewsIndexPage() {
  const [news, ads] = await Promise.all([getLatestNews(30), getAds()]);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <section>
        <h1 className="mb-4 text-3xl font-bold">All News Stories</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((item) => <NewsCard key={item._id} item={item} />)}
        </div>
      </section>
      <AdSidebar ads={ads} />
    </main>
  );
}
