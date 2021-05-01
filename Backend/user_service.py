# CPSC462 Project: EZBuy

# Professor: Lidia Morrison

# Team members:
#     Ying Luo,            yingluo_holiday@csu.fullerton.edu
#     Gabriel Magallanes,  gabe695@csu.fullerton.edu
#     Juheng Mo,           henrymo@csu.fullerton.edu
#     Mohammad Mirwais,    mirwais.88@csu.fullerton.edu

from flask import Flask, request, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils import jwt_token_required
import datetime
import sqlite3
import click
import json
import jwt
from flask_cors import CORS

app = Flask(__name__)
app.config.from_envvar('APP_CONFIG')
DATABASE_PATH = app.config.get("DATABASE")
DB_SCHEMA_PATH = app.config.get("SCHEMA")
# private key to sign the token
TOKEN_SIGN_KEY = app.config.get("TOKEN_SIGN_KEY")
# public key to verify the token
TOKEN_VERIFY_KEY = app.config.get("TOKEN_VERIFY_KEY")
CORS(app)


@app.cli.command('init')
def init_db():
    """ Custom command to init database.
    """
    with app.app_context():
        db = get_db()
        app.logger.info("database schema is %s", DB_SCHEMA_PATH)
        with app.open_resource(DB_SCHEMA_PATH, mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


def get_db():
    """ Get database connection to Sqlite3.

        :returns: database connection

    """
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE_PATH)
    return db


@app.teardown_appcontext
def close_connection(exception):
    """ Close database connection on application finished.
    """
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def userService():
    return 'Welcome to User Service!'


@app.route('/api/v1/register', methods=['POST'])
def createUser():
    """ Create a new user. Parameters are from HTTP POST requests.

    :param username: Username to authenicate.
    :param email: Email associated with the new user.
    :param password: Password of the username.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    dataDict = json.loads(request.data)

    username_key = 'username'
    email_key = 'email'
    password_key = 'password'
    userRole_key = 'role'

    # return status code 400 if username or password is not passed from the HTTP request.
    if username_key not in dataDict:
        return bad_request(400, f"missing {username_key} field in request")
    elif email_key not in dataDict:
        return bad_request(400, f"missing {email_key} field in request")
    elif password_key not in dataDict:
        return bad_request(400, f"missing {password_key} field in request")
    elif userRole_key not in dataDict:
        return bad_request(400, f"missing {userRole_key} field in request")

    username = dataDict['username']
    email = dataDict['email']
    password = dataDict['password']
    userRole = dataDict['role']

    # return status code 400 if username or password value is not valid
    if username == None:
        return bad_request(400, f"{username_key} field is empty")
    elif email == None:
        return bad_request(400, f"{email_key} field is empty")
    elif password == None:
        return bad_request(400, f"{password_key} field is empty")
    elif userRole == None:
        return bad_request(400, f"{userRole_key} field is empty")

    # generate hashed password to store in database
    hashedPass = generate_password_hash(password)

    try:
        _create_user(username, email, userRole, hashedPass)

        userID = _get_userID(username)

        _create_user_cart(userID)

        if userRole == 'seller':
            _create_user_shop(userID, username)
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True})


def _create_user(username, email, userRole, hashedPass):
    db_connection = get_db()

    insert_query = f"INSERT INTO Users \
                        (Username, Email, UserRole, HashedPass) \
                        VALUES \
                        ('{username}','{email}', '{userRole}', '{hashedPass}')"

    # insert the new user information to database
    cur = db_connection.cursor()
    cur.execute(insert_query)
    db_connection.commit()


def _get_userID(username):
    db_connection = get_db()

    search_query = f"SELECT * FROM Users \
                        WHERE username='{username}'"

    cur = db_connection.cursor()
    cur.execute(search_query)
    db_connection.commit()

    rows = cur.fetchall()

    userID_index = 0
    return rows[0][userID_index]


def _create_user_cart(userID):
    db_connection = get_db()
    cur_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    insert_query = f"INSERT INTO Carts \
                        (UserID, TotalPrice, LastUpdateTime) \
                        VALUES \
                        ({userID}, 0, '{cur_time}')"

    cur = db_connection.cursor()
    cur.execute(insert_query)
    db_connection.commit()


def _create_user_shop(userID, username):
    db_connection = get_db()

    shopname = f'shop of {username}'

    insert_query = f"INSERT INTO Shops \
                        (UserID, Shopname) \
                        VALUES \
                        ({userID}, '{shopname}')"

    cur = db_connection.cursor()
    cur.execute(insert_query)
    db_connection.commit()


@app.route('/api/v1/login', methods=['POST'])
def loginUser():
    """ Authenticate a user by checking if the password matches what the database stores.
        Parameters are from HTTP POST requests.

    :param username: Username to authenticate.
    :param password: Password of the username.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    dataDict = json.loads(request.data)

    username_key = 'username'
    password_key = 'password'

    # return status code 400 if username or password is not passed from the HTTP request.
    if username_key not in dataDict:
        return bad_request(400, f"missing {username_key} field in request")
    elif password_key not in dataDict:
        return bad_request(400, f"missing {password_key} field in request")

    username = dataDict['username']
    password = dataDict['password']

    # return status code 400 if username or password value is not valid
    if username == None:
        return bad_request(400, f"{username_key} field is empty")
    elif password == None:
        return bad_request(400, f"{password_key} field is empty")

    try:
        db_connection = get_db()

        search_query = f"SELECT * FROM Users \
                        WHERE username='{username}'"

        # check if username is in database
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()

        rows = cur.fetchall()

        # return status code 404 when username is not in database
        if len(rows) == 0:
            return unauthorized(401, 'invalid username')

        # get hased password from database
        userID_index = 0
        email_index = 2
        userRole_index = 3
        hashedPass_index = 4
        userID = rows[0][userID_index]
        email = rows[0][email_index]
        userRole = rows[0][userRole_index]
        hashedPass = rows[0][hashedPass_index]
        shopID = None

        # check if the given password matches what's stored in database
        isAuthorized = check_password_hash(hashedPass, password)

        if userRole == 'seller':

            search_query = f"SELECT ShopID FROM Shops \
                            WHERE UserID='{userID}'"

            # check if username is in database
            cur = db_connection.cursor()
            cur.execute(search_query)
            db_connection.commit()

            rows = cur.fetchall()
            shopID = rows[0][0]

        if isAuthorized == False:
            # return status code 401 when password doesn't matches the one stored in database
            return unauthorized(401, 'wrong password')

        jwt_encode_key = open(TOKEN_SIGN_KEY).read()
        jwt_token = jwt.encode(
            {'userID': userID, 'shopID': shopID, 'username': username, 'email': email, 'userRole': userRole, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, jwt_encode_key, algorithm="RS256")

    except Exception as e:
        # returns status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'jwt_token': jwt_token})


@ app.errorhandler(401)
def unauthorized(e, message):
    """ Error handler on status code 401
    """
    return jsonify({'success': False, 'message': message}), 401


@ app.errorhandler(400)
def bad_request(e, message):
    """ Error handler on status code 400
    """
    return jsonify({'success': False, 'message': message}), 400


@ app.errorhandler(500)
def internal_server_error(e, message):
    """ Error handler on status code 500
    """
    return jsonify({'success': False, 'message': message}), 500


if __name__ == '__main__':
    app.run()
