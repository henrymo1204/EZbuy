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


@app.route('/order/<userID>', methods=['POST'])
def addOrder(userID):

    dataDict = json.loads(request.data)

    order_items = dataDict['order_items']

    totalPrice = 0
    for item in order_items:
        quantity = item['productQuantity']
        price = item['productPrice']
        totalPrice += quantity * price

    try:
        db_connection = get_db()

        # create order in Orders table
        order_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        db_query = f"INSERT INTO Orders \
                        (UserID, CreateTime, TotalPrice) \
                        VALUES \
                        ('{userID}', '{order_time}', '{totalPrice}')"

        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        # get orderID of the created order
        db_query = f"SELECT orderID \
            FROM Orders \
            WHERE \
            UserID = '{userID}' AND createTime = '{order_time}'"

        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        orderID_index = 0
        orderID = rows[0][orderID_index]

        # add each cart_item to Order_Items table with orderID
        for item in order_items:

            productID = item['productID']
            quantity = item['productQuantity']

            db_connection = get_db()

            db_query = f"INSERT INTO Order_Items \
                            (orderID, productID, quantity) \
                            VALUES \
                            ('{orderID}', '{productID}', '{quantity}')"

            # insert the new user information to database
            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'orderID': orderID})


@app.route('/order/items/<userID>', methods=['GET'])
def getUserOrders(userID):

    orders = []

    try:
        db_connection = get_db()

        db_query = f"SELECT * \
            FROM Orders \
            WHERE \
            UserID = '{userID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        for item in rows:
            orderItem = {'orderID': item[0], 'userID': item[1],
                         'createTime': item[2], 'totalPrice': item[3]}
            orders.append(orderItem)

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'orders': orders})


@app.route('/order/detail/<orderID>', methods=['GET'])
def getOrderItems(orderID):

    orderItems = []

    try:
        db_connection = get_db()

        db_query = f"SELECT * \
            FROM Order_Items \
            WHERE \
            OrderID = '{orderID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        for item in rows:
            productID = item[2]
            quantity = item[3]

            # get order product details from database
            db_query = f"SELECT * \
                FROM Products \
                WHERE \
                ProductID = '{productID}'"

            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()

            rows = cur.fetchall()

            productDetail = rows[0]
            productName = productDetail[2]
            productDescription = productDetail[3]
            productPrice = productDetail[4]
            productImage = productDetail[6]

            # assemble order item detail
            itemDetail = {'quantity': quantity, 'productName': productName,
                          'productDescription': productDescription, 'productPrice': productPrice, 'productImage': productImage}

            orderItems.append(itemDetail)

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'orderItems': orderItems})


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
            result.append(
                {row[0]: [{'ProductID': row[1], 'Quantity': row[2]}]})

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
