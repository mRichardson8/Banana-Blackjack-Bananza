"""
endpoints and behaviour for the game module
"""

import jsonpickle
from flask import Blueprint, jsonify, request, session
from flask_cors import cross_origin

from game.game import Game

game = Blueprint("game", __name__, url_prefix="/")


@game.route("/start", methods=["POST"])
def game_start():
    """
    instantiate game object when new game is launched
    """
    # instantiate game object
    game_instance = Game(request.json["playerName"])
    # for mvp session handles game object persistance
    session["game"] = jsonpickle.encode(game_instance)
    return jsonify(
        {
            "gameId": game_instance.game_id,
            "playerHand": game_instance.player.hand,
        }
    )


@game.route("/status", methods=["GET"])
@cross_origin(supports_credentials=True)
def game_status():
    """
    instantiate game object when new game is launched
    """
    # get game object stored in session
    game_instance = jsonpickle.decode(session.get("game"))
    return jsonify(
        {
            "playerHand": game_instance.player.hand,
            "dealerHand": game_instance.dealer.hand,
        }
    )


@game.route("/player-action", methods=["POST"])
def player_action():
    """
    defines behaviour when player either sticks or twists in a game
    """
    # get game object stored in session
    game_instance = jsonpickle.decode(session.get("game"))
    if request.json["playerAction"] == "twist":
        new_card = game_instance.twist(game_instance.player)
        state = "player_bust" if len(new_card) > 2 else "player_twist"
        session["game"] = jsonpickle.encode(game_instance)
        return {
            "newCard": new_card,
            "playerHand": {
                "cards": game_instance.player.hand,
                "value": game_instance.player.hand_value,
            },
            "gameState": state,
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
