export const VENUE = {
  name: '석파정',
  address: '서울특별시 종로구 창의문로11길 4-1',
  lat: 37.5923,
  lng: 126.9682,
}

/** 동명 장소 구분용 — 네이버 검색·표시에 이름+주소 함께 사용 */
const NAVER_QUERY = `${VENUE.name} ${VENUE.address}`

export const MAP_WEB = {
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(NAVER_QUERY)}`,
  tmap: `https://tmap.co.kr/main/routes/?goalName=${encodeURIComponent(NAVER_QUERY)}&goalX=${VENUE.lng}&goalY=${VENUE.lat}`,
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
  const placeName = encodeURIComponent(NAVER_QUERY)

  if (map === 'naver') {
    // 좌표로 정확한 위치 + 이름·주소로 동명 장소 구분
    return `nmap://place?lat=${VENUE.lat}&lng=${VENUE.lng}&name=${placeName}&appname=wedding`
  }

  if (isIOS()) {
    return `tmap://route?rGoName=${placeName}&rGoX=${VENUE.lng}&rGoY=${VENUE.lat}`
  }
  return `tmap://route?goalname=${placeName}&goalx=${VENUE.lng}&goaly=${VENUE.lat}`
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
