from dependency_injector.wiring import Provide, inject
from flask import Flask
from flask_restful import Api
from repository.user_repository import UserRepository
from resources import TodoLists, Users
from dependency_injection import Container


@inject
def main(user_repo: UserRepository = Provide[Container.user_repo]):
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Users, "/users", resource_class_kwargs={"user_repo": user_repo})
    api.add_resource(TodoLists, "/locations")
    
    app.run()

if __name__ == "__main__":
    container = Container()
    container.wire(modules=[__name__])

    main()