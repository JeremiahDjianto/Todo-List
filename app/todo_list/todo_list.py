from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import os
import sys

app = Flask(__name__)
api = Api(app)

class Users(Resource):
    """A class to represent a user.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def get(self):
        """Returns all data stored for users if request is successful."""
        data = pd.read_csv(os.path.join(sys.path[0], "data/users.csv"))
        data = data.to_dict()

        return {'data': data}, 200 # Return data and "200 OK" code

    def post(self):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument('userId', required=True)
        parser.add_argument('name', required=True)

        args = parser.parse_args()

        new_data = pd.DataFrame({
            'userId': [args['userId']],
            'name': [args['name']]
        })

        data = pd.read_csv(os.path.join(sys.path[0], "data/users.csv"))
        data = data.append(new_data)

        data.to_csv(os.path.join(sys.path[0], "data/users.csv"), index=False)
        data = data.to_dict()

        return {'data': data}, 200
    pass

class TodoList(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    pass

api.add_resource(Users, "/users")
api.add_resource(TodoList, "/locations")

if __name__ == "__main__":
    app.run()