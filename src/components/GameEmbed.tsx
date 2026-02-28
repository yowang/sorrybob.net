'use client'

import { useState, useRef, useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

const GAME_SOURCES = [
  'https://www.miniplay.com/embed/sorry-bob-surgeon-simulator',
  'https://geometry-games.io/sorry-bob',
  'https://www.gamenora.com/game/sorry-bob-surgeon-simulator/',
]
const FULLSCREEN_HINT_KEY = 'sorrybob-fullscreen-hint-seen'

type FullscreenCapableElement = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type FullscreenCapableDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

export default function GameEmbed() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentSource, setCurrentSource] = useState(0)
  const [showFullscreenHint, setShowFullscreenHint] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const dismissFullscreenHint = () => {
    setShowFullscreenHint(false)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1')
      } catch (_error) {
        // Ignore localStorage write failures in private browsing contexts.
      }
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
      try {
        window.localStorage.setItem(FULLSCREEN_HINT_KEY, '1')
      } catch (_error) {
        // Ignore localStorage write failures in private browsing contexts.
      }
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

  // Timeout detection - 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        Sentry.captureException(new Error('Game iframe load timeout'), {
          tags: {
            component: 'GameEmbed',
            reason: 'iframe_load_timeout',
          },
          extra: {
            sourceIndex: currentSource,
            sourceUrl: GAME_SOURCES[currentSource],
            hasFallback: currentSource < GAME_SOURCES.length - 1,
          },
        })
        setLoadError(true)
        setIsLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timeout)
  }, [currentSource, isLoading])

  const enterFullscreen = async () => {
    if (!containerRef.current) return false
    const fullscreenElement = containerRef.current as FullscreenCapableElement

    if (fullscreenElement.requestFullscreen) {
      await fullscreenElement.requestFullscreen()
      return true
    }
    if (fullscreenElement.webkitRequestFullscreen) {
      await fullscreenElement.webkitRequestFullscreen()
      return true
    }

    return false
  }

  const exitFullscreen = async () => {
    const fullscreenDocument = document as FullscreenCapableDocument
    if (document.exitFullscreen) {
      await document.exitFullscreen()
      return
    }
    if (fullscreenDocument.webkitExitFullscreen) {
      await fullscreenDocument.webkitExitFullscreen()
    }
  }

  const openSourceFallback = () => {
    window.open(GAME_SOURCES[currentSource], '_blank', 'noopener,noreferrer')
  }

  const toggleFullscreen = async () => {
    dismissFullscreenHint()
    const fullscreenDocument = document as FullscreenCapableDocument
    const isDocumentFullscreen = Boolean(
      document.fullscreenElement || fullscreenDocument.webkitFullscreenElement,
    )

    try {
      if (!isDocumentFullscreen) {
        const enteredFullscreen = await enterFullscreen()
        if (!enteredFullscreen) {
          openSourceFallback()
        }
      } else {
        await exitFullscreen()
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'GameEmbed',
          reason: 'fullscreen_toggle_failed',
        },
        extra: {
          sourceIndex: currentSource,
          sourceUrl: GAME_SOURCES[currentSource],
        },
      })
      if (!isDocumentFullscreen) {
        openSourceFallback()
      }
    }
  }

  const tryNextSource = () => {
    if (currentSource < GAME_SOURCES.length - 1) {
      setCurrentSource(currentSource + 1)
      setLoadError(false)
      setIsLoading(true)
    }
  }

  const handleIframeError = () => {
    Sentry.captureException(new Error('Game iframe failed to load'), {
      tags: {
        component: 'GameEmbed',
        reason: 'iframe_load_error',
      },
      extra: {
        sourceIndex: currentSource,
        sourceUrl: GAME_SOURCES[currentSource],
        hasFallback: currentSource < GAME_SOURCES.length - 1,
      },
    })
    setIsLoading(false)
    setLoadError(true)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="game-stage">
      <div ref={containerRef} className="game-container">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-game-primary mx-auto mb-4"></div>
              <p className="text-gray-600">游戏加载中...</p>
              <p className="text-gray-500 text-sm mt-2">Loading game...</p>
            </div>
          </div>
        )}
        <iframe
          key={currentSource}
          src={GAME_SOURCES[currentSource]}
          title="Sorry Bob - Surgeon Simulator"
          loading="lazy"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="border-0 absolute top-0 left-0 w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
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
      
      {loadError && currentSource < GAME_SOURCES.length - 1 && (
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
      
      {loadError && currentSource === GAME_SOURCES.length - 1 && (
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
