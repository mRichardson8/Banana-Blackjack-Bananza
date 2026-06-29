const cardValues = {
  "X": "ace",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  "J": "jack",
  "Q": "queen",
  "K": "king",
}

const cardSuits = {
  "D": "diamonds",
  "C": "clubs",
  "S": "spades",
  "H": "hearts"
}


export const getCardImage = (value) => {
  /**
   * Maps the string value of a card to the correct image to display for that card
   */
  if (value === '?') return `/assets/cardback.png`
  const cardValue = cardValues[value.slice(0, -1)];
  const cardSuit = cardSuits[value.slice(-1)];
  return `/assets/cards/${cardValue}_of_${cardSuit}.png`
}
