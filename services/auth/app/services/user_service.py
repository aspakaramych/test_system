import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.auth_service import pwd_context, verify_password
from ..models.user_model import User
from ..schemas.auth_schema import UserSchema, UserFromDb
from ..schemas.id_schema import IdClassSchema, IdSchema
from ..schemas.register_schema import RegisterSchema
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO) # или DEBUG для большего количества деталей

async def create_user(db: AsyncSession, user: RegisterSchema):
    new_user = User(
        id=uuid.uuid4(),
        name=user.name,
        surname=user.surname,
        password=pwd_context.hash(user.password),
        username=user.username,
        teacher=user.teacher,
        classes=user.classes or [],
    )
    db.add(new_user)
    await db.flush()
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_user(db: AsyncSession, user: UserSchema) -> UserFromDb:
    query = select(User).where(User.username == user.username)
    result = await db.execute(query)
    user_db = result.scalars().first()

    if not user_db:
        return None

    return UserFromDb(
        id=str(user_db.id),
        username=user_db.username,
        password=user_db.password,
        name=user_db.name,
        surname=user_db.surname,
        teacher=user_db.teacher,
        classes=[str(i) for i in user_db.classes],
    )

async def authenticate_user(db: AsyncSession, user: UserSchema):
    userFromDb = await get_user(db, user)
    if not user or not verify_password(user.password, userFromDb.password):
        return None
    return userFromDb

async def get_allow(db: AsyncSession, id: str) -> bool:
    query = select(User).where(User.id == id)
    user = await db.execute(query)
    user = user.scalars().first()
    return user.teacher

async def set_class_service(db: AsyncSession, user: IdClassSchema):
    query = select(User).where(User.id == user.user_id)
    result = await db.execute(query)
    user_db = result.scalars().first()

    if not user_db:
        raise ValueError("User not found")

    if not user_db.classes:
        user_db.classes = []

    current_classes = user_db.classes if user_db.classes is not None else []
    new_class_uuid = uuid.UUID(str(user.class_id))
    if new_class_uuid not in current_classes:
        current_classes.append(new_class_uuid)

    user_db.classes = current_classes
    print(user_db.classes)
    db.add(user_db)
    await db.commit()
    await db.refresh(user_db)

async def get_classes_service(db: AsyncSession, user: IdSchema):
    query = select(User).where(User.id == user.id)
    result = await db.execute(query)
    result = result.scalars().first()
    return [str(i) for i in result.classes]

    