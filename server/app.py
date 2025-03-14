from flask import Flask, render_template, request

app = Flask(__name__, template_folder ='templates')

@app.route('/')
def main_page():
    return render_template('user.html')

# GET
@app.route('/chris')
def chris():
    return 'This is a page for Chris'

@app.route('/matt')
def matt():
    return 'This is a page for Matt'

# POST
@app.route('/user_login', methods=['POST', 'GET'])
def user_login():
    method = request.method
    if method == 'POST':
        username = request.form['username']
        return f"Welcome {username}, you got here via a {method} request."
    else:
        return f"You got here via a {method} request, unnamed one."