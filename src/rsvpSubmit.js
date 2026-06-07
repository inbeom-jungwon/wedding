const SCRIPT_URL = import.meta.env.VITE_RSVP_SCRIPT_URL

export async function submitRsvp(data) {
  if (!SCRIPT_URL) {
    throw new Error(
      'RSVP 연동 URL이 설정되지 않았습니다. 프로젝트 루트에 .env 파일을 만들고 VITE_RSVP_SCRIPT_URL을 넣은 뒤 서버를 다시 시작해 주세요.',
    )
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    // text/plain → 브라우저 preflight 없이 GAS로 전송 (정적 사이트 + GAS 표준 패턴)
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      ...data,
      submittedAt: new Date().toISOString(),
    }),
  })

  const text = await response.text()
  let result
  try {
    result = JSON.parse(text)
  } catch {
    result = { success: response.ok, message: text }
  }

  if (!response.ok || result.success === false) {
    throw new Error(result.message || '제출에 실패했습니다. 잠시 후 다시 시도해 주세요.')
  }

  return result
}
