function socialEmbed(url) {
  if (url.includes('instagram.com')) {
    const postCode = url.split('/p/')[1]?.split('/')[0];
    return postCode ? `https://www.instagram.com/p/${postCode}/embed` : null;
  }
  if (url.includes('x.com') || url.includes('twitter.com')) {
    return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
  }
  if (url.includes('facebook.com')) {
    return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true`;
  }
  return null;
}

export default function RichMedia({ media = [], embeds = [] }) {
  return (
    <div className="space-y-4">
      {media.map((url) => {
        if (/\.(png|jpe?g|webp|gif)$/i.test(url)) {
          return <img key={url} src={url} alt="News supporting media" className="w-full rounded-lg border border-brand-700/50" />;
        }
        if (/\.(mp4|webm)$/i.test(url)) {
          return <video key={url} src={url} controls className="w-full rounded-lg border border-brand-700/50" />;
        }
        if (/\.pdf$/i.test(url)) {
          return <embed key={url} src={url} type="application/pdf" className="h-96 w-full rounded-lg border border-brand-700/50" />;
        }
        return (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-brand-300 underline">
            Open attachment
          </a>
        );
      })}

      {embeds.map((url) => {
        const src = socialEmbed(url);
        if (!src) return null;
        return (
          <iframe
            key={url}
            src={src}
            loading="lazy"
            className="h-96 w-full rounded-lg border border-brand-700/50 bg-black/20"
            allowFullScreen
            title={`embed-${url}`}
          />
        );
      })}
    </div>
  );
}
