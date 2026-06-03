import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Intro from './Intro.jsx'

function Root() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <App />
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
