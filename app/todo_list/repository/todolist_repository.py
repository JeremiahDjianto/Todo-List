from abc import ABC, abstractmethod


class TodoListRepository(ABC):
    """Abstract class to access and update TodoList data."""
    @abstractmethod
    def get(self):
        pass

    @abstractmethod
    def post(self):
        pass

    @abstractmethod
    def delete(self):
        pass