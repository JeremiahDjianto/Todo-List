from dependency_injector.wiring import Provide, inject
from flask import Flask
from flask_restful import Api
from repository.user_repository import UserRepository
from repository.todolist_repository import TodoListRepository
from repository.task_repository import TaskRepository
from resources.users import Users
from resources.todoLists import TodoLists
from resources.tasks import Tasks
from dependency_injection import Container


@inject
def main(
    user_repo: UserRepository = Provide[Container.user_repo],
    list_repo: TodoListRepository = Provide[Container.list_repo],
    task_repo: TaskRepository = Provide[Container.task_repo]
):
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Users, "/users", resource_class_kwargs={"user_repo": user_repo, "list_repo": list_repo, "task_repo": task_repo})
    api.add_resource(TodoLists, "/users/<string:userId>/todolists", resource_class_kwargs={"list_repo": list_repo, "task_repo": task_repo})
    api.add_resource(Tasks, "/users/<string:userId>/todolists/<string:todolistId>/tasks", resource_class_kwargs={"task_repo": task_repo})
    
    app.run()

if __name__ == "__main__":
    container = Container()
    container.wire(modules=[__name__])

    main()