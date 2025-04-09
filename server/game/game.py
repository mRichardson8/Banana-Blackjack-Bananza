"""
Module for the Game class
"""

from game.player import Player
import random

"""
new_deck represents a standard 52-card deck the format is <suit><value>:
SUITS:
C = Clubs
D = Diamonds
H = Hearts
S = Spades
VALUES:
A = Ace
J = Jack
Q = Queen
    K = King
"""
NEW_DECK = {
    "CA",
    "DA",
    "HA",
    "SA",
    "C2",
    "D2",
    "H2",
    "S2",
    "C3",
    "D3",
    "H3",
    "S3",
    "C4",
    "D4",
    "H4",
    "S4",
    "C5",
    "D5",
    "H5",
    "S5",
    "C6",
    "D6",
    "H6",
    "S6",
    "C7",
    "D7",
    "H7",
    "S7",
    "C8",
    "D8",
    "H8",
    "S8",
    "C9",
    "D9",
    "H9",
    "S9",
    "C10",
    "D10",
    "H10",
    "S10",
    "CJ",
    "DJ",
    "HJ",
    "SJ",
    "CQ",
    "DQ",
    "HQ",
    "SQ",
    "CK",
    "DK",
    "HK",
    "SK"
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