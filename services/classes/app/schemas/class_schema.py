from pydantic import BaseModel


class ClassSchema(BaseModel):
    user_id: str
    title: str
    description: str

class GetClassRequest(BaseModel):
    user_id: str

class GetClassSchema(BaseModel):
    class_id: str
    title: str
    description: str

class GetClassesResponse(BaseModel):
    classes: list[GetClassSchema]

