import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Intro from './Intro.jsx'

const INTRO_ENABLED = true // 디버그용 — true로 바꾸면 Intro 다시 켜짐

function Root() {
  const [introDone, setIntroDone] = useState(!INTRO_ENABLED)
  const [pageActive, setPageActive] = useState(!INTRO_ENABLED)

  useEffect(() => {
    document.documentElement.classList.toggle('page-active', pageActive)
  }, [pageActive])

  return (
    <>
      <App animateSaveDate={pageActive} />
      {INTRO_ENABLED && !introDone && (
        <Intro
          onEnter={() => setPageActive(true)}
          onDone={() => setIntroDone(true)}
        />
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
