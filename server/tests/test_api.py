"""
Test file for the API routes.
Due to the random nature of the underlying logic make sure
to run tests several times after making changes.
"""

import pytest

from app import app


@pytest.fixture(name="client")
def setup_client():
    """A test client for the app."""
    with app.test_client() as client:
        yield client

def _start_game(client, player_name):
    """POST the start route with the given player name."""
    return client.post(
        "/start",
        json={"playerName": player_name},
        headers={"Content-type": "application/json"},
    )

def _player_action(client, action):
    """Given the string 'stick' or 'twist' POST player action."""
    return client.post(
        "/player-action",
        json={"playerAction": action},
        headers={"Content-type": "application/json"},
    )

def test_start(client):
    """Test the start route."""
    response = _start_game(client, "Tobias Fünke")
    assert response.status_code == 200
    assert len(response.json["gameId"]) == 6
    assert len(response.json["playerHand"]["cards"]) == 2
    assert response.json["playerHand"]["cards"][0]
    assert response.json["playerHand"]["cards"][1]
    assert response.json["playerHand"]["value"] > 0


def test_player_action_twist(client):
    """Test the player action route with the twist action."""
    _start_game(client, "Dr Leo Spaceman")
    response = _player_action(client, "twist")
    assert response.status_code == 200
    assert response.json["newCard"]
    assert len(response.json["playerHand"]["cards"]) == 3
    # new card is last card in hand
    # checking if in newCard to handle special string that is returned for bust
    assert response.json["playerHand"]["cards"][-1] in response.json["newCard"]
    assert response.json["playerHand"]["value"] > 0
    assert response.json["gameState"] in ["player_twist", "player_bust"]


def test_player_action_stick(client):
    """Test the player action route with the twist action."""
    _start_game(client, "Player McPlayface")
    response = _player_action(client, "stick")
    assert response.status_code == 200
    assert len(response.json["dealerHand"]["cards"]) >= 2
    assert response.json["dealerHand"]["value"] > 0
    assert response.json["gameState"] in ["player_win", "dealer_win", "draw"]


def test_new_round(client):
    """Test the new game route."""
    response = _start_game(client, "Peter Parker")
    # grab a card so not at starting position - slightly more realistic
    _player_action(client, "twist")
    response = client.get("/new-round")
    assert response.status_code == 200
    # playerHand is as it should be if /start were called
    assert len(response.json["playerHand"]["cards"]) == 2
    assert response.json["playerHand"]["cards"][0]
    assert response.json["playerHand"]["cards"][1]
    assert response.json["playerHand"]["value"] > 0
