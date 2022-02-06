from pymongo import MongoClient
from repository.user_repository import UserRepository


class MongoUserRepository(UserRepository):
    """Class to access and update user data from a MongoDB."""
    def __init__(self, db_user: str, db_password: str) -> None:
        mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

        self.db = mongodb_cluster["todolistdb"]
    
    def get(self, userId: str=None) -> dict:
        """Returns all data stored for users."""
        user_data = self.db["users"].find()

        return {"users": {user["userId"]: user["name"] for user in user_data}}
        
    def post(self, userId: str, name: str) -> bool:
        """Returns whether user was successfully created or if they already exists."""
        user_data = self.db["users"].find({"userId": userId, "name": name})

        if userId in [user["userId"] for user in user_data]:
            return False

        self.db["users"].insert_one({"userId": userId, "name": name})
        return True

    def delete(self, userId: str) -> bool:
        """Returns whether the user was successfully deleted."""
        user_data = self.db["users"].find({"userId": userId})

        if userId not in [user["userId"] for user in user_data]:
            return False

        self.db["users"].delete_one({"userId": userId})
        return True
    