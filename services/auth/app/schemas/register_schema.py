from typing import List, Optional

from pydantic import BaseModel, Field, model_validator


class RegisterSchema(BaseModel):
    username: str
    password: str
    name: str
    surname: str
    teacher: bool
    classes: Optional[list[int]] = None

    @model_validator(mode='after')
    def set_defaults(self):
        if self.classes is None:
            self.classes = []
        return self