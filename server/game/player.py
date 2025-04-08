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
        Returns the int value of the current hand
        """
        _total_value = 0
        for card in self.hand:
            _value = card[1:]
            if _value == "A":
                # handle aces high or low
                _total_value += self.ace_value(_total_value)
            else:
                # fixed value from card value dict
                _total_value += self.card_value_dict[_value]

        return _total_value
    
    def ace_value(self, current_hand_value: int) -> int:
        """
        Determines whether an ace should be high or low based
        on the current value of the hand (current_hand_value)
        """
        if current_hand_value + 11 > 21:
            return 1
        else:
            return 11