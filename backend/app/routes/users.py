from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

router = APIRouter(prefix="/users", tags=["Users"])

# Create a new user
@router.post("/")
def create_user(email: str, role: str = "staff", db: Session = Depends(get_db)):
    new_user = User(email=email, role=role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Get all users
@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.post("/")
def create_user(email: str, role: str = "staff", db: Session = Depends(get_db)):
    new_user = User(email=email, role=role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

