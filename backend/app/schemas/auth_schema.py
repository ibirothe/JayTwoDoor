from pydantic import BaseModel
from uuid import UUID

class TokenSchema(BaseModel):
    """
    Schema for access and refresh tokens.
    """
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    """
    Schema for token payload content.
    """
    sub: UUID = None
    exp: int = None
