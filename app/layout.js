import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'PurplePulse News',
  description: 'Fullstack news website with Next.js, MongoDB, and Tailwind CSS'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-950 text-purple-50 min-h-screen">
        <header className="sticky top-0 z-50 border-b border-brand-700/40 bg-brand-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-400">Digital Newsroom</p>
              <Link href="/" className="text-2xl font-extrabold text-white">PurplePulse News</Link>
            </div>
            <nav className="flex items-center gap-3 text-sm font-medium">
              <Link href="/news" className="rounded-md border border-brand-700/60 px-3 py-2 hover:bg-brand-800">News</Link>
              <Link href="/admin" className="rounded-md bg-brand-600 px-3 py-2 text-white hover:bg-brand-500">Admin Panel</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
