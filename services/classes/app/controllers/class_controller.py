import logging

import httpx
from fastapi import HTTPException

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..schemas.class_schema import ClassSchema, GetClassRequest, GetTasksRequest
from ..services.classes_service import create_class_service, get_class_service, get_tasks_service

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/create")
async def create_class(class_entity: ClassSchema, db: AsyncSession = Depends(get_db)):
    new_class = await create_class_service(db, class_entity)
    if new_class is None:
        raise HTTPException(status_code=400, detail="Ошибка создания")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://auth:8000/set_class",
                json={"user_id": str(class_entity.user_id), "class_id": str(new_class.id)}
            )

        if response.status_code != 200:
            logger.error(f"External service returned error: {response.status_code}, body: {response.text}")
            raise HTTPException(status_code=response.status_code, detail=f"Внешний сервис вернул ошибку: {response.status_code}")

        try:
            data = response.json()
        except httpx.ResponseNotReadError as e:
            logger.exception("Ошибка чтения ответа от сервиса")
            raise HTTPException(status_code=500, detail="Ошибка чтения ответа от сервиса") from e

        if data.get("status") != "ok":
            logger.warning(f"Сервис вернул неожиданный статус: {data}")
            raise HTTPException(status_code=500, detail="Сервис вернул статус: не ok")

        return {"id": str(new_class.id)}

    except httpx.RequestError as e:
        logger.exception("Ошибка сети при обращении к сервису")
        raise HTTPException(status_code=500, detail=f"Ошибка сети при обращении к сервису: {str(e)}") from e
    except Exception as e:
        logger.exception("Неизвестная внутренняя ошибка")
        raise HTTPException(status_code=500, detail=f"Внутренняя ошибка: {str(e)}") from e

@router.post("/get_classes")
async def get_classes(classes_id: GetClassRequest, db: AsyncSession = Depends(get_db)):
    classes = await get_class_service(db, classes_id)
    if classes is None:
        raise HTTPException(status_code=500, detail="Ошибка на стороне сервера")

    return {"classes": classes}

@router.post("/get_tasks")
async def get_tasks(class_id: GetTasksRequest, db: AsyncSession = Depends(get_db)):
    tasks_idxes = await get_tasks_service(db, class_id)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://tasks:8000/get_tasks",
                json={"tasks": tasks_idxes}
            )
        if response.status_code != 200:
            logger.error(f"External service returned error: {response.status_code}, body: {response.text}")
            raise HTTPException(status_code=response.status_code,
                                detail=f"Внешний сервис вернул ошибку: {response.status_code}")

        try:
            data = response.json()
        except httpx.ResponseNotReadError as e:
            logger.exception("Ошибка чтения ответа от сервиса")
            raise HTTPException(status_code=500, detail="Ошибка чтения ответа от сервиса") from e


        return data
    except httpx.RequestError as e:
        logger.exception("Ошибка сети при обращении к сервису")
        raise HTTPException(status_code=500, detail=f"Ошибка сети при обращении к сервису: {str(e)}") from e
    except Exception as e:
        logger.exception("Неизвестная внутренняя ошибка")
        raise HTTPException(status_code=500, detail=f"Внутренняя ошибка: {str(e)}") from e
