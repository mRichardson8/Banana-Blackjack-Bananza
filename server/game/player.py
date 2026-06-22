"""
Module for player class
"""


class Player:
    """
    Class to represent a 'player' in the BlackJack game
    Separate instances are used to respond to input from
    the user and to determine the behaviour of the dealer
    """

    def __init__(self, name: str):
        self.name = name
        self.hand = []

    def draw_card(self, card: str):
        """
        Draw a card from the deck, card format is <value><suit>
        e.g. XS = Ace of Spades, 8H = Eight of Hearts
        Add card to hand and increment hand value
        """
        self.hand += [card]

    @property
    def hand_value(self) -> int:
        """
        Returns the int value of the current hand
        """
        total_value = 0
        # create local copy of hand to preserve order of cards
        sorted_hand = self.hand.copy()
        # sort local hand so aces are at the end
        sorted_hand.sort()
        for card in sorted_hand:
            total_value += self.card_value(card[:-1], total_value)
        return total_value

    def card_value(self, value: str, running_value: int) -> int:
        """
        Parse string value and return as int for given card
        running_value represents the hand_value at the point of
        card_value() execution in a hand_value() loop
        """
        if value in ["J", "Q", "K"]:
            return 10
        if value == "X":
            return 1 if running_value + 11 > 21 else 11
        return int(value)
    
    def clear_hand(self):
        """
        Empty the Player hand
        """
        self.hand = []
