import uuid
from typing import List

from pydantic import BaseModel


class UserSchema(BaseModel):
    username: str
    password: str

class UserFromDb(BaseModel):
    id: str
    username: str
    password: str
    name: str
    surname: str
    teacher: bool
    classes: List[str]