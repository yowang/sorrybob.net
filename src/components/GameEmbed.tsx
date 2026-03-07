'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import * as Sentry from '@sentry/nextjs'

// Fixed source - miniplay is the only reliable one
const GAME_SOURCE = 'https://www.miniplay.com/embed/sorry-bob-surgeon-simulator'
const GAME_ORIGIN = new URL(GAME_SOURCE).origin

const FULLSCREEN_HINT_KEY = 'sorrybob-fullscreen-hint-seen'
const LOAD_TIMEOUT_MS = 300000 // 300 seconds (5 min)

type FullscreenCapableElement = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type FullscreenCapableDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

function injectPreconnect(origin: string) {
  if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

export default function GameEmbed() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFullscreenHint, setShowFullscreenHint] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [iframeReady, setIframeReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadStartRef = useRef<number>(0)

  // --- Fullscreen hint ---
  const dismissFullscreenHint = () => {
    setShowFullscreenHint(false)
    try { window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1') } catch {}
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      setShowFullscreenHint(window.localStorage.getItem(FULLSCREEN_HINT_KEY) !== '1')
    } catch { setShowFullscreenHint(true) }
  }, [])

  useEffect(() => {
    if (!showFullscreenHint) return
    const timer = window.setTimeout(() => {
      setShowFullscreenHint(false)
      try { window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1') } catch {}
    }, 9000)
    return () => window.clearTimeout(timer)
  }, [showFullscreenHint])

  // --- Fullscreen sync ---
  useEffect(() => {
    const sync = () => {
      const doc = document as FullscreenCapableDocument
      setIsFullscreen(Boolean(document.fullscreenElement || doc.webkitFullscreenElement))
    }
    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync as EventListener)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync as EventListener)
    }
  }, [])

  // --- Preconnect on mount ---
  useEffect(() => {
    injectPreconnect(GAME_ORIGIN)
    loadStartRef.current = Date.now()
  }, [])

  // --- Progress bar ---
  useEffect(() => {
    if (!isLoading) return
    loadStartRef.current = Date.now()
    setLoadProgress(0)
    const interval = setInterval(() => {
      const elapsed = Date.now() - loadStartRef.current
      const progress = Math.min(90, (elapsed / LOAD_TIMEOUT_MS) * 95)
      setLoadProgress(Math.round(progress))
    }, 200)
    return () => clearInterval(interval)
  }, [isLoading])

  // --- Timeout detection (no auto-switch, just show error after 60s) ---
  useEffect(() => {
    if (!isLoading) return
    const timeout = setTimeout(() => {
      Sentry.captureException(new Error('Game iframe load timeout'), {
        tags: { component: 'GameEmbed', reason: 'iframe_load_timeout' },
        extra: { sourceUrl: GAME_SOURCE },
      })
      setLoadError(true)
      setIsLoading(false)
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timeout)
  }, [isLoading])

  const handleStartGame = useCallback(() => {
    setGameStarted(true)
  }, [])

  // --- Fullscreen ---
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
    window.open(GAME_SOURCE, '_blank', 'noopener,noreferrer')
  }

  const toggleFullscreen = async () => {
    dismissFullscreenHint()
    const doc = document as FullscreenCapableDocument
    const isDocFS = Boolean(document.fullscreenElement || doc.webkitFullscreenElement)
    try {
      if (!isDocFS) {
        if (!(await enterFullscreen())) openSourceFallback()
      } else {
        await exitFullscreen()
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: { component: 'GameEmbed', reason: 'fullscreen_toggle_failed' },
        extra: { sourceUrl: GAME_SOURCE },
      })
      if (!isDocFS) openSourceFallback()
    }
  }

  const handleIframeError = () => {
    Sentry.captureException(new Error('Game iframe failed to load'), {
      tags: { component: 'GameEmbed', reason: 'iframe_load_error' },
      extra: { sourceUrl: GAME_SOURCE },
    })
    setIsLoading(false)
    setLoadError(true)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setIframeReady(true)
    setLoadProgress(100)
  }

  return (
    <div className="game-stage">
      <div ref={containerRef} className="game-container">
        {/* iframe always renders (loads in background), hidden until user clicks Play */}
        <iframe
          src={GAME_SOURCE}
          title="Sorry Bob - Surgeon Simulator"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className={`border-0 absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            gameStarted && iframeReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />

        {/* Overlay: Play button (before user clicks) */}
        {!gameStarted && !loadError && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-10 cursor-pointer"
            onClick={handleStartGame}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🔪</div>
              <h2 className="text-2xl font-bold text-white mb-2">Sorry Bob - Surgeon Simulator</h2>
              {iframeReady ? (
                <p className="text-green-400 mb-6">✓ Game ready — click to play!</p>
              ) : (
                <p className="text-gray-400 mb-6">
                  <span className="inline-block animate-pulse mr-1">⏳</span>
                  Pre-loading game...
                </p>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleStartGame(); }}
                className={`px-8 py-4 text-white text-lg font-bold rounded-xl active:scale-95 transition-all shadow-lg ${
                  iframeReady
                    ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
                    : 'bg-game-primary hover:bg-opacity-90 shadow-game-primary/30'
                }`}
              >
                ▶ Play Now
              </button>
            </div>
          </div>
        )}

        {/* Overlay: Loading progress (user clicked Play but iframe not ready) */}
        {gameStarted && !iframeReady && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-10">
            <div className="text-center">
              <div className="text-4xl mb-4 animate-pulse">🔪</div>
              <p className="text-white text-lg font-medium mb-4">Loading game...</p>
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mb-2">
                <div
                  className="h-full bg-game-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm">{loadProgress}%</p>
            </div>
          </div>
        )}
      </div>

      <div className="fullscreen-overlay">
        {showFullscreenHint && (
          <div className="fullscreen-hint" role="status" aria-live="polite">
            <p className="fullscreen-hint-text">Tip: tap Fullscreen for a better mobile view.</p>
            <button type="button" onClick={dismissFullscreenHint} className="fullscreen-hint-dismiss" aria-label="Dismiss fullscreen hint">
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
          <span className="fullscreen-btn-icon" aria-hidden="true">{isFullscreen ? '⤓' : '⤢'}</span>
          <span className="fullscreen-btn-label">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>
      </div>

      {loadError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-800 mb-2">Game failed to load. Please try again.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
            <button
              onClick={() => {
                setLoadError(false)
                setIsLoading(true)
                setIframeReady(false)
                setLoadProgress(0)
              }}
              className="touch-action-btn px-4 py-3 bg-game-primary text-white rounded-lg hover:bg-opacity-90 active:scale-95 transition-all"
            >
              🔄 Retry
            </button>
            <a href="https://kbhgames.com/game/sorry-bob" target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Play on KBHGames instead →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
