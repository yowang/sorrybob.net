'use client'

import { useState, useEffect, useCallback } from 'react'

interface Review {
  nickname: string
  rating: number
  content: string
  timestamp: number
}

interface RatingStats {
  totalScore: number
  count: number
}

const DEFAULT_REVIEWS: Review[] = [
  {
    nickname: '手术达人',
    rating: 5,
    content: '太搞笑了！第一次玩不小心把心脏扔到了地上，笑死我了 🤣',
    timestamp: Date.now() - 3600000,
  },
  {
    nickname: 'Bob的克星',
    rating: 4,
    content: '控制手感很独特，需要适应一下，但上手后非常有趣！',
    timestamp: Date.now() - 7200000,
  },
  {
    nickname: '匿名玩家',
    rating: 5,
    content: '玩了一小时，成功完成了第一次心脏移植！超有成就感！',
    timestamp: Date.now() - 86400000,
  },
]

const DEFAULT_STATS: RatingStats = { totalScore: 7754, count: 1847 }

function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function setStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable – silently degrade
  }
}

function relativeTime(ts: number): string {
  const diff = Math.max(0, Date.now() - ts)
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return `${seconds}秒前`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

export default function RatingSection() {
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [stats, setStats] = useState<RatingStats>(DEFAULT_STATS)
  const [reviews, setReviews] = useState<Review[]>([])
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    // Seed default reviews if first visit
    const existing = localStorage.getItem('sorrybob_reviews')
    if (!existing) {
      setStorage('sorrybob_reviews', DEFAULT_REVIEWS)
    }

    setUserRating(getStorage<number>('sorrybob_user_rating', 0))
    setStats(getStorage<RatingStats>('sorrybob_rating_stats', DEFAULT_STATS))
    setReviews(getStorage<Review[]>('sorrybob_reviews', DEFAULT_REVIEWS))
    setMounted(true)
  }, [])

  const averageRating = stats.count > 0 ? (stats.totalScore / stats.count).toFixed(1) : '0.0'

  const handleRate = useCallback(
    (star: number) => {
      const prev = userRating
      setUserRating(star)
      setStorage('sorrybob_user_rating', star)

      setStats((s) => {
        const next: RatingStats = {
          totalScore: s.totalScore - prev + star,
          count: prev === 0 ? s.count + 1 : s.count,
        }
        setStorage('sorrybob_rating_stats', next)
        return next
      })
    },
    [userRating],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    const review: Review = {
      nickname: nickname.trim() || '匿名玩家',
      rating: userRating || 5,
      content: content.trim(),
      timestamp: Date.now(),
    }

    setReviews((prev) => {
      const next = [review, ...prev].slice(0, 5)
      setStorage('sorrybob_reviews', next)
      return next
    })
    setNickname('')
    setContent('')
  }

  if (!mounted) {
    // SSR placeholder to avoid hydration mismatch
    return (
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-game-dark mb-4 flex items-center gap-2">
          <span className="text-3xl">⭐</span> Player Ratings &amp; Reviews
        </h2>
        <p className="text-gray-400">Loading…</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-game-dark mb-6 flex items-center gap-2">
        <span className="text-3xl">⭐</span> Player Ratings &amp; Reviews
      </h2>

      {/* Rating summary + stars */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        {/* Aggregate */}
        <div className="text-center">
          <div className="text-5xl font-bold text-game-dark">{averageRating}</div>
          <div className="text-yellow-400 text-2xl mt-1">
            {'★'.repeat(Math.round(Number(averageRating)))}
            {'☆'.repeat(5 - Math.round(Number(averageRating)))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{stats.count.toLocaleString()} ratings</div>
        </div>

        {/* User rating */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Your rating:</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl transition-transform hover:scale-125 focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                {star <= (hoverRating || userRating) ? (
                  <span className="text-yellow-400">★</span>
                ) : (
                  <span className="text-gray-300">☆</span>
                )}
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <p className="text-xs text-gray-400 mt-1">You rated {userRating} star{userRating > 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      {/* Review form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="你的昵称（可选）"
          maxLength={20}
          className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-game-primary"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享你的游戏体验..."
          rows={3}
          maxLength={300}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-game-primary"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-6 py-2 bg-game-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </form>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-game-dark text-sm">{r.nickname}</span>
              <span className="text-yellow-400 text-sm">
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </span>
              <span className="text-xs text-gray-400 ml-auto">{relativeTime(r.timestamp)}</span>
            </div>
            <p className="text-gray-700 text-sm">{r.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
