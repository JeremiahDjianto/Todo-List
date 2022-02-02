from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast

app = Flask(__name__)
api = Api(app)

class Users(Resource):
    """A class to represent a user.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    pass

class TodoList(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    pass

api.add_resource(Users, '/users')
api.add_resource(TodoList, '/locations')

if __name__ == "__main__":
    app.run()