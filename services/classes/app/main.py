from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .controllers.class_controller import router
from .database import engine
from .models.class_model import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:14000"],
    allow_methods=["*"],
    allow_credentials=True,
)

app.include_router(router=router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)