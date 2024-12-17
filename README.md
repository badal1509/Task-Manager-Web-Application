# Task Manager Web Application

 W3villa Technologies - Assignment - Task Manager Web Application
***
 **Assignment Title:** Task Manager Web Application

  **Description:**
 In this assignment, you will develop a Task Manager web application that allows users to create,
 view, update, and delete tasks. The application will consist of frontend, backend, database, and
 API components. Users should be able to register, log in, and manage their tasks effectively.

---
## Technologies

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB

---
## Install Dependencies
1. **Install Flask :**
```bash
pip install Flask
```
2. **Install PyMongo** (Python library to interact with MongoDB):
```bash
pip install PyMongo
```
3. **Install MongoDB** (Version-8.0.4) :
    * [MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.4-signed.msi) (Windows x64)
    * [MongoDB](https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-8.0.4.tgz) (macOS x64)

---
## Create a database and collections 

1. To create a database 


```bash
use task_manager
```
2. Create Collections
* Create the `users` collection:
```bash
db.createCollection("users")
```
* Create the `tasks` collection:
```bash
db.createCollection("tasks")
```
* To verify that the collections were created:
```bash
show collections
```

---
## Step to run Application
* To run the application, open the Command Prompt, navigate to the project folder using the `cd` command, and then run the following command:
```bash
python app.py
```
---


