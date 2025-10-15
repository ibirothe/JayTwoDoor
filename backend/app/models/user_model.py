from typing import Optional
from uuid import UUID, uuid4
from beanie import Document
import pycountry
from pydantic import Field, EmailStr, constr
from pymongo import IndexModel
from datetime import datetime, timezone

class User(Document):
    """
    User document model for MongoDB with Beanie.
    Stores authentication and profile details.
    """
    user_id: UUID = Field(default_factory=uuid4)
    username: str = Field(..., unique=True)
    email: EmailStr = Field(..., unique=True)
    hashed_password: str
    zone: constr(max_length=50) = "UTC"
    language: Optional[constr(min_length=2, max_length=2)] = Field(default="en")
    spouse_a_name: Optional[str] = None
    spouse_b_name: Optional[str] = None
    spouse_a_email: Optional[EmailStr] = None
    spouse_b_email: Optional[EmailStr] = None
    spouse_a_icon: Optional[int] = 0
    spouse_b_icon: Optional[int] = 1
    disabled: Optional[bool] = None

    class Settings:
        indexes = [
            IndexModel("email", unique=True),
            IndexModel("username")
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
    
    @property
    def language_name(self) -> str:
        """
        Returns the language name based on language ISO-Code.
        """
        lang = pycountry.languages.get(alpha_2=self.language)
        return lang.name if lang else "Unknown"
    
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
