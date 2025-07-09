from pydantic import BaseModel


class ClassSchema(BaseModel):
    user_id: str
    title: str
    description: str

class GetClassRequest(BaseModel):
    classes_id: list[str]

class GetClassSchema(BaseModel):
    id: str
    title: str
    description: str

class GetClassesResponse(BaseModel):
    classes: list[GetClassSchema]

class GetTasksRequest(BaseModel):
    class_id: str

