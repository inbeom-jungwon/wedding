import { useEffect, useRef, useState } from 'react'
import introVideo from './assets/intro.mp4'

const FADE_DURATION_MS = 500

export default function Intro({ onEnter, onDone }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => { video.play().catch(() => {}) }

    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    return () => video.removeEventListener('loadeddata', tryPlay)
  }, [])

  function handleEnded() {
    setReady(true)
  }

  function handleClick() {
    if (fading) return

    const video = videoRef.current

    if (!ready) {
      video?.play().catch(() => {})
      return
    }

    setFading(true)
    onEnter()
    setTimeout(() => onDone(), FADE_DURATION_MS)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={introVideo}
        className="h-full w-full max-w-sm object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
      />

      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-xs tracking-[0.3em] text-white/60 uppercase"
      >
        {ready ? 'tap to enter' : null}
      </div>
    </div>
  )
}
