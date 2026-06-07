# 청첩장 (React + Vite + Tailwind)

내용: `src/App.jsx`의 `INVITE` · GIF: `public/invitation-demo.gif`

```bash
nvm use 22 && npm i && npm start
```

배포: `vite.config.js`의 `base`를 GitHub **저장소 이름**과 맞춘 뒤 `npm run deploy`.  
저장소 **Settings → Pages**에서 브랜치 **`gh-pages`** / `(root)`.

```bash
npm run build && npm run serve   # dist만 확인
```

## RSVP → Google 스프레드시트

1. Google 스프레드시트 생성
2. **확장 프로그램 → Apps Script**에 `scripts/google-apps-script.gs` 내용 붙여넣기
   - 시트에서 연 Apps Script면 `SPREADSHEET_ID`는 `''` 로 비워 두면 됨
   - `RSVP` 탭이 없으면 제출 시 자동 생성됨
3. **배포 → 새 배포 → 웹 앱** (실행: 나, 액세스: 모든 사용자)
   - 코드 수정 후에는 **반드시 새 배포** (배포 관리 → 연필 아이콘 → 새 버전)
4. 프로젝트 루트 **`.env`**에 배포 URL 저장:

```
VITE_RSVP_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

> URL 변경 후 `npm start`는 서버 재시작, 배포는 `npm run build` 다시 필요.

5. `npm run deploy` (환경 변수는 빌드 시점에 포함됨)
