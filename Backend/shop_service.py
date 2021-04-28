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
def ShopsService():
    return 'Welcome to Shops Service!'


@app.route('/shops/<sid>', methods=['POST'])
def addProduct(sid):
    """ Add a new product. Parameters are from HTTP POST requests.

    :param productName: Name of the new product
    :param productDescription: Description of the new product
    :param price: Price of the new product
    :param quantity: Quantity of the new product
    :param productImage: Image file of the new product
    :param product3DImage: 3D image file of the new product
    :param isAuctionItem: boolean value to see if the item is an auction item, 0 is no and 1 is yes

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    dataDict = json.loads(request.data)

    productName_key = 'productName'
    productDescription_key = 'productDescription'
    price_key = 'price'
    quantity_key = 'quantity'
    productImage_key = 'productImage'
    product3DImage_key = 'product3DImage'
    isAuctionItem_key = 'isAuctionItem'

    # return status code 400 if productName, productDescription, price, quantity, productImage, product3DImage, or isAuctionItem is not passed from the HTTP request.
    if product3DImage_key not in dataDict:
        if productName_key not in dataDict:
            return bad_request(400, f"missing {productName_key} field in request")
        elif productDescription_key not in dataDict:
            return bad_request(400, f"missing {productDescription_key} field in request")
        elif price_key not in dataDict:
            return bad_request(400, f"missing {price_key} field in request")
        elif quantity_key not in dataDict:
            return bad_request(400, f"missing {quantity_key} field in request")
        elif productImage_key not in dataDict:
            return bad_request(400, f"missing {productImage_key} field in request")
        elif isAuctionItem_key not in dataDict:
            return bad_request(400, f"missing {isAuctionItem_key} field in request")
    
        productName = dataDict['productName']
        productDescription = dataDict['productDescription']
        price = dataDict['price']
        quantity = dataDict['quantity']
        productImage = dataDict['productImage']
        isAuctionItem = dataDict['isAuctionItem']

        # return status code 400 if productName, productDescription, price, quantity, productImage, product3DImage, or isAuctionItem value is not valid
        if productName == None:
            return bad_request(400, f"{productName_key} field is empty")
        elif productDescription == None:
            return bad_request(400, f"{productDescription_key} field is empty")
        elif price == None:
            return bad_request(400, f"{price_key} field is empty")
        elif quantity == None:
            return bad_request(400, f"{quantity_key} field is empty")
        elif productImage == None:
            return bad_request(400, f"{productImage_key} field is empty")
        elif isAuctionItem == None:
            return bad_request(400, f"{isAuctionItem_key} field is empty")

        try:
            db_connection = get_db()
            insert_query = f"INSERT INTO Products (ShopID, ProductName, ProductDescription, Price, Quantity, ProductImage, IsAuctionItem) VALUES ('{sid}', '{productName}', '{productDescription}', '{price}', '{quantity}', '{productImage}', '{isAuctionItem}')"
            cur = db_connection.cursor()
            cur.execute(insert_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))
    else:
        if productName_key not in dataDict:
            return bad_request(400, f"missing {productName_key} field in request")
        elif productDescription_key not in dataDict:
            return bad_request(400, f"missing {productDescription_key} field in request")
        elif price_key not in dataDict:
            return bad_request(400, f"missing {price_key} field in request")
        elif quantity_key not in dataDict:
            return bad_request(400, f"missing {quantity_key} field in request")
        elif productImage_key not in dataDict:
            return bad_request(400, f"missing {productImage_key} field in request")
        elif product3DImage_key not in dataDict:
            return bad_request(400, f"missing {product3DImage_key} field in request")
        elif isAuctionItem_key not in dataDict:
            return bad_request(400, f"missing {isAuctionItem_key} field in request")
    
        productName = dataDict['productName']
        productDescription = dataDict['productDescription']
        price = dataDict['price']
        quantity = dataDict['quantity']
        productImage = dataDict['productImage']
        product3DImage = dataDict['product3DImage']
        isAuctionItem = dataDict['isAuctionItem']

        # return status code 400 if productName, productDescription, price, quantity, productImage, product3DImage, or isAuctionItem value is not valid
        if productName == None:
            return bad_request(400, f"{productName_key} field is empty")
        elif productDescription == None:
            return bad_request(400, f"{productDescription_key} field is empty")
        elif price == None:
            return bad_request(400, f"{price_key} field is empty")
        elif quantity == None:
            return bad_request(400, f"{quantity_key} field is empty")
        elif productImage == None:
            return bad_request(400, f"{productImage_key} field is empty")
        elif product3DImage == None:
            return bad_request(400, f"{product3DImage_key} field is empty")
        elif isAuctionItem == None:
            return bad_request(400, f"{isAuctionItem_key} field is empty")

        try:
            db_connection = get_db()
            insert_query = f"INSERT INTO Products (ShopID, ProductName, ProductDescription, Price, Quantity, ProductImage, Product3DImage, IsAuctionItem) VALUES ('{sid}', '{productName}', '{productDescription}', '{price}', '{quantity}', '{productImage}', '{product3DImage}', '{isAuctionItem}')"
            cur = db_connection.cursor()
            cur.execute(insert_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

    return jsonify({'success': True})


@app.route('/shops/<sid>', methods=['GET', 'PATCH'])
def getShop(sid):
    if request.method == 'GET':
        try:
            db_connection = get_db()
            search_query = f"SELECT Shopname, AboutUs FROM Shops WHERE ShopID = '{sid}'"
            cur = db_connection.cursor()
            cur.execute(search_query)
            db_connection.commit()
            rows = cur.fetchall()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        return jsonify({'success': True, 'shop': rows})
    elif request.method == 'PATCH':
        dataDict = json.loads(request.data)

        shopName_key = 'shopName'
        aboutUs_key = 'aboutUs'
   
        if shopName_key not in dataDict:
            return bad_request(400, f"missing {shopName_key} field in request")
        elif aboutUs_key not in dataDict:
            return bad_request(400, f"missing {aboutUs_key} field in request")
    
        shopName = dataDict['shopName']
        aboutUs = dataDict['aboutUs']

        # return status code 400 if productName, productDescription, price, quantity, productImage, product3DImage, or isAuctionItem value is not valid
        if shopName == None:
            return bad_request(400, f"{shopName_key} field is empty")
        elif aboutUs == None:
            return bad_request(400, f"{aboutUs_key} field is empty")
            
        try:
            db_connection = get_db()
            update_query = "UPDATE Shops SET ShopName = '" + shopName + "', AboutUs = '" + aboutUs + "' WHERE ShopID=" + sid + ";"

            cur = db_connection.cursor()
            cur.execute(update_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        return jsonify({'success': True})
        
    
@app.route('/shops/<sid>/', methods=['GET'])
def getProducts(sid):
    """ Add a new product. Parameters are from HTTP POST requests.

    :param productName: Name of the new product
    :param productDescription: Description of the new product
    :param price: Price of the new product
    :param quantity: Quantity of the new product
    :param productImage: Image file of the new product
    :param product3DImage: 3D image file of the new product
    :param isAuctionItem: boolean value to see if the item is an auction item, 0 is no and 1 is yes

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """


    try:
        db_connection = get_db()
        search_query = f"SELECT ProductID, ProductName, Price, Quantity, ProductImage FROM Products WHERE ShopID = '{sid}'"
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()
        rows = cur.fetchall()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    products = []
    for row in rows:
        # image is bytes, need to encode as json does not support bytes
        products.append({'productID': row[0], 'productName': row[1],
                         'productImage': row[4], 'productPrice': row[2], 'productQuantity': row[3]})

    return jsonify({'success': True, 'products': products})


@app.route('/shops/<sid>/<pid>', methods=['PATCH', 'DELETE'])
def modifyProduct(sid, pid):
    if request.method == 'PATCH':
        """ Edit the information of the product. Parameters are from HTTP POST requests.

        sid = shopID
        pid = productID	 

        :param productName: New name of the product
        :param productDescription: New description of the product
        :param price: New price of the new product
        :param quantity: New quantity of the new product
        :param productImage: New image file of the new product
        :param product3DImage: New 3D image file of the new product
        :param isAuctionItem: New boolean value to see if the item is an auction item, 0 is no and 1 is yes

        :return: <tuple> json response data, response code

        :raises Exception: on database queries failure.

        """
        dataDict = json.loads(request.data)

        productName_key = 'productName'
        productDescription_key = 'productDescription'
        price_key = 'price'
        quantity_key = 'quantity'
        productImage_key = 'productImage'
        product3DImage_key = 'product3DImage'

        keys = []
        # add dictionary for the column name and the new column value to the keys list of the key is in the JSON request
        if productName_key in dataDict:
            productName = dataDict['productName']
            keys.append({'ProductName': productName})
        if productDescription_key in dataDict:
            productDescription = dataDict['productDescription']
            keys.append({'ProductDescription': productDescription})
        if price_key in dataDict:
            price = dataDict['price']
            keys.append({'Price': price})
        if quantity_key in dataDict:
            quantity = dataDict['quantity']
            keys.append({'Quantity': quantity})
        if productImage_key in dataDict:
            productImage = dataDict['productImage']
            keys.append({'ProductImage': productImage})
        if product3DImage_key in dataDict:
            product3DImage = dataDict['product3DImage']
            keys.append({'Product3DImage': product3DImage})

        try:
            db_connection = get_db()
            for key in keys:
                update_query = "UPDATE Products SET " + list(key.keys())[0] + "='" + list(
                    key.values())[0] + "' WHERE ProductID=" + pid + " AND ShopID=" + sid + ";"

                cur = db_connection.cursor()
                cur.execute(update_query)
                db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        return jsonify({'success': True})
    elif request.method == 'DELETE':
        """ Delete the product. Parameters are from HTTP POST requests.

        sid = shopID
        pid = productID	 


        :return: <tuple> json response data, response code

        :raises Exception: on database queries failure.

        """
        try:
            db_connection = get_db()
            delete_query = "DELETE FROM Products WHERE ProductID=" + \
                pid + " AND ShopID=" + sid + ";"
            cur = db_connection.cursor()
            cur.execute(delete_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        return jsonify({'success': True})
        
       
@app.route('/shops/<sid>/<pid>/', methods=['GET'])
def getProduct(sid, pid):
    """ Add a new product. Parameters are from HTTP POST requests.

    :param productName: Name of the new product
    :param productDescription: Description of the new product
    :param price: Price of the new product
    :param quantity: Quantity of the new product
    :param productImage: Image file of the new product
    :param product3DImage: 3D image file of the new product
    :param isAuctionItem: boolean value to see if the item is an auction item, 0 is no and 1 is yes

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """


    try:
        db_connection = get_db()
        search_query = f"SELECT ProductName, ProductDescription, Price, Quantity, ProductImage, Product3DImage FROM Products WHERE ShopID = '{sid}' AND ProductID = '{pid}';"
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()
        rows = cur.fetchall()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    products = []
    for row in rows:
        # image is bytes, need to encode as json does not support bytes
        products.append({'productName': row[0], 'productDescription': row[1], 'productPrice': row[2], 'productQuantity': row[3], 'productImage': row[4], 'product3DImage': row[5]})

    return jsonify({'success': True, 'products': products})

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
