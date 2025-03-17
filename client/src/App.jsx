import { useMemo } from 'react'

import './App.css'
import bonanzaLogo from './assets/bonanza-logo.jpg'
import { LinkContainer } from './components'
import bananaLogo from '/bananaSVG.svg'

function App() {
  const links = useMemo(() => {
    return [
      {link: "https://en.wikipedia.org/wiki/Banana", imgSrc: bananaLogo},
      {link: "https://en.wikipedia.org/wiki/Bonanza", imgSrc: bonanzaLogo, classes: "rotate"}
    ]
  }, [])
  

  return (
    <>
      <LinkContainer links={links}/>
      <h1>🍌 Banana Blackjack Bananza 🍌</h1>
      <p className="read-the-docs">
        Click on the logos to learn important life lessons
      </p>
    </>
  )
}

export default App
