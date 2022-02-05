from json import dumps
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from pymongo import MongoClient
from bson.json_util import dumps, loads
from numpy import require
import pandas as pd
import ast
import os
import sys

app = Flask(__name__)
api = Api(app)

db_user = os.environ.get("MONGODB_USER")
db_password = os.environ.get("MONGODB_PASSWORD")
mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = mongodb_cluster["todolistdb"]

class User(Resource):
    """A class to represent a user.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def get(self):
        """Returns all data stored for users if request is successful."""
        user_data = db["users"].find()

        return {"users": {user["userId"]: user["name"] for user in user_data}}, 200

    def post(self):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        parser.add_argument("name", required=True)

        args = parser.parse_args()

        user_data = db["users"].find({"userId": args["userId"], "name": args["name"]})

        if args["userId"] in [user["userId"] for user in user_data]:
            return {"message": f"user '{args['userId']}' already exists."}, 401

        db["users"].insert_one({"userId": args["userId"], "name": args["name"]})

        user_data = db["users"].find()

        return {"users": {user["userId"]: user["name"] for user in user_data}}, 200
    
    def delete(self):
        """Removes specified user from user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        args = parser.parse_args()

        user_data = db["users"].find({"userId": args["userId"]})

        if args["userId"] not in [user["userId"] for user in user_data]:
            return {"message": f"user '{args['userId']}' does not exist."}, 404

        db["users"].delete_one({"userId": args["userId"]})
        user_data = db["users"].find()

        return {"users": {user["userId"]: user["name"] for user in user_data}}, 200

        
class TodoList(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    pass

api.add_resource(User, "/users")
api.add_resource(TodoList, "/locations")

if __name__ == "__main__":
    app.run()