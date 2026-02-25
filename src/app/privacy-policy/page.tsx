import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Sorry Bob',
  description:
    'Read the Privacy Policy for Sorry Bob, including minimal data collection, cookie usage, and third-party embedded game providers.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-xl mt-2 opacity-90">Effective Date: February 25, 2026</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 flex-1">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            Sorry Bob values your privacy. We design this website with a data-minimization approach
            and only process limited information needed to keep the site secure and functional.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">1) Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to collect as little personal information as possible. We generally do not
              require account creation and do not ask for sensitive personal data to play games.
              Basic technical data may be processed automatically, such as browser type, device
              type, approximate region, referring pages, and limited server log information (for
              example, IP address and request time) for security and reliability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">2) Use of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              Any data we process is used only for essential purposes, including website operation,
              performance monitoring, abuse prevention, and troubleshooting. We do not sell personal
              data. We avoid collecting data that is not necessary for these core functions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">3) Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              This site may use limited cookies or similar technologies to support basic functionality
              (for example, load balancing, session continuity, and preference persistence). Some
              tracking technologies may also be set by embedded third-party game providers. You can
              manage cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">
              4) Third-Party Services (MiniPlay, Geometry Games, Gamenora)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Sorry Bob may embed or link to games and content provided by third-party services,
              including MiniPlay, Geometry Games, and Gamenora. These providers may collect data
              directly from your device or browser under their own privacy policies and terms. We
              do not control third-party processing practices and recommend reviewing each provider&apos;s
              privacy policy before use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">5) Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not knowingly collect personal information from children in violation of
              applicable law. If you believe a child has provided personal information through this
              site, please contact us so we can review and take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">6) Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We use reasonable technical and organizational safeguards to protect the limited data
              processed by this website. However, no transmission or storage method is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">7) Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your location, you may have rights related to your personal data, such as
              access, correction, deletion, restriction, objection, or complaint rights. To exercise
              these rights, contact us using the details below, and we will respond in accordance
              with applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">8) Changes to Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Updates become effective when
              posted on this page. Continued use of the site after updates means you accept the
              revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-game-dark mb-3">9) Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have privacy questions or requests, contact us at{' '}
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
          <p className="text-2xl font-bold">Sorry Bob - Privacy Policy</p>
          <p className="text-gray-400 mt-2">
            We follow a data-minimization approach and prioritize user privacy.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Embedded third-party games are governed by their own privacy policies.
          </p>
        </div>
      </footer>
    </main>
  )
}
