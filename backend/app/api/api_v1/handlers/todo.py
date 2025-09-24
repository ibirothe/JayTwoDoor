from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.todo_schema import TodoOut, TodoCreate, TodoUpdate
from app.services.todo_service import TodoService
from app.models.todo_model import Todo

todo_router = APIRouter()

@todo_router.get('/', summary="Get all todos of the user", response_model=List[TodoOut])
async def list(current_user: User = Depends(get_current_user)):
    """
    Retrieve all todos for the current user.

    Args:
        current_user (User): Authenticated user.

    Returns:
        List[TodoOut]: List of user's todos.
    """
    return await TodoService.list_todos(current_user)

@todo_router.post('/create', summary="Create Todo", response_model=Todo)
async def create_todo(data: TodoCreate, current_user: User = Depends(get_current_user)):
    """
    Create a new todo for the current user.

    Args:
        data (TodoCreate): Data for the new todo.
        current_user (User): Authenticated user.

    Returns:
        Todo: The created todo.
    """
    return await TodoService.create_todo(current_user, data)

@todo_router.get('/{todo_id}', summary="Get a todo by todo_id", response_model=TodoOut)
async def retrieve(todo_id: UUID, current_user: User = Depends(get_current_user)):
    """
    Retrieve a specific todo by ID for the current user.

    Args:
        todo_id (UUID): ID of the todo to retrieve.
        current_user (User): Authenticated user.

    Returns:
        TodoOut: The requested todo.
    """
    return await TodoService.retrieve_todo(current_user, todo_id)

@todo_router.put('/{todo_id}', summary="Update todo by todo_id", response_model=TodoOut)
async def update(todo_id: UUID, data: TodoUpdate, current_user: User = Depends(get_current_user)):
    """
    Update an existing todo for the current user.

    Args:
        todo_id (UUID): ID of the todo to update.
        data (TodoUpdate): Fields to update.
        current_user (User): Authenticated user.

    Returns:
        TodoOut: The updated todo.
    """
    return await TodoService.update_todo(current_user, todo_id, data)

@todo_router.delete('/{todo_id}', summary="Delete todo by todo_id")
async def delete(todo_id: UUID, current_user: User = Depends(get_current_user)):
    """
    Delete a specific todo for the current user.

    Args:
        todo_id (UUID): ID of the todo to delete.
        current_user (User): Authenticated user.

    Returns:
        None
    """
    await TodoService.delete_todo(current_user, todo_id)
    return None
