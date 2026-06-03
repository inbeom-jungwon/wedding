import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Intro from './Intro.jsx'

function Root() {
  const [introDone, setIntroDone] = useState(false)
  const [pageActive, setPageActive] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('page-active', pageActive)
  }, [pageActive])

  return (
    <>
      <App />
      {!introDone && (
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
