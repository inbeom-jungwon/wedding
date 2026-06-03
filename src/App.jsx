import { useState, useRef, useEffect } from 'react'
import InviteHero from './InviteHero.jsx'

const PHOTO_COUNT = 15

function Lightbox({ index, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onClose])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? onNext() : onPrev()
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {index > 0 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/50 hover:text-white"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >‹</button>
      )}

      <img
        key={index}
        src={`${import.meta.env.BASE_URL}photos/${String(index + 1).padStart(2, '0')}.jpeg`}
        alt={`wedding ${index + 1}`}
        className="max-h-svh max-w-full object-contain"
        style={{ animation: 'fadeIn 0.2s ease' }}
        onClick={(e) => e.stopPropagation()}
      />

      {index < PHOTO_COUNT - 1 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/50 hover:text-white"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >›</button>
      )}

      <button
        className="absolute right-4 top-4 p-2 text-xl text-white/40 hover:text-white leading-none"
        onClick={onClose}
      >✕</button>

      <p className="absolute bottom-5 text-xs tracking-widest text-white/30">
        {index + 1} / {PHOTO_COUNT}
      </p>
    </div>
  )
}

function App({ animateSaveDate = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [photosUnlocked, setPhotosUnlocked] = useState(false)

  return (
    <div className="mx-auto min-h-svh max-w-sm bg-[#ede8d4]">

      <InviteHero
        animate={animateSaveDate}
        photosUnlocked={photosUnlocked}
        onPhotosUnlock={() => setPhotosUnlocked(true)}
        onPhotoClick={setLightboxIndex}
      />

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex(i => Math.min(PHOTO_COUNT - 1, i + 1))}
        />
      )}
    </div>
  )
}

export default App
