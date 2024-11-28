from flask import Flask

app = Flask(__name__)

@app.route("/")
def landing_page():
    return "<h1>Database Operations</h1>"