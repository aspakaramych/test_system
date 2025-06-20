from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.auth_service import pwd_context, verify_password
from ..models.user_model import User
from ..schemas.auth_schema import UserSchema, UserFromDb
from ..schemas.register_schema import RegisterSchema


async def create_user(db: AsyncSession, user: RegisterSchema):
    new_user = User(
        name=user.name,
        surname=user.surname,
        password=pwd_context.hash(user.password),
        username=user.username,
    )
    db.add(new_user)
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
        username=user_db.username,
        password=user_db.password,
        name=user_db.name,
        surname=user_db.surname,
        teacher=user_db.teacher,
        classes=user_db.classes,
    )

async def authenticate_user(db: AsyncSession, user: UserSchema):
    userFromDb = await get_user(db, user)
    if not user or not verify_password(user.password, userFromDb.password):
        return None
    return userFromDb