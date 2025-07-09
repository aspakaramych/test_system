from pydantic import BaseModel


class TasksRequest(BaseModel):
    tasks: list[str]

class TaskResponse(BaseModel):
    id: str
    title: str
