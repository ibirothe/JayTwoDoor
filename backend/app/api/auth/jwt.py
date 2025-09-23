from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestFormStrict
from app.services.user_service import UserService
from app.core.security import create_access_token, create_refresh_token


auth_router = APIRouter()


@auth_router.post("/login")
async def login(login: OAuth2PasswordRequestFormStrict = Depends()) -> Any:
    user = await UserService.authenticate(email=login.username, password=login.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or passweord")
    
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id)
    }