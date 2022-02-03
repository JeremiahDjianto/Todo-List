from flask import Flask
from flask_restful import Resource, Api, reqparse
from numpy import require
import pandas as pd
import ast
import os
import sys

app = Flask(__name__)
api = Api(app)

class User(Resource):
    """A class to represent a user.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def get(self):
        """Returns all data stored for users if request is successful."""
        data = pd.read_csv(os.path.join(sys.path[0], "data/users.csv"))
        data = data.to_dict()

        return {"data": data}, 200 # Return data and "200 OK" code

    def post(self):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        parser.add_argument("name", required=True)

        args = parser.parse_args()

        new_data = pd.DataFrame({
            "userId": [args["userId"]],
            "name": [args["name"]]
        })

        data = pd.read_csv(os.path.join(sys.path[0], "data/users.csv"))

        if args["userId"] in list(data["userId"]):
            return {"message": f"user '{args['userId']}' already exists."}, 401

        data = pd.concat([data, new_data], ignore_index=True)
        data.to_csv(os.path.join(sys.path[0], "data/users.csv"), index=False)
        data = data.to_dict()

        return {"data": data}, 200
    
    def delete(self):
        """Removes specified user from user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        args = parser.parse_args()

        data = pd.read_csv(os.path.join(sys.path[0], "data/users.csv"))

        if args["userId"] not in list(data["userId"]):
            return {"message": f"user '{args['userId']}' does not exist."}, 404

        data = data[data.userId != args["userId"]]
        data.to_csv(os.path.join(sys.path[0], "data/users.csv"), index=False)
        data = data.to_dict()

        return {"data": data}, 200

        
class TodoList(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    pass

api.add_resource(User, "/users")
api.add_resource(TodoList, "/locations")

if __name__ == "__main__":
    app.run()