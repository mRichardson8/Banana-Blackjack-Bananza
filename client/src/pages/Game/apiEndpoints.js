/**
 * Pseudo-Controller for the api endpoints
 * Function for controlling and updating the game on the backend
 */

export const startGame = async () => {
    // Starts a round, sends playername to server and receives a game ID to store locally
    // TODO in MVP this should return also the player hand since we are skipping the betting phase
    const res = await fetch('BBBServer/start', {
        method: "POST",
        body: {
            playerName: "player"
        }
    })
    const {gameID} = res.json()
    return gameID
 }
 
 export const playerAction = async (action) => {
    // action can be hit/twist
    const res = await fetch('BBBServer/player-action', {
        method: "POST",
        body: {
            gameID: "randomID",
            action: action
        }
    })
    const response = res.json()
    // {newCard, gameState, playerHand}
    return response
 }