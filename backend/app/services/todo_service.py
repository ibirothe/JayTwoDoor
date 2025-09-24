from typing import List
from uuid import UUID
from app.models.user_model import User
from app.models.todo_model import Todo
from app.schemas.todo_schema import TodoCreate, TodoUpdate

class TodoService:
    """
    Service layer for managing CRUD operations on todos.
    """

    @staticmethod
    async def list_todos(user: User) -> List[Todo]:
        """
        Get all todos for a user.

        Args:
            user (User): The owner of the todos.

        Returns:
            List[Todo]: List of user's todos.
        """
        todos = await Todo.find(Todo.owner.id == user.id).to_list()
        return todos
    
    @staticmethod
    async def create_todo(user: User, data: TodoCreate) -> Todo:
        """
        Create a new todo for a user.

        Args:
            user (User): The owner of the todo.
            data (TodoCreate): Data for the new todo.

        Returns:
            Todo: The created todo.
        """
        todo = Todo(**data.dict(), owner=user)
        return await todo.insert()
    
    @staticmethod
    async def retrieve_todo(current_user: User, todo_id: UUID) -> Todo:
        """
        Retrieve a todo by ID for the current user.

        Args:
            current_user (User): The owner.
            todo_id (UUID): The todo's ID.

        Returns:
            Todo: The todo if found, else None.
        """
        todo = await Todo.find_one(Todo.todo_id == todo_id, Todo.owner.id == current_user.id)
        return todo
    
    @staticmethod
    async def update_todo(current_user: User, todo_id: UUID, data: TodoUpdate) -> Todo:
        """
        Update an existing todo.

        Args:
            current_user (User): The owner.
            todo_id (UUID): The todo's ID.
            data (TodoUpdate): Fields to update.

        Returns:
            Todo: The updated todo.
        """
        todo = await TodoService.retrieve_todo(current_user, todo_id)
        await todo.update({"$set": data.dict(exclude_unset=True)})
        await todo.save()
        return todo
    
    @staticmethod
    async def delete_todo(current_user: User, todo_id: UUID) -> None:
        """
        Delete a todo by ID.

        Args:
            current_user (User): The owner.
            todo_id (UUID): The todo's ID.

        Returns:
            None
        """
        todo = await TodoService.retrieve_todo(current_user, todo_id)
        if todo:
            await todo.delete()
        return None
