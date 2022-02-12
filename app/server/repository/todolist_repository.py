from abc import ABC, abstractmethod


class TodoListRepository(ABC):
    """Abstract class to access and update TodoList data."""
    @abstractmethod
    def get(self, userId: str,  todolistId: str) -> dict:
        pass

    @abstractmethod
    def post(self, userId: str, name: str) -> bool:
        pass

    @abstractmethod
    def delete(self, todolistId: str) -> bool:
        pass