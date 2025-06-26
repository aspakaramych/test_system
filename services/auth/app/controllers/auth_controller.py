import http
import logging

import httpx
from fastapi import HTTPException, APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.auth_service import create_access_token
from ..database import get_db
from ..schemas.auth_schema import UserSchema
from ..schemas.id_schema import IdSchema, IdClassSchema
from ..schemas.register_schema import RegisterSchema
from ..services.user_service import authenticate_user, create_user, get_allow, set_class_service, get_classes_service

router = APIRouter()
logger = logging.Logger(__name__)

@router.post("/login")
async def auth(user_data: UserSchema, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, user_data)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user_data.username})
    return {"access_token": access_token, "id": str(user.id)}


@router.post("/register")
async def register_user(user: RegisterSchema, db: AsyncSession = Depends(get_db)):
    user = await create_user(db, user)
    if not user:
        raise HTTPException(status_code=400, detail="")


@router.post("/allow")
async def get_allow_controller(id: IdSchema, db: AsyncSession = Depends(get_db)):
    allow = await get_allow(db, id.id)
    return {"isAllow": allow}


@router.post("/set_class")
async def set_class(id: IdClassSchema, db: AsyncSession = Depends(get_db)):
    await set_class_service(db, id)
    return {"status": "ok"}


@router.post("/get_class")
async def get_classes(id: IdSchema, db: AsyncSession = Depends(get_db)):
    classes = await get_classes_service(db, id)
    if classes is None:
        raise HTTPException(status_code=400, detail="Ошибка получения")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://classes:8000/get_classes",
                json={"classes_id": classes}
            )

        if response.status_code != 200:
            logger.error(f"External service returned error: {response.status_code}, body: {response.text}")
            raise HTTPException(status_code=response.status_code,
                                detail=f"Внешний сервис вернул ошибку: {response.status_code}")

        try:
            data = response.json()
            print(data)
        except httpx.ResponseNotReadError as e:
            logger.exception("Ошибка чтения ответа от сервиса")
            raise HTTPException(status_code=500, detail="Ошибка чтения ответа от сервиса") from e



        return {"classes": data}

    except httpx.RequestError as e:
        logger.exception("Ошибка сети при обращении к сервису")
        raise HTTPException(status_code=500, detail=f"Ошибка сети при обращении к сервису: {str(e)}") from e
    except Exception as e:
        logger.exception("Неизвестная внутренняя ошибка")
        raise HTTPException(status_code=500, detail=f"Внутренняя ошибка: {str(e)}") from e
