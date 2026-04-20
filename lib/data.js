import { unstable_cache, revalidateTag } from 'next/cache';
import slugify from 'slugify';
import { getDb } from '@/lib/mongodb';

const fallbackNews = [
  {
    _id: 'demo-1',
    slug: 'city-transit-expands-late-night-routes',
    title: 'City Transit Expands Late-Night Routes',
    category: 'Local',
    excerpt: 'Commuters will see longer service windows across six major routes starting next week.',
    body: 'The city council approved a late-night service expansion across six major routes. The plan prioritizes safer commutes, better station lighting, and increased staffing during weekend peaks.',
    heroImage: 'https://images.unsplash.com/photo-1529421306624-54a5e29f6f2a?auto=format&fit=crop&w=1200&q=80',
    media: [],
    embeds: ['https://www.instagram.com/p/CvJd31Yt5zK/'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const fallbackAds = [
  {
    _id: 'ad-1',
    brand: 'Northlight Electric',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80',
    link: 'https://example.com'
  }
];

function normalize(doc) {
  return {
    ...doc,
    _id: String(doc._id),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString()
  };
}

async function readNewsFromDb(limit) {
  const db = await getDb();
  if (!db) {
    return fallbackNews;
  }

  const cursor = db.collection('news').find({}).sort({ createdAt: -1 });
  if (limit) cursor.limit(limit);

  return (await cursor.toArray()).map(normalize);
}

async function readAdsFromDb() {
  const db = await getDb();
  if (!db) {
    return fallbackAds;
  }
  return (await db.collection('ads').find({}).sort({ _id: -1 }).toArray()).map((item) => ({ ...item, _id: String(item._id) }));
}

export const getLatestNews = unstable_cache(
  async (limit = 12) => readNewsFromDb(limit),
  ['latest-news'],
  { revalidate: 120, tags: ['news'] }
);

export const getNewsBySlug = unstable_cache(
  async (slug) => {
    const db = await getDb();
    if (!db) {
      return fallbackNews.find((item) => item.slug === slug) || null;
    }

    const item = await db.collection('news').findOne({ slug });
    return item ? normalize(item) : null;
  },
  ['news-by-slug'],
  { revalidate: 300, tags: ['news'] }
);

export async function getRelatedNews(category, currentSlug) {
  const items = await getLatestNews(8);
  return items.filter((item) => item.slug !== currentSlug && item.category === category).slice(0, 4);
}

export const getAds = unstable_cache(
  async () => readAdsFromDb(),
  ['ads'],
  { revalidate: 300, tags: ['ads'] }
);

export async function createNews(payload) {
  const db = await getDb();
  const now = new Date();
  const baseSlug = slugify(payload.title, { lower: true, strict: true }) || `story-${Date.now()}`;

  const item = {
    title: payload.title,
    slug: baseSlug,
    category: payload.category,
    excerpt: payload.excerpt,
    body: payload.body,
    heroImage: payload.heroImage,
    media: payload.media || [],
    embeds: payload.embeds || [],
    createdAt: now,
    updatedAt: now
  };

  if (!db) {
    fallbackNews.unshift({ ...item, _id: `demo-${Date.now()}`, createdAt: now.toISOString(), updatedAt: now.toISOString() });
    revalidateTag('news');
    return;
  }

  await db.collection('news').insertOne(item);
  revalidateTag('news');
}

export async function createAd(payload) {
  const db = await getDb();

  if (!db) {
    fallbackAds.unshift({ ...payload, _id: `ad-${Date.now()}` });
    revalidateTag('ads');
    return;
  }

  await db.collection('ads').insertOne(payload);
  revalidateTag('ads');
}
