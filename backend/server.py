# Filename - server.py

from flask import Flask
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from api import API
from flask_cors import CORS, cross_origin
import logging
import re

app = Flask(__name__)
CORS(app)

# Enter your database credentials here
api = API("localhost", "root", "penguin1", "trap_tracker")

logging.getLogger('flask_cors').level = logging.DEBUG

def cors_response(method_array):
    response = jsonify({'message': 'CORS preflight successful'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', ','.join(method_array))
    return response
   
# Route for seeing a data
@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(api.get_users())

# route for adding a user
@app.route('/api/users/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
       return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        status = api.add_user(data['username'], data['password'])
        user_json = {"id": status, "username": data['username'], "password": data['password']}
        if status:
            status = api.add_person(status, "jane", "doe", "2026-05-06", "2020-09-02", "2000-01-01", "member")
            return jsonify({'message': 'User added successfully', 'user': user_json})
        else:
            print('User not added')
            return jsonify({'message': 'User not added', 'user': data})
    
@app.route('/api/users/signin', methods=['POST', 'OPTIONS'])
def signin():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        user = api.get_user(data['username'], data['password'])
        if user:
            return jsonify({'message': 'User found', 'user': user})
        else:
            return jsonify({'message': 'User not found'})
        
@app.route('/api/users/profile', methods=['POST', 'OPTIONS'])
def profile():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        profile = api.get_person(data['id'])
        if profile:
            return jsonify({'message': 'Profile found', 'profile': profile})
        else:
            return jsonify({'message': 'Profile not found'})
        
        
@app.route('/api/users/profile/update', methods=['PUT', 'OPTIONS'])
def update_profile():
    if request.method == 'OPTIONS':
        return cors_response(['PUT', 'OPTIONS'])
    elif request.method == 'PUT':
        data = request.get_json()
        api.update_person(data["profile"], data['id'])
        profile = api.get_person(data['id'])
        return jsonify({'message': 'Profile updated successfully', 'profile': profile})
        
@app.route('/api/users/update', methods=['put'])
def update():
    if request.method == 'OPTIONS':
        return cors_response(['PUT', 'OPTIONS'])
    elif request.method == 'PUT':
        data = request.get_json()
        api.update_user(data["id"], data['username'], data['password'])
        return jsonify({'message': 'User updated successfully', 'user': data})
    
@app.route('/api/games/trap', methods=['POST', 'OPTIONS'])
def get_trap():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        user = request.get_json()
        data = api.get_trap(user['id'])
        return jsonify({'message': 'Games retrieved successfully', 'games': data})
    
@app.route('/api/games/trap/game', methods=['POST', 'OPTIONS'])
def get_trap_game():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        game = api.get_trap_game(data['id'])
        if game:
            return jsonify({'message': 'Profile found', 'game': game})
        else:
            return jsonify({'message': 'Game not found'})
    
@app.route('/api/games/trap/delete', methods=['POST', 'OPTIONS'])
def delete_trap():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        api.delete_trap(data['id'])
        return jsonify({'message': 'Game deleted successfully', 'game': data})  
    
@app.route('/api/games/trap/add', methods=['POST', 'OPTIONS'])
def add_trap():
    if request.method == 'OPTIONS':
        return cors_response(['POST', 'OPTIONS'])
    elif request.method == 'POST':
        data = request.get_json()
        game_data = data["game"]
        api.add_trap(game_data)
        return jsonify({'message': 'Game added successfully', 'game': data})
    
@app.route('/api/games/trap/update', methods=['PUT', 'OPTIONS'])
def update_trap():
    if request.method == 'OPTIONS':
       return cors_response(['PUT', 'OPTIONS'])
    elif request.method == 'PUT':
        data = request.get_json()
        api.update_trap(data["game"], data['id'])
        return jsonify({'message': 'Game updated successfully', 'game': data})


    
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=4000)