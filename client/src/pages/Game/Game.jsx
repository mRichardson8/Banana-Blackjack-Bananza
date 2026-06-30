import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import cardBack from "../../../public/assets/cardback.png";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import { playerAction, startGame } from "./apiEndpoints";
import "./Game.css";

const Game = () => {
  const [gameID, setGameID] = useState("");
  const [playerHand, setPlayerHand] = useState({
    cards: [],
    value: 0,
  });
  const [dealerHand, setDealerHand] = useState({
    cards: [],
    value: 0,
  });
  const [deck, setDeck] = useState(52);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [showDealerHand, setShowDealerHand] = useState(false);

  const deckRef = useRef(null);
  const discardRef = useRef(null);
  

  const updateHand = useCallback(
    // shorthand function to update the state of the hand
    (newHand) => {
      setPlayerHand(() => ({
        cards: newHand.cards,
        value: newHand.value,
      }));
    },
    []
  );

  const disablePlayerInput = useCallback((timeout) => {
    // Disable the player buttons for 1 second or a given timeout
    setDisableInput(true);
    setTimeout(() => {
      setDisableInput(false);
    }, timeout ?? 1000);
  }, []);

  const animateDraw = useCallback(async (card) => {
    // Without any timeout, this will animate the final card before the new one is added
    disablePlayerInput();
    let query = ".player-hand .card-outer:last-child .card-inner";
    if (card) query = `.player-hand .card-outer#card-${card} .card-inner`;
    setTimeout(() => {
      // Get position of the new card
      const { x: cardX, y: cardY } = document
        .querySelector(query)
        .getBoundingClientRect();
      // Get position of the deck
      const { x: deckX, y: deckY } = deckRef.current.getBoundingClientRect();
      const newX = deckX - cardX;
      const newY = deckY - cardY;
      gsap.fromTo(
        query,
        { x: newX, y: newY, rotateY: 180 },
        { x: 0, y: 0, rotateY: 0, visibility: "visible", duration: 0.75 }
      );
    }, 1);
  }, [disablePlayerInput]);

  const discardHand = useCallback(() => {
    const { x: deckX, y: deckY } = discardRef.current.getBoundingClientRect();
    for (let i = 1; i <= playerHand.cards.length; i++) {
      // Get position of the new card
      const { x: cardX, y: cardY } = document
        .querySelector(
          `.player-hand .card-outer:nth-child(${i}) .card-inner img`
        )
        .getBoundingClientRect();
      // Get position of the deck
      const newX = deckX - cardX;
      const newY = deckY - cardY;
      gsap.fromTo(
        `.player-hand .card-outer:nth-child(${i}) .card-inner`,
        { x: 0, y: 0, rotateY: 0 },
        { x: newX, y: newY, rotateY: 180, duration: 1.75 }
      );
    }
    // const totalDelay = 1000 + playerHand.cards.length * 200;
    setTimeout(() => setPlayerHand({ cards: [], value: 0 }), 1750);
  }, [playerHand.cards?.length]);

  const playerStand = useCallback(async () => {
    const { gameState, dealerHand } = await playerAction("stand", gameID);
    // Wrap setDealerHand in a function which animates cards into the dealers hand
    setDealerHand(dealerHand);
    disablePlayerInput();
    if (gameState === "draw") {
      setModalType("draw");
    }
    if (gameState === "dealer_win") {
      setModalType("lose");
    }
    if (gameState === "player_win") {
      setModalType("win");
    }
    setShowModal(true)
    // send cards to discard
    setShowDealerHand(true);
    discardHand();
  }, [disablePlayerInput, discardHand, gameID]);

  const playerHit = useCallback(async () => {
    const { gameState, playerHand } = await playerAction("twist", gameID);
    const cardToAdd = Array.from(playerHand.cards).at(-1);
    updateHand(playerHand); 
    animateDraw(cardToAdd);
    setDeck((deck) => deck - 1);
    if (gameState === "player_bust"){
      setShowDealerHand(true)
      setModalType("lose")
      setShowModal(true);
      discardHand();
    }
  }, [updateHand, animateDraw, discardHand, gameID]);

  // On page load, get initial data for the game
  useEffect(() => {
    const onPageLoad = async () => {
      disablePlayerInput();
      setPlayerHand({
        value: 0,
        cards: []
      });
      // TODO playerHand should be showing the value here as well
      const { gameID, playerHand } = await startGame();
      setGameID(gameID);
      updateHand({cards: playerHand, value: 0});
      for (const card of playerHand){
        await animateDraw(card);
        setTimeout(() => {
          // Empty body to help animation issues
        }, 50);
      }
      setDealerHand({
        value: 0,
        cards: ['?', '?']
      })
    };
    onPageLoad();
    setLoading(false);
  }, [updateHand, animateDraw, disablePlayerInput]);

  const fireworkFunc = () => {
    return <Explosion autorun={{ speed: 2 }} />;
  };

  return (
    <Layout>
      <div id="game-page">
        {showModal && (
          <div className="results-modal" onClick={() => setShowModal(false)}>
            <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
            <p>Dealer value: {dealerHand.value}</p>
            <p>Player value: {playerHand.value}</p>
              {modalType === "win" && (
                <>
                  <p>You win</p>
                  {fireworkFunc()}
                </>
              )}
              {modalType === "lose" && (
                <>
                  <p>You lose</p>
                </>
              )}
              {modalType === "draw" && (
                <>
                  <p>You drew</p>
                </>
              )}
              <button onClick={() => {console.log("placeholder")}}>Play again?</button>
            </div>
          </div>
        )}
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
                  ref={discardRef}
                />
              </div>
              <div className="dealer-hand">
                {dealerHand.cards?.map((card, index) => {
                  return (
                    <Card key={`card-${index}`} value={card} width={"80px"} hidden={!showDealerHand}/>
                  );
                })}
              </div>
              <div className="deck">
                <p>Deck ({deck})</p>
                <img
                  src={cardBack}
                  ref={deckRef}
                  alt="card graphic"
                  style={{ width: "80px" }}
                />
              </div>
            </section>
            <section className="player-half">
              <div className="bet-amount">
                <p style={{ margin: 0, textAlign: "center" }}>
                  I <i>'bet'</i> something is supposed to be here
                </p>
              </div>
              <div className="player-hand-container">
                <div className="player-hand">
                  {playerHand.cards?.map((card, index) => {
                    return (
                      <Card key={`card-${index}`} value={card} width={"80px"} />
                    );
                  })}
                </div>
                {/* <p>Hand value: {playerHand.value}</p> */}
              </div>
              <div className="player-actions">
                <button onClick={playerHit} disabled={disableInput}>Hit</button>
                <button
                  disabled={(playerHand.cards?.length === 0 && true) || disableInput}
                  onClick={playerStand}
                >
                  Stand
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Game;
