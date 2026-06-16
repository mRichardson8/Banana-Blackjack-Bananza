/**
 * Pseudo-Controller for the api endpoints
 * Function for controlling and updating the game on the backend
 */
import axios from "axios";

const instance = axios.create({
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }); 

export const startGame = async () => {
  // Starts a round, sends playername to server and receives a game ID to store locally
  // TODO in MVP this should return also the player hand since we are skipping the betting phase
  // TODO (cont.) this currently only returns the gameID which we can't start the game with alone
  // const instance = axios.create({
  //   timeout: 1000,
  //   headers: {'Content-Type': 'application/json'},
  //   withCredentials: true,
  // }); 
  const gameIdRes = await instance.post("http://localhost:5000/start", {
    playerName: "player",
  });
  const gameID = await gameIdRes.data;
  // TODO Move this into the /start endpoint, for now using the status to supplement the data
  const handRes = await instance.get("http://localhost:5000/status", {credentials: "same-origin"});
  const {playerHand, dealerHand} = await handRes.data
  return {gameID, playerHand, dealerHand};
};

export const playerAction = async (action, gameID) => {
  // action can be hit/twist
  // const res = await fetch("http://localhost:5000/player-action", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     gameID: gameID,
  //     playerAction: action,
  //   }),
  // });
  const res = await instance.post("http://localhost:5000/player-action", {
    gameID: gameID,
    playerAction: action,
  })
  return res.data;
};

export const mockStartGame = async () => {
  // Starts a round, sends playername to server and receives a game ID to store locally
  const playerHand = [
    `${suits[Math.floor(Math.random() * suits.length)]}${Math.floor(
      2 + Math.random() * 9
    )}`,
    `${suits[Math.floor(Math.random() * suits.length)]}${Math.floor(
      2 + Math.random() * 9
    )}`,
  ];
  return {
    gameID: "123456",
    playerHand: playerHand,
    dealerHand: ["?", "?"],
  };
};

const suits = ["D", "H", "C", "S"];
const outcomes = ["win", "lose", "draw"];
export const mockPlayerAction = async (action, gameID) => {
  // Mock what the server likely is returning
  switch (action) {
    case "hit": {
      // Returns a random suit with a number from 2-10, face cards felt too much effort to mock
      let cardVal = `${
        suits[Math.floor(Math.random() * suits.length)]
      }${Math.floor(2 + Math.random() * 9)}`;
      return {
        newCard: cardVal,
        gameID: gameID,
        playerHand: {
          cards: ["D2", "D2", cardVal],
          value: 15,
        },
        gameState: Math.random() < 0.8 ? "playerTurn" : "playerBust",
      };
    }
    case "stand": {
      console.log("twisting");
      // Returns a random suit with a number from 2-10, face cards felt too much effort to mock
      return {
        dealerHand: {
          cards: ["D2", "D2"],
          value: 15,
        },
        gameID: gameID,
        gameState: outcomes[Math.floor(Math.random() * outcomes.length)],
      };
    }
    default:
      return "?";
  }
};
