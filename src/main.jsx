import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/share-tech-mono/index.css'
import './styles/global.css'
import App from './App'
import { installNoise } from './lib/noise'

installNoise()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
