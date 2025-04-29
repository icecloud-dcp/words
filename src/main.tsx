import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BibleFlashcardApp from './AppBibleFlashCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BibleFlashcardApp />
  </StrictMode>,
)

// The only change is the name of the component from "App" to "AppBibleFlashCard".