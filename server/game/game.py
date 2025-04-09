"""
Module for the Game class
"""

from game.player import Player
import random

"""
new_deck represents a standard 52-card deck the format is <value><suit>:
SUITS:
C = Clubs
D = Diamonds
H = Hearts
S = Spades
VALUES:
X = Ace (X represents Ace for the purposes of sorting in Player.hand_value())
J = Jack
Q = Queen
K = King
"""
NEW_DECK = {
    "XC",
    "XD",
    "XH",
    "XS",
    "2C",
    "2D",
    "2H",
    "2S",
    "3C",
    "3D",
    "3H",
    "3S",
    "4C",
    "4D",
    "4H",
    "4S",
    "5C",
    "5D",
    "5H",
    "5S",
    "6C",
    "6D",
    "6H",
    "6S",
    "7C",
    "7D",
    "7H",
    "7S",
    "8C",
    "8D",
    "8H",
    "8S",
    "9C",
    "9D",
    "9H",
    "9S",
    "10C",
    "10D",
    "10H",
    "10S",
    "JC",
    "JD",
    "JH",
    "JS",
    "QC",
    "QD",
    "QH",
    "QS",
    "KC",
    "KD",
    "KH",
    "KS"
}

class Game:
    """
    One object of type Game should exist per user session
    The object represents the ongoing game and all relevant logic
    """

    def __init__(self, name="Player"):
        self.name = name # input username for session
        self.bananas = 100
        self.player = Player(name) # user controller
        self.dealer = Player("Dealer") # computer controller
        self.deck = NEW_DECK # initialise unshuffled deck
    
    def shuffle_deck(self):
        """
        shuffle game.deck into a random order
        """
        random.shuffle(self.deck)
    
    def deal_card(self, player: Player):
        """
        deal a card from the deck to the specified Player objects hand
        removes the card from game.deck
        """
        player.draw_card(self.deck.pop())