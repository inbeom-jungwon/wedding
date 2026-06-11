import { useState, useRef, useEffect } from 'react'
import InviteHero from './InviteHero.jsx'
import RsvpModal from './RsvpModal.jsx'
import { PHOTO_COUNT, photoSrc, preloadPhotos } from './photos.js'
import { useScrollLock } from './useScrollLock.js'

function Lightbox({ index, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null)
  const touchStart = useRef(null)

  useScrollLock(true)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onClose])

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return undefined

    const blockTouchMove = (e) => e.preventDefault()
    el.addEventListener('touchmove', blockTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', blockTouchMove)
  }, [])

  const handleTouchStart = (e) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? onNext() : onPrev()
    }
  }

  return (
    <div
      ref={overlayRef}
      className="lightbox"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {index > 0 && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--prev"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >‹</button>
      )}

      <img
        key={index}
        src={photoSrc(index)}
        alt={`wedding ${index + 1}`}
        className="lightbox-img"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
      />

      {index < PHOTO_COUNT - 1 && (
        <button
          type="button"
          className="lightbox-nav lightbox-nav--next"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >›</button>
      )}

      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
      >✕</button>

      <p className="lightbox-counter">
        {index + 1} / {PHOTO_COUNT}
      </p>
    </div>
  )
}

function App({
  animateSaveDate = false,
  rsvpOpen = false,
  onRsvpOpenChange = () => {},
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [photosUnlocked, setPhotosUnlocked] = useState(false)

  useEffect(() => {
    if (animateSaveDate) preloadPhotos()
  }, [animateSaveDate])

  return (
    <div className="mx-auto min-h-svh max-w-sm bg-[#ede8d4]">

      <InviteHero
        animate={animateSaveDate}
        photosUnlocked={photosUnlocked}
        onPhotosUnlock={() => setPhotosUnlocked(true)}
        onPhotoClick={setLightboxIndex}
        onRsvpClick={() => onRsvpOpenChange(true)}
      />

      <RsvpModal open={rsvpOpen} onClose={() => onRsvpOpenChange(false)} />

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(PHOTO_COUNT - 1, i + 1))}
        />
      )}
    </div>
  )
}

export default App
