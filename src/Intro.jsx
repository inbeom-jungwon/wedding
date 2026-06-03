import { useEffect, useRef, useState } from 'react'
import introVideo from './assets/intro.mp4'

const FADE_DURATION_MS = 500

export default function Intro({ onDone }) {
  const videoRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)
  const [ready, setReady] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = introVideo
    document.head.appendChild(link)
    return () => link.remove()
  }, [])

  function handleCanPlay() {
    setCanPlay(true)
    videoRef.current?.play().catch(() => {})
  }

  function handleEnded() {
    setReady(true)
  }

  function handleClick() {
    if (!ready || fading) return
    setFading(true)
    setTimeout(() => onDone(), FADE_DURATION_MS)
  }

  const visible = canPlay && !fading

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        cursor: ready ? 'pointer' : 'default',
      }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={introVideo}
        className="h-full w-full max-w-sm object-cover"
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
      />

      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/60 uppercase transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      >
        tap to enter
      </div>
    </div>
  )
}
