import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Sorry Bob',
  description:
    'Read the Terms of Service for Sorry Bob, including free game use, non-commercial restrictions, and third-party disclaimers.',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          <p className="text-xl mt-2 opacity-90">Effective Date: February 25, 2026</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 flex-1">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to Sorry Bob. By accessing or using this website, you agree to these Terms
            of Service. If you do not agree, please do not use the site.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">1) Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of this website constitutes acceptance of these Terms of Service and all
              applicable laws. You are responsible for ensuring your use complies with local laws
              where you access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">2) Use License</h2>
            <p className="text-gray-700 leading-relaxed">
              Sorry Bob provides a limited, revocable, non-exclusive license to access and play
              the games on this website for personal entertainment only. The games are provided
              <strong> free of charge</strong> and are strictly for <strong>non-commercial use</strong>.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700 leading-relaxed">
              <li>You may not sell, license, rent, or commercially redistribute any content.</li>
              <li>You may not copy, mirror, or republish site content for commercial purposes.</li>
              <li>You may not reverse engineer, disrupt, or exploit the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">3) User Conduct</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree not to use the site for unlawful behavior, abuse, harassment, malware
              distribution, automated attacks, or actions that interfere with normal website
              operation or other users&apos; access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">4) Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              This website and all content are provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without warranties of any kind. We do not guarantee uninterrupted availability,
              accuracy, or fitness for a particular purpose.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Some games, embeds, assets, or links may be provided by third parties. We make no
              representations regarding third-party materials and disclaim responsibility for their
              content, availability, security, or practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">5) Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Sorry Bob and its operators are not liable
              for any direct, indirect, incidental, special, or consequential damages arising from
              your use or inability to use the site, including losses related to data, devices,
              business interruption, or third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">6) Revisions</h2>
            <p className="text-gray-700 leading-relaxed">
              Website materials may include technical, typographical, or informational errors. We
              may revise, update, or remove content at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">
              7) Links to Other Sites
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This website may contain links to third-party websites or services. We do not control
              those sites and are not responsible for their content, terms, privacy policies, or
              operations. Accessing third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">8) Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              We may modify these Terms of Service at any time. Updated terms become effective when
              posted on this page. Continued use of the website after changes are posted means you
              accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">9) Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by and construed in accordance with applicable laws of the
              United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">10) Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, contact us at{' '}
              <a
                href="mailto:contact@sorrybob.pages.dev"
                className="text-game-primary hover:text-game-secondary underline"
              >
                contact@sorrybob.pages.dev
              </a>{' '}
              or visit{' '}
              <a
                href="https://sorrybob.pages.dev/"
                className="text-game-primary hover:text-game-secondary underline"
              >
                https://sorrybob.pages.dev/
              </a>
              .
            </p>
          </section>

          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-500">Last Updated: February 25, 2026</p>
            <Link href="/" className="text-game-primary hover:text-game-secondary font-semibold">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-game-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold">Sorry Bob - Terms of Service</p>
          <p className="text-gray-400 mt-2">
            Free online games for personal use only. Commercial use is prohibited.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Third-party content remains the responsibility of its respective owners.
          </p>
        </div>
      </footer>
    </main>
  )
}
