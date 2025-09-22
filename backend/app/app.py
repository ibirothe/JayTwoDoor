from beanie import init_beanie
from app.core.config import settings
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from app.models.user_model import User
from app.api.api_v1.router import router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def app_init():
    """Initialize application"""
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).todoapp

    await init_beanie(
        database=db_client,
        document_models=[
            User
        ]
    )

app.include_router(router, prefix=settings.API_V1_STR)