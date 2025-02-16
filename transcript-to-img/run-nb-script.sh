#!/bin/bash

echo "Starting local server..."
python3 -m http.server 8000 &   # Runs in the background
SERVER_PID=$!  # Save the process ID of the server

sleep 2

echo "Running Playwright script..."
jupyter nbconvert --to notebook --execute nb-script.ipynb  # Run a Jupyter Notebook

echo "Stopping local server..."
kill $SERVER_PID  # Kill the background server process

echo "Done!"