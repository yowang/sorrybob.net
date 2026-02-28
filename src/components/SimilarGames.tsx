type SimilarGame = {
  id: string
  title: string
  description: string
  href: string
  thumbnail: string
  gradient: string
}

const DEFAULT_SIMILAR_GAMES: SimilarGame[] = [
  {
    id: 'surgeon-simulator',
    title: 'Surgeon Simulator',
    description: 'The original chaotic surgery classic with intentionally awkward controls.',
    href: 'https://store.steampowered.com/app/233720/Surgeon_Simulator/',
    thumbnail: '🫀',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    id: 'i-am-bread',
    title: 'I Am Bread',
    description: 'Physics-based mayhem where a slice of bread fights to become toast.',
    href: 'https://store.steampowered.com/app/327890/I_Am_Bread/',
    thumbnail: '🍞',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'octodad',
    title: 'Octodad: Dadliest Catch',
    description: 'Master absurd limb-by-limb movement in one of the funniest simulators.',
    href: 'https://store.steampowered.com/app/224480/Octodad_Dadliest_Catch/',
    thumbnail: '🐙',
    gradient: 'from-cyan-500 to-sky-600',
  },
  {
    id: 'human-fall-flat',
    title: 'Human: Fall Flat',
    description: 'Wobbly physics puzzles with sandbox interactions and creative solutions.',
    href: 'https://store.steampowered.com/app/477160/Human_Fall_Flat/',
    thumbnail: '🧠',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'qwop',
    title: 'QWOP',
    description: 'Legendary keyboard chaos that turns running into a precision challenge.',
    href: 'https://www.foddy.net/Athletics.html',
    thumbnail: '🏃',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 'getting-over-it',
    title: 'Getting Over It',
    description: 'A physics climbing test where every movement can win or reset progress.',
    href: 'https://store.steampowered.com/app/240720/Getting_Over_It_with_Bennett_Foddy/',
    thumbnail: '⛰️',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

type SimilarGamesProps = {
  games?: SimilarGame[]
}

export default function SimilarGames({ games = DEFAULT_SIMILAR_GAMES }: SimilarGamesProps) {
  return (
    <section className="panel panel-wide">
      <div className="panel-body">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-game-dark mb-2">
            More Physics Games You Might Like
          </h2>
          <p className="section-intro text-sm md:text-base">
            Enjoyed Sorry Bob? Try these surgery and physics-driven games next.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <article
              key={game.id}
              className="similar-game-card group rounded-2xl border border-teal-100 bg-white/90 overflow-hidden shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
            >
              <div
                className={`h-24 md:h-28 bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl`}
                aria-hidden="true"
              >
                <span>{game.thumbnail}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-game-dark text-sm md:text-base mb-2 leading-snug">
                  {game.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed min-h-[52px]">
                  {game.description}
                </p>
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800"
                >
                  Play Game
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
