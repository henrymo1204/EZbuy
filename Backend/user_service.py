from flask import Flask, request, g, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import click

app = Flask(__name__)
app.config.from_envvar('APP_CONFIG')
DATABASE_PATH = app.config.get("DATABASE")
DB_SCHEMA_PATH = app.config.get("SCHEMA")


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


@app.route('/user/account', methods=['POST'])
def createUser():
    """ Create a new user. Parameters are from HTTP POST requests.

    :param username: Username to authenicate.
    :param email: Email associated with the new user.
    :param password: Password of the username.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    dataDict = request.form

    username_key = 'username'
    email_key = 'email'
    password_key = 'password'

    # return status code 400 if username, email, or password doesn't passed from the HTTP request.
    if username_key not in dataDict or email_key not in dataDict or password_key not in dataDict:
        return bad_request(400)

    username = dataDict['username']
    email = dataDict['email']
    password = dataDict['password']

    # return status code 400 if username, email, or password value is not valid
    if username == None or email == None or password == None:
        return bad_request(400)

    # generate hashed password to store in database
    hashedPass = generate_password_hash(password)

    try:
        db_connection = get_db()

        insert_query = f"INSERT INTO Users \
                        (Username, Email, HashedPass) \
                        VALUES \
                        ('{username}','{email}','{hashedPass}')"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(insert_query)
        db_connection.commit()
    except Exception:
        # return status code 500 when database operation fails
        return internal_server_error(500)

    return jsonify({'success': True})


@app.route('/user/auth', methods=['POST'])
def authenticateUser():
    """ Authenticate a user by checking if the password matches what the database stores. 
        Parameters are from HTTP POST requests.

    :param username: Username to authenticate.
    :param password: Password of the username.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    print("test")
    dataDict = request.form

    username_key = 'username'
    password_key = 'password'

    # return status code 400 if username or password is not passed from the HTTP request.
    if username_key not in dataDict or password_key not in dataDict:
        return bad_request(400)

    username = dataDict['username']
    password = dataDict['password']

    # return status code 400 if username or password value is not valid
    if username == None or password == None:
        return bad_request(400)

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
            return page_not_found(404)

        # get hased password from database
        hashedPass_index = 2
        hashedPass = rows[0][hashedPass_index]

        # check if the given password matches what's stored in database
        isAuthorized = check_password_hash(hashedPass, password)
        print(hashedPass)
        print(password)

        if isAuthorized == False:
            # return status code 401 when password doesn't matches the one stored in database
            return unauthorized(401)

    except Exception as e:
        # returns status code 500 when database operation fails
        return internal_server_error(500)

    return jsonify({'success': True})


@app.errorhandler(401)
def unauthorized(e):
    """ Error handler on status code 401
    """
    return jsonify({'success': False, 'error_msg': "Request is not authorized."}), 401


@app.errorhandler(400)
def bad_request(e):
    """ Error handler on status code 400
    """
    return jsonify({'success': False, 'error_msg': "Request could not be understood, probably missing parameter(s)."}), 400


@app.errorhandler(404)
def page_not_found(e):
    """ Error handler on status code 404
    """
    return jsonify({'success': False, 'error_msg': "The resource could not be found."}), 404


@app.errorhandler(500)
def internal_server_error(e):
    """ Error handler on status code 500
    """
    return jsonify({'success': False, 'error_msg': "Error happened in internal server."}), 500


if __name__ == '__main__':
    app.run()
