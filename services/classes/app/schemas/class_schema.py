from pydantic import BaseModel


class ClassSchema(BaseModel):
    user_id: str
    title: str
    description: str