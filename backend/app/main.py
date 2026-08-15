from fastapi import FastAPI

from app.api.routes.health import router as health_router


app = FastAPI(
    title="SocraticAI API",
    description="AI-powered Socratic tutor for JEE and NEET aspirants.",
    version="0.1.0",
)

app.include_router(health_router)