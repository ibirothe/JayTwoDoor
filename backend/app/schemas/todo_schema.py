from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field

class TodoCreate(BaseModel):
    """
    Schema for creating a new todo.
    """
    title: str = Field(..., title="Title", max_length=55, min_length=1)
    description: str = Field(..., title="Description", max_length=755, min_length=1)
    status: Optional[bool] = False
    urgent: Optional[bool] = False
    assignee: Optional[int] = 0
    
    
class TodoUpdate(BaseModel):
    """
    Schema for updating an existing todo.
    """
    title: Optional[str] = Field(..., title="Title", max_length=55, min_length=1)
    description: Optional[str] = Field(..., title="Description", max_length=755, min_length=1)
    status: Optional[bool] = False
    urgent: Optional[bool] = False
    assignee: Optional[int]
    

class TodoOut(BaseModel):
    """
    Schema for returning todo details.
    """
    todo_id: UUID
    status: bool
    urgent: bool
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    assignee: int
