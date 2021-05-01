# CPSC462 Project: EZBuy

# Professor: Lidia Morrison

# Team members:
#     Ying Luo,            yingluo_holiday@csu.fullerton.edu
#     Gabriel Magallanes,  gabe695@csu.fullerton.edu
#     Juheng Mo,           henrymo@csu.fullerton.edu
#     Mohammad Mirwais,    mirwais.88@csu.fullerton.edu

from flask import Flask, request, g, jsonify
from datetime import datetime
import sqlite3
import json
from utils import jwt_token_required
from flask_cors import CORS

app = Flask(__name__)
app.config.from_envvar('APP_CONFIG')
DATABASE_PATH = app.config.get("DATABASE")
CORS(app)


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
def shipmentService():
    return 'Welcome to Shipment Service!'


@app.route('/api/v1/shipment/<userID>/<orderID>', methods=['POST'])
def addShipment(userID, orderID):

    dataDict = json.loads(request.data)

    addr_City = dataDict['addr_city']
    addr_State = dataDict['addr_state']
    addr_Street = dataDict['addr_street']
    zipCode = dataDict['zipcode']
    phoneNumber = dataDict['phone_number']
    recipient = dataDict['recipient']

    try:
        db_connection = get_db()

        db_query = f"INSERT INTO Shipments \
                        (UserID, OrderID, Addr_City, Addr_State, Addr_Street, ZipCode, PhoneNumber, Recipient) \
                        VALUES \
                        ('{userID}','{orderID}', '{addr_City}', '{addr_State}','{addr_Street}', '{zipCode}', '{phoneNumber}', '{recipient}')"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True})


@app.route('/api/v1/shipment/<orderID>', methods=['GET'])
def getShipment(orderID):

    shipmentDetail = None

    try:
        db_connection = get_db()

        db_query = f"SELECT * \
            FROM Shipments \
            WHERE \
            OrderID = '{orderID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        addr_city = rows[0][3]
        addr_state = rows[0][4]
        addr_street = rows[0][5]
        zipcode = rows[0][6]
        phone_number = rows[0][7]
        recipient = rows[0][8]
        shipmentDetail = {
            'addr_city': addr_city,
            'addr_state': addr_state,
            'addr_street': addr_street,
            'zipcode': zipcode,
            'phone_number': phone_number,
            'recipient': recipient
        }

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'shipment': shipmentDetail})


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
