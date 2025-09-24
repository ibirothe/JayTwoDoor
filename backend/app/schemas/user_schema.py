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
    user_id = UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled: Optional[bool] = False
