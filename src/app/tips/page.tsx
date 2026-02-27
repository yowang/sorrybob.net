import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sorry Bob Tips & Tricks - How to Master the Surgery Simulator',
  description:
    'Learn essential tips and strategies to master Sorry Bob surgery simulator. Control techniques, tool usage, and survival guide for clumsy surgeons.',
  alternates: {
    canonical: 'https://sorrybob.net/tips/',
  },
}

const tips = [
  {
    title: '1) Learn Finger Control Before Real Surgery',
    detail:
      'Practice opening and closing your hand with A, W, E, and R before touching any organ. Building rhythm early makes every later operation easier.',
    color: 'border-game-primary',
  },
  {
    title: '2) Use Tiny Mouse Movements',
    detail:
      'Large gestures create huge wrist swings in this physics system. Keep movements short and smooth so tools stay stable near sensitive tissue.',
    color: 'border-game-secondary',
  },
  {
    title: '3) Confirm Full Grip Before Lifting Tools',
    detail:
      'Dropped tools waste time and often cause accidental damage. Close all fingers first, wait half a second, then lift slowly.',
    color: 'border-game-primary',
  },
  {
    title: '4) Match Tool Choice to Goal',
    detail:
      'Use a scalpel for precision, bone saw for hard tissue, and heavier tools only when force is required. Wrong tool choice creates chaos fast.',
    color: 'border-game-secondary',
  },
  {
    title: '5) Stabilize When Bob Starts Bleeding Fast',
    detail:
      'When health drops sharply, stop and re-center your hand. Panic motions usually make bleeding worse, while controlled resets often save the run.',
    color: 'border-game-primary',
  },
  {
    title: '6) Prioritize Mission-Critical Steps',
    detail:
      'Perfect surgical form is optional in Sorry Bob. Completing the key objective first gives you the best chance to survive the timer.',
    color: 'border-game-secondary',
  },
  {
    title: '7) Clear Your Workspace',
    detail:
      'Remove loose clutter before delicate actions. In tight spaces, one bouncing tool can block your path to the target organ.',
    color: 'border-game-primary',
  },
  {
    title: '8) Treat Failures as Replay Data',
    detail:
      'Each failed attempt shows where your control broke down. Adjust one variable at a time and your success rate rises quickly.',
    color: 'border-game-secondary',
  },
]

export default function TipsPage() {
  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img src="/logo.svg" alt="Sorry Bob Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Sorry Bob Tips &amp; Tricks
              </h1>
              <p className="text-xl mt-2 opacity-90">
                How to master clumsy surgery controls and survive emergency operations
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="/" className="text-game-primary hover:text-game-secondary font-semibold">
            ← Back to Home
          </a>
          <span className="text-gray-400">|</span>
          <a href="/surgery-types" className="text-game-primary hover:text-game-secondary">
            Surgery Types
          </a>
          <span className="text-gray-400">|</span>
          <a href="/faq" className="text-game-primary hover:text-game-secondary">
            FAQ
          </a>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-game-dark mb-4">
            Master the Art of Clumsy Surgery
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            These strategies are built from the core mechanics shown on the homepage and expanded
            for real match situations. If you want consistent clears in <strong>Sorry Bob</strong>,
            focus on control discipline, tool intention, and calm recovery when things go wrong.
          </p>

          <div className="space-y-6">
            {tips.map((tip) => (
              <article key={tip.title} className={`border-l-4 ${tip.color} pl-4`}>
                <h3 className="text-xl font-bold text-game-dark mb-2">{tip.title}</h3>
                <p className="text-gray-700">{tip.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="text-xl font-bold text-game-dark mb-2">Quick Survival Checklist</h3>
            <p className="text-gray-700">
              Finger rhythm first. Small movements. Full grip before lift. Correct tool choice.
              Stabilize on bleed. Objective over perfection.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a href="/" className="text-game-primary hover:text-game-secondary font-semibold">
              Return to the game on the homepage
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-game-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold">Sorry Bob - Tips &amp; Tricks</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/surgery-types" className="text-gray-300 hover:text-white transition-colors">
              Surgery Types
            </a>
            <a href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
