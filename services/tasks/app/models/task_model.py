import uuid

from sqlalchemy import Column, UUID, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = 'task'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False, index=True)
    input_data = Column(String, nullable=False)
    output_data = Column(String, nullable=False)




