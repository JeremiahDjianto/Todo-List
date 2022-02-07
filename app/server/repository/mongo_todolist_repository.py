from pymongo import MongoClient
from repository.todolist_repository import TodoListRepository


class MongoTodoListRepository(TodoListRepository):
    """Class to access and update user data from a MongoDB."""
    def __init__(self, db_user: str, db_password: str) -> None:
        mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

        self.collection = mongodb_cluster["todolistdb"]["todolists"]
    
    def get(self, userId: str,  todolistId: str=None) -> dict:
        """Returns all data stored for users."""
        if todolistId is not None:
            data = self.collection.find({"userId": userId, "todolistId": todolistId})
        else:
            data = self.collection.find({"userId": userId})

        return {todolist["todolistId"]: todolist["name"] for todolist in data}
        
    def post(self, userId: str, todolistId: str, name: str) -> bool:
        """Returns whether user was successfully created or if they already exists."""
        data = self.collection.find({"todolistId": todolistId, "name": name})

        if todolistId in [todolist["todolistId"] for todolist in data]:
            return False

        self.collection.insert_one({"userId": userId, "todolistId": todolistId, "name": name})
        return True

    def delete(self, todolistId: str) -> bool:
        """Returns whether the user was successfully deleted."""
        data = self.collection.find({"todolistId": todolistId})

        if todolistId not in [todolist["todolistId"] for todolist in data]:
            return False

        self.collection.delete_one({"todolistId": todolistId})
        return True