import { useRef, useState } from 'react'
import introVideo from './assets/intro.mp4'

const FADE_DURATION_MS = 600

export default function Intro({ onDone }) {
  const videoRef = useRef(null)
  const [ready, setReady]   = useState(false)
  const [fading, setFading] = useState(false)

  function handleEnded() {
    setReady(true)
  }

  function handleClick() {
    if (!ready || fading) return
    setFading(true)
    setTimeout(() => onDone(), FADE_DURATION_MS)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
        cursor: ready ? 'pointer' : 'default',
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
        onEnded={handleEnded}
      />

      {/* 재생 끝난 뒤 탭 유도 */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        tap to enter
      </div>
    </div>
  )
}
