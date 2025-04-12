"""
Module for the Game class
"""

import random
from game.player import Player


# new_deck represents a standard 52-card deck the format is <value><suit>:
# SUITS:
# C = Clubs
# D = Diamonds
# H = Hearts
# S = Spades
# VALUES:
# X = Ace (X represents Ace for the purposes of sorting in Player.hand_value())
# J = Jack
# Q = Queen
# K = King

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
    "KS",
}


class Game:
    """
    One object of type Game should exist per user session
    The object represents the ongoing game and all relevant logic
    """

    def __init__(self, name="Player"):
        self.bananas = 100
        self.player = Player(name)  # user controller
        self.dealer = Player("Dealer")  # computer controller
        self.deck = NEW_DECK  # initialise unshuffled deck

    def shuffle_deck(self):
        """
        Shuffle game.deck into a random order
        """
        random.shuffle(self.deck)

    def deal_card(self, player: Player):
        """
        Deal a card from the deck to the specified Player objects hand
        removes the card from game.deck
        """
        player.draw_card(self.deck.pop())
    
    def twist(self, player: Player) -> int:
        """
        Request another card for the specified Player object
        Returns the value of the hand including the new card
        """
        self.deal_card(player)
        if player.hand_value() > 21:
            # fail state
            self.bust(player)
    
    def stick(self, player: Player):
        """
        Choose not to draw another card
        """
        # the below is a placeholder, obviously :)
        print(f"Sticking at {player.hand_value()}. I'm fine right here, muchacho.")

    def bust(self, player: Player):
        """
        Logic for when a player has a hand value of over 21
        """
        # placeholder
        print(f"Player {player.name} is out of bananas.")