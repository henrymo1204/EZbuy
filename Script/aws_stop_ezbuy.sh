#!/bin/bash

#kill backend before start if necessary
echo "Stoping backend processes..."
kill $(ps aux | grep '[f]lask run' | awk '{print $2}')

#kill frontend before start if necessary
echo "Stoping frontend processes..."
kill $(ps aux | grep '[s]erve -s' | awk '{print $2}')
