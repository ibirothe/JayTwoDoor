from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field

class UserAuth(BaseModel):
    """
    Schema for user registration and authentication input.
    """
    email: EmailStr = Field(..., description="User email")
    username: str = Field(..., min_length=8, max_length=32, description="User username")
    password: str = Field(..., min_length=8, max_length=32, description="User password")


class UserOut(BaseModel):
    """
    Schema for returning user details.
    """
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    disabled: Optional[bool] = False


class UserUpdate(BaseModel):
    """
    Schema for updating user details. All fields are optional.
    """
    email: Optional[EmailStr] = Field(None, description="New email for the user")
    username: Optional[str] = Field(None, min_length=8, max_length=32, description="New username")
    password: Optional[str] = Field(None, min_length=8, max_length=32, description="New password")
    first_name: Optional[str] = Field(None, description="New first name")
    last_name: Optional[str] = Field(None, description="New last name")
    disabled: Optional[bool] = Field(None, description="Disable or enable the user")
