/**
 * Component used to display the game window and allow the user to play the game
 */

import React, { useEffect, useState } from 'react';
import cardBack from '../../assets/cardback.png';
import Card from '../../components/Card/Card';
import Layout from '../../components/Layout/Layout';
import { playerAction, startGame } from './apiEndpoints';
import './Game.css';


const Game = () => {
  const [gameID, setGameID] = useState("");
  const [gameState, setGameState] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [handValue, setHandValue] = useState(0);
  const [loading, setLoading] = useState(true)
  
  const addCard = () => {
    setPlayerHand([...playerHand, 'H2'])
  }

  const emptyHand = () => {
    setPlayerHand([])
  }

  // Mock some values idk
  // TODO remove this
  useEffect(() => {
    setPlayerHand(["S5", "D7",]);
    setDealerHand(["?", "?"]);
  }, [])
  
  // On page load, one time get data
  useEffect(() => {
    const onPageLoad = async () => { 
      const {newGameID} = startGame();
      console.log("setting game id from json");
      setGameID(newGameID);
    }
    onPageLoad();
    setLoading(false)
  }, []);

  
  return (
    <Layout>
        <div id='game-page'>
          {loading ? <div className='loading-screen'>
            <p>We're loading y'all</p>
            </div> : <>
            <section className='dealer-half'>
              <div className='discard-pile'>
                <p>Discard (48)</p>
                <img src={cardBack} alt="card graphic" style={{width: '80px'}}/>
              </div>
              <div className='dealer-hand'>
              {dealerHand.map((card, index) => {
                  return <Card key={`card-${index}`} value={card} width={'300px'}/>
                })}
              </div>
              <div className='deck'>
                <p>Deck (56)</p>
                <img src={cardBack} alt="card graphic" style={{width: '80px'}}/>
              </div>
            </section>
            <section className='player-half'>
              <div className='bet-amount'>
                <p style={{margin: 0, textAlign: 'center'}}>I 'bet' something is supposed to be here</p>
              </div>
              <div className='player-hand-container'>
                <div className="player-hand">
                  {playerHand.map((card, index) => {
                    return <Card key={`card-${index}`} value={card} width={'300px'}/>
                  })}
                </div>
                <p>Hand value: {handValue}</p>
              </div>
              <div className='player-actions'>
                <button onClick={addCard}>Hit</button>
                <button onClick={emptyHand}>Twist</button>
              </div>
            </section>
            </>}
        </div>
    </Layout>
  )
}

export default Game