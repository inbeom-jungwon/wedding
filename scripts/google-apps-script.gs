/**
 * Google 스프레드시트 RSVP 연동
 *
 * [방법 A] 스프레드시트에 스크립트 붙이기 (추천)
 * 1. 스프레드시트 → 확장 프로그램 → Apps Script → 이 코드 붙여넣기
 * 2. SPREADSHEET_ID 는 그대로 두거나 빈 문자열 '' 로 둠 → 붙어 있는 시트 사용
 * 3. 배포 → 새 배포 → 웹 앱 (실행: 나, 액세스: 모든 사용자)
 *
 * [방법 B] 독립 스크립트
 * 1. SPREADSHEET_ID 를 시트 URL의 /d/ 와 /edit 사이 ID로 설정
 *
 * 시트 이름이 RSVP 가 아니어도 자동으로 RSVP 탭을 만들고 헤더를 넣습니다.
 */

const SPREADSHEET_ID = '' // 비우면 스크립트가 연결된 스프레드시트 사용
const SHEET_NAME = 'RSVP'
const HEADERS = ['제출일시', '하객', '참석여부', '식사', '성함']

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== '여기에_스프레드시트_ID') {
    return SpreadsheetApp.openById(SPREADSHEET_ID)
  }

  const active = SpreadsheetApp.getActiveSpreadsheet()
  if (!active) {
    throw new Error('스프레드시트를 찾을 수 없습니다. SPREADSHEET_ID를 설정하거나, 시트에서 Apps Script를 열어 주세요.')
  }
  return active
}

function getOrCreateSheet() {
  const ss = getSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    return sheet
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
  }

  return sheet
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = getOrCreateSheet()

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.side || '',
      data.attendance || '',
      data.meal || '',
      data.name || '',
    ])

    return jsonResponse({ success: true })
  } catch (err) {
    return jsonResponse({ success: false, message: String(err) })
  }
}

function doGet() {
  return jsonResponse({ success: true, message: 'RSVP endpoint ready' })
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
