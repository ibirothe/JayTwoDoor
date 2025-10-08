from typing import Optional
from datetime import datetime, timezone
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, before_event, Replace, Insert
from pydantic import Field
from app.models.user_model import User

class Todo(Document):
    """
    Todo document model for MongoDB with Beanie.
    Stores task details and links to the owning user.
    """
    todo_id: UUID = Field(default_factory=uuid4, unique=True)
    status: bool = False
    title: Indexed(str)
    description: str = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    assignee: int = Field(default_factory=0)
    owner: Link[User]
    
    def __repr__(self) -> str:
        return f"<Todo {self.title}>"

    def __str__(self) -> str:
        return self.title

    def __hash__(self) -> int:
        return hash(self.title)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Todo):
            return self.todo_id == other.todo_id
        return False
    
    @before_event([Replace, Insert])
    def update_update_at(self):
        """
        Automatically update the 'updated_at' timestamp before insert or replace.
        """
        self.updated_at = datetime.now(timezone.utc)
    
    class Settings:
        """
        MongoDB setting configuration.
        """
        name = "todos"
