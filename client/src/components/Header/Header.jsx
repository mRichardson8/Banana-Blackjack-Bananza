import React from 'react'
import bananaLogo from '/bananaSVG.svg'
import './Header.css'
import { useNavigate } from 'react-router'
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='header'>
      <div className='brand-name' onClick={() => navigate('/')}>
        <img src={bananaLogo} alt="banana logo" className='logo'/>
        <a className='brand-text'><img src="https://fontmeme.com/permalink/250406/87e20466f407f3761d56bd1fa9c5cff5.png" alt="donkey-kong-font" border="0"/></a>
        <img src={bananaLogo} alt="banana logo" className='logo'/>

      </div>
      <div className='link-container'>
      {/* Empty but maybe useful for when we have navlinks */}
      </div>
    </div>
  )
}
  
export default Header
