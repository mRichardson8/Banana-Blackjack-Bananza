from flask import Blueprint, render_template, request

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/')
def main_page():
    return render_template('user.html')

# GET
@admin.route('/chris')
def chris():
    return 'This is a page for Chris'

@admin.route('/matt')
def matt():
    return 'This is a page for Matt'

# POST
@admin.route('/user_login', methods=['POST'])
def user_login():
    return f"Welcome {request.form['username']}, you got here via a POST request."