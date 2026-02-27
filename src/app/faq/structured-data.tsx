'use client';

import Script from 'next/script';

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

export function FAQStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
