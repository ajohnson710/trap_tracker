Setting Up the Environment for the Project

This guide explains how to set up a Python virtual environment, install the required dependencies for this project, and ensure compatibility with Python 3.7.5.

Prerequisites

Before proceeding, ensure you have the following installed on your system:

Python 3.7.5

Download Python 3.7.5

pip (Python package installer)

pip is usually included with Python. To check:

python3 --version
pip --version

venv module (included with Python)

# Step 1: Create a Python Virtual Environment

Open your terminal/command prompt.

Navigate to the project directory where the program files are located.

Run the following command to create a virtual environment:

python3 -m venv env

This creates a virtual environment named env in the current directory.

Activate the virtual environment:

On Windows:

.\env\Scripts\activate

On macOS/Linux:

source env/bin/activate

When activated, your terminal prompt should include (env).

# Step 2: Install Dependencies

The dependencies required for this project are listed below. You can install them all using pip:

pip install flask, flask_cors, mysql-connector-python


# Step 3: Verify Installation

After installing the dependencies, run the following command to verify they are installed:

pip list

Ensure the required packages are listed.

# Step 4: Run the Program

With the virtual environment activated and dependencies installed, you can run the program by executing the main script:

python server.py

Additional Notes

Please change the API object in server.py to fit your own person database.

To deactivate the virtual environment, use:

deactivate

If you encounter issues, double-check that Python 3.7.5 is used in the virtual environment by running:

python --version
