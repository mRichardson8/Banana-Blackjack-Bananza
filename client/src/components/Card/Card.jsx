import React, { useCallback, useRef, useState } from 'react'
import cardBack from '../../assets/cardback.png'
import cardBack2 from '../../assets/cards/2_of_clubs.png'
import './Card.css'


const Card = ({value, width, height}) => {
    // convert value to the correct png
    const getCardValue = useCallback(
      () => {
        return cardBack
      },
      [value],
    );
    const ref = useRef(null)
    const [rotated, setRotated] = useState(false)
    const onClick = () => { 
      if (rotated){
        setRotated(false);
        ref.current.style.transform = 'rotateY(0)';
      } else {
        setRotated(true);
        ref.current.style.transform = 'rotateY(180deg)';
      }
      
    }
    
    return (
        <div className='card-outer' onClick={() => onClick()}>
          <div className="card-inner"  ref={ref}>
            <div className="card-front">
              <img src={getCardValue()} alt="card graphic" style={{width: width, height: height}}/>
            </div>
            <div className='card-back'>
            <img src={cardBack2} alt="card graphic" style={{width: width, height: height}}/>
            </div>
          </div>
        </div>
    )
}

export default Card