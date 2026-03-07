'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import * as Sentry from '@sentry/nextjs'

const GAME_SOURCES = [
  'https://www.miniplay.com/embed/sorry-bob-surgeon-simulator',
  'https://geometry-games.io/sorry-bob',
  'https://www.gamenora.com/game/sorry-bob-surgeon-simulator/',
]

const SOURCE_ORIGINS = GAME_SOURCES.map((url) => new URL(url).origin)

const FULLSCREEN_HINT_KEY = 'sorrybob-fullscreen-hint-seen'
const FASTEST_SOURCE_KEY = 'sorrybob-fastest-source'
const LOAD_TIMEOUT_MS = 15000

type FullscreenCapableElement = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type FullscreenCapableDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

// Preconnect to a specific origin dynamically
function injectPreconnect(origin: string) {
  if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

// Get the best source order (fastest first based on past results)
function getOrderedSources(): number[] {
  if (typeof window === 'undefined') return [0, 1, 2]
  try {
    const fastest = window.localStorage.getItem(FASTEST_SOURCE_KEY)
    if (fastest !== null) {
      const idx = parseInt(fastest, 10)
      if (idx >= 0 && idx < GAME_SOURCES.length) {
        const order = [idx]
        for (let i = 0; i < GAME_SOURCES.length; i++) {
          if (i !== idx) order.push(i)
        }
        return order
      }
    }
  } catch {}
  return [0, 1, 2]
}

export default function GameEmbed() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sourceOrder] = useState<number[]>(getOrderedSources)
  const [sourceIndex, setSourceIndex] = useState(0)
  const [showFullscreenHint, setShowFullscreenHint] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadStartRef = useRef<number>(0)

  const currentSource = sourceOrder[sourceIndex]

  const dismissFullscreenHint = () => {
    setShowFullscreenHint(false)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1')
      } catch (_error) {}
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const hasSeenHint = window.localStorage.getItem(FULLSCREEN_HINT_KEY) === '1'
      setShowFullscreenHint(!hasSeenHint)
    } catch (_error) {
      setShowFullscreenHint(true)
    }
  }, [])

  useEffect(() => {
    if (!showFullscreenHint) return
    const timer = window.setTimeout(() => {
      setShowFullscreenHint(false)
      try { window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1') } catch {}
    }, 9000)
    return () => window.clearTimeout(timer)
  }, [showFullscreenHint])

  useEffect(() => {
    const syncFullscreenState = () => {
      const fullscreenDocument = document as FullscreenCapableDocument
      const isDocumentFullscreen = Boolean(
        document.fullscreenElement || fullscreenDocument.webkitFullscreenElement,
      )
      setIsFullscreen(isDocumentFullscreen)
    }
    document.addEventListener('fullscreenchange', syncFullscreenState)
    document.addEventListener('webkitfullscreenchange', syncFullscreenState as EventListener)
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState as EventListener)
    }
  }, [])

  // Simulated progress bar while loading
  useEffect(() => {
    if (!gameStarted || !isLoading) return
    loadStartRef.current = Date.now()
    setLoadProgress(0)
    const interval = setInterval(() => {
      const elapsed = Date.now() - loadStartRef.current
      // Asymptotic progress: approaches 90% over LOAD_TIMEOUT_MS
      const progress = Math.min(90, (elapsed / LOAD_TIMEOUT_MS) * 95)
      setLoadProgress(Math.round(progress))
    }, 200)
    return () => clearInterval(interval)
  }, [gameStarted, isLoading, sourceIndex])

  // Timeout detection
  useEffect(() => {
    if (!gameStarted) return
    const timeout = setTimeout(() => {
      if (isLoading) {
        Sentry.captureException(new Error('Game iframe load timeout'), {
          tags: { component: 'GameEmbed', reason: 'iframe_load_timeout' },
          extra: {
            sourceIndex: currentSource,
            sourceUrl: GAME_SOURCES[currentSource],
            hasFallback: sourceIndex < GAME_SOURCES.length - 1,
          },
        })
        setLoadError(true)
        setIsLoading(false)
      }
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timeout)
  }, [currentSource, isLoading, gameStarted, sourceIndex])

  // Preconnect to all game sources when user hovers the play button
  const handlePlayHover = useCallback(() => {
    SOURCE_ORIGINS.forEach(injectPreconnect)
  }, [])

  const handleStartGame = useCallback(() => {
    // Preconnect to the primary source immediately
    injectPreconnect(SOURCE_ORIGINS[sourceOrder[0]])
    setGameStarted(true)
  }, [sourceOrder])

  const enterFullscreen = async () => {
    if (!containerRef.current) return false
    const el = containerRef.current as FullscreenCapableElement
    if (el.requestFullscreen) { await el.requestFullscreen(); return true }
    if (el.webkitRequestFullscreen) { await el.webkitRequestFullscreen(); return true }
    return false
  }

  const exitFullscreen = async () => {
    const doc = document as FullscreenCapableDocument
    if (document.exitFullscreen) { await document.exitFullscreen(); return }
    if (doc.webkitExitFullscreen) { await doc.webkitExitFullscreen() }
  }

  const openSourceFallback = () => {
    window.open(GAME_SOURCES[currentSource], '_blank', 'noopener,noreferrer')
  }

  const toggleFullscreen = async () => {
    dismissFullscreenHint()
    const doc = document as FullscreenCapableDocument
    const isDocFullscreen = Boolean(document.fullscreenElement || doc.webkitFullscreenElement)
    try {
      if (!isDocFullscreen) {
        const ok = await enterFullscreen()
        if (!ok) openSourceFallback()
      } else {
        await exitFullscreen()
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: { component: 'GameEmbed', reason: 'fullscreen_toggle_failed' },
        extra: { sourceIndex: currentSource, sourceUrl: GAME_SOURCES[currentSource] },
      })
      if (!isDocFullscreen) openSourceFallback()
    }
  }

  const tryNextSource = () => {
    if (sourceIndex < GAME_SOURCES.length - 1) {
      setSourceIndex(sourceIndex + 1)
      setLoadError(false)
      setIsLoading(true)
      setLoadProgress(0)
    }
  }

  const handleIframeError = () => {
    Sentry.captureException(new Error('Game iframe failed to load'), {
      tags: { component: 'GameEmbed', reason: 'iframe_load_error' },
      extra: {
        sourceIndex: currentSource,
        sourceUrl: GAME_SOURCES[currentSource],
        hasFallback: sourceIndex < GAME_SOURCES.length - 1,
      },
    })
    setIsLoading(false)
    setLoadError(true)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setLoadProgress(100)
    // Remember the fastest source for next visit
    try {
      window.localStorage.setItem(FASTEST_SOURCE_KEY, String(currentSource))
    } catch {}
  }

  return (
    <div className="game-stage">
      <div ref={containerRef} className="game-container">
        {!gameStarted ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-10 cursor-pointer"
            onClick={handleStartGame}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🔪</div>
              <h2 className="text-2xl font-bold text-white mb-2">Sorry Bob - Surgeon Simulator</h2>
              <p className="text-gray-300 mb-6">Click to start playing!</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleStartGame(); }}
                onMouseEnter={handlePlayHover}
                onTouchStart={handlePlayHover}
                className="px-8 py-4 bg-game-primary text-white text-lg font-bold rounded-xl hover:bg-opacity-90 active:scale-95 transition-all shadow-lg shadow-game-primary/30"
              >
                ▶ Play Now
              </button>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-10">
                <div className="text-center">
                  <div className="text-4xl mb-4 animate-pulse">🔪</div>
                  <p className="text-white text-lg font-medium mb-4">Loading game...</p>
                  {/* Progress bar */}
                  <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mb-2">
                    <div
                      className="h-full bg-game-primary rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${loadProgress}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm">{loadProgress}%</p>
                  <p className="text-gray-500 text-xs mt-3">
                    Source: {new URL(GAME_SOURCES[currentSource]).hostname}
                  </p>
                </div>
              </div>
            )}
            <iframe
              key={currentSource}
              src={GAME_SOURCES[currentSource]}
              title="Sorry Bob - Surgeon Simulator"
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
              className="border-0 absolute top-0 left-0 w-full h-full"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </>
        )}
      </div>

      <div className="fullscreen-overlay">
        {showFullscreenHint && (
          <div className="fullscreen-hint" role="status" aria-live="polite">
            <p className="fullscreen-hint-text">Tip: tap Fullscreen for a better mobile view.</p>
            <button
              type="button"
              onClick={dismissFullscreenHint}
              className="fullscreen-hint-dismiss"
              aria-label="Dismiss fullscreen hint"
            >
              Dismiss
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`fullscreen-btn ${!isFullscreen ? 'fullscreen-btn-pulse' : ''}`}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          <span className="fullscreen-btn-icon" aria-hidden="true">
            {isFullscreen ? '⤓' : '⤢'}
          </span>
          <span className="fullscreen-btn-label">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </span>
        </button>
      </div>

      {loadError && sourceIndex < GAME_SOURCES.length - 1 && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-amber-800 mb-2">Game failed to load from this source</p>
          <button
            onClick={tryNextSource}
            className="touch-action-btn px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 active:bg-amber-700 transition-colors"
          >
            Try Alternative Source
          </button>
        </div>
      )}

      {loadError && sourceIndex === GAME_SOURCES.length - 1 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-800 mb-2">Unable to load game. Please try again later.</p>
          <a
            href="https://kbhgames.com/game/sorry-bob"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline hover:text-red-800"
          >
            Play on KBHGames instead →
          </a>
        </div>
      )}
    </div>
  )
}
