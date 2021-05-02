#!/bin/bash

#kill backend before start if necessary
echo "Stoping backend processes..."
kill $(ps aux | grep '[f]lask run' | awk '{print $2}')

#kill frontend before start if necessary
echo "Stoping frontend processes..."
kill $(ps aux | grep '[n]ode .*EZbuy.*' | awk '{print $2}')

#restart backend
pushd ../Backend
echo "Restart backend process..."
exec sh run.sh &
popd

#restart frontend
pushd ../Frontend
echo "Install with Yarn..."
yarn install
echo "Restart frontend process..."
exec npm start &
popd
