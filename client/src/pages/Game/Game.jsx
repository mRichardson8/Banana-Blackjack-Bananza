import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import cardBack from "../../../public/assets/cardback.png";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import useWindowDimensions from "../../hooks/useWindowDimenions";
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
  const { height, width } = useWindowDimensions();
  const deckRef = useRef(null);
  const discardRef = useRef(null);
  const [disableInput, setDisableInput] = useState(true);
  const [showDealerHand, setShowDealerHand] = useState(false);
  
  const updateHand = useCallback(
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
    }, timeout ?? 1000)
  }, []);

  const getCardValue = useCallback((value, acc) => {
    if (value === 'X'){
      if (acc < 11) return 11;
      return 1
    }
    if (isNaN(parseInt(value))) return 10;
    return parseInt(value)
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
        { x: 0, y: 0, rotateY: 0, visibility: "visible", duration: 0.01 }
      );
    }, 1);
  }, [disablePlayerInput]);

  
  const playerStand = async () => {
    const { gameState, dealerHand } = await playerAction("stand", gameID);
    // Wrap setDealerHand in a function which animates cards into the dealers hand
    setDealerHand(dealerHand);
    disablePlayerInput();
    if (gameState === "draw") {
      displayDraw();
    }
    if (gameState === "dealer_win") {
      displayLoss();
    }
    if (gameState === "player_win") {
      displayWin();
    }
    // send cards to discard
    setShowDealerHand(true);
    discardHand();
  };

  const emptyHand = useCallback(() => {
    for (let i = 1; i <= playerHand.cards.length; i++) {
      const newX =
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * width + width);
      const newY =
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * height + height);
      gsap.fromTo(
        `.player-hand .card-outer:nth-child(${i})`,
        { x: 0, y: 0 },
        {
          x: newX,
          y: newY,
          rotateY: 0,
          visibility: "visible",
          duration: 0.75,
          delay: i * 0.1,
        }
      );
    }
    const totalDelay = playerHand.cards.length * 100;
    setTimeout(() => setPlayerHand({ cards: [], value: 0 }), totalDelay + 100);
  }, [height, playerHand.cards?.length, width]);

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
        { x: 0, y: 0, rotateY: 0, visibility: "visible" },
        { x: newX, y: newY, rotateY: 180, visibility: "visible", duration: 2 }
      );
    }
    // const totalDelay = 1000 + playerHand.cards.length * 200;
    setTimeout(() => setPlayerHand({ cards: [], value: 0 }), 1750);
  }, [playerHand.cards?.length]);

  // const displayDealerhand = useCallback( async() => {
  //   for (const card of dealerHand){
  //       addCard(card);
  //       await animateDraw(card);
  //       setTimeout(() => {
  //         // Empty body
  //       }, 50);
  //     }
  // }, []);

  const playerHit = useCallback(async () => {
    const { gameState, playerHand } = await playerAction("twist", gameID);
    const cardToAdd = Array.from(playerHand.cards).at(-1);
    updateHand(playerHand); 
    animateDraw(cardToAdd);
    setDeck((deck) => deck - 1);
    if (gameState === "player_bust"){
      setShowDealerHand(true)
      displayLoss();
      // TODO we need to see the dealer's hand here.
      discardHand();
    }
  }, [updateHand, animateDraw, discardHand, gameID]);

  // Mock some values idk
  useEffect(() => {
    setDealerHand({ cards: ["?", "?"], value: "?" });
  }, []);

  // On page load, one time get data
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

  // Custom display animation for when the player wins
  const displayWin = useCallback(() => {
    setShowModal(true);
    setModalType("win");
  }, []);

  // Custom display animation for when the player draws (isn't that a loss?)
  const displayDraw = () => {
    setShowModal(true);
    setModalType("draw");
  };

  // Custom display animation for when the player loses
  const displayLoss = () => {
    setShowModal(true);
    setModalType("lose");
  };

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
                  {/* {fireworkFunc()} */}
                </>
              )}
              {modalType === "lose" && (
                <>
                  <p>You lose</p>
                  {/* {fireworkFunc()} */}
                </>
              )}
              {modalType === "draw" && (
                <>
                  <p>You drew</p>
                  {/* {fireworkFunc()} */}
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
                <p>Hand value: {playerHand.value}</p>
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
