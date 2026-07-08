"""
Test file for the API routes.
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
        '/start',
        json={"playerName": "Tobias Fünke"},
        headers={'Content-type':'application/json'},
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
        '/start',
        json={"playerName": "Dr Leo Spaceman"},
        headers={'Content-type':'application/json'},
    )
    response = client.post(
        '/player-action',
        json={"playerAction": "twist"},
        headers={'Content-type':'application/json'},
    )
    assert response.status_code == 200
    # new card is not missing
    assert response.json["newCard"]
    # correct number of cards in returned hand
    assert len(response.json["playerHand"]["cards"]) == 3
    # new card is last card in hand
    assert response.json["playerHand"]["cards"][-1] == response.json["newCard"]
    # the value of the hand is greater than 0
    assert response.json["playerHand"]["value"] > 0
    assert response.json["gameState"]
