#!/bin/bash

pip3 install -r requirements.txt

foreman start -m gateway=1,user_service=1,cart_service=1,shop_service=1,order_service=1,payment_service=1,shipment_service=1,inventory_service=1 &