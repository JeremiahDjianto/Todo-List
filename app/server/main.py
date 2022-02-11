from dependency_injector.wiring import Provide, inject
from flask import Flask
from flask_restful import Api
from repository.todolist_repository import TodoListRepository
from repository.user_repository import UserRepository
from resources import TodoLists, Users
from dependency_injection import Container


@inject
def main(
    user_repo: UserRepository = Provide[Container.user_repo],
    list_repo: TodoListRepository = Provide[Container.list_repo]
):
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Users, "/users", resource_class_kwargs={"user_repo": user_repo, "list_repo": list_repo})
    api.add_resource(TodoLists, "/users/<string:userId>/todolists", resource_class_kwargs={"list_repo": list_repo})
    
    app.run()

if __name__ == "__main__":
    container = Container()
    container.wire(modules=[__name__])

    main()