import { useEffect, useRef, useState } from 'react'
import { openMapApp } from './mapLinks.js'
import { PHOTO_COUNT, photoSrc, preloadPhotos } from './photos.js'

const BASE = import.meta.env.BASE_URL

function MapIcon({ map, active, delay }) {
  const label = map === 'naver' ? '네이버 지도 앱에서 석파정 보기' : '티맵 앱에서 석파정 길찾기'

  return (
    <button
      type="button"
      className={`invite-rise map-icon-${map} ${active ? 'is-active' : ''}`}
      style={{ animationDelay: delay }}
      aria-label={label}
      onClick={() => openMapApp(map)}
    >
      <img
        src={`${BASE}invite_3_${map}.png`}
        alt={map === 'naver' ? 'NAVER' : 'T MAP'}
        className="block w-full"
      />
    </button>
  )
}

function useInView(threshold = 0.25) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function Invite4Section() {
  const { ref, inView } = useInView(0.25)

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <img
        src={`${BASE}invite_4.jpg`}
        alt=""
        className={`invite-4-reveal block w-full ${inView ? 'is-active' : ''}`}
      />
    </div>
  )
}

function MapSection() {
  const { ref, inView } = useInView(0.3)

  return (
    <div ref={ref} className="relative w-full">
      <img
        src={`${BASE}invite_3.jpg`}
        alt=""
        className="block w-full"
        aria-hidden
      />
      <MapIcon map="naver" active={inView} delay="0.2s" />
      <MapIcon map="tmap" active={inView} delay="0.75s" />
    </div>
  )
}

function PhotoGateSection({ onUnlock, unlocked, onPhotoClick }) {
  const { ref, inView } = useInView(0.1)

  useEffect(() => {
    if (inView) preloadPhotos()
  }, [inView])

  return (
    <div
      ref={ref}
      className={`photo-gate relative w-full${unlocked ? ' photo-gate-open' : ''}`}
    >
      <img
        src={`${BASE}invite_5.jpeg`}
        alt=""
        className={`block w-full ${unlocked ? 'photo-gate-bg-cut' : ''}`}
        aria-hidden
      />

      {!unlocked ? (
        <button
          type="button"
          className="photo-click-slot absolute left-1/2 -translate-x-1/2 block"
          aria-label="사진 갤러리 보기"
          onClick={onUnlock}
        >
          <img
            src={`${BASE}invite_5_photo_click.jpeg`}
            alt="사진 보기"
            className="block w-full"
          />
        </button>
      ) : (
        <div className="photo-grid-slot photos-reveal grid w-full grid-cols-3 gap-1">
          {Array.from({ length: PHOTO_COUNT }, (_, i) => (
            <img
              key={i}
              src={photoSrc(i)}
              alt={`wedding ${i + 1}`}
              className="aspect-square w-full cursor-pointer object-cover"
              onClick={() => onPhotoClick(i)}
            />
          ))}
        </div>
      )}

      {inView && !unlocked && (
        <div className="photo-preload" aria-hidden>
          {Array.from({ length: PHOTO_COUNT }, (_, i) => (
            <img key={i} src={photoSrc(i)} alt="" />
          ))}
        </div>
      )}
    </div>
  )
}

export default function InviteHero({ animate, photosUnlocked, onPhotosUnlock, onPhotoClick, onRsvpClick }) {
  const { ref: saveDateRef, inView: saveDateInView } = useInView(0.2)

  return (
    <div className="w-full">
      <div ref={saveDateRef} className="relative w-full">
        <div className="invite-1-crop">
          <img
            src={`${BASE}invite_1.jpg`}
            alt="청첩장"
          />
        </div>
        <img
          src={`${BASE}invite_1_save_the_date.png`}
          alt="Save the Date"
          className={`invite-rise save-date-slot ${animate && saveDateInView ? 'is-active' : ''}`}
          style={{ animationDelay: '0.25s' }}
        />
      </div>

      <div className="relative w-full">
        <img
          src={`${BASE}invite_2.jpg`}
          alt=""
          className="block w-full"
          aria-hidden
        />
        <button
          type="button"
          className="invite-blink rsvp-slot absolute left-1/2 -translate-x-1/2 block border-0 bg-transparent p-0"
          aria-label="RSVP 참석 여부 응답하기"
          onClick={onRsvpClick}
        >
          <img
            src={`${BASE}invite_2_rsvp.png`}
            alt="RSVP"
            className="block w-full"
          />
        </button>
      </div>

      <MapSection />
      <Invite4Section />
      <PhotoGateSection
        onUnlock={onPhotosUnlock}
        unlocked={photosUnlocked}
        onPhotoClick={onPhotoClick}
      />
    </div>
  )
}
