import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from ..models.class_model import ClassModel
from ..schemas.class_schema import ClassSchema


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


