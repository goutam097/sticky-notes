import type { Metadata } from 'next';
import { Caveat, Inter } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

/* export const metadata: Metadata = {
  title: 'StickyBoard — Your Digital Sticky Notes',
  description:
    'A beautiful sticky notes app built with Next.js. Create, organize, and color-code your notes.',
}; */

/* export const metadata: Metadata = {
  title: 'StickyBoard — Your Digital Sticky Notes',
  description:
    'A beautiful sticky notes app built with Next.js. Create, organize, and color-code your notes.',

  openGraph: {
    title: 'StickyBoard — Your Digital Sticky Notes',
    description:
      'Create, organize, and color-code your notes beautifully.',
    url: 'https://sticky-notes-ebon.vercel.app/',
    siteName: 'StickyBoard',
    images: [
      {
        url: '/sticky-note.png', // must be inside /public
        width: 1200,
        height: 630,
        alt: 'StickyBoard App Preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'StickyBoard — Your Digital Sticky Notes',
    description:
      'Create, organize, and color-code your notes beautifully.',
    images: ['/sticky-note.png'],
  },
}; */

export const metadata: Metadata = {
  metadataBase: new URL('https://sticky-notes-ebon.vercel.app/'),

  title: 'StickyBoard — Your Digital Sticky Notes',
  description:
    'Create, organize, and color-code your notes beautifully.',

  openGraph: {
    type: 'website',
    url: 'https://sticky-notes-ebon.vercel.app/',
    title: 'StickyBoard — Your Digital Sticky Notes',
    description:
      'Create, organize, and color-code your notes beautifully.',
    images: [
      {
        url: 'https://github.com/goutam097/sticky-notes/blob/main/public/sticky-note.png',
        width: 1200,
        height: 630,
        alt: 'StickyBoard App Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'StickyBoard — Your Digital Sticky Notes',
    description:
      'Create, organize, and color-code your notes beautifully.',
    images: ['https://github.com/goutam097/sticky-notes/blob/main/public/sticky-note.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${caveat.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}










/* import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StickyBoard — Your Digital Sticky Notes',
  description: 'A beautiful sticky notes app built with Next.js. Create, organize, and color-code your notes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
} */