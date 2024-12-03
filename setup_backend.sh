#!/bin/bash

# Exit on error
set -e

# Install required Python libraries
REQUIRED_LIBS=(
    flask
    flask_cors
    mysql-connector-python
)

echo "Installing required libraries..."
for LIB in "${REQUIRED_LIBS[@]}"; do
    pip install "$LIB"
done


export NODE_TLS_REJECT_UNAUTHORIZED=0
echo "Setup completed successfully."
