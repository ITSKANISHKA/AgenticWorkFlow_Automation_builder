from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Workflow
from app.ai_agent import suggest_next_step

router = APIRouter(prefix="/workflows", tags=["Workflows"])

# Create a workflow
@router.post("/")
def create_workflow(name: str, definition: str, creator_id: int, db: Session = Depends(get_db)):
    new_workflow = Workflow(name=name, definition=definition, creator_id=creator_id)
    db.add(new_workflow)
    db.commit()
    db.refresh(new_workflow)
    return new_workflow

# Get all workflows
@router.get("/")
def get_all_workflows(db: Session = Depends(get_db)):
    return db.query(Workflow).all()

# Get AI suggestion for next step
@router.get("/suggest")
def get_suggestion(current_step: str):
    return {"next_step": suggest_next_step(current_step)}
