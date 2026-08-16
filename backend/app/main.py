from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.questions import router as questions_router
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="AI-powered Socratic tutor for JEE and NEET aspirants.",
    version=settings.app_version,
)

app.include_router(health_router)
app.include_router(questions_router)