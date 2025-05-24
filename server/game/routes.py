"""
endpoints and behaviour for the game module
"""

import secrets
from flask import Blueprint, request, session
import jsonpickle
from game.game import Game

game = Blueprint("game", __name__, url_prefix="/")

game.secret_key = secrets.token_hex()


@game.route("/start", methods=["POST"])
def game_start():
    """
    instantiate game object when new game is launched
    """
    # instantiate game object
    game_instance = Game(request.playerName)
    # for mvp session handles game object persistance
    session["game"] = jsonpickle.encode(game_instance)


@game.route("/player-action", methods=["POST"])
def player_action():
    """
    defines behaviour when player either sticks or twists in a game
    """
    # get game object stored in session
    game_instance = jsonpickle.decode(session.get("game"))
    if request.playerAction == "twist":
        new_card = game_instance.twist(game_instance.player)
        session["game"] = jsonpickle.encode(game_instance)
        return {
            "newCard": new_card,
            "playerHand": {
                "cards": game_instance.player.hand,
                "value": game_instance.player.hand_value,
            },
            "gameState": "Twist",
        }
    # player has chosen to stick
    status = game_instance.dealer_turn()
    session["game"] = jsonpickle.encode(game_instance)
    return {
        "dealerHand": {
            "cards": game_instance.dealer.hand,
            "value": game_instance.dealer.hand_value,
        },
        "gameState": status,
    }
