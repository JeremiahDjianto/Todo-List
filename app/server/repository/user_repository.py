from abc import ABC, abstractmethod


class UserRepository(ABC):
    """Abstract class to access and update user data."""
    @abstractmethod
    def get(self, userId: str) -> dict:
        pass

    @abstractmethod
    def post(self, name: str) -> bool:
        pass

    @abstractmethod
    def delete(self, userId: str) -> bool:
        pass