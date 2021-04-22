# CPSC462 Project: EZBuy

# Professor: Lidia Morrison

# Team members:
#     Ying Luo,            yingluo_holiday@csu.fullerton.edu
#     Gabriel Magallanes,  gabe695@csu.fullerton.edu
#     Juheng Mo,           henrymo@csu.fullerton.edu
#     Mohammad Mirwais,    mirwais.88@csu.fullerton.edu

from flask import Flask, request, g, jsonify
import datetime
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
def orderService():
    return 'Welcome to Order Service!'


@app.route('/order/', methods=['POST'])
def addOrder():

    dataDict = json.loads(request.data)

    order_items = dataDict['order_items']

    try:
        for item in order_items:

            orderItemID = item['orderItemID']
            orderID = item['orderID']
            productID = item['productID']
            quantity = item['quantity']

            db_connection = get_db()

            db_query = f"INSERT INTO Order_Items \
                            (orderItemID, orderID, productID, quantity) \
                            VALUES \
                            ('{orderItemID}', '{orderID}', '{productID}', '{quantity}')"

            # insert the new user information to database
            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True})


@app.route('/order/<orderID>', methods=['GET'])
def getAllOrders(orderID):

    result = []

    try:
        db_connection = get_db()

        db_query = f"SELETE * \
            FROM Order_Items \
            WHERE \
            OrderID = '{orderID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        for r in rows:
            item = []
            for idx in range(2, len(item)):
                item.append(r[idx])
            result.append(item)

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'items': result})
    
    
@app.route('/order/<shopID>/', methods=['GET'])
def getOrdersByShop(shopID):
    result = []
    try:
        db_connection = get_db()
        
        db_query = f"SELECT OrderID, ProductID, Quantity FROM Order_Items WHERE ProductID IN (SELECT ProductID FROM Products WHERE ShopID = '{shopID}');"
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()
        
        rows = cur.fetchall()
        
    except Exception as e:
        return internal_server_error(500, str(e))
    '''
    for i in rows:
        print(i[0])
        db_connection = get_db()
        
        db_query = f"SELECT ProductID, Quantity FROM Order_Items WHERE OrderID = " + str(i[0]) + ";"
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()
        
        row = cur.fetchall()
        result.append({i[0]: row})'''
    for row in rows:
        if any(row[0] in d for d in result):
            for i in result:
                 if list(i.keys())[0] == row[0]:
                      i[row[0]].append({'ProductID': row[1], 'Quantity': row[2]})
        else:
            result.append({row[0]: [{'ProductID': row[1], 'Quantity': row[2]}]})
        
        
    return jsonify({'orders': result})
    


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
