from flask_restful import Resource, reqparse
from repository.task_repository import TaskRepository
from repository.todolist_repository import TodoListRepository
from repository.user_repository import UserRepository


class Users(Resource):
    """A class to represent a users resource.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def __init__(self, 
        user_repo: UserRepository, 
        list_repo: TodoListRepository,
        task_repo: TaskRepository):

        self.user_repo = user_repo
        self.list_repo = list_repo
        self.task_repo = task_repo
        
    def get(self, all: bool=False):
        """Returns data for a specified user or all data stored for users if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId")
        args = parser.parse_args()

        if all:
            return {"users": self.user_repo.get()}, 200

        return {"users": self.user_repo.get(args["userId"])}, 200

    def post(self):
        """Returns all updated user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("name", required=True)
        args = parser.parse_args()

        if self.user_repo.post(args["name"]):
            return self.get(all=True)

        return {"message": f"user '{args['name']}' already exists."}, 401
    
    def delete(self):
        """Removes specified user from user data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("userId", required=True)
        args = parser.parse_args()

        # removing all associated todolists
        todolists = self.list_repo.get(args["userId"])

        for todolistId in todolists.keys():
            # removing all associated tasks
            tasks = self.task_repo.get(args["userId"], todolistId)

            for taskId in tasks.keys():
                self.task_repo.delete(taskId)

            self.list_repo.delete(todolistId)

        if self.user_repo.delete(args["userId"]):
            return self.get(all=True)

        return {"message": f"user with id '{args['userId']}' does not exist."}, 404