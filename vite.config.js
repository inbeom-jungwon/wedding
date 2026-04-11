import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 프로젝트 사이트: 반드시 저장소 이름과 동일한 경로 (앞뒤 슬래시 포함)
// 예: 저장소가 github.com/me/my-invite 이면 base: '/my-invite/'
// 사용자 페이지(username.github.io)만 쓸 때는 base: '/' 로 바꿉니다.
// https://vite.dev/config/shared-options.html#base
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/wedding/',
})
