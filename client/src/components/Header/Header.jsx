import React from 'react'
import bananaLogo from '/bananaSVG.svg'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className='brand-name'>
        <img src={bananaLogo} alt="banana logo" className='logo'/>
        <a className='brand-text' href="https://fontmeme.com/donkey-kong-font/"><img src="https://fontmeme.com/permalink/250406/87e20466f407f3761d56bd1fa9c5cff5.png" alt="donkey-kong-font" border="0"/></a>
        <img src={bananaLogo} alt="banana logo" className='logo'/>

      </div>
      <div className='link-container'>
        <a href="www.guthib.com">Good website</a>
        <a href="www.github.com">Bad website</a>
      </div>
    </div>
  )
}

export default Header
