#!/bin/bash

# Exit on error
set -e

# List of front-end dependencies
DEPENDENCIES=(
    react
    react-dom
    axios
    redux
    react-redux
    react-router-dom
    react-router
    styled-components
    prop-types
    bootstrap
)

# Install each dependency
echo "Installing front-end dependencies..."
for DEP in "${DEPENDENCIES[@]}"; do
    npm install "$DEP"
done

echo "All dependencies have been installed successfully."
