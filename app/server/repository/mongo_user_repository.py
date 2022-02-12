from pymongo import MongoClient
from bson.objectid import ObjectId
from repository.user_repository import UserRepository


class MongoUserRepository(UserRepository):
    """Class to access and update user data from a MongoDB."""
    def __init__(self, db_user: str, db_password: str) -> None:
        mongodb_cluster = MongoClient(f"mongodb+srv://{db_user}:{db_password}@cluster0.rxctl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

        self.collection = mongodb_cluster["todolistdb"]["users"]
    
    def get(self, userId: str=None) -> dict:
        """Returns all data stored for users."""
        if userId is not None:
            user_data = self.collection.find({"_id": ObjectId(userId)})
        else:
            user_data = self.collection.find()

        return {str(user["_id"]): user["name"] for user in user_data}
        
    def post(self, name: str) -> bool:
        """Returns whether user was successfully created or if they already exists."""
        user_data = self.collection.find({"name": name})

        if name in [user["name"] for user in user_data]:
            return False

        self.collection.insert_one({"name": name})
        return True

    def delete(self, userId: str) -> bool:
        """Returns whether the user was successfully deleted."""
        user_data = self.collection.find({"_id": ObjectId(userId)})

        if userId not in [str(user["_id"]) for user in user_data]:
            return False

        self.collection.delete_one({"_id": ObjectId(userId)})
        return True
    