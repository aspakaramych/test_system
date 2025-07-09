import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from services.tasks.app.models.task_model import Task
from services.tasks.app.schemas.task_schemas import TasksRequest, TaskResponse


async def get_task_service(db: AsyncSession, tasks_idxes: TasksRequest):
    idxes = tasks_idxes.tasks
    response = []
    for idx in idxes:
        idx_uuid = uuid.UUID(idx)
        query = select(Task).where(Task.id == idx_uuid)
        result = await db.execute(query)
        result = result.scalar().first()
        response.append(TaskResponse(id=str(result.id), title=result.title))
    return response