'use client'

import { useState, useRef } from 'react'

export default function GameEmbed() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} className="game-container">
      <iframe
        src="https://www.miniplay.com/embed/sorry-bob-surgeon-simulator"
        title="Sorry Bob - Surgeon Simulator"
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
        className="border-0"
      />
      <button
        onClick={toggleFullscreen}
        className="fullscreen-btn"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? '⤓ Exit Fullscreen' : '⤢ Fullscreen'}
      </button>
    </div>
  )
}
