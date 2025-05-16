"""
Main module for flask application
"""

from flask import Flask
from game.routes import game

app = Flask(__name__)

app.register_blueprint(game)
