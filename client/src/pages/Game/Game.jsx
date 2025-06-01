/**
 * Component used to display the game window and allow the user to play the game
 */

import React, { useEffect, useState } from "react";
import cardBack from "../../assets/cardback.png";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
// import { playerAction, startGame } from "./apiEndpoints";
import { mockPlayerAction as playerAction, mockStartGame as startGame } from "./apiEndpoints"; // Mock the api for now
import "./Game.css";

const Game = () => {
  const [gameID, setGameID] = useState("");
  const [gameState, setGameState] = useState("");
  const [playerHand, setPlayerHand] = useState({
    cards: [],
    value: 0
  });
  const [dealerHand, setDealerHand] = useState({
    cards: [],
    value: 0
  });
  const [handValue, setHandValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")


  const playerHit = async () => {
    const {gameState, newCard} = await playerAction("hit", gameID)
    console.log(`new card is ${newCard}`);
    addCard(newCard)
    setGameState(gameState)
  }

  const playerStand = async () => {
    const {gameState, dealerHand} = await playerAction("stand", gameID)
    console.log("logging returns")
    console.log(gameState);
    console.log(dealerHand);
    // TODO this should be done as an animation one card at a time
    setDealerHand(dealerHand);
    if (gameState === 'draw'){
      displayDraw()
    }
    if (gameState === 'lose'){
      displayLoss()
    }
    if (gameState === 'win'){
      displayWin()
    }
  }

  const addCard = (newCard) => {
    // TODO add animation logic for the new card
    setPlayerHand({cards: [...playerHand.cards, newCard], value: playerHand.value + 1});
  };

  const emptyHand = () => {
    setPlayerHand([]);
  };

  // Mock some values idk
  useEffect(() => {
    setPlayerHand({cards: ["S5", "D7"], value: 17});
    setDealerHand({cards: ["?", "?"], value: '?'});
  }, []);

  // On page load, one time get data
  useEffect(() => {
    const onPageLoad = async () => {
      const { newGameID } = startGame();
      setGameID(newGameID);
    };
    onPageLoad();
    setLoading(false);
  }, []);

  const displayWin = () => {
    // set anim, banana shaped confetti
    setShowModal(true)
    setModalType("win");
  }

  const displayDraw = () => {
    // set anim something funny idk
    setShowModal(true)
    setModalType("draw");
  }

  const displayLoss = () => {
    // set anim banana turning to dust fragmenting? 
    setShowModal(true);
    setModalType("lose");
  }

  return (
    <Layout>
      <div id="game-page">
        {showModal && 
        <div className="results-modal" onClick={() => setShowModal(false)}>
          <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
          {modalType === 'win' && <>You win</>}
          {modalType === 'lose' && <>You lose</>}
          {modalType === 'draw' && <>Your chungus ass drew</>}
          </div>
        </div>
        }
        {loading ? (
          <div className="loading-screen">
            <p>We're loading y'all</p>
          </div>
        ) : (
          <>
            <section className="dealer-half">
              <div className="discard-pile">
                <p>Discard (48)</p>
                <img
                  src={cardBack}
                  alt="card graphic"
                  style={{ width: "80px" }}
                />
              </div>
              <div className="dealer-hand">
                {dealerHand.cards?.map((card, index) => {
                  return (
                    <Card key={`card-${index}`} value={card} width={"300px"} />
                  );
                })}
              </div>
              <div className="deck">
                <p>Deck (56)</p>
                <img
                  src={cardBack}
                  alt="card graphic"
                  style={{ width: "80px" }}
                />
              </div>
            </section>
            <section className="player-half">
              <div className="bet-amount">
                <p style={{ margin: 0, textAlign: "center" }}>
                  I 'bet' something is supposed to be here
                </p>
              </div>
              <div className="player-hand-container">
                <div className="player-hand">
                  {playerHand.cards?.map((card, index) => {
                    return (
                      <Card
                        key={`card-${index}`}
                        value={card}
                        width={"300px"}
                      />
                    );
                  })}
                </div>
                <p>Hand value: {handValue}</p>
              </div>
              <div className="player-actions">
                <button onClick={playerHit}>Hit</button>
                <button onClick={playerStand}>Stand</button>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Game;
