#!/bin/bash

#kill backend before start if necessary
echo "Stoping backend processes..."
kill $(ps aux | grep '[f]lask run' | awk '{print $2}')

#kill frontend before start if necessary
echo "Stoping frontend processes..."
kill $(ps aux | grep '[s]erve -s' | awk '{print $2}')

#restart backend
cd ../Backend
echo "Remove DB file..."
rm ./ezbuy.db
echo "Init DB file..."
sh init.sh
echo "Restart backend process..."
exec sh run.sh &

#restart frontend
cd ../Frontend
echo "Install with Yarn..."
yarn install
echo "Restart frontend process..."
exec serve -s build -l 3000 &
