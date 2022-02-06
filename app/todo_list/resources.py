from flask_restful import Resource, reqparse
from repository.todolist_repository import TodoListRepository
from repository.user_repository import UserRepository


class Users(Resource):
    """A class to represent a users resource.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo
        
    def get(self):
        """Returns data for a specified user or all data stored for users if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId")
        args = parser.parse_args()

        return self.user_repo.get(args["userId"]), 200

    def post(self):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        parser.add_argument("name", required=True)

        args = parser.parse_args()

        if self.user_repo.post(args["userId"], args["name"]):
            return self.get()

        return {"message": f"user '{args['userId']}' already exists."}, 401
    
    def delete(self):
        """Removes specified user from user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        args = parser.parse_args()

        if self.user_repo.delete(args["userId"]):
            return self.get()

        return {"message": f"user '{args['userId']}' does not exist."}, 404

        
class TodoLists(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    def __init__(self, list_repo: TodoListRepository):
        self.list_repo = list_repo
        
    def get(self, userId: str):
        """Returns for a specified todolist or all data stored for todolists if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("todolistId")
        args = parser.parse_args()

        return self.list_repo.get(userId, args["todolistId"]), 200

    def post(self, userId: str):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("todolistId", required=True)
        parser.add_argument("name", required=True)

        args = parser.parse_args()

        if self.list_repo.post(userId, args["todolistId"], args["name"]):
            return self.get(userId)

        return {"message": f"todolist '{args['todolistId']}' already exists."}, 401
    
    def delete(self, userId: str):
        """Removes specified user from user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("todolistId", required=True)
        args = parser.parse_args()

        if self.list_repo.delete(args["todolistId"]):
            return self.get(userId)

        return {"message": f"todolistId '{args['todolistId']}' does not exist."}, 404