from flask import Flask

app = Flask(__name__)

@app.route("/")
def greetings_globe():
    return "<p>Greetings, Globe!</p>"