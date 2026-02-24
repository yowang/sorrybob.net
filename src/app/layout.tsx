import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorry Bob - Play Surgeon Simulator Online Free 2026',
  description: 'Play Sorry Bob free online! A hilarious physics-based surgery simulator. Control clumsy surgeon hands and perform operations. No download required.',
  keywords: 'sorry bob, surgeon simulator, free game, online game, physics game, surgery game',
  authors: [{ name: 'Sorry Bob' }],
  openGraph: {
    title: 'Sorry Bob - Play Surgeon Simulator Online Free 2026',
    description: 'Play Sorry Bob free online! A hilarious physics-based surgery simulator. Control clumsy surgeon hands and perform operations. No download required.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sorry Bob',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorry Bob - Play Surgeon Simulator Online Free 2026',
    description: 'Play Sorry Bob free online! A hilarious physics-based surgery simulator.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              "name": "Sorry Bob - Surgeon Simulator",
              "description": "A hilarious physics-based surgery simulator where you control clumsy surgeon hands to perform operations.",
              "genre": ["Simulation", "Comedy", "Physics"],
              "playMode": "SinglePlayer",
              "applicationCategory": "Game",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
