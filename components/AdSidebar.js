import Image from 'next/image';

export default function AdSidebar({ ads }) {
  return (
    <aside className="space-y-3 rounded-xl border border-brand-700/60 bg-brand-900/60 p-4">
      <h3 className="text-lg font-semibold text-brand-300">Sponsored</h3>
      {ads.map((ad) => (
        <a
          key={ad._id}
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-brand-700/50 bg-brand-950/50 p-2 transition hover:-translate-y-0.5 hover:border-brand-500"
        >
          <div className="relative mb-2 aspect-video w-full overflow-hidden rounded">
            <Image src={ad.image} alt={`${ad.brand} advertisement`} fill className="object-cover" />
          </div>
          <p className="text-sm font-medium text-purple-100">{ad.brand}</p>
        </a>
      ))}
    </aside>
  );
}
