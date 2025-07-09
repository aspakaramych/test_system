from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from services.tasks.app.database import get_db
from services.tasks.app.schemas.task_schemas import TasksRequest
from services.tasks.app.services.task_service import get_task_service

router = APIRouter()

@router.post("/get_tasks")
async def get_tasks(tasks: TasksRequest, db: AsyncSession=Depends(get_db)):
    tasks = await get_task_service(db, tasks)
    return {"tasks": tasks}