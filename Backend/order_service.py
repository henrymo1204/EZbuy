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
from flask_mail import Mail, Message


app = Flask(__name__)
app.config.from_envvar('APP_CONFIG')
DATABASE_PATH = app.config.get("DATABASE")
CORS(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'youremail@email.com' #enter the email username here
app.config['MAIL_PASSWORD'] = 'password' #enter the email password here
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)



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


@app.route('/api/v1/order/<userID>', methods=['POST'])
def addOrder(userID):

    dataDict = json.loads(request.data)

    order_items = dataDict['order_items']
    email_address = dataDict['emailAddress']
    username = dataDict['userName']

    totalPrice = 0
    message = ''
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
        
        seller_message = dict()

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
            
            product_query = f"SELECT ProductName, Price, ShopID FROM Products WHERE ProductID = '{productID}';"

            # get product information to database
            cur = db_connection.cursor()
            cur.execute(product_query)
            db_connection.commit()
            
            rows = cur.fetchall()
            
            total = float(rows[0][1]) * float(quantity)
            
            msg = str(rows[0][0]) + "\nItem Number: " + str(productID) + "\nQuantity: " + str(quantity) + "\nPrice: $" + str(total) + "\n\n"
            
            if rows[0][2] not in seller_message.keys():
                seller_message[rows[0][2]] = msg
            else:
                seller_message[rows[0][2]] += msg
            
            message += msg
            
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

        
    buyer_msg = Message('Order Confirmation', sender = 'youremail@email.com', recipients = [email_address])
    # need to change sender email
    buyer_msg.body = "Dear " + str(username) + ",\n\nThank you for ordering from the EZ-Buy online store.\n\
Your order has been placed.\n\n------------------------------------------------------------\nORDER ID: " + str(orderID) + "\nSUBTOTAL: $" + str(totalPrice) + "\n------------------------------------------------------------\nItems:\n\n" + message
    mail.send(buyer_msg)

    try:
        db_connection = get_db()
        
        for seller in seller_message:

            db_query = f"SELECT Users.Email, Shops.Shopname FROM Users, Shops WHERE Users.UserID IN (SELECT UserID FROM Shops WHERE ShopID = '{seller}') AND Users.UserID = Shops.UserID;"

            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()
            
            rows = cur.fetchall()
            
            seller_msg = Message('Order Confirmation', sender = 'youremail@email.com', recipients = [rows[0][0]])
            # need to change sender email
            seller_msg.body = buyer_msg.body = "Dear " + str(rows[0][1]) + ",\n\nYou have received an order.\n\n------------------------------------------------------------\nORDER ID: " + str(orderID) + "\n------------------------------------------------------------\nItems:\n\n" + seller_message[seller]
            mail.send(seller_msg)
            
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))
        
    return jsonify({'success': True, 'orderID': orderID})


@app.route('/api/v1/order/items/<userID>', methods=['GET'])
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


@app.route('/api/v1/order/detail/<orderID>', methods=['GET'])
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
            productPrice = productDetail[5]
            productImage = productDetail[7]

            # assemble order item detail
            itemDetail = {'quantity': quantity, 'productName': productName,
                          'productDescription': productDescription, 'productPrice': productPrice, 'productImage': productImage}

            orderItems.append(itemDetail)

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'orderItems': orderItems})


@app.route('/api/v1/order/<shopID>/', methods=['GET'])
def getOrdersByShop(shopID):
    result = []
    try:
        db_connection = get_db()

        db_query = f"SELECT * FROM Orders WHERE OrderID IN (SELECT DISTINCT OrderID FROM Order_Items WHERE ProductID IN (SELECT ProductID FROM Products WHERE ShopID = '{shopID}'));"
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

    except Exception as e:
        return internal_server_error(500, str(e))

    for row in rows:
        result.append(
            {'OrderID': row[0], 'UserID': row[1], 'CreateTime': row[2], 'TotalPrice': row[3]})

    try:
        db_connection = get_db()

        db_query = f"SELECT OrderID, ProductID, Quantity FROM Order_Items WHERE ProductID IN (SELECT ProductID FROM Products WHERE ShopID = '{shopID}');"
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

    except Exception as e:
        return internal_server_error(500, str(e))

    for row in rows:
        for r in result:
            if row[0] == r['OrderID']:
                if 'Products' in r:
                    r['Products'].append(
                        {'ProductID': row[1], 'Quantity': row[2]})
                else:
                    r['Products'] = [{'ProductID': row[1], 'Quantity': row[2]}]

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
