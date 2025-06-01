const cardValues = {
  "X": "ace",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
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
  const cardValue = cardValues[value.substring(1)];
  const cardSuit = cardSuits[value.substring(0, 1)];
  return `${cardValue}_of_${cardSuit}.png`
}
