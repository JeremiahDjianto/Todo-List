from flask_restful import Resource, reqparse


from repository.user_repository import UserRepository

class Users(Resource):
    """A class to represent a users resource.
    
    Users should have "Todo-Lists" which lists their tasks.
    """
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo
        
    def get(self):
        """Returns all data stored for users if request is successful."""
        return self.user_repo.get(), 200

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
    pass