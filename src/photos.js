export const PHOTO_COUNT = 15

const BASE = import.meta.env.BASE_URL

export function photoSrc(index) {
  return `${BASE}photos/${String(index + 1).padStart(2, '0')}.jpg`
}

export function preloadPhotos() {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    const img = new Image()
    img.src = photoSrc(i)
  }
}
