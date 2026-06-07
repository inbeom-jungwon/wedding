export const VENUE = {
  name: '석파정 서울미술관',
}

const MAP_QUERY = VENUE.name
const encodedQuery = () => encodeURIComponent(MAP_QUERY)

export const MAP_WEB = {
  naver: `https://map.naver.com/v5/search/${encodedQuery()}`,
  tmap: `https://tmap.co.kr/main/search?searchKeyword=${encodedQuery()}`,
}

const TMAP_STORE = {
  ios: 'https://apps.apple.com/kr/app/id431589174',
  android: 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku',
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function getTmapStoreUrl() {
  if (isIOS()) return TMAP_STORE.ios
  if (isAndroid()) return TMAP_STORE.android
  return TMAP_STORE.android
}

function getMapDeepLink(map) {
  const query = encodedQuery()

  if (map === 'naver') {
    return `nmap://search?query=${query}&appname=wedding`
  }

  return `tmap://search?name=${query}`
}

function getMobileFallbackUrl(map) {
  if (map === 'tmap') return getTmapStoreUrl()
  return MAP_WEB[map]
}

export function openMapApp(map) {
  const isMobile = isIOS() || isAndroid()

  if (!isMobile) {
    window.open(MAP_WEB[map], '_blank', 'noopener,noreferrer')
    return
  }

  const fallbackUrl = getMobileFallbackUrl(map)
  const openedAt = Date.now()
  window.location.href = getMapDeepLink(map)

  setTimeout(() => {
    if (!document.hidden && Date.now() - openedAt < 2000) {
      window.location.href = fallbackUrl
    }
  }, 1000)
}
