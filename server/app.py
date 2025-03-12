from flask import Flask

app = Flask(__name__)

@app.route("/")
def greetings_globe():
    return "<p>Greetings, Globe!</p>"

@app.route("/chris")
def chris():
    return "This is a page for Chris"

@app.route("/matt")
def matt():
    return "This is a page for Matt"