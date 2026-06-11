import { useState, useEffect } from 'react'
import InviteHero from './InviteHero.jsx'
import RsvpModal from './RsvpModal.jsx'
import { preloadPhotos } from './photos.js'

function App({ animateSaveDate = false }) {
  const [photosUnlocked, setPhotosUnlocked] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)

  useEffect(() => {
    if (animateSaveDate) preloadPhotos()
  }, [animateSaveDate])

  return (
    <div className="mx-auto min-h-svh max-w-sm bg-[#ede8d4]">

      <InviteHero
        animate={animateSaveDate}
        photosUnlocked={photosUnlocked}
        onPhotosUnlock={() => setPhotosUnlocked(true)}
        onRsvpClick={() => setRsvpOpen(true)}
      />

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </div>
  )
}

export default App
