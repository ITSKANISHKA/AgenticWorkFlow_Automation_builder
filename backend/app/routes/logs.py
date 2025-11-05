from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import WorkflowLog

router = APIRouter(prefix="/logs", tags=["Logs"])

# Add a log entry
@router.post("/")
def create_log(workflow_id: int, step: str, status: str, message: str, db: Session = Depends(get_db)):
    log = WorkflowLog(workflow_id=workflow_id, step=step, status=status, message=message)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

# Get all logs
@router.get("/")
def get_all_logs(db: Session = Depends(get_db)):
    return db.query(WorkflowLog).all()
