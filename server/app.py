"""
Main module for flask application
"""

import secrets
from flask import Flask, session
from game.routes import game

app = Flask(__name__)

app.register_blueprint(game)

app.secret_key = secrets.token_hex()