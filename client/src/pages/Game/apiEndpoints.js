/**
 * Pseudo-Controller for the api endpoints
 * Function for controlling and updating the game on the backend
 */

export const startGame = async () => {
  // Starts a round, sends playername to server and receives a game ID to store locally
  // TODO in MVP this should return also the player hand since we are skipping the betting phase
  const res = await fetch("BBBServer/start", {
    method: "POST",
    body: {
      playerName: "player",
    },
  });
  const { gameID } = res.json();
  return gameID;
};

export const playerAction = async (action, gameID) => {
  // action can be hit/twist
  const res = await fetch("BBBServer/player-action", {
    method: "POST",
    body: {
      gameID: gameID,
      action: action,
    },
  });
  const response = res.json();
  // {newCard, gameState, playerHand}
  return response;
};

export const mockStartGame = async () => {
  // Starts a round, sends playername to server and receives a game ID to store locally
  return {
    gameID: "123456",
  };
};

const suits = ["D", "H", "C", "S"]
const outcomes = ["win", "lose", "draw"];
export const mockPlayerAction = async (action, gameID) => {
  // Mock what the server likely is returning
  switch (action){
    case "hit": {
      // Returns a random suit with a number from 2-10, face cards felt too much effort to mock
      let cardVal = `${suits[Math.floor(Math.random()*suits.length)]}${Math.floor(1 + Math.random()*10)}`;
      return {
        newCard: cardVal,
        gameID: gameID,
        playerHand: {
          cards: ["D2", "D2", cardVal],
          value: 15,
        },
        gameState: Math.random() < 0.8 ? "playerTurn" : "playerBust"
      }
    }
    case "stand": {
      console.log("twisting")
      // Returns a random suit with a number from 2-10, face cards felt too much effort to mock
      return {
        dealerHand: {
          cards: ["D2", "D2"],
          value: 15,
        },
        gameID: gameID,
        gameState: outcomes[Math.floor(Math.random() * outcomes.length)],
      }
    }
    default:
      return "?"
  }
} 
