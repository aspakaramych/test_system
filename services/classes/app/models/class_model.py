from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects.postgresql.array import ARRAY
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class ClassModel(Base):
    __tablename__ = 'classes'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False, index=True)
    students = Column(ARRAY(Integer), nullable=False, index=True)
    teachers = Column(ARRAY(Integer), nullable=False, index=True)
    tasks = Column(ARRAY(Integer), nullable=False, index=True)