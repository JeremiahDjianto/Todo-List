from pymongo import MongoClient
from bson.objectid import ObjectId
from repository.todolist_repository import TodoListRepository


class MongoTodoListRepository(TodoListRepository):
    """Class to access and update Todolist data from a MongoDB."""
    def __init__(self, db_user: str, db_password: str) -> None:
        mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

        self.collection = mongodb_cluster["todolistdb"]["todolists"]
    
    def get(self, userId: str,  todolistId: str=None) -> dict:
        """Returns all data stored for todolists."""
        if todolistId is not None:
            data = self.collection.find({"_id": ObjectId(todolistId)})
        else:
            data = self.collection.find({"userId": userId})

        return {str(todolist["_id"]): todolist["name"] for todolist in data}
        
    def post(self, userId: str, name: str) -> bool:
        """Returns whether todolist was successfully created or if it already exists."""
        data = self.collection.find({"userId": userId, "name": name})

        if name in [todolist["name"] for todolist in data]:
            return False

        self.collection.insert_one({"userId": userId, "name": name})
        return True

    def delete(self, todolistId: str) -> bool:
        """Returns whether the todolist was successfully deleted."""
        data = self.collection.find({"_id": ObjectId(todolistId)})

        if todolistId not in [str(todolist["_id"]) for todolist in data]:
            return False

        self.collection.delete_one({"_id": ObjectId(todolistId)})
        return True