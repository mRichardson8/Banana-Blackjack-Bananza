"""
Module for player class
"""

class Player:
    """
    Class to represent a 'player' in the BlackJack game
    Separate instances are used to respond to input from
    the user and to determine the behaviour of the dealer
    """

    # dict used to parse the value of the card strings
    #TODO: handle aces - high/low?
    card_value_dict = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 10,
        "Q": 10,
        "K": 10,
    }

    def __init__(self, name: str):
        self.name = name
        self.hand = ""
    
    def draw_card(self, card: str):
        """
        Draw a card from the deck, card format is <suit><value>
        e.g. SA = Ace of Spades, H8 = Eight of Hearts
        Add card to hand and increment hand value
        """
        self.hand += [card]

    def hand_value(self) -> int:
        """
        returns the int value of the current hand
        """
        _value = 0
        for card in self.hand:
            _value += self.card_value_dict[card[1:]]

        return _value