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
            value = card[:-1]
            if value == "X":
                # dynamic ace value
                total_value += self.ace_value(total_value)
            else:
                # static card values
                total_value += self.card_value(value)

        return total_value

    def card_value(self, value: str) -> int:
        """
        Given any card but ace should parse the string value
        and return it as an int
        """
        if value in ["J", "Q", "K"]:
            return 10
        try:
            return int(value)
        except ValueError:
            # should never be passed a non numerical string at this point
            # but better safe than sorry!
            # TODO: add logging/error handling here
            return 0

    def ace_value(self, current_hand_value: int) -> int:
        """
        Determines whether an ace should be high or low based
        on the current value of the hand (current_hand_value)
        """
        if current_hand_value + 11 > 21:
            return 1
        return 11
