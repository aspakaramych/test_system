import uuid

from sqlalchemy import Column, Integer, String, UUID
from sqlalchemy.dialects.postgresql.array import ARRAY
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class ClassModel(Base):
    __tablename__ = 'classes'

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True, index=True)
    students = Column(ARRAY(UUID(as_uuid=True)), index=True)
    teachers = Column(ARRAY(UUID(as_uuid=True)), index=True)
    tasks = Column(ARRAY(UUID(as_uuid=True)), index=True)