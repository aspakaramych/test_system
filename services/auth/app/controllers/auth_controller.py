from fastapi import HTTPException, APIRouter
from fastapi.params import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.auth_service import create_access_token
from ..database import get_db
from ..schemas.auth_schema import UserSchema
from ..schemas.id_schema import IdSchema
from ..schemas.register_schema import RegisterSchema
from ..services.user_service import authenticate_user, create_user, get_allow

router = APIRouter()

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