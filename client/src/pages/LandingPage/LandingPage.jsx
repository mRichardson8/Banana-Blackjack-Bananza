import React, { useCallback } from 'react'
import Layout from '../../components/Layout/Layout'
import "./LandingPage.css"
import { useNavigate } from 'react-router'

const LandingPage = () => {

  const navigate = useNavigate();

  const startGame = useCallback(
    () => {
      navigate('/game')
    },
    [],
  )
  
  return (
    <Layout>
			<div className='landing-page'>
        <button onClick={() => startGame()}>Start game</button>
			</div>
    </Layout>
    
  )
}

export default LandingPage
