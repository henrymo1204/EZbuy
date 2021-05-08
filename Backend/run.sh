#!/bin/bash

kill $(ps aux | grep '[f]lask run' | awk '{print $2}')

pip3 install -r requirements.txt

foreman start -m gateway=1,user_service=3,cart_service=3,shop_service=3,order_service=3,payment_service=3,shipment_service=3,inventory_service=3 &