import GameEmbed from '@/components/GameEmbed'
import Controls from '@/components/Controls'

export default function Home() {
  const faqs = [
    {
      question: 'What is Sorry Bob?',
      answer: 'Sorry Bob is a hilarious physics-based surgery simulator where you control clumsy surgeon hands to perform various medical operations. The game is intentionally challenging and funny!'
    },
    {
      question: 'Is Sorry Bob free to play?',
      answer: 'Yes! Sorry Bob is completely free to play online. No download or installation required. Just click play and start your surgery adventure.'
    },
    {
      question: 'Can I play on mobile devices?',
      answer: 'Sorry Bob is optimized for desktop browsers with keyboard controls. Mobile support may be limited due to the control scheme required for the game.'
    },
    {
      question: 'Are there different difficulty levels?',
      answer: 'The game progresses naturally with increasingly complex surgeries. Each operation tests your hand-eye coordination and patience!'
    },
    {
      question: 'How do I save my progress?',
      answer: 'Progress is typically saved automatically in your browser session. For persistent saves, check the game menu for save options.'
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl">🏥</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Sorry Bob - Surgeon Simulator Online Free
              </h1>
              <p className="text-xl mt-2 opacity-90">
                The most hilarious surgery game on the web!
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-game-dark mb-2">
              🎮 Play Now - No Download Required!
            </h2>
            <p className="text-gray-600">
              Click fullscreen for the best experience. Use keyboard controls to operate.
            </p>
          </div>
          <GameEmbed />
        </div>
      </section>

      {/* Controls Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Controls />
        </div>
      </section>

      {/* About Section - SEO Optimized */}
      <section className="bg-white rounded-lg shadow-lg p-8 container mx-auto px-4 max-w-4xl my-8">
        <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
          <span className="text-4xl">📖</span>
          About Sorry Bob - The Ultimate Surgery Simulator
        </h2>
        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            Looking for a hilarious <strong>surgery simulator</strong> to <strong>play free</strong>? 
            <strong>Sorry Bob</strong> delivers the most chaotic <strong>physics game</strong> experience 
            you'll find online. This unique <strong>browser game</strong> combines realistic physics with 
            intentionally clumsy controls, creating endless laughter as you attempt to save your patient 
            Bob from your own surgical incompetence.
          </p>
          <p>
            <strong>Sorry Bob</strong> is a <strong>physics game</strong> unlike any other 
            <strong>surgery game</strong> you've played. As Nigel Burke, an overconfident surgeon with 
            impossibly clumsy hands, you must perform delicate medical procedures while fighting against 
            the game's intentionally challenging controls. Every finger movement requires separate button 
            presses, every wrist rotation sends tools flying, and every operation becomes a comedy of 
            errors that will have you laughing - and crying - in equal measure.
          </p>
          <p>
            What makes <strong>Sorry Bob</strong> the ultimate <strong>surgery simulator</strong>? 
            Unlike typical medical games where you simply click to heal, this <strong>physics game</strong> 
            demands genuine skill and patience. You'll need to master the art of controlling each finger 
            independently (using A, W, E, R keys), precisely positioning your virtual hand with mouse 
            movements, and carefully coordinating grips to pick up surgical tools. The realistic physics 
            engine means objects tumble, roll, and bounce unpredictably - just like real surgery, but funnier.
          </p>
          <p>
            Why <strong>play free</strong> instead of buying expensive simulator games? 
            <strong>Sorry Bob</strong> offers premium entertainment without costing a cent. This 
            <strong>browser game</strong> runs smoothly on any modern web browser, requires no downloads 
            or installations, and delivers hours of chaotic surgical fun. Whether you're a fan of 
            <strong>surgery simulator</strong> titles looking for a quick fix, a <strong>physics game</strong> 
            enthusiast seeking your next challenge, or simply someone who enjoys comedy games, 
            <strong>Sorry Bob</strong> has something for everyone.
          </p>
          <p>
            The beauty of <strong>Sorry Bob</strong> lies in its accessibility. As a <strong>play free</strong>
            <strong>browser game</strong>, you can jump into surgery anytime, anywhere. Stuck on a boring 
            conference call? Waiting for a download to finish? Open <strong>Sorry Bob</strong> in your browser 
            and experience the thrill of accidentally dropping a scalpel into your patient's chest cavity. 
            Just remember to apologize to Bob afterward - he's surprisingly understanding for someone who 
            keeps dying on the operating table.
          </p>
        </div>
      </section>

      {/* Game Features Section - SEO Optimized */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
            <span className="text-4xl">⭐</span>
            Why Choose Sorry Bob Over Other Surgery Games?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-game-dark mb-2">
                Realistic Physics Engine
              </h3>
              <p className="text-gray-700">
                Every tool, organ, and object behaves according to authentic physics. Scalpels slide, 
                hammers bounce, and organs tumble just like in real operating rooms - except much funnier.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-game-dark mb-2">
                Challenging Controls
              </h3>
              <p className="text-gray-700">
                The finger-by-finger control system (A, W, E, R keys) creates a unique challenge that 
                no other surgery game offers. Master the clumsy hands and feel genuine accomplishment 
                when you successfully complete an operation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">😂</div>
              <h3 className="text-xl font-bold text-game-dark mb-2">
                Endless Comedy
              </h3>
              <p className="text-gray-700">
                The combination of realistic physics and intentionally difficult controls creates 
                naturally funny moments. You'll laugh as you accidentally knock tools into patients, 
                struggle to pick up scalpels, and watch organs roll off the table.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-bold text-game-dark mb-2">
                Completely Free to Play
              </h3>
              <p className="text-gray-700">
                Play free with no downloads, no installations, and no hidden costs. Just open your 
                browser and start operating. Premium entertainment without spending a cent!
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-game-dark mb-2">
                Instant Access Browser Game
              </h3>
              <p className="text-gray-700">
                As a browser game, Sorry Bob is always ready when you are. No lengthy downloads, 
                no system requirements to check, no updates to install. Just pure surgical chaos on demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips & Strategies Section - SEO Optimized */}
      <section className="bg-white rounded-lg shadow-lg p-8 container mx-auto px-4 max-w-4xl my-8">
        <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
          <span className="text-4xl">💡</span>
          Master the Art of Clumsy Surgery - Tips & Strategies
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Success in <strong>Sorry Bob</strong> requires patience, practice, and these essential strategies:
        </p>
        
        <div className="space-y-6">
          <div className="border-l-4 border-game-primary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              1. Master the Finger Dance
            </h3>
            <p className="text-gray-700">
              Before attempting any <strong>surgery simulator</strong> operation, spend time practicing 
              finger coordination. Press A, W, E, R in sequence to open and close your virtual hand. 
              This <strong>physics game</strong> rewards muscle memory - the more you practice, the 
              steadier your grip becomes.
            </p>
          </div>

          <div className="border-l-4 border-game-secondary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              2. Small Movements = Better Control
            </h3>
            <p className="text-gray-700">
              The physics engine amplifies every wrist movement. In this <strong>surgery game</strong>, 
              large mouse gestures send tools flying across the room. Use subtle, gentle motions to 
              maintain control and avoid accidental organ damage.
            </p>
          </div>

          <div className="border-l-4 border-game-primary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              3. Lock Your Grip Before Lifting
            </h3>
            <p className="text-gray-700">
              Never try to move a tool without all fingers properly closed. A wobbly grip in 
              <strong>Sorry Bob</strong> means dropped scalpels, flying hammers, and very unhappy patients. 
              Squeeze those A+W+E+R keys firmly before lifting anything.
            </p>
          </div>

          <div className="border-l-4 border-game-secondary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              4. Watch the Timer, But Don't Panic
            </h3>
            <p className="text-gray-700">
              Speed matters in this <strong>surgery simulator</strong>, but haste causes accidents. 
              Balance urgency with careful movements - taking an extra ten seconds is better than killing 
              Bob because you panicked and stabbed him with a bone saw.
            </p>
          </div>

          <div className="border-l-4 border-game-primary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              5. Stabilize When Health Drops
            </h3>
            <p className="text-gray-700">
              If Bob's life bar plummets, stop all movement immediately. Sometimes doing nothing for a 
              moment lets the situation stabilize. Panicked movements in this <strong>physics game</strong> 
              usually make things worse.
            </p>
          </div>

          <div className="border-l-4 border-game-secondary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              6. Prioritize the Main Objective
            </h3>
            <p className="text-gray-700">
              Forget pretty incisions and neat surgical techniques. In <strong>Sorry Bob</strong>, 
              focus on completing the core task (transplant, removal, etc.) before time runs out. 
              Scars heal, but dead patients stay dead.
            </p>
          </div>

          <div className="border-l-4 border-game-primary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              7. Use the Right Tool for the Job
            </h3>
            <p className="text-gray-700">
              Hammers and bone saws have their place, but reach for the scalpel when precision matters. 
              Each tool in this <strong>surgery game</strong> interacts differently with physics - learn 
              which works best for each procedure.
            </p>
          </div>

          <div className="border-l-4 border-game-secondary pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">
              8. Embrace the Chaos
            </h3>
            <p className="text-gray-700">
              You WILL accidentally drop tools into Bob's chest cavity. You WILL hit organs you didn't 
              mean to hit. You WILL apologize to Bob repeatedly. Laugh it off and try again - there's 
              always another surgery waiting in <strong>Sorry Bob</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
            <span className="text-4xl">❓</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <summary className="px-6 py-4 font-semibold text-game-dark cursor-pointer hover:bg-gray-50 flex items-center gap-3">
                  <span className="text-2xl">→</span>
                  {faq.question}
                </summary>
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-game-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <p className="text-2xl font-bold">Sorry Bob - Surgeon Simulator</p>
            <p className="text-gray-400 mt-2">
              Play free online • No download required • Have fun!
            </p>
          </div>
          <div className="text-sm text-gray-400 mt-6">
            <p>
              © 2026 Sorry Bob. Game embedded from MiniPlay. 
              This is a fan site for the popular surgery simulator game.
            </p>
            <p className="mt-2">
              All game content belongs to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
