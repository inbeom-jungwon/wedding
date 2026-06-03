export const VENUE = {
  name: '석파정',
  lat: 37.5923,
  lng: 126.9682,
}

export const MAP_WEB = {
  naver: `https://map.naver.com/v5/search/${encodeURIComponent(VENUE.name)}`,
  tmap: `https://tmap.co.kr/main/routes/?goalName=${encodeURIComponent(VENUE.name)}&goalX=${VENUE.lng}&goalY=${VENUE.lat}`,
}

function getMapDeepLink(map) {
  const name = encodeURIComponent(VENUE.name)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (map === 'naver') {
    return `nmap://place?lat=${VENUE.lat}&lng=${VENUE.lng}&name=${name}&appname=wedding`
  }

  if (isIOS) {
    return `tmap://route?rGoName=${name}&rGoX=${VENUE.lng}&rGoY=${VENUE.lat}`
  }
  return `tmap://route?goalname=${name}&goalx=${VENUE.lng}&goaly=${VENUE.lat}`
}

export function openMapApp(map) {
  const webUrl = MAP_WEB[map]
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (!isMobile) {
    window.open(webUrl, '_blank', 'noopener,noreferrer')
    return
  }

  const openedAt = Date.now()
  window.location.href = getMapDeepLink(map)

  setTimeout(() => {
    if (!document.hidden && Date.now() - openedAt < 1500) {
      window.location.href = webUrl
    }
  }, 800)
}
