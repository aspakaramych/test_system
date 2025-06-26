import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.class_model import ClassModel
from ..schemas.class_schema import ClassSchema, GetClassRequest, GetClassSchema


async def create_class_service(db: AsyncSession, class_entity: ClassSchema):
    new_class = ClassModel(
        id=uuid.uuid4(),
        title=class_entity.title,
        description=class_entity.description,
        students=[],
        teachers=[uuid.UUID(class_entity.user_id)],
        tasks=[]
    )
    db.add(new_class)
    await db.flush()
    await db.commit()
    await db.refresh(new_class)
    return new_class

async def get_class_service(db: AsyncSession, class_entity: GetClassRequest):
    idxes = class_entity.classes_id
    response = []
    for idx in idxes:
        query = select(ClassModel).where(ClassModel.id == idx)
        classes = await db.execute(query)
        classesDb = classes.scalars().first()
        response.append(GetClassSchema(
            id=str(classesDb.id),
            title=classesDb.title,
            description=classesDb.description,
        ))
    return response


