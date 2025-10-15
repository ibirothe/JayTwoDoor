from pydantic import BaseModel, EmailStr

class EmailOut(BaseModel):
    message: str
    email: EmailStr