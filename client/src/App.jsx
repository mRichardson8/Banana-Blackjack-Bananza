import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage/LandingPage'
import Game from './pages/Game/Game'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/game' element={<Game />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
