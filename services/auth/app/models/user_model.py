import uuid
from sqlalchemy import Column, Integer, String, Boolean, UUID
from sqlalchemy.dialects.postgresql.array import ARRAY
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.orm import declarative_base


Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    teacher = Column(Boolean, index=True)
    classes = Column(MutableList.as_mutable(ARRAY(UUID(as_uuid=True))), index=True)