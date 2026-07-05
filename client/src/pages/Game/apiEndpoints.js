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
  const gameIdRes = await instance.post("http://localhost:5000/start", {
    playerName: "player",
  });
  const {playerHand, gameId} = await gameIdRes.data
  return {playerHand, gameId};
};

export const playerAction = async (action, gameID) => {
  // action can be hit/twist
  const res = await instance.post("http://localhost:5000/player-action", {
    gameID: gameID,
    playerAction: action,
  })
  return res.data;
};


