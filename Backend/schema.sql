-- CPSC462 Project: EZBuy

-- Professor: Lidia Morrison

-- Team members:
--     Ying Luo,            yingluo_holiday@csu.fullerton.edu
--     Gabriel Magallanes,  gabe695@csu.fullerton.edu
--     Juheng Mo,           henrymo@csu.fullerton.edu
--     Mohammad Mirwais,    mirwais.88@csu.fullerton.edu

-- Sqlite3 datebase schema for the Microblog Microservices. 

PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Delete previous tables if exist
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS Cart_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Shipments;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Shops;

-- Delete previous indexes if exist
DROP INDEX IF EXISTS user_index;
DROP INDEX IF EXISTS cart_index;
DROP INDEX IF EXISTS cart_item_index;
DROP INDEX IF EXISTS order_index;
DROP INDEX IF EXISTS order_item_index;
DROP INDEX IF EXISTS payment_index;
DROP INDEX IF EXISTS shipment_index;
DROP INDEX IF EXISTS product_index;
DROP INDEX IF EXISTS shop_index;

-- ################################################################
--            Begin Users table setup
-- ################################################################

-- Create Users table
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    UserRole VARCHAR(255) NOT NULL,
    HashedPass VARCHAR(255) NOT NULL
);

-- Create index for Users table
CREATE INDEX user_index
ON Users (Username);

-- Populate test data for Users table
INSERT INTO Users (Username, Email, UserRole, HashedPass)
VALUES 
-- password for user ying is ying_pass
("ying", "ying@gmail.com", "seller", "pbkdf2:sha256:150000$gr6E9eAs$9b6ffb1cbdcf49a5e269f23f7341574155c4397f821323a8e67be9ac4cdb614d"),
-- password for user alex is alex_pass
("alex", "alex@gmail.com", "seller", "pbkdf2:sha256:150000$NX5cIDz8$4ec82d66c08d2254ddea7cc7f07529dbe4671885f5bcee910f0fbe8cbbbff803"),
-- password for user holiday is holiday_pass
("holiday", "holiday@gmail.com", "buyer", "pbkdf2:sha256:150000$hZpcIIcx$cebca0228c2eb7a83b1aca09297abf88685f36cd4ba2e0b68223f8f6ea66279d"),
-- password for user test_user1 is test_pass1
("test_user1", "test_user1@gmail.com", "seller", "pbkdf2:sha256:150000$lH8ajOSR$e42203b64a5717d2a159b90889f7116b3966fed9cf7c8c7d6ccf2468c5116ef3"),
-- password for user test_user2 is test_pass2
("test_user2", "test_user2@gmail.com", "buyer", "pbkdf2:sha256:150000$btzisI0Z$136431abb9af39b52f1297e32d266a95d25133b069d44cc683dd3ecb7bf5195b");

-- ################################################################
--            End Users table setup
-- ################################################################





-- ################################################################
--                    Begin Shops table setup
-- ################################################################
-- Create Shops table
CREATE TABLE Shops (
    ShopID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Shopname VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE 
);

-- Create index for Shops table
CREATE INDEX shop_index
ON Shops (ShopID);

-- Populate test data for Shops table
INSERT INTO Shops (UserID, Shopname)
VALUES 
(1, "shop1"),
(2, "shop2"),
(3, "shop3");

-- ################################################################
--                     End Shops table setup
-- ################################################################





-- ################################################################
--                   Begin Products table setup
-- ################################################################

-- Create Products table
CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ShopID INTEGER NOT NULL,
    ProductName VARCHAR(255) NOT NULL,
    ProductDescription VARCHAR(255), 
    Price INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    ProductImage VARCHAR,
    Product3DImage VARCHAR,
    IsAuctionItem INTEGER NOT NULL,
    FOREIGN KEY (ShopID) REFERENCES Shops(ShopID) ON DELETE CASCADE
);

-- Create index for Products table
CREATE INDEX product_index
ON Products (ProductID);

-- Populate test data for Shops table
INSERT INTO Products (ShopID, ProductName, ProductDescription, Price, Quantity, ProductImage, Product3DImage, IsAuctionItem)
VALUES 
(1, "test_product1", "test_product_descrip1", 10, 1, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 1),
(2, "test_product2", "test_product_descrip2", 20, 2, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0),
(3, "test_product3", "test_product_descrip3", 30, 3, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0),
(1, "test_product4", "test_product_descrip4", 40, 1, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 1),
(2, "test_product5", "test_product_descrip5", 50, 2, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0),
(3, "test_product6", "test_product_descrip6", 60, 3, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0),
(1, "test_product7", "test_product_descrip7", 70, 1, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 1),
(2, "test_product8", "test_product_descrip8", 80, 2, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0),
(3, "test_product9", "test_product_descrip9", 90, 3, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAx8AAAJcCAYAAACYHxnTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHsveePZFl65veGd", "test", 0);

-- ################################################################
--                     End Products table setup
-- ################################################################





-- ################################################################
--                     Begin Carts table setup
-- ################################################################

-- Create Carts table
CREATE TABLE Carts (
    CartID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    TotalPrice INTEGER NOT NULL,
    LastUpdateTime DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create index for Carts table
CREATE INDEX cart_index
ON Carts (CartID);

-- Populate test data for Carts table
INSERT INTO Carts (UserID, TotalPrice, LastUpdateTime)
VALUES 
(1, 100, "2019-01-01 10:00:00"),
(2, 200, "2020-01-01 10:00:00"),
(3, 300, "2021-01-01 10:00:00");

-- ################################################################
--                      End Carts table setup
-- ################################################################





-- ################################################################
--                  Begin Cart_Items table setup
-- ################################################################

-- Create Cart_Items table
CREATE TABLE Cart_Items (
    CartItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    CartID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Create index for Cart_Items table
CREATE INDEX cart_item_index
ON Cart_Items (CartID);

-- Populate test data for Cart_Items table
INSERT INTO Cart_Items (CartID, ProductID, Quantity)
VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- ################################################################
--                   End Cart_Items table setup
-- ################################################################




-- ################################################################
--                     Begin Orders table setup
-- ################################################################

-- Create Orders table
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    CreateTime DATE NOT NULL,
    TotalPrice REAL NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create index for Orders table
CREATE INDEX order_index
ON Orders (OrderID);

-- Populate test data for Orders table
INSERT INTO Orders (UserID, CreateTime, TotalPrice)
VALUES 
(1, "2019-01-01 10:00:00", 100),
(2, "2020-01-01 10:00:00", 200),
(3, "2021-01-01 10:00:00", 300);
-- ################################################################
--                       End Orders table setup
-- ################################################################





-- ################################################################
--                    Begin Order_Items table setup
-- ################################################################

-- Create Order_Items table
CREATE TABLE Order_Items (
    OrderItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER NOT NULL,
    ProductID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Create index for Order_Items table
CREATE INDEX order_item_index
ON Order_Items (OrderID);

-- Populate test data for Order_Items table
INSERT INTO Order_Items (OrderID, ProductID, Quantity)
VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(1, 4, 4);

-- ################################################################
--                   End Order_Items table setup
-- ################################################################





-- ################################################################
--                     Begin Payments table setup
-- ################################################################

-- Create Payments table
CREATE TABLE Payments (
    PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    OrderID INTEGER NOT NULL,
    PaymentMethod VARCHAR(255),
    NameOnCard VARCHAR(255),
    CardNumber VARCHAR(255),
    ExpireMonth INTEGER,
    ExpireYear INTEGER,
    CVV VARCHAR(255),
    CreateTime DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- Create index for Payments table
CREATE INDEX payment_index
ON Payments (PaymentID);

-- Populate test data for Payments table
INSERT INTO Payments (UserID, OrderID, PaymentMethod, NameOnCard, CardNumber, ExpireMonth, ExpireYear, CVV, CreateTime)
VALUES 
(1, 1, "VISA", "test_user1", "1111111111111111", 10, 10, "321", "2019-01-01 10:00:00"),
(2, 2, "VISA", "test_user2", "2222222222222222", 11, 11, "234", "2020-01-01 10:00:00"),
(3, 3, "MASTERCARD", "test_user3", "3333333333333333", 12, 12, "345", "2021-01-01 10:00:00");
-- ################################################################
--                     End Payments table setup
-- ################################################################





-- ################################################################
--                 Begin Shipment_Details table setup
-- ################################################################

-- Create Shipments table
CREATE TABLE Shipments (
    ShipmentID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    OrderID INTEGER NOT NULL,
    Addr_City VARCHAR(255) NOT NULL,
    Addr_State VARCHAR(255) NOT NULL,
    Addr_Street VARCHAR(255) NOT NULL,
    ZipCode VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(255) NOT NULL,
    Recipient VARCHAR(255)  NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

-- Create index for Shipments table
CREATE INDEX shipment_index
ON Shipments (ShipmentID);

-- Populate test data for Shipment_Details table
INSERT INTO Shipments (UserID, OrderID, Addr_City, Addr_State, Addr_Street, ZipCode, PhoneNumber, Recipient)
VALUES 
(1, 1, "Santa Clara", "CA", "test street1", "95054", "323-123-1234", "recipient1"),
(1, 2, "Los Angeles", "CA", "test street2", "90007", "323-234-4567", "recipient1"),
(1, 3, "Fullerton", "CA", "test street3", "92831", "323-345-6789", "recipient1");

-- ################################################################
--                  End Shipment_Details table setup
-- ################################################################


COMMIT;
