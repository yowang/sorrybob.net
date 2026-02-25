import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorry Bob - 3D Physics-Based Surgery Simulator | Play Free Online',
  description: 'Play Sorry Bob, a hilarious 3D physics-based surgery simulator with dark humor. Control clumsy surgeon hands, perform emergency operations, and save Bob! Free online, no download required.',
  keywords: 'Sorry Bob, surgery simulator, physics game, dark humor game, emergency surgery, free online game, browser game, 3D physics',
  authors: [{ name: 'Sorry Bob Team' }],
  alternates: {
    canonical: 'https://sorrybob.net/',
  },
  openGraph: {
    title: 'Sorry Bob - Surgeon Simulator Online Free',
    description: 'Play Sorry Bob, a hilarious 3D physics-based surgery simulator with dark humor. Control clumsy surgeon hands, perform emergency operations, and save Bob! Free online, no download required.',
    url: 'https://sorrybob.net/',
    siteName: 'Sorry Bob',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorry Bob - Surgeon Simulator',
    description: 'Play free online now!',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
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
