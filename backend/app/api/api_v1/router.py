from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.api_v1.handlers import todo
from app.api.api_v1.handlers import email
from app.api.auth.jwt import auth_router

router = APIRouter()

"""
Main API router for version 1.
Includes user, authentication, and todo routes.
"""
router.include_router(user.user_router, prefix='/users', tags=['users'])
router.include_router(auth_router, prefix='/auth', tags=['auth'])
router.include_router(todo.todo_router, prefix='/todo', tags=['todo'])
router.include_router(email.email_router, prefix="/email", tags=["Email"])
