from typing import Optional
from uuid import UUID, uuid4
from beanie import Document
from pydantic import Field, EmailStr
from pymongo import IndexModel
import datetime

class User(Document):
    """
    User document model for MongoDB with Beanie.
    Stores authentication and profile details.
    """
    user_id: UUID = Field(default_factory=uuid4)
    username: str = Field(..., unique=True)
    email: EmailStr = Field(..., unique=True)
    hashed_password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    disabled: Optional[bool] = None

    class Settings:
        indexes = [
            IndexModel("email", unique=True),  # enforces unique emails
            IndexModel("username")  # optional, for faster queries
        ]

    def __repr__(self):
        return f"User: {self.email}"

    def __str__(self):
        return self.email
    
    def __hash__(self):
        return hash(self.email)

    def __eq__(self, other: object):
        if isinstance(other, User):
            return self.email == other.email
        return False
    
    @property
    def create(self) -> datetime:
        """
        Get user creation datetime from MongoDB ObjectId.
        """
        return self.id.generation_time
    
    @classmethod
    async def by_email(cls, email: str) -> "User":
        """
        Retrieve a user by email.
        """
        return await cls.find_one(cls.email)
    
    class Settings:
        """
        MongoDB setting configuration.
        """
        name = "users"
