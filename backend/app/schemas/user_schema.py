from pydantic import BaseModel, EmailStr, Field

class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., min_length=8, max_length=32, description="user username")
    password: str = Field(..., min_length=8, max_length=32, description="user password")