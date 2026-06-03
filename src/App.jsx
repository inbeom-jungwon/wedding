import { useState, useRef, useEffect } from 'react'

const PHOTOS = [
  '01.jpeg', '02.jpeg', '03.jpeg', '04.jpeg', '05.jpeg',
  '06.jpeg', '07.jpeg', '08.jpeg', '09.jpeg', '10.jpeg',
  '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg',
]

const VENUE = {
  name: '석파정',
  lat: 37.5923,
  lng: 126.9682,
}

const MAP_WEB = {
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(VENUE.name)}`,
  tmap: `https://tmap.co.kr/main/routes/?goalName=${encodeURIComponent(VENUE.name)}&goalX=${VENUE.lng}&goalY=${VENUE.lat}`,
}

function getMapDeepLink(map) {
  const name = encodeURIComponent(VENUE.name)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (map === 'naver') {
    return `nmap://place?lat=${VENUE.lat}&lng=${VENUE.lng}&name=${name}&appname=wedding`
  }

  // iOS: rGoName / Android: goalname
  if (isIOS) {
    return `tmap://route?rGoName=${name}&rGoX=${VENUE.lng}&rGoY=${VENUE.lat}`
  }
  return `tmap://route?goalname=${name}&goalx=${VENUE.lng}&goaly=${VENUE.lat}`
}

function openMapApp(map) {
  const webUrl = MAP_WEB[map]
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (!isMobile) {
    window.open(webUrl, '_blank', 'noopener,noreferrer')
    return
  }

  const openedAt = Date.now()
  window.location.href = getMapDeepLink(map)

  // 앱이 열리면 페이지가 background → 웹 폴백 생략
  setTimeout(() => {
    if (!document.hidden && Date.now() - openedAt < 1500) {
      window.location.href = webUrl
    }
  }, 800)
}

// 오시는 길 NAVER / T MAP 아이콘 위치 (이미지 대비 %)
const MAP_AREAS = {
  naver: { top: '64.5%', left: '44%', width: '5%', height: '1%' },
  tmap: { top: '64.5%', left: '52%', width: '5%', height: '1%' },
}

function MapLink({ map, label, area }) {
  const devHighlight = import.meta.env.DEV ? 'bg-red-500/25 ring-1 ring-red-400/50' : ''

  return (
    <a
      href={MAP_WEB[map]}
      aria-label={label}
      className={`absolute z-10 block ${devHighlight}`}
      style={{
        top: area.top,
        left: area.left,
        width: area.width,
        height: area.height,
      }}
      onClick={(e) => {
        e.preventDefault()
        openMapApp(map)
      }}
    >
      <span className="sr-only">{label}</span>
    </a>
  )
}

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
        src={`${import.meta.env.BASE_URL}photos/${PHOTOS[index]}`}
        alt={`wedding ${index + 1}`}
        className="max-h-svh max-w-full object-contain"
        style={{ animation: 'fadeIn 0.2s ease' }}
        onClick={(e) => e.stopPropagation()}
      />

      {index < PHOTOS.length - 1 && (
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
        {index + 1} / {PHOTOS.length}
      </p>
    </div>
  )
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div className="mx-auto min-h-svh max-w-sm bg-[#ede8d4]">

      {/* 디자인 청첩장 이미지 + 오시는 길 버튼 */}
      <div className="relative w-full">
        <img
          src={`${import.meta.env.BASE_URL}invite.jpeg`}
          alt="청첩장"
          className="block w-full"
        />
        <MapLink map="naver" label="네이버 지도 앱에서 석파정 보기" area={MAP_AREAS.naver} />
        <MapLink map="tmap" label="티맵 앱에서 석파정 길찾기" area={MAP_AREAS.tmap} />
      </div>

      {/* 사진 3열 그리드 */}
      {PHOTOS.length > 0 && (
        <div className="grid w-full grid-cols-3 gap-1">
          {PHOTOS.map((filename, i) => (
            <img
              key={i}
              src={`${import.meta.env.BASE_URL}photos/${filename}`}
              alt={`wedding ${i + 1}`}
              className="aspect-square w-full cursor-pointer object-cover"
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex(i => Math.min(PHOTOS.length - 1, i + 1))}
        />
      )}
    </div>
  )
}

export default App
