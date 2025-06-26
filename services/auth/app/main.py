from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .controllers.auth_controller import router
from .database import engine
from .models.user_model import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:14000", "http://localhost:16000"],
    allow_credentials=True,
    allow_methods=["POST"],
)

app.include_router(router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)