import { useMemo } from 'react'

import './App.css'
import bonanzaLogo from './assets/bonanza-logo.jpg'
import { LinkContainer } from './components'
import bananaLogo from '/bananaSVG.svg'
import { BrowserRouter, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  const links = useMemo(() => {
    return [
      {link: "https://en.wikipedia.org/wiki/Banana", imgSrc: bananaLogo},
      {link: "https://en.wikipedia.org/wiki/Bonanza", imgSrc: bonanzaLogo, classes: "rotate"}
    ]
  }, [])
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
