from flask_restful import Resource, reqparse
from repository.task_repository import TaskRepository


class Tasks(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    def __init__(self, task_repo: TaskRepository):
        self.task_repo = task_repo
        
    def get(self, userId: str, todolistId: str, all: bool=False):
        """Returns a specified task or all data stored for task if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("taskId")
        args = parser.parse_args()

        if all:
            return {"tasks": self.task_repo.get(userId, todolistId)}, 200

        return {"tasks": self.task_repo.get(userId, todolistId, args["taskId"])}, 200

    def post(self, userId: str, todolistId: str):
        """Returns all updated tasks if request is successful and task was successfully created."""
        parser = reqparse.RequestParser()

        parser.add_argument("name", required=True)
        args = parser.parse_args()

        if self.task_repo.post(userId, todolistId, args["name"]):
            return self.get(userId, todolistId, all=True)

        return {"message": f"task '{args['name']}' already exists."}, 401

    def put(self, userId: str, todolistId: str):
        """Returns all updated tasks if request is successful and
        updates specified task from task data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("taskId", required=True)
        parser.add_argument("done", required=True)
        args = parser.parse_args()

        if self.task_repo.put(args["taskId"], args["done"].lower() == "true"):
            return self.get(userId, todolistId, all=True)

        return {"message": f"task with id '{args['taskId']}' does not exist."}, 404

    def delete(self, userId: str, todolistId: str):
        """Returns all updated tasks if request is successful and 
        removes specified task from task data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("taskId", required=True)
        args = parser.parse_args()

        if self.task_repo.delete(args["taskId"]):
            return self.get(userId, todolistId, all=True)

        return {"message": f"task with id '{args['taskId']}' does not exist."}, 404