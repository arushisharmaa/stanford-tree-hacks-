#!/bin/bash

echo "Starting local server..."
python3 -m http.server 8000 &
SERVER_PID=$!

sleep 2

echo "Running Playwright script..."
jupyter nbconvert --to notebook --execute nb-script.ipynb # nb-bio.ipynb

echo "Stopping local server..."
kill $SERVER_PID

echo "Done!"