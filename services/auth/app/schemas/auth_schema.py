from pydantic import BaseModel


class UserSchema(BaseModel):
    username: str
    password: str

class UserFromDb(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    teacher: bool