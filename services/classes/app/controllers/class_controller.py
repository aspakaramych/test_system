from fastapi import HTTPException

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..schemas.class_schema import ClassSchema
from ..services.classes_service import create_class_service

router = APIRouter()

@router.post("/create")
async def create_class(class_entity: ClassSchema, db: AsyncSession = Depends(get_db)):
    new_class = await create_class_service(db, class_entity)
    if new_class is None:
        raise HTTPException(status_code=400, detail="Ошибка создания")
    return {"id": str(new_class.id)}

