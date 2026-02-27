'use client'

import { useState, useRef, useEffect } from 'react'

export default function GameEmbed() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentSource, setCurrentSource] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Multiple game sources for backup
  const gameSources = [
    'https://www.miniplay.com/embed/sorry-bob-surgeon-simulator',
    'https://geometry-games.io/sorry-bob',
    'https://www.gamenora.com/game/sorry-bob-surgeon-simulator/',
  ]

  // Timeout detection - 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setLoadError(true)
        setIsLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timeout)
  }, [currentSource, isLoading])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const tryNextSource = () => {
    if (currentSource < gameSources.length - 1) {
      setCurrentSource(currentSource + 1)
      setLoadError(false)
      setIsLoading(true)
    }
  }

  const handleIframeError = () => {
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
          src={gameSources[currentSource]}
          title="Sorry Bob - Surgeon Simulator"
          loading="lazy"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="border-0 absolute top-0 left-0 w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
        <button
          onClick={toggleFullscreen}
          className="fullscreen-btn"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? '⤓ Exit Fullscreen' : '⤢ Fullscreen'}
        </button>
      </div>
      
      {loadError && currentSource < gameSources.length - 1 && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-amber-800 mb-2">Game failed to load from this source</p>
          <button
            onClick={tryNextSource}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Alternative Source
          </button>
        </div>
      )}
      
      {loadError && currentSource === gameSources.length - 1 && (
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
