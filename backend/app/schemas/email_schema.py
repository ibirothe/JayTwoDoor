from pydantic import BaseModel, EmailStr

class EmailIn(BaseModel):
    to: EmailStr
    subject: str
    body: str

class EmailOut(BaseModel):
    message: str
    email: EmailStr