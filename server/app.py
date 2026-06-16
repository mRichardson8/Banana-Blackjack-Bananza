"""
Main module for flask application
"""

import secrets
from flask import Flask
from flask_cors import CORS
from game.routes import game

app = Flask(__name__)
CORS(app, supports_credentials=True) # This enables CORS for all routes by default

app.register_blueprint(game)

app.secret_key = secrets.token_hex()
