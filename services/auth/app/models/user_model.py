from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects.postgresql.array import ARRAY
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    teacher = Column(Boolean, index=True)
    classes = Column(ARRAY(Integer), index=True)