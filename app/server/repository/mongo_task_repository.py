from pymongo import MongoClient
from bson.objectid import ObjectId
from repository.task_repository import TaskRepository


class MongoTaskRepository(TaskRepository):
    """Class to access and update Task data from a MongoDB."""
    def __init__(self, db_user: str, db_password: str) -> None:
        mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

        self.collection = mongodb_cluster["todolistdb"]["tasks"]
    
    def get(self, userId: str,  todolistId: str, taskId: str=None) -> dict:
        """Returns all data stored for tasks."""
        if taskId is not None:
            data = self.collection.find({"_id": ObjectId(taskId)})
        else:
            data = self.collection.find({"userId": userId, "todolistId": todolistId})

        return {str(todolist["_id"]): todolist["name"] for todolist in data}
    
    def post(self, userId: str, todolistId: str, name: str) -> bool:
        """Returns whether task was successfully created or if it already exists."""
        data = self.collection.find({"userId": userId, "todolistId": todolistId, "name": name})

        if name in [todolist["name"] for todolist in data]:
            return False

        self.collection.insert_one({"userId": userId, "todolistId": todolistId, "name": name})
        return True

    def delete(self, taskId: str) -> bool:
        """Returns whether the task was successfully deleted."""
        data = self.collection.find({"_id": ObjectId(taskId)})

        if taskId not in [str(todolist["_id"]) for todolist in data]:
            return False

        self.collection.delete_one({"_id": ObjectId(taskId)})
        return True