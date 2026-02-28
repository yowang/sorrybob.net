'use client'

export default function ShareBar() {
  const url = 'https://sorrybob.net'
  const shareText =
    "I'm playing Sorry Bob - the most chaotic surgery simulator! 🏥😂 https://sorrybob.net #SorryBob #SurgerySimulator"

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420')
  }

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=550,height=420')
  }

  const handleWhatsAppShare = () => {
    const waText = 'Check out Sorry Bob - the most chaotic surgery simulator! 🏥😂 ' + url
    const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
  }

  const handleRedditShare = () => {
    const title = 'Sorry Bob - The Most Chaotic Surgery Simulator Online'
    const text =
      'I just tried Sorry Bob, a hilarious physics-based surgery simulator where you control each finger separately. The controls are intentionally clumsy and it\'s absolutely chaotic fun! Free to play at https://sorrybob.net - try it and tell me your high score! 🏥😂'
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`
    window.open(redditUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    btn.textContent = '✅ Copied!'
    setTimeout(() => {
      btn.textContent = '📋 Copy Link'
    }, 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 my-4">
      <span className="text-sm font-medium text-gray-500">Share:</span>
      <button
        onClick={handleTwitterShare}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        𝕏 Twitter
      </button>
      <button
        onClick={handleFacebookShare}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1877F2] text-white text-sm font-medium hover:bg-[#166FE5] transition-colors"
      >
        f Facebook
      </button>
      <button
        onClick={handleWhatsAppShare}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#1DA851] transition-colors"
      >
        💬 WhatsApp
      </button>
      <button
        onClick={handleRedditShare}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        🤖 Reddit
      </button>
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        📋 Copy Link
      </button>
    </div>
  )
}
