from abc import ABC, abstractmethod


class UserRepository(ABC):
    """Abstract class to access and update user data."""
    @abstractmethod
    def get(self):
        pass

    @abstractmethod
    def post(self):
        pass

    @abstractmethod
    def delete(self):
        pass