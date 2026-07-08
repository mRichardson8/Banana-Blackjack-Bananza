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


def test_start(client):
    """Test the start route."""
    response = client.post(
        "/start",
        json={"playerName": "Tobias Fünke"},
        headers={"Content-type": "application/json"},
    )
    assert response.status_code == 200
    assert len(response.json["gameId"]) == 6
    # the hand has two cards
    assert len(response.json["playerHand"]["cards"]) == 2
    # the cards are not empty strings
    assert response.json["playerHand"]["cards"][0]
    assert response.json["playerHand"]["cards"][1]
    # the value of the hand is greater than 0
    assert response.json["playerHand"]["value"] > 0


def test_player_action_twist(client):
    """Test the player action route with the twist action."""
    client.post(
        "/start",
        json={"playerName": "Dr Leo Spaceman"},
        headers={"Content-type": "application/json"},
    )
    response = client.post(
        "/player-action",
        json={"playerAction": "twist"},
        headers={"Content-type": "application/json"},
    )
    assert response.status_code == 200
    # new card is not missing
    assert response.json["newCard"]
    # correct number of cards in returned hand
    assert len(response.json["playerHand"]["cards"]) == 3
    # new card is last card in hand
    # checking if in newCard to handle special string that is returned for bust
    assert response.json["playerHand"]["cards"][-1] in response.json["newCard"]
    # the value of the hand is greater than 0
    assert response.json["playerHand"]["value"] > 0
    assert response.json["gameState"] in ["player_twist", "player_bust"]


def test_player_action_stick(client):
    """Test the player action route with the twist action."""
    client.post(
        "/start",
        json={"playerName": "Player McPlayface"},
        headers={"Content-type": "application/json"},
    )
    response = client.post(
        "/player-action",
        json={"playerAction": "stick"},
        headers={"Content-type": "application/json"},
    )
    assert response.status_code == 200
    # correct number of cards in returned hand
    assert len(response.json["dealerHand"]["cards"]) >= 2
    # the value of the hand is greater than 0
    assert response.json["dealerHand"]["value"] > 0
    assert response.json["gameState"] in ["player_win", "dealer_win", "draw"]


def test_new_round(client):
    """Test the new game route."""
    client.post(
        "/start",
        json={"playerName": "Peter Parker"},
        headers={"Content-type": "application/json"},
    )
    # grab a card so not at starting position - slightly more realistic
    client.post(
        "/player-action",
        json={"playerAction": "twist"},
        headers={"Content-type": "application/json"},
    )
    response = client.get("/new-round")
    assert response.status_code == 200
    # playerHand is as it should be if /start were called
    assert len(response.json["playerHand"]["cards"]) == 2
    assert response.json["playerHand"]["cards"][0]
    assert response.json["playerHand"]["cards"][1]
    assert response.json["playerHand"]["value"] > 0
