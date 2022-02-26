from flask_restful import Resource, reqparse
from repository.task_repository import TaskRepository
from repository.todolist_repository import TodoListRepository


class TodoLists(Resource):
    """A class to represent a "Todo-List".
    
    TodoLists should have tasks.
    """
    def __init__(self, 
        list_repo: TodoListRepository,
        task_repo: TaskRepository):

        self.list_repo = list_repo
        self.task_repo = task_repo
        
    def get(self, userId: str, all: bool=False):
        """Returns a specified todolist or all data stored for todolists if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("todolistId")
        args = parser.parse_args()

        if all:
            return {"todolist": self.list_repo.get(userId)}, 200

        return {"todolists": self.list_repo.get(userId, args["todolistId"])}, 200

    def post(self, userId: str):
        """Returns all updated todolist data if request is successful and todolist is created."""
        parser = reqparse.RequestParser()

        parser.add_argument("name", required=True)
        args = parser.parse_args()

        if self.list_repo.post(userId, args["name"]):
            return self.get(userId, all=True)

        return {"message": f"todolist '{args['name']}' already exists."}, 401
    
    def delete(self, userId: str):
        """Returns all updated todolist data if requeset is successful 
        and removes specified todolist from todolist data if request is successful."""
        parser = reqparse.RequestParser()

        parser.add_argument("todolistId", required=True)
        args = parser.parse_args()

        # removing all associated tasks
        tasks = self.task_repo.get(userId, args["todolistId"])

        for taskId in tasks.keys():
            self.task_repo.delete(taskId)

        if self.list_repo.delete(args["todolistId"]):
            return self.get(userId, all=True)

        return {"message": f"todolist with id '{args['todolistId']}' does not exist."}, 404