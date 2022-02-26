from abc import ABC, abstractmethod


class TaskRepository(ABC):
    """Abstract class to access and update Task data."""
    @abstractmethod
    def get(self, userId: str,  todolistId: str, taskId: str) -> dict:
        pass

    @abstractmethod
    def post(self, userId: str, todolistId: str, name: str) -> bool:
        pass

    @abstractmethod
    def put(self, taskId: str, done: bool) -> bool:
        pass

    @abstractmethod
    def delete(self, taskId: str) -> bool:
        pass