import os
from dependency_injector import containers, providers
from dependency_injector.wiring import Provide, inject
from repository.mongo_user_repository import MongoUserRepository

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    user_repo = providers.Singleton(
        MongoUserRepository,
        db_user = os.environ.get("MONGODB_USER"),
        db_password = os.environ.get("MONGODB_PASSWORD")
    )