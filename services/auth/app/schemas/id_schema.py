from pydantic import BaseModel


class IdSchema(BaseModel):
    id: str

class IdClassSchema(BaseModel):
    user_id: str
    class_id: str
