import GameEmbed from '@/components/GameEmbed'
import Controls from '@/components/Controls'
import SimilarGames from '@/components/SimilarGames'

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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img src="/logo.svg" alt="Sorry Bob Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                Sorry Bob - Surgeon Simulator Online Free
              </h1>
              <p className="text-base sm:text-lg md:text-xl mt-2 opacity-90">
                The most hilarious surgery game on the web!
              </p>
            </div>
          </div>
          <nav className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href="/tips"
              className="min-h-11 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 transition-colors inline-flex items-center"
            >
              Tips &amp; Tricks
            </a>
            <a
              href="/surgery-types"
              className="min-h-11 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 transition-colors inline-flex items-center"
            >
              Surgery Types
            </a>
            <a
              href="/faq"
              className="min-h-11 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 transition-colors inline-flex items-center"
            >
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Game Category Tags */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-game-primary hover:text-white transition-colors cursor-pointer">
              🎮 Simulation Games
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-game-primary hover:text-white transition-colors cursor-pointer">
              ⚡ Physics Games
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-game-primary hover:text-white transition-colors cursor-pointer">
              👁️ First-Person
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-game-primary hover:text-white transition-colors cursor-pointer">
              😈 Dark Humor
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-game-primary hover:text-white transition-colors cursor-pointer">
              🏥 Surgery Simulator
            </span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-game-dark mb-2">
              🎮 Play Now - No Download Required!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Click fullscreen for the best experience. Use keyboard controls to operate.
            </p>
          </div>
          <GameEmbed />
        </div>
      </section>

      {/* Similar Games Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <SimilarGames />
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
            <strong>Sorry Bob</strong> is a <strong>3D physics-based surgery simulator</strong> where 
            chaos meets comedy. Unlike traditional medical games that reward precision, Sorry Bob 
            punishes steady hands and rewards creative problem-solving. Every operation becomes an 
            unpredictable adventure where your biggest enemy isn't the patient's condition - it's 
            your own clumsy virtual hands.
          </p>
          <p>
            If you enjoy classic{' '}
            <a
              href="https://en.wikipedia.org/wiki/Simulation_video_game"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-primary underline hover:text-game-secondary"
            >
              simulation video games
            </a>{' '}
            and the tech behind{' '}
            <a
              href="https://en.wikipedia.org/wiki/Physics_engine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-primary underline hover:text-game-secondary"
            >
              physics engines
            </a>
            , Sorry Bob leans all the way into both.
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
            The game's revolutionary control scheme requires you to independently manage each finger 
            using <strong>A, W, E, R keys</strong>. This turns the simple act of picking up a scalpel 
            into a technical odyssey. Want to grab a surgical tool? You'll need to position your hand, 
            press the right finger keys in sequence, and hope physics doesn't betray you. The learning 
            curve is steep, but mastery brings immense satisfaction - and plenty of laughter along the way.
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
            The <strong>realistic physics engine</strong> means every tool behaves unpredictably. 
            Scalpels slide off wet surfaces, hammers bounce off bones, and organs tumble off the 
            operating table with alarming frequency. Gravity works against you, momentum carries 
            tools into places they shouldn't go, and friction - or lack thereof - turns simple tasks 
            into complex puzzles. This isn't just difficulty for difficulty's sake; it's authentic 
            chaos simulation that makes every playthrough unique.
          </p>
          <p>
            <strong>Time pressure</strong> adds another layer of intensity. Bob's blood bar depletes 
            in real-time, forcing you to balance speed with caution. Rush, and you'll make fatal 
            mistakes. Take too long, and Bob bleeds out while you're fumbling with a bone saw. 
            This tension creates genuine stakes - you're not just fighting controls, you're racing 
            against death itself.
          </p>
          <p>
            The <strong>dark humor</strong> in Sorry Bob comes naturally from its mechanics. There's 
            something hilariously tragic about accidentally dropping a hammer into your patient's 
            open chest cavity, or watching a perfectly good kidney roll off the table and disappear 
            under a cabinet. You'll apologize to Bob repeatedly - hence the game's name - as your 
            well-intentioned surgeries go horribly, hilariously wrong.
          </p>
          <p>
            Each <strong>failure becomes a learning experience</strong> wrapped in comedy. You'll 
            develop genuine surgical strategies: stabilizing your grip before lifting tools, using 
            gentle mouse movements to avoid wild swings, and knowing when to stop and let Bob's 
            vitals recover. The skills translate - your tenth heart transplant will be noticeably 
            smoother than your first, even if you still kill Bob more often than you'd like to admit.
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

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-game-dark mb-4">Gameplay Screenshot Previews</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <figure
              role="img"
              aria-label="Screenshot placeholder showing heart transplant surgery setup and tool tray"
              className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-md"
            >
              <div className="h-36 rounded-lg border border-white/15 bg-gradient-to-br from-rose-900/70 via-red-800/55 to-orange-700/40 p-3 flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span className="text-2xl">❤️</span>
                  <span className="text-xs uppercase tracking-wide">Heart Case</span>
                </div>
              </div>
              <figcaption className="text-sm text-gray-600 mt-2">
                Placeholder: Heart transplant procedure view
              </figcaption>
            </figure>

            <figure
              role="img"
              aria-label="Screenshot placeholder showing close-up brain surgery precision tools"
              className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-md"
            >
              <div className="h-36 rounded-lg border border-white/15 bg-gradient-to-br from-sky-900/70 via-cyan-800/55 to-teal-700/45 p-3 flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span className="text-2xl">🧠</span>
                  <span className="text-xs uppercase tracking-wide">Brain Op</span>
                </div>
              </div>
              <figcaption className="text-sm text-gray-600 mt-2">
                Placeholder: Brain surgery precision challenge
              </figcaption>
            </figure>

            <figure
              role="img"
              aria-label="Screenshot placeholder showing chaotic operating table during emergency surgery"
              className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-md"
            >
              <div className="h-36 rounded-lg border border-white/15 bg-gradient-to-br from-violet-900/70 via-fuchsia-800/55 to-pink-700/45 p-3 flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-300/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-300/80" />
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span className="text-2xl">🎮</span>
                  <span className="text-xs uppercase tracking-wide">Chaos Run</span>
                </div>
              </div>
              <figcaption className="text-sm text-gray-600 mt-2">
                Placeholder: Emergency operation gameplay scene
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Emergency Cases Section */}
      <section className="bg-white rounded-lg shadow-lg p-8 container mx-auto px-4 max-w-4xl my-8">
        <h2 className="text-3xl font-bold text-game-dark mb-6 flex items-center gap-3">
          <span className="text-4xl">🚨</span>
          Emergency Cases & Surgeries
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Face a variety of life-or-death scenarios in <strong>Sorry Bob</strong>. Each surgery 
          presents unique challenges that will test your skill, patience, and ability to laugh 
          at your own incompetence:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">❤️ Heart Transplant</h3>
            <p className="text-gray-700">
              Replace Bob's failing heart before time runs out. Break through the ribcage carefully, 
              extract the old heart without damaging surrounding tissue, and drop in the new one. 
              One wrong move with the bone saw and Bob's blood bar hits zero! The heart is heavy and 
              slippery - good luck getting it into the chest cavity without dropping it.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">🧠 Brain Surgery</h3>
            <p className="text-gray-700">
              Perform delicate brain surgery with clumsy hands. Remove the tumor without damaging 
              healthy tissue - precision is key, but your hands have other plans! The brain is 
              sensitive; even small bumps can be fatal. One accidental hammer swing and it's game over.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">🫘 Kidney Transplant</h3>
            <p className="text-gray-700">
              Extract the damaged kidney and implant a healthy donor organ. Sounds simple, right? 
              Wrong. The kidneys are located deep in the abdominal cavity, surrounded by other organs 
              you'd rather not puncture. Navigation is tricky, and there's barely enough room to maneuver.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-bold text-game-dark mb-2">👁️ Eye Surgery</h3>
            <p className="text-gray-700">
              The most delicate procedure of all. One slip of the scalpel and Bob loses his sight 
              forever. The eye socket is cramped, tools are awkward, and your hands won't stop 
              shaking. This operation separates amateur surgeons from the truly masochistic.
            </p>
          </div>
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
                  <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
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

          {/* 法律文档链接 */}
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/tips" className="text-gray-400 hover:text-white transition-colors">
                Tips &amp; Tricks
              </a>
              <a href="/surgery-types" className="text-gray-400 hover:text-white transition-colors">
                Surgery Types
              </a>
              <a href="/faq" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-sm text-gray-400 mt-6">
            <p>
              © 2026 Sorry Bob. Visit us at{' '}
              <a href="https://sorrybob.net" className="text-white hover:underline">
                sorrybob.net
              </a>
            </p>
            <p className="mt-2">
              Game embedded from MiniPlay. This is a fan site for the popular surgery simulator game.
            </p>
            <p className="mt-2">
              Learn more about the genre on{' '}
              <a
                href="https://en.wikipedia.org/wiki/Simulation_video_game"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                Wikipedia&apos;s simulation video game overview
              </a>
              .
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
