from flask import Flask, request, render_template, jsonify, session, redirect, url_for
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
app.secret_key = "you_cannot_guess_the_key_hehe"
client = MongoClient("mongodb://localhost:27017/")
db = client["task_manager"]
users = db["users"]
tasks = db["tasks"]


@app.route('/')
def index():
    return redirect('/login')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if users.find_one({"username": username}):
            return render_template('register.html', error="User already exists")
        else:
            users.insert_one({"username": username, "password": password})
            return redirect('/login')
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = users.find_one({"username": username, "password": password})

        if user:
            session['username'] = username
            return redirect('/dashboard')
        else:
            return render_template('login.html', error="Invalid credentials, please register first.")

    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect('/login')
    return render_template('home.html', username=session['username'])


@app.route('/tasks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_tasks():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    username = session['username']

    if request.method == 'GET':
        user_tasks = tasks.find({"username": username})
        return jsonify(
            [{"id": str(task['_id']), "task": task['task'], "description": task['description']} for task in user_tasks])

    data = request.json
    if request.method == 'POST':
        tasks.insert_one({"username": username, "task": data['task'], "description": data['description']})
        return jsonify({"message": "Task added"})

    elif request.method == 'PUT':
        tasks.update_one({"_id": ObjectId(data['id']), "username": username},
                         {"$set": {"task": data['task'], "description": data['description']}})
        return jsonify({"message": "Task updated"})

    elif request.method == 'DELETE':
        # Ensure ObjectId is used here
        task_id = ObjectId(data['id'])
        tasks.delete_one({"_id": task_id, "username": username})
        return jsonify({"message": "Task deleted"})


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/login')


if __name__ == '__main__':
    app.run(debug=True)
