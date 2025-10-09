from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, constr

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
    zone: Optional[str] = None
    language: Optional[str] = None
    spouse_a_name: Optional[str] = None
    spouse_b_name: Optional[str] = None
    spouse_a_email: Optional[str] = None
    spouse_b_email: Optional[str] = None
    spouse_a_icon: Optional[int] = 0
    spouse_b_icon: Optional[int] = 1
    disabled: Optional[bool] = False


class UserUpdate(BaseModel):
    """
    Schema for updating user details. All fields are optional.
    """
    email: Optional[EmailStr] = Field(None, description="New email for the user")
    username: Optional[str] = Field(None, min_length=8, max_length=32, description="New username")
    password: Optional[str] = Field(None, min_length=8, max_length=32, description="New password")
    zone: Optional[str] = Field(None, description="New timezone")
    language: Optional[constr(min_length=2, max_length=2)] = Field(None, description="New language")
    spouse_a_name: Optional[str] = Field(None, description="New spouse a name")
    spouse_b_name: Optional[str] = Field(None, description="New spouse b name")
    spouse_a_email: Optional[EmailStr] = Field(None, description="New spouse a email")
    spouse_b_email: Optional[EmailStr] = Field(None, description="New spouse b email")
    spouse_a_icon: Optional[int] = Field(None, description="New spouse a icon")
    spouse_b_icon: Optional[int] = Field(None, description="New spouse b icon")
    disabled: Optional[bool] = Field(None, description="Disable or enable the user")
