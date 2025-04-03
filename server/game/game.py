"""
Module for the Game class
"""

from game.player import Player

class Game:
    """
    One object of type Game should exist per user session
    The object represents the ongoing game and all relevant logic
    """

    def __init__(self, name="Player"):
        self.name = name # input username for session
        self.bananas = 100
        self.player = Player(name)
        self.dealer = Player("Dealer")