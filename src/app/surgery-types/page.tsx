import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Surgery Types in Sorry Bob - Heart Transplant, Brain Surgery & More',
  description:
    'Explore all surgery types in Sorry Bob: heart transplant, brain surgery, kidney transplant, and eye surgery. Detailed guides for each operation.',
  alternates: {
    canonical: 'https://sorrybob.net/surgery-types/',
  },
}

const surgeries = [
  {
    title: '❤️ Heart Transplant',
    border: 'border-red-500',
    description:
      "Replace Bob's failing heart before his blood bar reaches zero. This operation forces you to break through the ribcage, remove the damaged heart, and implant the donor heart while every second counts.",
    details: [
      'Primary challenge: heavy tools and a narrow chest cavity make precise placement difficult.',
      'Best approach: clear ribs first, keep your grip stable, then lower the new heart with minimal wrist movement.',
      'Common failure: rushing with the bone saw and causing massive blood loss before transplant placement.',
    ],
  },
  {
    title: '🧠 Brain Surgery',
    border: 'border-blue-500',
    description:
      "Perform high-precision work inside Bob's skull to remove dangerous tissue without harming healthy brain areas. Even minor collisions can end the run instantly.",
    details: [
      'Primary challenge: small target zone and severe penalty for accidental impact.',
      'Best approach: use slow, short tool movements and reposition your hand often instead of forcing angles.',
      'Common failure: overcorrecting after a slip, which turns one mistake into a chain reaction.',
    ],
  },
  {
    title: '🫘 Kidney Transplant',
    border: 'border-purple-500',
    description:
      "Remove a damaged kidney and place a donor organ in a crowded abdominal space. Visibility and access are limited, so movement planning matters more than speed.",
    details: [
      'Primary challenge: nearby organs leave very little room for tool swings.',
      'Best approach: create a clear path before extraction and keep spare tools out of the abdomen.',
      'Common failure: clipping adjacent organs while trying to force the kidney into position quickly.',
    ],
  },
  {
    title: '👁️ Eye Surgery',
    border: 'border-green-500',
    description:
      "The most delicate procedure in Sorry Bob. You work in an extremely tight socket where tiny hand tremors can cause permanent damage.",
    details: [
      'Primary challenge: minimal margin for error and awkward tool angles.',
      'Best approach: approach from stable angles only, pause before contact, and move one axis at a time.',
      'Common failure: entering too fast and overshooting the target due to physics momentum.',
    ],
  },
]

export default function SurgeryTypesPage() {
  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img src="/logo.svg" alt="Sorry Bob Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Surgery Types in Sorry Bob
              </h1>
              <p className="text-xl mt-2 opacity-90">
                Detailed operation guides for each emergency case
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
          <a href="/tips" className="text-game-primary hover:text-game-secondary">
            Tips &amp; Tricks
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
            Emergency Cases &amp; Surgeries Breakdown
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The homepage introduces all operation types briefly. This page expands each case so you
            can understand difficulty, control priorities, and common run-ending mistakes before you
            enter the operating room.
          </p>

          <div className="space-y-6">
            {surgeries.map((surgery) => (
              <article
                key={surgery.title}
                className={`border-l-4 ${surgery.border} pl-4 bg-gray-50 rounded-r-lg p-4`}
              >
                <h3 className="text-2xl font-bold text-game-dark mb-3">{surgery.title}</h3>
                <p className="text-gray-700 mb-4">{surgery.description}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {surgery.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="text-xl font-bold text-game-dark mb-2">Preparation Recommendation</h3>
            <p className="text-gray-700">
              If you are new, start with slower controlled attempts on kidney and heart cases, then
              move to brain and eye procedures once your finger control is consistent.
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
          <p className="text-2xl font-bold">Sorry Bob - Surgery Types</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/tips" className="text-gray-300 hover:text-white transition-colors">
              Tips &amp; Tricks
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
