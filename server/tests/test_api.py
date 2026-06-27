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
    # the cards are made up of two characters
    assert len(response.json["playerHand"]["cards"][0]) == 2
    assert len(response.json["playerHand"]["cards"][1]) == 2
    # the value of the hand is greater than 0
    assert response.json["playerHand"]["value"] > 0
