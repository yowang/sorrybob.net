'use client'

export default function ShareBar() {
  const shareText =
    "I'm playing Sorry Bob - the most chaotic surgery simulator! 🏥😂 https://sorrybob.net #SorryBob #SurgerySimulator"

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420')
  }

  const handleCopyLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    try {
      await navigator.clipboard.writeText('https://sorrybob.net')
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = 'https://sorrybob.net'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    btn.textContent = '✅ 已复制！'
    setTimeout(() => {
      btn.textContent = '📋 复制链接'
    }, 2000)
  }

  const handleRedditShare = () => {
    window.open(
      'https://www.reddit.com/submit?title=Sorry%20Bob%20-%20Surgery%20Simulator&url=https://sorrybob.net',
      '_blank',
      'noopener,noreferrer'
    )
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
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        📋 复制链接
      </button>
      <button
        onClick={handleRedditShare}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        🤖 Reddit
      </button>
    </div>
  )
}
