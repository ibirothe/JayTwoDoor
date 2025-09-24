from typing import Any
from pydantic import ValidationError
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestFormStrict
from app.services.user_service import UserService
from app.core.security import create_access_token, create_refresh_token
from app.schemas.user_schema import UserOut
from app.models.user_model import User
from app.schemas.auth_schema import TokenSchema, TokenPayload
from app.api.deps.user_deps import get_current_user
from app.core.config import settings
from jose import jwt

auth_router = APIRouter()

@auth_router.post("/login", summary="Access and Refresh token created", response_model=TokenSchema)
async def login(login: OAuth2PasswordRequestFormStrict = Depends()) -> Any:
    """
    Authenticate user and return access and refresh tokens.

    Args:
        login (OAuth2PasswordRequestFormStrict): User login form with email and password.

    Raises:
        HTTPException: If authentication fails.

    Returns:
        dict: Access and refresh JWT tokens.
    """
    user = await UserService.authenticate(email=login.username, password=login.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")
    
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id)
    }

@auth_router.post("/test-token", summary="Testing if Token is valid", response_model=UserOut)
async def test_token(user: User = Depends(get_current_user)):
    """
    Validate the current JWT token and return user details.

    Args:
        user (User): Current authenticated user via token.

    Returns:
        UserOut: User details.
    """
    return user

@auth_router.post('/refresh', summary="Refresh token", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    """
    Generate new access and refresh tokens using a valid refresh token.

    Args:
        refresh_token (str): Refresh JWT token.

    Raises:
        HTTPException: If token is invalid or user not found.

    Returns:
        dict: New access and refresh JWT tokens.
    """
    try:
        payload = jwt.decode(
            refresh_token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }
