import os
from dependency_injector import containers, providers
from repository.mongo_user_repository import MongoUserRepository
from repository.mongo_todolist_repository import MongoTodoListRepository

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    user_repo = providers.Singleton(
        MongoUserRepository,
        db_user = os.environ.get("MONGODB_USER"),
        db_password = os.environ.get("MONGODB_PASSWORD")
    )

    list_repo = providers.Singleton(
        MongoTodoListRepository,
        db_user = os.environ.get("MONGODB_USER"),
        db_password = os.environ.get("MONGODB_PASSWORD")
    )