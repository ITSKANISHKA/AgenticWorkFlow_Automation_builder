from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database (creates a local file named workflows.db)
DATABASE_URL = "sqlite:///./workflows.db"

# Create database engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all database models
Base = declarative_base()

# Dependency: used in routes to get database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
