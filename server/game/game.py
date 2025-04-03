"""
Module for the Game class
"""

class Game():
    """
    One object of type Game should exist per user session
    The object represents the ongoing game and all relevant logic
    """

    def __init__(self, name):
        self.name = name # input username for session