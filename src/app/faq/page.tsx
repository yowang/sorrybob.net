import { Metadata } from 'next';
import { FAQStructuredData } from './structured-data';

export const metadata: Metadata = {
  title: 'FAQ - Sorry Bob',
  description: 'Frequently asked questions about Sorry Bob surgeon simulator game',
};

const faqs = [
  {
    question: "How do I play Sorry Bob?",
    answer: "Use your mouse to control the surgeon's hand. Click and drag to perform surgeries. Be careful not to hurt Bob!"
  },
  {
    question: "Is Sorry Bob free to play?",
    answer: "Yes! Sorry Bob is completely free to play in your web browser. No downloads required."
  },
  {
    question: "Can I play on mobile devices?",
    answer: "Yes, Sorry Bob works on both desktop and mobile browsers. Touch controls are supported."
  },
  {
    question: "How many levels are there?",
    answer: "There are multiple surgery levels with increasing difficulty. Can you master them all?"
  },
  {
    question: "Why is the game so hard?",
    answer: "The challenging controls are part of the fun! Practice makes perfect. Watch our tutorials for tips."
  },
  {
    question: "How do I save my progress?",
    answer: "Your progress is automatically saved in your browser. Use the same browser to continue playing."
  },
  {
    question: "Is there a multiplayer mode?",
    answer: "Currently, Sorry Bob is single-player only. We're exploring multiplayer options for future updates."
  },
  {
    question: "Who created Sorry Bob?",
    answer: "Sorry Bob is inspired by the popular Surgeon Simulator series, reimagined as a browser game."
  },
  {
    question: "How can I report bugs?",
    answer: "Please report bugs through our contact form or email. We appreciate your feedback!"
  },
  {
    question: "Will there be new levels?",
    answer: "We're constantly working on new content. Stay tuned for updates!"
  },
  {
    question: "What are the keyboard controls?",
    answer: "Use A, W, E, R keys to control individual fingers. Mouse movements control the hand position. Practice finger coordination to master the controls!"
  },
  {
    question: "Can I play offline?",
    answer: "Sorry Bob requires an internet connection as it's a browser-based game. However, once loaded, it can work with limited connectivity."
  }
];

export default function FAQPage() {
  return (
    <>
      <FAQStructuredData />
      <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-game-primary to-game-secondary text-white py-8 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img src="/logo.svg" alt="Sorry Bob Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                FAQ - Frequently Asked Questions
              </h1>
              <p className="text-xl mt-2 opacity-90">
                Everything you need to know about Sorry Bob
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Back to Home */}
      <div className="container mx-auto px-4 py-4">
        <a href="/" className="text-game-primary hover:text-game-secondary flex items-center gap-2">
          <span>←</span>
          <span>Back to Game</span>
        </a>
      </div>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-game-dark">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
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
            <div className="flex justify-center gap-6 text-sm">
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="/faq" className="text-white font-semibold">
                FAQ
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
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
