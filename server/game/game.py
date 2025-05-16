"""
Module for the Game class
"""

import random
import secrets
from game.constants import NEW_DECK
from game.player import Player


class Game:
    """
    One object of type Game should exist per user session
    The object represents the ongoing game and all relevant logic
    """

    def __init__(self, name="Player"):
        self.game_id = secrets.token_urlsafe(6)
        self.bananas = 100
        self.player = Player(name)  # user controller
        self.dealer = Player("Dealer")  # computer controller
        self.deck = []  # deck of 52 cards
        self.reset_deck()

    def reset_deck(self):
        """
        Play a little game of 52-card pickup and shuffle the complete deck
        """
        # take a copy so NEW_DECK is preserved
        self.deck = NEW_DECK.copy()
        random.shuffle(self.deck)

    def twist(self, player: Player) -> str:
        """
        Request another card for the specified Player object
        Initiates bust() if player.hand_value is greater than 21
        """
        card = self.deck.pop()
        player.draw_card(card)
        return card

    def bust(self, player: Player):
        """
        Logic for when a player has a hand value of over 21
        """
        # placeholder
        print(f"Player {player.name} is out of bananas.")
