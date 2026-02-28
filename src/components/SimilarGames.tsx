'use client'

import { useState } from 'react'

type SimilarGame = {
  id: string
  title: string
  description: string
  href: string
  image: string
  gradient: string
}

const DEFAULT_SIMILAR_GAMES: SimilarGame[] = [
  {
    id: 'surgeon-simulator',
    title: 'Surgeon Simulator',
    description: 'The original chaotic surgery classic with intentionally awkward controls.',
    href: 'https://store.steampowered.com/app/233720/Surgeon_Simulator/',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/233720/header.jpg',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    id: 'i-am-bread',
    title: 'I Am Bread',
    description: 'Physics-based mayhem where a slice of bread fights to become toast.',
    href: 'https://store.steampowered.com/app/327890/I_Am_Bread/',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/327890/header.jpg',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'octodad',
    title: 'Octodad: Dadliest Catch',
    description: 'Master absurd limb-by-limb movement in one of the funniest simulators.',
    href: 'https://store.steampowered.com/app/224480/Octodad_Dadliest_Catch/',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/224480/header.jpg',
    gradient: 'from-cyan-500 to-sky-600',
  },
  {
    id: 'human-fall-flat',
    title: 'Human: Fall Flat',
    description: 'Wobbly physics puzzles with sandbox interactions and creative solutions.',
    href: 'https://store.steampowered.com/app/477160/Human_Fall_Flat/',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/477160/header.jpg',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'qwop',
    title: 'QWOP',
    description: 'Legendary keyboard chaos that turns running into a precision challenge.',
    href: 'https://www.foddy.net/Athletics.html',
    image: 'https://www.foddy.net/QWOP.jpg',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 'getting-over-it',
    title: 'Getting Over It',
    description: 'A physics climbing test where every movement can win or reset progress.',
    href: 'https://store.steampowered.com/app/240720/Getting_Over_It_with_Bennett_Foddy/',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/240720/header.jpg',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

function GameCard({ game }: { game: SimilarGame }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="similar-game-card group rounded-2xl border border-teal-100 bg-white/90 overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.98]"
    >
      <div className="relative h-[130px] overflow-hidden">
        {imgError ? (
          <div
            className={`h-full w-full bg-gradient-to-br ${game.gradient} flex items-center justify-center`}
            aria-hidden="true"
          >
            <span className="text-white/80 text-sm font-medium">{game.title}</span>
          </div>
        ) : (
          <img
            src={game.image}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-game-dark text-sm md:text-base mb-2 leading-snug truncate">
          {game.title}
        </h3>
        <a
          href={game.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800"
        >
          Play Game
        </a>
      </div>
    </article>
  )
}

type SimilarGamesProps = {
  games?: SimilarGame[]
}

export default function SimilarGames({ games = DEFAULT_SIMILAR_GAMES }: SimilarGamesProps) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-game-dark mb-1">
          More Physics Games You Might Like
        </h2>
        <p className="text-sm text-slate-500">
          Enjoyed Sorry Bob? Try these physics-driven games next.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}
