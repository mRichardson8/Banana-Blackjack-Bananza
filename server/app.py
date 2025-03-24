from flask import Flask
from admin.routes import admin

app = Flask(__name__)

app.register_blueprint(admin)